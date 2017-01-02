import { Injectable } from '@angular/core';
import {
    Headers,
    RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs';
import { AmpHttpService } from '../../../../services/amp-http/amp-http.service';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { IGreenIdFormModel } from '../interfaces/formModel';
@Injectable()
export class AmpGreenIdServices {

    // Note: For local development uncomment the line line below and comment out the other BASE_URL variable
    // public static BASE_URL          = 'http://localhost:8082/ddc/public/api/green-id';
    public static BASE_URL           = `${Environments.property.ApiCallsBaseUrl}/green-id`;
    public static DEFAULT_ERROR_TEXT = 'Server error';
    public static REGISTER_ENDPOINT  = '/register';
    public static TOKEN_ENDPOINT     = '/token';

    private headers = new Headers( {
        'Content-Type' : 'application/json'
    } );

    constructor ( private http : AmpHttpService ) {

    }

    public registerUser = ( modelValue : IGreenIdFormModel ) : Observable<any> => {
        const headers : Headers = this.headers;
        const options           = new RequestOptions( { headers } );
        const url               = AmpGreenIdServices.BASE_URL + AmpGreenIdServices.REGISTER_ENDPOINT;
        const body              = JSON.stringify( modelValue );

        return this
            .http
            .post( url, body, options )
            .map( ( res ) => {
                return res.json();
            } )
            .catch( this.handleError );
    }

    public getToken = ( verificationId : string ) : Observable<any> => {
        const headers : Headers = this.headers;
        const options           = new RequestOptions( { headers, body : '' } );
        const url               = AmpGreenIdServices.BASE_URL + AmpGreenIdServices.TOKEN_ENDPOINT;
        const urlParams         = `verificationId=${verificationId}`;

        return this
            .http
            .get( `${url}?${urlParams}`, options )
            .map( ( res ) => {
                return res.json();
            } )
            .catch( this.handleError );
    }

    private handleError ( error : any ) {
        const errMsg = (error.message) ? error.message : error.status ? error.status : AmpGreenIdServices.DEFAULT_ERROR_TEXT;
        return Observable.throw( errMsg );
    }

}
