import {
    Component ,
    EventEmitter ,
    Directive ,
    Renderer ,
    ElementRef ,
    forwardRef ,
    Provider
} from 'angular2/core';
import { Control } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from 'angular2/src/common/forms/directives';
import { NG_VALUE_ACCESSOR , ControlValueAccessor } from 'angular2/common';
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/constants";
import { ScrollService } from "amp-ddc-ui-core/ui-core";
@Component( {
    selector : 'amp-radio-button' ,
    template : `
                
                ` ,
    inputs   : [] ,
    styles   : [ require( './amp-radio-button.scss' ).toString() ]
} )
export class AmpRadioButtonComponent {
}


