import { Injectable } from '@angular/core';
import {
    Headers,
    RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs';
import { Environments } from '../../../abstracts/environments/environments.abstract';
import { AmpHttpService } from '../../../services/amp-http/amp-http.service';
import { escapeSlash } from '../../amp-utils/functions.utils';
@Injectable()
export class AmpQasAddressService {
    public static BASE_URL = Environments.property.ApiCallsBaseUrl;
    public static QAS_FORMATTER_URL = AmpQasAddressService.BASE_URL + '/qas/doGetAddress';
    public static QAS_QUERY_URL = AmpQasAddressService.BASE_URL + '/qas/doSearch/AUS';
    // public static QAS_FORMATTER_URL  = 'http://localhost:8082/ddc/public/api/qas/doGetAddress';
    // public static QAS_QUERY_URL      = 'http://localhost:8082/ddc/public/api/qas/doSearch/AUS';
    public static DEFAULT_ERROR_TEXT = 'Server error';
    public residentialOnly = '';
    private headers = new Headers( {
        'Content-Type' : 'application/json',
        'caller' : Environments.property.experienceName || 'components'
    } );

    constructor ( private http : AmpHttpService ) {
    }

    public setUrlForResidential () {
        this.residentialOnly = 'true';
    }

    public query = ( queryValue : string ) : Observable<any> => {
        let headers : Headers = this.headers;
        let options = new RequestOptions( { body : '', headers } );
        let url = AmpQasAddressService.QAS_QUERY_URL + '/' + encodeURIComponent( escapeSlash( queryValue ) ) + '?residentialOnly=' + this.residentialOnly;
        return this
            .http
            .get( url, options )
            .map( ( res ) => {
                let re = res.json();
                if ( re.payload.QAPicklist.Total && re.payload.QAPicklist.Total > 0 ) {
                    if ( re.payload.QAPicklist.Total === 1 && re.payload.QAPicklist.PicklistEntry[ 0 ].Moniker === '' ) {
                        return null;
                    }
                    return re.payload.QAPicklist.PicklistEntry;
                } else {
                    return null;
                }
            } )
            .catch( this.handleError );
    }
    public getFormattedAddress = ( _moniker : string, _type ) : Observable<any> => {
        let headers : Headers = this.headers;
        let options = new RequestOptions( { body : '', headers } );
        let url = AmpQasAddressService.QAS_FORMATTER_URL + '/' + _moniker;
        return this
            .http
            .get( url, options )
            .map( ( res ) => {
                let re = res.json();
                return this.getFormattedAddressByType( re.payload, _type );
            } )
            .catch( this.handleError );
    }

    private handleError ( error : any ) {
        let errMsg = (error.message) ? error.message : error.status ? error.status : AmpQasAddressService.DEFAULT_ERROR_TEXT;
        return Observable.throw( errMsg );
    }

    private getFormattedAddressByType ( _payload : any,
                                        _type : string = AddressFormatTypes.DDC ) {
        let refactored = this.refactorPayload( _payload );
        return refactored[ _type ] || refactored;
    }

    private refactorPayload ( _payload ) {
        let refactoredPayload = {
            DDC : {
                AllPostalDeliveryTypes : _payload[ 'DDC' ][ 'All postal delivery types' ],
                BuildingLevel : _payload[ 'DDC' ][ 'Building level' ],
                FlatUnit : _payload[ 'DDC' ][ 'Flat/Unit' ],
                BuildingNumber : _payload[ 'DDC' ][ 'Building number' ],
                BuildingName : _payload[ 'DDC' ][ 'Building name' ],
                StreetName : _payload[ 'DDC' ][ 'Street (Name)' ],
                StreetType : _payload[ 'DDC' ][ 'Street (Type)' ],
                Locality : _payload[ 'DDC' ][ 'Locality' ],
                StateCode : _payload[ 'DDC' ][ 'State code' ],
                Postcode : _payload[ 'DDC' ][ 'Postcode' ],
                Country : _payload[ 'DDC' ][ 'Country' ],
                DPIDDID : _payload[ 'DDC' ][ 'DPID/DID' ],
                AUSBAR : _payload[ 'DDC' ][ 'AUSBAR.' ]
            }
        };
        return refactoredPayload;
    }
}
export abstract class AddressFormatTypes {
    public static DDC : string = 'DDC';
}
