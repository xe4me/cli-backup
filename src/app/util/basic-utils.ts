import { AmpCurrencyPipe } from 'amp-ddc-ui-core/ui-core';

export class BasicUtils  {

  public static formatCurrency ( amount : any ) : string {

   let currencyPipe : AmpCurrencyPipe = new AmpCurrencyPipe();

    if ( !(typeof amount === 'string' || amount instanceof String) ) {
      amount = amount.toString();
    }
    return currencyPipe.transform(amount.toString(), 2, 3);
  }

  public static formatStringToNumber ( str ) : number {
    if (str && str.indexOf(',') > -1) { //check if we have a comma, then remove it
      str = str.replace(/,/g , '');
    }

    if ( isNaN(str) || str === '' ) { //check for empty or NAN, return 0
      return 0;
    }
    return +str;
  }
}
