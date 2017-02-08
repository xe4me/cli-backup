import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

@Injectable()
export class RetrieveService {

    public static retrieveURL = `${Environments.property.ApiCallsBaseUrl}/${Environments.property.ExperienceName}/retrieve`;

    public hasBeenRetrieveSuccessfully = false;

    constructor ( private http : AmpHttpService ) {
    }

    public retrieve (referenceId, surname, dob, callback) {

        let headers = new Headers( { 'Content-Type' : 'application/json' } );
        let options = new RequestOptions( { headers } );

        this.http.post( RetrieveService.retrieveURL, {
            surname,
            dob,
            id      : referenceId
        }, options )
            .map( ( res : Response ) => res.json() )
            .subscribe( ( response ) => {
                const payload = response.payload;

                if (!payload) {
                    callback('payload is empty', null);
                    return ;
                }

                if ( payload.status === 'success' ) {
                    this.hasBeenRetrieveSuccessfully = true;
                    callback(null, payload);
                } else {
                    callback('status was: ' + payload.status, payload);
                }
            }, ( error ) => {
                callback(error, null);
            } );
    }

}
