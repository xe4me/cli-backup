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
    SaveService
} from 'amp-ddc-components';
import {
    Constants,
    SharedFormDataService,
    EligibleAccountsService,
    LoginStatusService
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
    private hasEligibleDepositAccount : boolean  = false;
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

    private get showBlock () : boolean {
        if ( this.isExistingCustomer ) {
            if ( this.userHasLoggedIn && !this.eligibleAccountsRequestFailed ) {
                return this.userHasEligibleAccounts;
            }
            return true;
        }
        return false;
    }

    private subscribeToBett3rChoice () {
        if (this.__isRetrieved) {
            this.setNextBlock( this.betterChoiceControl.value );
        }
        if ( !this.betterChoiceSubscription ) {
            this.betterChoiceSubscription = this.betterChoiceControl.valueChanges.subscribe( ( val ) => {
                this.setNextBlock( val ).then(() => {
                    if ( this.userHasEligibleAccounts && !this.hasBothDepositAndOffsetLoanAccount) {
                        this.__removeAt(this.__getIndex(this.viewContainerRef));
                    }
                });
            } );
        }
    }

    private fetchEligibleAccounts () {
        this.eligibleAccountsServiceSubscription = this.eligibleAccountsService.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    this.accountsEligibleForTransitioning = response.payload;
                    this.displayAccountToTransition();
                    this._cd.markForCheck();
                },
                () => {
                    this.eligibleAccountsRequestFailed = true;
                });
    }

    private displayAccountToTransition () {
        if ( this.userHasEligibleAccounts ) {
            if ( this.hasOnlyDepositAccount ) {
                this.betterChoiceControl.setValue( this.getBlockForAccountType('deposit') );
            } else if ( this.hasOnlyOffsetOrLoanAccount ) {
                this.betterChoiceControl.setValue( this.getBlockForAccountType('offset') );
            }
        }
    }

    private get betterChoiceControl () {
        return this.__controlGroup.get( this.__custom.controls[ 0 ].id );
    }

    private get userHasEligibleAccounts () : boolean {
        return this.hasDepositAccount || this.hasOffsetOrLoanAccount;
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
