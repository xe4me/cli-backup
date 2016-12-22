import { ChangeDetectorRef , ElementRef , AfterViewInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
import { SharedFormDataService } from '../../shared/shared-form-data.service';
import { Constants } from '../../shared';
export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    public description : string = null;
    private betterChoiceSubscription : Subscription;
    public isNewAccount : boolean;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ,
                  protected sharedFormDataService : SharedFormDataService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngAfterViewInit () {
        this.description  = this.__custom[ 'description'];
        const newOrConvertControl = this.__controlGroup.get(this.__custom.controls[0].id);
        this.betterChoiceSubscription = newOrConvertControl.valueChanges.subscribe((val) => {
            this.isNewAccount = val === 'convert';
        });
        this._cd.markForCheck();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        super.ngOnDestroy();
    }
}
