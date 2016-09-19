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
    selector    : 'practice-principal-block' ,
    templateUrl : './practice-principal.component.html' ,
    styles      : [ require( './practice-principal.component.scss' ) ]
} )
export class PracticePrincipalBlockComponent extends FormBlock {
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
