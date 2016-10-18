import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit
} from '@angular/core';
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
    AccountTransitionBaseBlock
} from '../account-transition-base/account-transition-base.component';
@Component( {
    selector        : 'offset-transition-block' ,
    templateUrl     : '../account-transition-base/account-transition-base.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class DepositTransitionBlock extends AccountTransitionBaseBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService,
                  sharedFormDataService : SharedFormDataService ) {
        super( formModelService , elementRef , formService, _cd ,  scrollService,
                progressObserver, sharedFormDataService);
    }
}