import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    Subscription
} from 'rxjs';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
import {
    SharedFormDataService
} from '../../shared/shared-form-data.service';
import {
    Constants
} from '../../shared/constants';

export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    public description : string = null;
    public singleOrJointSubscription : Subscription;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  protected formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService,
                  protected sharedFormDataService : SharedFormDataService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public setDescription(singleOrJoint : string) {
        const mappedLabel = singleOrJoint === Constants.singleApplicant ? 'single' : 'joint';
        this.description = this.__custom['description_' + mappedLabel];
        this._cd.markForCheck();
    }

    public ngAfterViewInit() {
        const singleOrJointControl = this.sharedFormDataService.getSingleOrJointControl(this.__form);
        this.setDescription(singleOrJointControl.value);
        this.singleOrJointSubscription = singleOrJointControl.valueChanges.subscribe((val) => {
            this.setDescription(val);
        });
        super.ngAfterViewInit();
    }

    public ngOnDestroy() {
        this.singleOrJointSubscription.unsubscribe();
    }
}
