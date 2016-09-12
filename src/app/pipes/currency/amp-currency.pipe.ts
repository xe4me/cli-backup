import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ampCurrency' })
export class AmpCurrencyPipe implements PipeTransform {
    public static currencySymbol = '$';

    /*
    * @param float   inNumber:        number to be formatted
    * @param integer inDecimals:      length of decimal places
    * @param integer inIntegerGroups: number of digits to group in integer part
    */
    transform(inNumber: any, inDecimals?: number, inIntegerGroups?: number, inCurrencySymbol?: string): string {
        const decimals = inDecimals || 0;
        const integerGroups = inIntegerGroups || 3;
        const aNumber = (typeof(inNumber) === 'string') ? this.parseValue(inNumber) : inNumber;
        const currencySymbol = (typeof(inCurrencySymbol) === 'undefined') ? AmpCurrencyPipe.currencySymbol : inCurrencySymbol;

        var re = '\\d(?=(\\d{' + (integerGroups || 3) + '})+' + (decimals > 0 ? '\\.' : '$') + ')';

        if (isNaN(aNumber) || inNumber === null || inNumber === '') {
            return '';
        } else {
            return currencySymbol + aNumber.toFixed(Math.max(0, ~~decimals)).replace(new RegExp(re, 'g'), '$&,');
        }
    }

    public parseValue(value): number {
        return value ? parseFloat(value.replace(/[,\$]/g, '')) : value;
    }

}
