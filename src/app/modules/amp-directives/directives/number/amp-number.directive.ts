import {
         Directive ,
         Input } from '@angular/core';
import { Control } from '@angular/common';

@Directive( {
    selector : '[amp-number-only]',
    host: {
        '(input)' : 'onInputChange()'
    }
} )

export class AmpNumberDirective {
    @Input('amp-number-only') inputControl : Control;

    onInputChange () {
        let newValue = this.inputControl.value.replace( /\D/g, '' );
        this.inputControl.updateValue( newValue );
    }
}
