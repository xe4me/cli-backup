import { ChangeDetectorRef , ElementRef , AfterViewInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
import { SharedFormDataService } from '../../shared/shared-form-data.service';
import { Constants } from '../../shared';
export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    private description : string = null;
    private accountType : string;
    private betterChoiceSubscription : Subscription;
    private isNewDepositAccount : boolean = false;
    private additionalDescription : string;

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
        this.accountType = this.__custom[ 'type' ];
        const newOrConvertControl = this.__controlGroup.get(this.__custom.controls[0].id);
        this.betterChoiceSubscription = newOrConvertControl.valueChanges.subscribe((val) => {
            if (this.accountType === 'loanOffset') {
                this.isNewDepositAccount = true;
                this.additionalDescription = this.__custom[ `additional_${val}_instruction` ]
            } else {
                this.isNewDepositAccount = val === 'convert';
                this.additionalDescription = this.__custom[ 'additional_instruction']
            }
        });
        this._cd.markForCheck();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        this.betterChoiceSubscription.unsubscribe();
        super.ngOnDestroy();
    }
}
