import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
    FormBlock,
    ScrollService,
    SaveService,
    LoginStatusService
} from 'amp-ddc-components';
import {
    Constants,
    SharedFormDataService,
    EligibleAccountsService
} from '../../shared';
@Component( {
    selector        : 'better-choice-block',
    templateUrl     : './better-choice.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class BetterChoiceBlock extends FormBlock implements AfterViewInit, OnDestroy {
    private singleOrJointSubscription : Subscription;
    private betterChoiceSubscription : Subscription;
    private newOrExistingCustomerSubscription : Subscription;
    private eligibleAccountsServiceSubscription : Subscription;
    private loadedDynamicBlock : string = '';
    private isExistingCustomer : boolean  = false;
    private userHasLoggedIn : boolean  = false;
    private eligibleAccountsRequestFailed : boolean  = false;
    private accountsEligibleForTransitioning : {} = null;

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewContainerRef : ViewContainerRef,
                  private sharedFormDataService : SharedFormDataService,
                  private eligibleAccountsService : EligibleAccountsService,
                  private loginStatusService : LoginStatusService,
                  private route : ActivatedRoute,
                  saveService : SaveService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        const newOrExistingCustomerControl     =
                  this.sharedFormDataService.getNewOrExistingCustomerControl( this.__form );
        this.newOrExistingCustomerSubscription =
            newOrExistingCustomerControl
                .valueChanges
                .subscribe( ( newOrExisting ) => {
                    if ( newOrExisting === Constants.existingCustomer ) {
                        this.isExistingCustomer = true;
                        this._cd.markForCheck();
                        setTimeout( () => {
                            this.subscribeToBett3rChoice();
                        } );
                    }
                } );

        this.loginStatusService.userHasLoggedIn()
            .subscribe( () => {
                this.userHasLoggedIn = true;
                this.fetchEligibleAccounts();
            });

        this.__controlGroup.markAsTouched();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        let subscriptions = [
            this.singleOrJointSubscription,
            this.betterChoiceSubscription,
            this.newOrExistingCustomerSubscription,
            this.eligibleAccountsServiceSubscription
        ];

        for ( let subscription of subscriptions ) {
            if ( subscription ) {
                subscription.unsubscribe();
            }
        }
        super.ngOnDestroy();
    }

    public setNextBlock ( betterChoiceId : string ) {
        const nextBlock = this.__custom.optionalBlocks[ betterChoiceId ];
        if ( this.loadedDynamicBlock === betterChoiceId ) {
            return;
        }
        if ( !nextBlock && this.loadedDynamicBlock ) {
            this.__removeNext( this.viewContainerRef );
            this.loadedDynamicBlock = null;
            return;
        }
        if ( this.loadedDynamicBlock && betterChoiceId !== this.loadedDynamicBlock ) {
            this.__removeNext( this.viewContainerRef );
        }
        if ( nextBlock ) {
            this.loadedDynamicBlock = betterChoiceId;
            return this.__loadNext( nextBlock, this.viewContainerRef );
        }
    }

    private get hideBlock () : boolean {
        if ( this.isExistingCustomer ) {
            if ( this.userHasLoggedIn && !this.eligibleAccountsRequestFailed ) {
                return this.userHasNoEligibleAccountsOrOnlyDepositAccounts;
            }
            return false;
        }
        return true;
    }

    private subscribeToBett3rChoice () {
        if (this.__isRetrieved) {
            this.setNextBlock( this.betterChoiceControl.value );
        }
        if ( !this.betterChoiceSubscription ) {
            this.betterChoiceSubscription = this.betterChoiceControl.valueChanges
                .subscribe( ( val ) => {
                    this.setNextBlock( val );
                } );
        }
    }

    private fetchEligibleAccounts () {
        this.eligibleAccountsServiceSubscription = this.eligibleAccountsService.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    this.accountsEligibleForTransitioning = response.payload;
                    this.setDefaultAccountToTransition();
                    this._cd.markForCheck();
                },
                () => {
                    this.eligibleAccountsRequestFailed = true;
                });
    }

    private setDefaultAccountToTransition () {
        if ( this.userHasNoEligibleAccountsOrOnlyDepositAccounts ) {
            this.betterChoiceControl.setValue( this.getBlockForAccountType('deposit') );
        }
    }

    private get betterChoiceControl () {
        return this.__controlGroup.get( this.__custom.controls[ 0 ].id );
    }

    private get userHasEligibleAccounts () : boolean {
        return this.accountsEligibleForTransitioning && (this.hasDepositAccount || this.hasOffsetOrLoanAccount);
    }

    private get userHasNoEligibleAccountsOrOnlyDepositAccounts () : boolean {
        return !this.userHasEligibleAccounts || this.hasOnlyDepositAccount;
    }

    private getBlockForAccountType ( accountType : string ) : string {
        return this.__custom.account_types_block_mapping[accountType];
    }

    private get hasDepositAccount () : boolean {
        return this.hasAccount('deposit');
    }

    private get hasOffsetOrLoanAccount () : boolean {
        return this.hasAccount('offset') || this.hasAccount('loan');
    }

    private get hasBothDepositAndOffsetLoanAccount () : boolean {
        return this.hasDepositAccount && this.hasOffsetOrLoanAccount;
    }

    private get hasOnlyDepositAccount () : boolean {
        return this.hasDepositAccount && !this.hasOffsetOrLoanAccount;
    }

    private get hasOnlyOffsetOrLoanAccount () : boolean {
        return this.hasOffsetOrLoanAccount && !this.hasDepositAccount;
    }

    private hasAccount ( accountType : string ) : boolean {
        const accounts = this.accountsEligibleForTransitioning[accountType];
        return accounts.length > 0;
    }
}
