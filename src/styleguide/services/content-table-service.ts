import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
export interface IComponentMeta {
    title : string;
    link : string;
}
@Injectable()
export class TableContentsService {
    public contents : IComponentMeta[] = null;
    private _promise : Promise<void>;

    constructor ( http : Http ) {
        this._promise = new Promise<void>( ( resolve ) => {
            http.get( 'src/styleguide/meta-table.json' )
                .subscribe( ( res : Response ) => {
                    this.contents = res.json().contents;
                    resolve();
                } );
        } );
    }

    getContentsList () : Promise<IComponentMeta[]> {
        return this._promise.then( () => {
            return this.contents;
        } );
    }
}
