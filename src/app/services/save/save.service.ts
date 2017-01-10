import { Injectable } from '@angular/core';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { TransformService } from '../transform/transform.service';
import { ErrorService } from '../error/error.service';
import { Subject } from 'rxjs';

@Injectable()
export class SaveService {
    public referenceId        = null;
    public autoSave : boolean = true;
    public $onSaveResponse    = new Subject<any>();
    private apiBaseURL        = Environments.property.ApiCallsBaseUrl;
    private headers           = new Headers( { 'Content-Type' : 'application/json' } );
    private httpOptions       = new RequestOptions( { headers : this.headers } );
    private saveEndpoint      = 'save';
    private _saveUrl          = `${this.apiBaseURL}/${Environments.property.ExperienceName}/${this.saveEndpoint}`;

    constructor ( private http : AmpHttpService ) {
    }

    public get saveUrl () {
        return this._saveUrl + (this.referenceId ? `?id=${this.referenceId}` : '');
    }

    public save ( model : any, overrideUrl? : string ) {
        let transformedModel = TransformService.toBackendModel( model );
        let replaySave =
                this.http
                    .post( overrideUrl || this.saveUrl, JSON.stringify( transformedModel ), this.httpOptions )
                    .map( ( response ) => response.json() )
                    .catch( ErrorService.handleError )
                    .do( ( response : any ) => {
                        // assuming that the id is available
                        this.referenceId = this.referenceId ? this.referenceId : response.payload.meta.id;
                        this.$onSaveResponse.next( response );
                    }, ( error ) => {
                        this.$onSaveResponse.error( error );
                    } )
                    .publishReplay( 1 );

        replaySave.connect();
        return replaySave;
    }
}
