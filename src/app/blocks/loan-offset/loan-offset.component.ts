import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
import { SharedFormDataService } from '../../shared/shared-form-data.service';
import { AccountTransitionBaseBlock } from '../account-transition-base/account-transition-base.component';
@Component( {
    selector        : 'loan-offset-block' ,
    templateUrl     : '../account-transition-base/account-transition-base.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class LoanOffsetBlock extends AccountTransitionBaseBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ,
                  sharedFormDataService : SharedFormDataService ) {
        super( formModelService , elementRef , _cd , scrollService ,
            progressObserver , sharedFormDataService );
    }
}
