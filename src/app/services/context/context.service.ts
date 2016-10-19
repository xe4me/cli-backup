import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    RequestOptions,
    Headers,
 } from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments }   from '../../abstracts/environments/environments.abstract';

@Injectable()
export class ContextService {

    public $contextChanged : EventEmitter<any> = new EventEmitter<any>();

    private _context    = { initialized: false };
    private _contextUrl = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path + '/usersession';

    constructor( private http : AmpHttpService ){
    }

    get context () {
        return this._context;
    }

    set context (ctx) {
        Object.assign( this._context , ctx );
        this._context.initialized = true;
        this.$contextChanged.emit( this._context );
    }

    public fetchContext () : Observable<any> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers , body: '' } );
        return this.http.get( this._contextUrl , options )
                        .map( (res) => res.json() );
    }

    public whenReady (cb) {
        if (!this.context.initialized) {
            this.$contextChanged.subscribe( (newContext) => {
                cb();
            });
        } else {
            cb();
        }
    }
}
