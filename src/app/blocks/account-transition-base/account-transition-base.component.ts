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

    @ViewChild ('accountsListCmp') private accountsListCmp : AmpDropdownComponent;
    private description : string = null;
    private betterChoiceSubscription : Subscription;
    private eligibleAccountsServiceSubscription : Subscription;
    private showAccountNumber : boolean = true;
    private additionalDescription : string;
    private accountsEligibleForTransitioning : Array<{ value : string, label : string }> = [];

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
            .subscribe( ( val ) => {
                this.checkoutAccountType(val);
                this._cd.markForCheck();
                this.setAccountNumberDropdownDefaultValue();

            } );

        if ( this.__isRetrieved ) {
            this.checkoutAccountType(newOrConvertControl.value);
            this.__controlGroup.markAsTouched();
            this.isActive = true;
        } else {
            newOrConvertControl.setValue(this.defaultAccountAction);
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

    protected shouldShowAccountNumber ( action : string ) : boolean {
        return action === 'convert';
    }

    protected additionalInstructionsText ( action : string ) : string {
        return this.__custom[ 'additional_instruction' ];
    }

    protected mapEligibleAccounts ( accounts : any[] ) : Array<{ value : string, label : string }> {
        if (accounts[this.accountType]) {
            return accounts[this.accountType].map( (account) => {
                return {
                    value: account.displayContractId,
                    label: account.displayContractId
                };
            } );
        }
        return [];
    }

    protected get hasAccounts () : boolean {
        return this.accountsEligibleForTransitioning.length > 0;
    }

    protected get defaultAccountAction () : string {
        return this.accountActions.convert;
    }

    private fetchEligibleAccounts () {
        this.eligibleAccountsServiceSubscription = this.eligibleAccountsService.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    this.accountsEligibleForTransitioning = this.mapEligibleAccounts(response.payload);
                    this._cd.markForCheck();
                    this.setAccountNumberDropdownDefaultValue();
                },
                () => {});
    }

    private checkoutAccountType ( val : string ) : void {
        this.showAccountNumber = this.shouldShowAccountNumber(val);
        this.additionalDescription = this.additionalInstructionsText(val);
    }

    private setAccountNumberDropdownDefaultValue () : void {
        setTimeout( () => {
            if ( this.accountsListCmp ) {
                const accountNumberControl = this.accountsListCmp.control;
                accountNumberControl.setValue(this.accountsEligibleForTransitioning[0].value);
            }
        } );
    }
}
