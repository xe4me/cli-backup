import {
    Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy , Input ,
    AfterViewInit
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
@Component( {
    selector        : 'deposit-transition-block' ,
    templateUrl     : './deposit-transition.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class DepositTransitionBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}