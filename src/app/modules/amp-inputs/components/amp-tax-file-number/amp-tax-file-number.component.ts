import {
    ChangeDetectorRef,
    ElementRef,
    Renderer
} from '@angular/core';
import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';

@AmpComponent( {
    selector : 'amp-tax-file-number'
} )

export class AmpTaxFileNumberComponent extends AmpInputComponent {
    private weights = [ 1, 4, 3, 7, 5, 8, 6, 9, 10 ];

    constructor ( _cd : ChangeDetectorRef,
                  _el : ElementRef,
                  _renderer : Renderer ) {
        super( _cd, _el, _renderer );
        this.pattern   = '^\\d{9}$';
        this.maxLength = 9;
        this.required  = true;
        this.label     = 'Tax file number';
        this.errors    = {
            required             : 'Tax file number is a required field.',
            pattern              : 'Tax file number must contain exactly 9 characters. Only numeric characters are allowed.',
            checkDigitValidation : 'You have entered an invalid tax file number.'
        };
    }

    public customValidator = () : any => {
        return ( c ) => {
            if ( c.value && c.value.length === this.maxLength ) {
                return this.isDigitValidationOk( c.value ) ? null : { checkDigitValidation : { text : this.errors.checkDigitValidation } };
            }
            return null;
        };
    }

    protected onInput ( $event ) {
        $event.target.value = $event.target.value.replace( /\D/g, '' );
        super.onInput($event);
    }

    private isDigitValidationOk ( tfn ) {
        const digits    = tfn.split( '' );
        let sum         = ( digits[ 0 ] * this.weights[ 0 ] )
            + ( digits[ 1 ] * this.weights[ 1 ] )
            + ( digits[ 2 ] * this.weights[ 2 ] )
            + ( digits[ 3 ] * this.weights[ 3 ] )
            + ( digits[ 4 ] * this.weights[ 4 ] )
            + ( digits[ 5 ] * this.weights[ 5 ] )
            + ( digits[ 6 ] * this.weights[ 6 ] )
            + ( digits[ 7 ] * this.weights[ 7 ] )
            + ( digits[ 8 ] * this.weights[ 8 ] );
        const remainder = sum % 11;
        return remainder === 0;
    }
}
