import { Injectable } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs';
export interface AddressFormats {
    Siebel : {
        Locality : string;
        StateCode : string;
        Postcode : number;
        Country : string;
        DPIDDID : number;
        AUSBAR : number
    };
    Bank : {
        AllPostalDeliveryTypes : string;
        BuildingLevel : string;
        FlatUnit : string;
        BuildingNumber : number;
        BuildingName : string;
        StreetName : string;
        StreetType : string;
        Locality : string;
        StateCode : string;
        Postcode : number;
        Country : string;
        DPIDDID : number;
        AUSBAR : number
    };
}
@Injectable()
export class AmpQasAddressService {
    //public static QAS_FORMATTER_URL = 'http://localhost:8082/ddc/public/api/qas/doGetAddress';
    public static QAS_QUERY_URL     = 'http://localhost:8082/ddc/public/api/qas/doSearch/AUS';
    //public static QAS_QUERY_URL      = 'http://localhost:1234/ddc/secure/api/qas/doSearch/AUS/pym';
    public static QAS_FORMATTER_URL  = 'http://localhost:1234/ddc/public/api/qas/doGetAddress';
    public static DEFAULT_ERROR_TEXT = 'Server error';

    constructor ( private http : Http ) {
    }

    public query               = ( queryValue : string ) : Observable<any> => {
        let headers : Headers = new Headers( {
            'Content-Type' : 'application/json' ,
        } );
        let options           = new RequestOptions( { body : '' , headers : headers } );
        let url               = AmpQasAddressService.QAS_QUERY_URL + '/' + queryValue;
        return this
            .http
            .get( url , options )
            .map( ( res ) => {
                let re = res.json();
                if ( re.payload.QAPicklist.Total && re.payload.QAPicklist.Total > 0 ) {
                    return re.payload.QAPicklist.PicklistEntry;
                } else {
                    return null;
                }
            } )
            .catch( this.handleError );
    };
    public getFormattedAddress = ( _moniker : string , _type ) : Observable<any> => {
        let headers : Headers = new Headers( {
            'Content-Type' : 'application/json' ,
        } );
        let options           = new RequestOptions( { body : '' , headers : headers } );
        let url               = AmpQasAddressService.QAS_FORMATTER_URL + '/' + _moniker;
        return this
            .http
            .get( url , options )
            .map( ( res ) => {
                let re = res.json();
                return this.getFormattedAddressByType( re.payload , _type );
            } )
            .catch( this.handleError );
    };

    private handleError ( error : any ) {
        let errMsg = (error.message) ? error.message : error.status ? error.status : AmpQasAddressService.DEFAULT_ERROR_TEXT;
        return Observable.throw( errMsg );
    }

    private getFormattedAddressByType ( _payload : AddressFormats ,
                                        _type : string = AddressFormatTypes.BANK ) : AddressFormats.Siebel|AddressFormats.Bank {
        return _payload[ _type ];
    }
}
export abstract class AddressFormatTypes {
    public static BANK : string   = 'Bank';
    public static SIEBEL : string = 'Siebel';
}
