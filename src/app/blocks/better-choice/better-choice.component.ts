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
    private loadedDynamicBlock : string = '';
    private existingCustomer : boolean = false;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  private viewContainerRef : ViewContainerRef ,
                  progressObserver : ProgressObserverService ,
                  private sharedFormDataService : SharedFormDataService ,
                  private route : ActivatedRoute ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public setButtonLabels ( singleOrJoint : string ) {
        const mappedLabel = singleOrJoint === Constants.singleApplicant ? 'single' : 'joint';
        for ( const button of this.__custom.controls[ 0 ].buttons ) {
            button.label = button[ 'label_' + mappedLabel ];
        }
        this.__custom.controls[ 0 ].buttons = clone( this.__custom.controls[ 0 ].buttons );
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
        this.setButtonLabels( 'single' );
        this.route.queryParams
            .map( ( params ) => {
                return params[ 'existingCustomer' ];
            } )
            .subscribe( ( existingCustomer ) => {
                this.existingCustomer = existingCustomer === 'true';
            } );
    }

    public ngAfterViewInit () {
        if ( this.existingCustomer ) {
            const betterChoiceControl = this.__controlGroup.get(this.__custom.controls[0].id);
            const singleOrJointControl = this.sharedFormDataService.getSingleOrJointControl(this.__form);

            this.betterChoiceSubscription = betterChoiceControl.valueChanges.subscribe((val) => {
                this.setNextBlock(val);
            });

            this.singleOrJointSubscription = singleOrJointControl.valueChanges.subscribe((val) => {
                this.setButtonLabels(val);
                this._cd.markForCheck();
            });
        }
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        if ( this.existingCustomer ) {
            this.singleOrJointSubscription.unsubscribe();
            this.betterChoiceSubscription.unsubscribe();
        }
    }
}
