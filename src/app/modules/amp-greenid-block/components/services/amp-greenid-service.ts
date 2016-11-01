import { Injectable, ChangeDetectorRef, OnInit } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AmpHttpService } from '../../../../services/amp-http/amp-http.service';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { IGreenIdFormModel } from '../interfaces/formModel';
@Injectable()
export class AmpGreenIdServices {

    // Note: For local development uncomment the line line below and comment out the other BASE_URL variable
    // public static BASE_URL          = 'http://localhost:8082/ddc/public/api/green-id';
    public static BASE_URL          = `${Environments.property.ApiCallsBaseUrl}/green-id`;
    public static DEFAULT_ERROR_TEXT = 'Server error';
    public static VERFICATION_ENDPOINT = '/registerVerification';

    private headers = new Headers( {
        'Content-Type' : 'application/json'
    } );

    constructor ( private http : AmpHttpService ) {

    }

    public getTheToken  = ( modelValue : IGreenIdFormModel ) : Observable<any> => {
        let headers : Headers = this.headers;
        let options           = new RequestOptions( { headers : headers } );
        let url               = AmpGreenIdServices.BASE_URL + AmpGreenIdServices.VERFICATION_ENDPOINT;
        let body              = JSON.stringify( modelValue );

        return this
            .http
            .post( url, body, options )
            .map( ( res ) => {
                let re = res.json();
                return re;
            })
         .catch( this.handleError );
    };

    private handleError ( error : any ) {
        let errMsg = (error.message) ? error.message : error.status ? error.status : AmpGreenIdServices.DEFAULT_ERROR_TEXT;
        return Observable.throw( errMsg );
    }

}
