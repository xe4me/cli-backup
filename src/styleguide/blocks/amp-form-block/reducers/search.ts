import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ModelActions } from '../actions/model.action';
export interface SearchState {
    ids : string[];
    loading : boolean;
    query : string;
}
const initialState : Map<SearchState> = {
    "Application" : {
        "introBlockComponent"     : {} ,
        "InsuranceDetailsSection" : {
            "sampleExperienceBlock" : {
                "age" : null
            }
        }
    }
};
export default function( state = initialState , action : Action ) : SearchState {
    switch ( action.type ) {
        case ModelActions.UPDATE_MODEL: {
            const query  = action.payload.query;
            const fdn    = action.payload.fdn;
            let newState = JSON.parse(JSON.stringify(state)) ;
            let path = newState;
            for ( let i = 0 ; i < (fdn.length - 1) ; i ++ ) {
                path = path[ fdn[ i ] ];
            }
            path[ fdn[ fdn.length - 1 ] ] = query;
            console.log( '+++++++ newState' , newState );
            return newState
        }
        default: {
            return state;
        }
    }
}
// export function getStatus () {
//     return ( state$ : Observable<SearchState> ) => state$
//         .select( s => s.loading );
// }
// export function getBookIds () {
//     return ( state$ : Observable<SearchState> ) => state$
//         .select( s => s.ids );
// }
// export function getQuery () {
//     return ( state$ : Observable<SearchState> ) => state$
//         .select( s => s.query );
// }
