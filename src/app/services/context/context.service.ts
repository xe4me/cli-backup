import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { ErrorService } from '../error/error.service';
export class Context {
    initialized : boolean;
    realUser : string;
    actingAsUser : string;
    impersonatedUser : string;
    isPrincipal : boolean;
    practiceName : string;
    licensee : string;
    payeeID : string;
    practicePrincipalFirstName : string;
    practicePrincipalLastName : string;
    iat : number;
    exp : number;
    jwt_realUserFirstName : string;
    jwt_realUserLastName : string;
    jwt_realUser : string;
    jwt_iss : string;
    jwt_impersonatedUser : string;
    'x-jwt-assertion' : string;
}
@Injectable()
export class ContextService {
    private _context : Context = { initialized : false } as Context;
    private baseUrl            = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
    private contextEndpoint    = '/usersession';
    private contextUrl         = this.baseUrl + this.contextEndpoint;
    private headers            = new Headers( { 'Content-Type' : 'application/json' } );
    private httpOptions        = new RequestOptions( { headers : this.headers } );
    private contextReplaySubject : any;

    constructor ( private http : AmpHttpService ) {

    }

    public getContext ( overrideUrl? : string ) : Observable<Context> {
        return this.contextReplaySubject ? this.contextReplaySubject : this.createContextReplaySubject( overrideUrl );
    }

    public createContextReplaySubject ( overrideUrl? : string ) : Observable<Context> {
        this.contextReplaySubject = this
            .http
            .get( overrideUrl || this.contextUrl, this.httpOptions )
            .map( ( res ) => {
                return this.context = res.json().data;
            } )
            .catch( ErrorService.handleError )
            .publishReplay();
        this.contextReplaySubject.connect();
        return this.contextReplaySubject;
    }

    isContextValid () : boolean {
        return this.context.initialized && !!this.context[ 'x-jwt-assertion' ];
    }

    isPlannerContextValid () {
        if ( this.context.initialized && this.context.realUser ) {

            // TODO: uncomment this when x-jwt-assertion is implemented by TAM
            // return isContextValid();
            return true;
        }
        return false;
    }

    // // Used at the start of the buy back form to make sure that the JWT context provided is valid
    // // **7/6/2017 relaxing the validity rule to allow practices without a recorded specified officer to coming and add those details themselve.
    // isPracticeContextValid () {
    //     // Added rules to filter unauthorized licensee
    //     if ( this.getModel().context.licensee &&
    //         this.getModel().context.payeeID &&
    //         LicenseesAbstract.licensees.hasOwnProperty( this.getModel().context.licensee ) ) {
    //         return true;
    //     }
    //     return false;
    // }

    set context ( _context : Context ) {
        this._context             = _context;
        this._context.initialized = true;
    }

    get context () : Context {
        return this._context;
    }

}
