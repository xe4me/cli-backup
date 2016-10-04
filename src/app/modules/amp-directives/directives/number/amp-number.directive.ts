import {
         Directive ,
         Input } from '@angular/core';
import { Control } from "@angular/common";

@Directive( {
    selector : '[amp-number]',
    host: {
        '(keyup)' : 'onInputChange()'
    }
} )

export class AmpNumberDirective {
    @Input('amp-number') inputControl : Control;

    onInputChange () {
        let newValue = this.inputControl.value.replace(/\D/g,'');
        this.inputControl.updateValue(newValue);
    }
}
