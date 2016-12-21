import {
    ChangeDetectorRef,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService
} from 'amp-ddc-components';
import { SharedFormDataService } from '../../shared/shared-form-data.service';
export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    public description : string = null;
    //public singleOrJointSubscription : Subscription;

    constructor ( formModelService : FormModelService,
                  elementRef : ElementRef,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  progressObserver : ProgressObserverService,
                  protected sharedFormDataService : SharedFormDataService ) {
        super( formModelService, elementRef, _cd, progressObserver, scrollService );
    }

    public ngAfterViewInit () {
        this.description = this.__custom[ 'description' ];
        this._cd.markForCheck();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        super.ngOnDestroy();
    }
}
