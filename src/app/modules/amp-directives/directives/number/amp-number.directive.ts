import { Directive } from '@angular/core';
@Directive( {
    selector : '[amp-number-only]',
    host : {
        '(input)' : 'onInputChange($event)'
    }
} )
export class AmpNumberDirective {
    onInputChange( $event ) {
        $event.target.value = $event.target.value.replace( /\D/g, '' );
    }
}
