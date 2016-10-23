import { Injectable } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Environments } from '../../../abstracts/environments/environments.abstract';
import { AmpHttpService } from '../../../services/amp-http/amp-http.service';
@Injectable()
export class AmpQasAddressService {
    public static BASE_URL          = Environments.property.ApiCallsBaseUrl;
    public static QAS_FORMATTER_URL = AmpQasAddressService.BASE_URL + '/qas/doGetAddress';
    public static QAS_QUERY_URL     = AmpQasAddressService.BASE_URL + '/qas/doSearch/AUS';
    // public static QAS_FORMATTER_URL  = 'http://localhost:8082/ddc/public/api/qas/doGetAddress';
    // public static QAS_QUERY_URL      = 'http://localhost:8082/ddc/public/api/qas/doSearch/AUS';
    public static DEFAULT_ERROR_TEXT = 'Server error';
    private headers                  = new Headers( {
        'Content-Type' : 'application/json' ,
        'caller'       : 'components'
    } );
    // TODO : What needs to be set as caller ?
    constructor ( private http : AmpHttpService ) {
    }

    public query               = ( queryValue : string ) : Observable<any> => {
        let headers : Headers = this.headers;
        let options           = new RequestOptions( { body : '' , headers : headers } );
        let url               = AmpQasAddressService.QAS_QUERY_URL + '/' + encodeURIComponent( queryValue );
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
        let headers : Headers = this.headers;
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

    private getFormattedAddressByType ( _payload : any ,
                                        _type : string = AddressFormatTypes.ALL ) {
        let refactored = this.refactorPayload( _payload );
        return refactored[ _type ] || refactored;
    }

    private refactorPayload ( _payload ) {
        let refactoredPayload = {
            Bank   : {
                AllPostalDeliveryTypes : _payload[ 'bank' ][ 'All postal delivery types' ] ,
                BuildingLevel          : _payload[ 'bank' ][ 'Building level' ] ,
                FlatUnit               : _payload[ 'bank' ][ 'Flat/Unit' ] ,
                BuildingNumber         : _payload[ 'bank' ][ 'Building number' ] ,
                BuildingName           : _payload[ 'bank' ][ 'Building name' ] ,
                StreetName             : _payload[ 'bank' ][ 'Street (Name)' ] ,
                StreetType             : _payload[ 'bank' ][ 'Street (Type)' ] ,
                Locality               : _payload[ 'bank' ][ 'Locality' ] ,
                StateCode              : _payload[ 'bank' ][ 'State code' ] ,
                Postcode               : _payload[ 'bank' ][ 'Postcode' ] ,
                Country                : _payload[ 'bank' ][ 'Country' ] ,
                DPIDDID                : _payload[ 'bank' ][ 'DPID/DID' ] ,
                AUSBAR                 : _payload[ 'bank' ][ 'AUSBAR.' ]
            } ,
            Siebel : {
                Locality  : _payload[ 'siebel' ][ 'Locality' ] ,
                StateCode : _payload[ 'siebel' ][ 'State code' ] ,
                Postcode  : _payload[ 'siebel' ][ 'Postcode' ] ,
                Country   : _payload[ 'siebel' ][ 'Country' ] ,
                DPIDDID   : _payload[ 'siebel' ][ 'DPID/DID' ] ,
                AUSBAR    : _payload[ 'siebel' ][ 'AUSBAR.' ]
            } ,
            CRM    : {
                StreetAddress : _payload[ 'crm' ][ 'Street Address' ] ,
                Suburb        : _payload[ 'crm' ][ 'Suburb' ] ,
                State         : _payload[ 'crm' ][ 'State' ] ,
                Postcode      : _payload[ 'crm' ][ 'Postcode' ] ,
                Country       : _payload[ 'crm' ][ 'Country' ] ,
                DPID          : _payload[ 'crm' ][ 'DPID' ] ,
                Barcode       : _payload[ 'crm' ][ 'Barcode' ]
            }
        };
        return refactoredPayload;
    }
}
export abstract class AddressFormatTypes {
    public static BANK : string   = 'Bank';
    public static SIEBEL : string = 'Siebel';
    public static CRM : string    = 'CRM';
    public static ALL : string    = 'ALL';
}
