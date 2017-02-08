import {
    ChangeDetectorRef,
    ElementRef,
    Renderer
} from '@angular/core';
import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';

@AmpComponent( {
    selector : 'amp-account-number'
} )
export class AmpAccountNumberComponent extends AmpInputComponent {
    constructor ( _cd : ChangeDetectorRef,
                  _el : ElementRef,
                  _renderer : Renderer ) {
        super( _cd, _el, _renderer );
        this.maxLength = 12;
        this.pattern   = '^[0-9]{3,12}$';
        this.required  = true;
        this.label     = 'Account number';
        this.errors    = {
            required : 'Account number is a required field.',
            pattern  : 'Your account number is made up of 3 to 12 digits. It has no letters or spaces'
        };
    }
}
