import {
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy,
    ViewChild
} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
    FormBlock,
    ScrollService,
    SaveService,
    AmpDropdownComponent,
    LoginStatusService
} from 'amp-ddc-components';
import {
    EligibleAccountsService
} from '../../shared';

export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    protected accountType : string;
    protected accountActions = {
        new: 'new',
        convert: 'convert'
    };
    protected currentAction : string;
    protected newOrConvertControl : AbstractControl;
    protected accountsEligibleForTransitioning : Array<{ value : string, label : string }> = [];

    @ViewChild ('accountsListCmp') private accountsListCmp : AmpDropdownComponent;
    private description : string = null;
    private userHasLoggedIn : boolean  = false;
    private newOrConvertControlSubscription : Subscription;
    private eligibleAccountsServiceSubscription : Subscription;
    private isAccountNumberDropDownOrInputReady : boolean = false;
    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private loginStatusService : LoginStatusService,
                  private eligibleAccountsService : EligibleAccountsService ) {
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
            this.updateAccountAction(this.newOrConvertControl.value);
            this.newOrConvertControl.setValue(this.newOrConvertControl.value);
            let accountNumberControl = this.__controlGroup.get( this.__custom.controls[ 1 ].id);
            if ( accountNumberControl && accountNumberControl.get('Query') && accountNumberControl.get('SelectedItem') ) {
                this.__controlGroup.setControl('AccountNumber', new FormControl(accountNumberControl.get('SelectedItem').value));
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
        if ( this.__isRetrieved ) {
            return '';
        }
        return this.accountActions.convert;
    }

    protected updateAccountAction ( action : string ) : void {
        this.currentAction = action;
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
