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
    private loadedDynamicBlock : string = '';
    private isExistingCustomer : boolean  = false;
    private userHasLoggedIn : boolean  = false;
    private accountsEligibleForTransitioning : {} = null;

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewContainerRef : ViewContainerRef,
                  private sharedFormDataService : SharedFormDataService,
                  private eligibleAccountsService : EligibleAccountsService,
                  private loginService : LoginStatusService,
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

        this.loginService.userHasLoggedIn()
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
            this.newOrExistingCustomerSubscription
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
            this.__loadNext( nextBlock, this.viewContainerRef );
        }
    }

    private get showBlock () : boolean {
        if ( this.isExistingCustomer ) {
            if ( this.userHasLoggedIn ) {
                return this.userHasEligibleAccounts;
            }
            return true;
        }
        return false;
    }

    private subscribeToBett3rChoice () {
        const betterChoiceControl     = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        if (this.__isRetrieved) {
            this.setNextBlock( betterChoiceControl.value );
        }
        if ( !this.betterChoiceSubscription ) {
            this.betterChoiceSubscription = betterChoiceControl.valueChanges.subscribe( ( val ) => {
                this.setNextBlock( val );
            } );
        }
    }

    private fetchEligibleAccounts () {
        this.eligibleAccountsService.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    this.accountsEligibleForTransitioning = response.payload;
                    this._cd.markForCheck();
                },
                () => {
                    // in the case of an error ie 404 or 500 don't do anything
                });
    }

    private get userHasEligibleAccounts () {
        if ( this.accountsEligibleForTransitioning ) {
            for ( const accountType of Object.keys( this.accountsEligibleForTransitioning ) ) {
                const accounts = this.accountsEligibleForTransitioning[accountType];
                if ( accounts.length > 0 ) {
                    return true;
                }
            }
        }

        return false;
    }
}
