import { Injectable } from "@angular/core";
import { Headers , RequestOptions , Http } from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class AmpQasAddressService {
    public static QAS_QUERY_URL     = 'http://localhost:8082/ddc/secure/api/qas/doSearch/AUS';
    public static QAS_FORMATTER_URL = 'http://localhost:8082/ddc/secure/api/nio/addressFormatter';
    public query                    = ( queryValue : string ) : Observable<any> => {
        let headers : Headers = new Headers( {
            'Content-Type' : 'application/json' ,
        } );
        let options           = new RequestOptions( { body : '' , headers : headers } );
        let url               = AmpQasAddressService.QAS_QUERY_URL + '/' + queryValue;
        return this
            .http
            .get( url , options )
            .map( res => {
                let re = res.json();
                if ( re.payload.QAPicklist.Total && re.payload.QAPicklist.Total > 0 ) {
                    return re.payload.QAPicklist.PicklistEntry
                } else {
                    return null;
                }
            } );
        // .catch(this.handleError);
    };

    constructor ( private http : Http ) {
    }
}