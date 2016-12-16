import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    AfterViewInit,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import {
    ActivatedRoute
} from '@angular/router';
import {
    Subscription
} from 'rxjs';
import {
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService,
    FormService,
    clone
} from 'amp-ddc-components';
import {
    SharedFormDataService
} from '../../shared/shared-form-data.service';
import {
    Constants
} from '../../shared/constants';
@Component({
    selector: 'better-choice-block',
    templateUrl: './better-choice.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetterChoiceBlock extends FormBlock implements OnInit, AfterViewInit, OnDestroy {
    private singleOrJointSubscription : Subscription;
    private betterChoiceSubscription : Subscription;
    private newOrExistingCustomerSubscription : Subscription;
    private loadedDynamicBlock : string = '';
    private existingCustomer : boolean = false;

     constructor (
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  private viewContainerRef : ViewContainerRef ,
                  progressObserver : ProgressObserverService ,
                  private sharedFormDataService : SharedFormDataService ,
                  private route : ActivatedRoute ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public setNextBlock ( betterChoiceId : string ) {
        const nextBlock = this.__custom.optionalBlocks[ betterChoiceId ];
        if ( this.loadedDynamicBlock === betterChoiceId ) {
            return;
        }
        if ( ! nextBlock && this.loadedDynamicBlock ) {
            this.__removeNext( this.viewContainerRef );
            this.loadedDynamicBlock = null;
            return;
        }
        if ( this.loadedDynamicBlock && betterChoiceId !== this.loadedDynamicBlock ) {
            this.__removeNext( this.viewContainerRef );
        }
        if ( nextBlock ) {
            this.loadedDynamicBlock = betterChoiceId;
            this.__loadNext( nextBlock , this.viewContainerRef );
        }
    }

    public ngOnInit () {

    }

    public subscribeToBett3rChoice() {
        if (!this.betterChoiceSubscription) {
            const betterChoiceControl = this.__controlGroup.get(this.__custom.controls[0].id);
            this.betterChoiceSubscription = betterChoiceControl.valueChanges.subscribe((val) => {
                this.setNextBlock(val);
            });
        }
    }

    public ngAfterViewInit () {
        const newOrExistingCustomerControl =
                this.sharedFormDataService.getNewOrExistingCustomerControl(this.__form);
        this.newOrExistingCustomerSubscription =
                newOrExistingCustomerControl
                    .valueChanges
                    .subscribe((newOrExisting) => {
                        if (newOrExisting === Constants.existingCustomer) {
                            this.existingCustomer = true;
                            this._cd.markForCheck();
                            setTimeout(() => {
                                this.subscribeToBett3rChoice();
                            });
                        }
                    });
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        let subscriptions = [this.singleOrJointSubscription,
                             this.betterChoiceSubscription,
                             this.newOrExistingCustomerSubscription];
        for (let subscription of subscriptions) {
            if (subscription) {
                subscription.unsubscribe();
            }
        }
        super.ngOnDestroy();
    }
}
