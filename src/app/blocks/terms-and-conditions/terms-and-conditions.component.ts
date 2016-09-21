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
    selector        : 'terms-and-conditions' ,
    templateUrl     : './terms-and-conditions.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class TermsAndConditionsBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private acceptTandC() {
        this.__controlGroup.get(this.__custom.controls[0].id).setValue(true);
    }
}
