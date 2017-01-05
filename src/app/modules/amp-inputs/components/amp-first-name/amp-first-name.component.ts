import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';
import {
    ChangeDetectorRef,
    ElementRef,
    Renderer,
    ViewChild
} from '@angular/core';
@AmpComponent( {
    selector : 'amp-first-name'
} )
export class AmpFirstNameComponent extends AmpInputComponent {
    @ViewChild( 'input' ) inputCmp;
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.pattern = '^[A-Za-z][A-Z|a-z|\'| |-]*[a-z]$FLAGS:g';
        this.maxLength = 30;
        this.required  = true;
        this.label     = 'First name';
        this.errors    = {
            required : 'First name is a required field.'
        };
    }
}
