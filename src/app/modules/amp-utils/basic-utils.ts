import { AmpCurrencyPipe } from '../amp-pipes/pipes/currency/amp-currency.pipe';
import { AddressFormatTypes } from '../amp-qas-address/services/amp-qas-address.service';
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

    public static formatAddress ( addressObj : any , addressType = AddressFormatTypes.CRM ) : string {
        let address = '';
        if ( addressType === AddressFormatTypes.CRM ) {
            if ( addressObj.address ) {
                address += addressObj.address;
            }
            if ( addressObj.suburb ) {
                address += ', ' + addressObj.suburb;
            }
            if ( addressObj.city ) {
                address += ', ' + addressObj.city;
            }
            if ( addressObj.state ) {
                address += ' ' + addressObj.state;
            }
            if ( addressObj.postCode ) {
                address += ' ' + addressObj.postCode;
            }
            if ( addressObj.country ) {
                address += ', ' + addressObj.country;
            }
        }
        if ( addressType === AddressFormatTypes.BANK ) {
            if ( addressObj.buildingName ) {
                address += addressObj.buildingName;
            }
            if ( addressObj.unitNumber ) {
                address += addressObj.unitNumber;
            }
            if ( addressObj.streetNumber ) {
                address += addressObj.streetNumber;
            }
            if ( addressObj.streetName ) {
                address += addressObj.streetName;
            }
            if ( addressObj.streetType ) {
                address += addressObj.streetType;
            }
            if ( addressObj.poBox ) {
                address += addressObj.poBox;
            }
            if ( addressObj.suburb ) {
                address += ', ' + addressObj.suburb;
            }
            if ( addressObj.state ) {
                address += ' ' + addressObj.state;
            }
            if ( addressObj.postCode ) {
                address += ' ' + addressObj.postCode;
            }
            address += ', Australia.';
        }
        return addressObj.address ? address : '';
    }
}
