import {
    Component ,
    ChangeDetectorRef ,
    ElementRef
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from "amp-ddc-components";
@Component( {
    selector    : 'practice-type-block' ,
    templateUrl : './practice-type.component.html' ,
    styles      : [ require( './practice-type.component.scss' ) ]
} )
export class PracticeTypeBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    context () {
        return this;
    }
}
