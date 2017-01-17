import { Directive } from '@angular/core';
import { AmpCurrencyPipe } from '../../../amp-pipes';
@Directive( {
    selector : '[amp-currency]',
    host     : {
        '(input)' : 'onInputChange($event)'
    }
} )
export class AmpCurrencyDirective {
    constructor ( private currencyPipe : AmpCurrencyPipe ) {

    }

    onInputChange ( $event ) {
        $event.target.value = this.currencyPipe.transform( this.currencyPipe.parseValue( $event.target.value ), 0, 3, '' );
    }
}
