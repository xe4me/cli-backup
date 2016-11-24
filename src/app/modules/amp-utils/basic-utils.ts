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

    public static formatAddress ( addressObj : any , addressType = 'normal' ) : string {
        let address = '';
        if ( addressType === 'normal' ) {
            if ( addressObj.address ) {
                address += addressObj.address;
            }
            if ( addressObj.suburb ) {
                address += ', ' + addressObj.suburb;
            }
            if ( addressObj.city ) {
                address += ', ' + addressObj.city;
            }
            if ( addressObj.stateDropdown && addressObj.stateDropdown.Query ) {
                address += ' ' + addressObj.stateDropdown.Query;
            }
            if ( addressObj.postCode ) {
                address += ' ' + addressObj.postCode;
            }
            if ( addressObj.countryDropdown && addressObj.countryDropdown.Query ) {
                address += ', ' + addressObj.countryDropdown.Query;
            }
        }
        if ( addressType === 'extended' ) {
            if ( addressObj.buildingName ) {
                address += addressObj.buildingName + ', ';
            }
            if ( addressObj.unitNumber ) {
                address += ' ' + addressObj.unitNumber;
            }
            if ( addressObj.streetNumber ) {
                address += ' ' + addressObj.streetNumber;
            }
            if ( addressObj.streetName ) {
                address += ' ' + addressObj.streetName;
            }
            if ( addressObj.streetTypeDropdown && addressObj.streetTypeDropdown.Query ) {
                address += ' ' + addressObj.streetTypeDropdown.Query;
            }
            if ( addressObj.poBox ) {
                address += addressObj.poBox;
            }
            if ( addressObj.suburb ) {
                address += ', ' + addressObj.suburb;
            }
            if ( addressObj.stateDropdown && addressObj.stateDropdown.Query ) {
                address += ' ' + addressObj.stateDropdown.Query;
            }
            if ( addressObj.postCode ) {
                address += ' ' + addressObj.postCode;
            }
            address += ', Australia';
            return address;
        }
        return addressObj.address ? address : '';
    }

    public static base64DatatoObject ( encodedString : string ,
                                       order : string[] = [ 'name' , 'email' , 'state' , 'customer_id' ] ,
                                       seperator : string = '#' ) : any {
        let obj           = {};
        let decodedString = '';
        let items         = [];

        // Return empty object if cannot decode string
        try {
            decodedString = atob( encodedString );
            items = decodedString.split( seperator );
        } catch (err) {
            return obj;
        }

        // Return empty objecy if decoded string doesn't contain enough values
        if ( decodedString.split(seperator).length < order.length ) {
            return obj;
        }

        for ( let i = 0 ; i < order.length ; i ++ ) {
            if ( ! obj.hasOwnProperty( order[ i ] ) ) {
                obj[ order[ i ] ] = items[ i ];
            }
        }

        return obj;
    }
}
