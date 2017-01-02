import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
export interface Payload {
    query : any ;
    fdn : Array<(string|number)>;
}
@Injectable()
export class ModelActions {
    static UPDATE     = '[MODEL] Update model';
    static PUSH       = '[MODEL] Push an item to array';
    static REMOVE_AT  = '[MODEL] Remove and item from array';
    static REMOVE_ALL = '[MODEL] Remove all items of an array';

    update ( payload : Payload ) : Action {
        return {
            type : ModelActions.UPDATE,
            payload
        };
    }

    push ( payload : Payload ) {
        return {
            type : ModelActions.PUSH,
            payload
        };
    }

    removeAt ( payload : Payload ) {
        return {
            type : ModelActions.REMOVE_AT,
            payload
        };
    }

    removeAll ( payload : Payload ) {
        return {
            type : ModelActions.REMOVE_ALL,
            payload
        };
    }
}
