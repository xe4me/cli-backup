import { AmpComponent } from '../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';
import { ChangeDetectorRef , ElementRef , Renderer } from '@angular/core';
@AmpComponent( {
    selector : 'amp-contact-number'
} )
export class AmpContactNumberComponent extends AmpInputComponent {
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.pattern   = '^([\\s()+-]*\\d){8,}$';
        this.maxLength = 20;
        this.required  = true;
        this.label     = 'Contact number';
        this.errors    = {
            required : 'Contact number is a required field.' ,
            pattern  : 'The contact number must contain a minimum of 8 characters. Only numeric and area code' +
            ' characters are allowed.'
        };
    }
}
