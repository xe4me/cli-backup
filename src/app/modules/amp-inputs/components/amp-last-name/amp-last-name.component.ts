import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';
import {
    ChangeDetectorRef,
    ElementRef,
    Renderer
} from '@angular/core';
@AmpComponent( {
    selector : 'amp-last-name'
} )
export class AmpLastNameComponent extends AmpInputComponent {
    constructor ( _cd : ChangeDetectorRef,
                  _el : ElementRef,
                  _renderer : Renderer ) {
        super( _cd, _el, _renderer );
        this.pattern   = '^[A-Za-z][A-Z|a-z|\'| |-]*[a-z]$FLAGS:g';
        this.maxLength = 20;
        this.required  = true;
        this.label     = 'Last name';
        this.errors    = {
            required : 'Last name is a required field.'
        };
    }
}
