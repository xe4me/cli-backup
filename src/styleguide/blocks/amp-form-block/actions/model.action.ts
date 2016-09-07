import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
@Injectable()
export class ModelActions {
    static UPDATE_MODEL = '[MODEL] Update model';

    updateModel ( query : string ) : Action {
        return {
            type    : ModelActions.UPDATE_MODEL ,
            payload : query
        };
    }
}
