import { AmpCurrencyPipe } from '../amp-pipes/pipes/currency/amp-currency.pipe';
export class BasicUtils {
    public static formatCurrency ( amount : any ) : string {
        let currencyPipe : AmpCurrencyPipe = new AmpCurrencyPipe();
        if ( (typeof amount !== 'string') ) {
            amount = amount.toString();
        }
        return currencyPipe.transform( amount , 2 , 3 );
    }

    public static formatStringToNumber ( str : any ) : number {
        if ( str && str.indexOf( ',' ) > - 1 ) { // check if we have a comma, then remove it
            str = str.replace( /,/g , '' );
        }
        if ( isNaN( str ) || str === '' ) { // check for empty or NAN, return 0
            return 0;
        }
        return + str;
    }
}
