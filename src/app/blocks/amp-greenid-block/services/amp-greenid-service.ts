import { Injectable } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AmpHttpService } from '../../../services/amp-http/amp-http.service';
@Injectable()
export class AmpGreenIdServices {

    public static BASE_URL          = 'http://localhost:9000';
    public static DEFAULT_ERROR_TEXT = 'Server error';

    private headers                  = new Headers( {
        'Content-Type' : 'application/json' ,
        'caller'       : 'components'
    } );

    constructor ( private http : AmpHttpService ) {

    }

    public registerCustomer  = ( queryValue : string ) : Observable<any> => {
        let headers : Headers = this.headers;
        let options           = new RequestOptions( { body : '' , headers : headers } );
        let url               = AmpGreenIdServices.BASE_URL + '/' + encodeURIComponent( queryValue );
        return this
            .http
            .get( url , options )
            .map( ( res ) => {
                let re = res.json();
                console.log(' response: ', re);
            } )
            .catch( this.handleError );
    };

    private handleError ( error : any ) {
        let errMsg = (error.message) ? error.message : error.status ? error.status : AmpGreenIdServices.DEFAULT_ERROR_TEXT;
        return Observable.throw( errMsg );
    }
}
