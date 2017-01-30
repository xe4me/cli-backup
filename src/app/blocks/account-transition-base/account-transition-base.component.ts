import {
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
    FormBlock,
    ScrollService,
    SaveService,
    AmpDropdownComponent
} from 'amp-ddc-components';
import {
    EligibleAccountsService,
    LoginStatusService
} from '../../shared';

export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    protected accountType : string;
    protected accountActions = {
        new: 'new',
        convert: 'convert'
    };
    protected currentAction : string;
    protected accountsEligibleForTransitioning : Array<{ value : string, label : string }> = [];

    @ViewChild ('accountsListCmp') private accountsListCmp : AmpDropdownComponent;
    private description : string = null;
    private betterChoiceSubscription : Subscription;
    private eligibleAccountsServiceSubscription : Subscription;

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
        const newOrConvertControl     = this.__controlGroup.get( this.__custom.controls[ 0 ].id );

        this.betterChoiceSubscription = newOrConvertControl.valueChanges
            .subscribe( ( action ) => {
                this.updateAccountAction( action );
                this._cd.markForCheck();
                this.setAccountNumberDropdownDefaultValue();
            } );

        if ( this.__isRetrieved ) {
            this.updateAccountAction(newOrConvertControl.value);
            this.__controlGroup.markAsTouched();
            this.isActive = true;
        } else {
            newOrConvertControl.setValue( this.defaultAccountAction );
        }

        this.loginStatusService.userHasLoggedIn()
            .subscribe( () => {
                this.fetchEligibleAccounts();
            });

        this._cd.markForCheck();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        this.betterChoiceSubscription.unsubscribe();
        this.eligibleAccountsServiceSubscription.unsubscribe();
        super.ngOnDestroy();
    }

    protected get showAccountNumber () : boolean {
        return this.currentAction === this.accountActions.convert;
    }

    protected get additionalDescription () : string {
        return this.__custom[ 'additional_instruction' ];
    }

    protected mapEligibleAccounts ( accounts : any[] ) : void {
        if (accounts[this.accountType]) {
            this.accountsEligibleForTransitioning = this.mapDropdownOptions(accounts[this.accountType]);
        }
    }

    protected get hasAccounts () : boolean {
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
    }

    protected get dropdownOptions () {
        return this.accountsEligibleForTransitioning;
    }

    protected get hideNewOrConvertButtons () : boolean {
        return false;
    }

    private fetchEligibleAccounts () {
        this.eligibleAccountsServiceSubscription = this.eligibleAccountsService.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    this.mapEligibleAccounts( response.payload );
                    this._cd.markForCheck();
                    this.setAccountNumberDropdownDefaultValue();
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
