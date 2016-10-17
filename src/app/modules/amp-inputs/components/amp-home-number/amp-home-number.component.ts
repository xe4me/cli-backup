import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';
import { ChangeDetectorRef , ElementRef , Renderer , ViewChild } from '@angular/core';
@AmpComponent( {
    selector : 'amp-home-number'
} )
export class AmpHomeNumberComponent extends AmpInputComponent {
    @ViewChild( 'input' ) inputCmp;
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.pattern   = '^([\\s()+-]*\\d){8,}$';
        this.maxLength = 20;
        this.required  = true;
        this.label     = 'Home number';
        this.errors    = {
            required : 'Home number is a required field.' ,
            pattern  : 'The home number must contain a minimum of 8 characters. Only numeric and area code characters are allowed.'
        };
    }
}
