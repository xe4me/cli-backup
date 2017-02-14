import {
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {
    AbstractControl,
    FormControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
    FormDefinition,
    FormBlock,
    ScrollService,
    SaveService,
    AmpDropdownComponent,
    LoginStatusService
} from 'amp-ddc-components';
import {
    EligibleAccountsService
} from '../../shared';
import { ApplicantGeneratorService } from '../../shared/applicant-generator.service';

export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    protected accountType : string;
    protected accountActions = {
        new: 'new',
        convert: 'convert'
    };
    protected currentAction : string;
    protected newOrConvertControl : AbstractControl;
    protected accountsEligibleForTransitioning : Array<{ value : string, label : string }> = [];
    protected debitCardMigrationFormDef : FormDefinition;

    @ViewChild ('accountsListCmp') private accountsListCmp : AmpDropdownComponent;
    private description : string = null;
    private userHasLoggedIn : boolean  = false;
    private newOrConvertControlSubscription : Subscription;
    private eligibleAccountsServiceSubscription : Subscription;
    private isAccountNumberDropDownOrInputReady : boolean = false;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewContainerRef : ViewContainerRef,
                  private loginStatusService : LoginStatusService,
                  private eligibleAccountsService : EligibleAccountsService,
                  private applicantGeneratorService : ApplicantGeneratorService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        this.description              = this.__custom[ 'description' ];
        this.accountType              = this.__custom[ 'type' ];
        this.newOrConvertControl     = this.__controlGroup.get( this.__custom.controls[ 0 ].id );

        this.newOrConvertControlSubscription = this.newOrConvertControl.valueChanges
            .subscribe( ( action ) => {
                this.updateAccountAction( action );
                this._cd.markForCheck();
                this.setAccountNumberDropdownDefaultValue();
            } );

        if ( this.__isRetrieved ) {
            this.__controlGroup.markAsTouched();
            this.isActive = true;
            this.updateAccountAction( this.newOrConvertControl.value );
            this.newOrConvertControl.setValue( this.newOrConvertControl.value );
            let accountNumberControlId = this.__custom.controls[ 1 ].id;
            let accountNumberControl = this.__controlGroup.get( accountNumberControlId );
            // If the account number component is a DropDown in retrieve scenarios,
            // change it to account number input and set a new control with value
            if ( this.isAccountNumberDropdown( accountNumberControl ) ) {
                this.__controlGroup.setControl(
                    accountNumberControlId ,
                    new FormControl( accountNumberControl.get( 'SelectedItem' ).value )
                );
            }
        } else {
            this.newOrConvertControl.setValue( this.defaultAccountAction );
        }

        this.loginStatusService.userHasLoggedIn()
            .subscribe( () => {
                this.userHasLoggedIn = true;
                this.fetchEligibleAccounts();
            });

        this.isAccountNumberDropDownOrInputReady = true;
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        this.newOrConvertControlSubscription.unsubscribe();
        if ( this.eligibleAccountsServiceSubscription ) {
            this.eligibleAccountsServiceSubscription.unsubscribe();
        }
        super.ngOnDestroy();
    }

    protected isAccountNumberDropdown ( accountNumberControl ) : boolean {
        return  accountNumberControl &&
                accountNumberControl.get( 'Query' ) &&
                accountNumberControl.get( 'SelectedItem' );
    }

    protected get showAccountNumber () : boolean {
        return this.currentAction === this.accountActions.convert;
    }

    protected get additionalDescription () : string {
        return this.hasEligibleAccounts ?
            this.__custom[ 'additional_dropdown_instruction' ] :
            this.__custom[ 'additional_input_instruction' ];
    }

    protected mapEligibleAccounts ( accounts : any[] ) : void {
        if (accounts[this.accountType]) {
            this.accountsEligibleForTransitioning = this.mapDropdownOptions(accounts[this.accountType]);
        }
    }

    protected get hasEligibleAccounts () : boolean {
        return this.accountsEligibleForTransitioning.length > 0;
    }

    protected mapDropdownOptions ( accounts : any[] ) : Array<{ value : string, label : string }> {
        return accounts.map( (account) => {
            return {
                value: account.displayContractId,
                label: account.displayContractId
            };
        } );
    }

    protected get defaultAccountAction () : string {
        return this.accountActions.convert;
    }

    protected updateAccountAction ( action : string ) : void {
        this.currentAction = action;

        if ( this.currentAction === this.accountActions.convert ) {
            this.setDebitCardMigrationBlock();
        } else {
            this.removeDebitCardMigrationBlock();
        }
    }

    protected get dropdownOptions () {
        return this.accountsEligibleForTransitioning;
    }

    protected get canTransitionAccount () : boolean {
        return true;
    }

    protected get hideNewOrConvertButtons () : boolean {
        return this.userHasLoggedIn && !this.canTransitionAccount;
    }

    protected setDebitCardMigrationBlock () : void {
        this.debitCardMigrationFormDef = this.applicantGeneratorService.getDebitCardMigrationBlockJSON();
        this.__loadNext( this.debitCardMigrationFormDef, this.viewContainerRef );
    }

    protected removeDebitCardMigrationBlock () : void {
        if ( this.debitCardMigrationFormDef ) {
            this.__removeNext( this.viewContainerRef );
            this.debitCardMigrationFormDef = null;
        }
    }

    private get hideBlock () : boolean {
        return this.userHasLoggedIn && !this.hasEligibleAccounts;
    }

    private fetchEligibleAccounts () {
        this.eligibleAccountsServiceSubscription = this.eligibleAccountsService.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    this.mapEligibleAccounts( response.payload );
                    if ( !this.canTransitionAccount || !this.hasEligibleAccounts ) {
                        this.newOrConvertControl.setValue( this.accountActions.new );
                    }
                    this._cd.markForCheck();
                    this.setAccountNumberDropdownDefaultValue();

                    if ( !this.hasEligibleAccounts ) {
                        this.__controlGroup.markAsTouched();
                    }
                },
                () => {});
    }

    private setAccountNumberDropdownDefaultValue () : void {
        setTimeout( () => {
            if ( this.accountsListCmp ) {
                const accountNumberControl = this.accountsListCmp.control;
                accountNumberControl.setValue( this.accountsEligibleForTransitioning[0].value );
            }
        } );
    }
}
