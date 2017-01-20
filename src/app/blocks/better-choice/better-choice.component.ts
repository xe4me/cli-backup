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
import { SharedFormDataService } from '../../shared/shared-form-data.service';
import { Constants } from '../../shared/constants';
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
    private existingCustomer : boolean  = false;

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewContainerRef : ViewContainerRef,
                  private sharedFormDataService : SharedFormDataService,
                  private route : ActivatedRoute,
                  saveService : SaveService ) {
        super( saveService, _cd, scrollService );
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

    public subscribeToBett3rChoice () {
        const betterChoiceControl     = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        if (this.__isRetrieved) {
            this.setNextBlock( betterChoiceControl.value );
        } else {
            if ( !this.betterChoiceSubscription ) {
                this.betterChoiceSubscription = betterChoiceControl.valueChanges.subscribe( ( val ) => {
                    this.setNextBlock( val );
                } );
            }

        }
    }

    public ngAfterViewInit () {
        const newOrExistingCustomerControl     =
                  this.sharedFormDataService.getNewOrExistingCustomerControl( this.__form );
        this.newOrExistingCustomerSubscription =
            newOrExistingCustomerControl
                .valueChanges
                .subscribe( ( newOrExisting ) => {
                    if ( newOrExisting === Constants.existingCustomer ) {
                        this.existingCustomer = true;
                        this._cd.markForCheck();
                        setTimeout( () => {
                            this.subscribeToBett3rChoice();
                        } );
                    }
                } );
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
}
