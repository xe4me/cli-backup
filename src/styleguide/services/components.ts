import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
export interface IComponentExample {
    component : string;
    name : string;
    source : string;
    styles : string;
    template : string;
    galen? : string;
    jasmine? : string;
    component_src_location : string;
}
export interface IComponentMeta {
    type : string;
    id : string;
    readme? : string;
    name : string;
    sources : string[];
    examples : IComponentExample[];
}
export interface IComponentGroupMeta {
    type : string;
    components : IComponentMeta[];
}
@Injectable()
export class ComponentsService {
    public components : IComponentMeta[]            = null;
    public componentGrouped : IComponentGroupMeta[] = [];
    private _promise : Promise<void>;

    constructor ( http : Http ) {
        this._promise = new Promise<void>( ( resolve ) => {
            http.get( 'src/styleguide/meta.json' )
                .subscribe( ( res : Response ) => {
                    this.components = res.json();
                    this.components.map( ( _component : IComponentMeta )=> {
                        _component.type = _component.sources[ 0 ].split( '/' )[ 2 ];
                        this.getGroupByTpe( _component.type ).components.push( _component );
                    } );
                    resolve();
                } );
        } );
    }

    getComponents () : Promise<IComponentMeta[]> {
        return this._promise.then( () => {
            return this.components;
        } );
    }

    gertComponentsGrouped () : Promise<IComponentGroupMeta[]> {
        return this._promise.then( () => {
            return this.componentGrouped;
        } );
    }

    getComponent ( id : string ) : Promise<IComponentMeta> {
        return this._promise.then( () => {
            let pick = null;
            this.components.forEach( ( c : IComponentMeta ) => {
                if ( c.id === id ) {
                    pick = c;
                }
            } );
            return pick;
        } );
    }

    getPrevious ( component : IComponentMeta ) : Promise<IComponentMeta> {
        return this._promise.then( () => {
            let index = - 1;
            this.components.forEach( ( c : IComponentMeta , i : number ) => {
                if ( c.id === component.id ) {
                    index = i;
                }
            } );
            if ( index < 1 ) {
                index = this.components.length;
            }
            return this.components[ index - 1 ];
        } );
    }

    getNext ( component : IComponentMeta ) : Promise<IComponentMeta> {
        return this._promise.then( () => {
            let index = - 1;
            this.components.forEach( ( c : IComponentMeta , i : number ) => {
                if ( c.id === component.id ) {
                    index = i;
                }
            } );
            if ( index >= this.components.length - 1 ) {
                index = - 1;
            }
            return this.components[ index + 1 ];
        } );
    }

    private getGroupByTpe ( type : string ) : IComponentGroupMeta {
        for ( let i = 0 ; i < this.componentGrouped.length ; i ++ ) {
            if ( this.componentGrouped[ i ].type === type ) {
                return this.componentGrouped[ i ];
            }
        }
        let last = this.componentGrouped.length;
        this.componentGrouped.push( {
            type       : type ,
            components : []
        } );
        return this.componentGrouped[ last ];
    }
}
