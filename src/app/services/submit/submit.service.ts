import { Injectable } from '@angular/core';
import {
    RequestOptions,
    Headers,
    Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { ErrorService } from '../error/error.service';

@Injectable()
export class SubmitService {
    private apiBaseURL     = Environments.property.ApiCallsBaseUrl;
    private headers        = new Headers( { 'Content-Type' : 'application/json' } );
    private httpOptions    = new RequestOptions( { headers : this.headers } );
    private submitEndpoint = '/submit';
    private _submitUrl     = this.apiBaseURL + this.submitEndpoint;

    constructor ( private http : AmpHttpService ) {
    }

    public submit ( referenceId, overrideUrl? : string ) : Observable<Response> {
        let params : string     = `id=${referenceId}`;
        const queryUrl : string = encodeURI( `${this._submitUrl}?${params}` );

        let replaySubmit = this.http.post( overrideUrl || queryUrl, JSON.stringify( {} ), this.httpOptions )
                               .map( ( res ) => res.json() )
                               .catch( ErrorService.handleError )
                               .publishReplay( 1 );

        replaySubmit.connect();
        return replaySubmit;
    }
}
