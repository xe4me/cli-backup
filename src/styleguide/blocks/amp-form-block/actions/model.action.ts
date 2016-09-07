import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
export interface Payload {
    query : string ,
    fdn : string[]
}
@Injectable()
export class ModelActions {
    static UPDATE_MODEL = '[MODEL] Update model';

    updateModel ( query : Payload ) : Action {
        return {
            type    : ModelActions.UPDATE_MODEL ,
            payload : query
        };
    }
}
