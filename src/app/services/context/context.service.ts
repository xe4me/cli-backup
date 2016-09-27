import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    RequestOptions,
    Headers,
    Http
 } from '@angular/http';
import { Environments } from '../../abstracts/environments/environments.abstract.ts';

@Injectable()
export class ContextService {
    private _context    = { initialized: false };
    private _contextUrl = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path + '/usersession';

    constructor( private http : Http ){
    }

    get context () {
        return this._context;
    }

    set context (ctx) {
        Object.assign( this._context , ctx );
        this._context.initialized = true;
    }

    public fetchContext () : Observable<any> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers , body: '' } );
        return this.http.get( this._contextUrl , options )
                        .map( res => res.json() );
    }
}
