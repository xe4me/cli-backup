import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
export interface IVersionMeta {
    version : string;
    readme : string;
}
@Injectable()
export class VersionService {
    public meta : IVersionMeta = null;
    private _promise : Promise<void>;

    constructor ( http : Http ) {
        this._promise = new Promise<void>( ( resolve ) => {
            http.get( 'src/assets/version.json' ).subscribe( ( res : Response ) => {
                this.meta = res.json();
                resolve();
            } );
        } );
    }

    getMeta () : Promise<IVersionMeta> {
        return this._promise.then( () => {
            return this.meta;
        } );
    }
}
