import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

@Injectable()
export class ProfileService {

    private baseUrl         = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
    private profileEndpoint = '/profile';
    private profileUrl      = this.baseUrl + this.profileEndpoint;
    private headers         = new Headers( { 'Content-Type' : 'application/json' } );
    private httpOptions     = new RequestOptions( { headers : this.headers } );
    private profileReplaySubject : any;

    constructor ( private http : AmpHttpService ) {
    }

    public getProfile ( overrideUrl? : string ) : Observable<string> {
        return this.profileReplaySubject ? this.profileReplaySubject : this.createProfileReplaySubject( overrideUrl );
    }

    public createProfileReplaySubject ( overrideUrl? : string ) : Observable<string> {
        this.profileReplaySubject = this
            .http
            .get( overrideUrl || this.profileUrl, this.httpOptions )
            .map( ( res ) => res.json() )
            .publishReplay();
        this.profileReplaySubject.connect();
        return this.profileReplaySubject;
    }
}
