import '@ngrx/core/add/operator/select';
import { Action } from '@ngrx/store';
import { ModelActions } from '../actions/model.action';
import { clone , getIn } from "../utils/functions";
export default function( state , action : Action ) {
    switch ( action.type ) {
        case ModelActions.UPDATE: {
            const query          = action.payload.query;
            const fdn            = action.payload.fdn;
            let newState         = clone( state );
            let _state           = getIn( fdn , newState );
            _state[ fdn.last() ] = query;
            return newState
        }
        case ModelActions.PUSH: {
            const query  = action.payload.query;
            const fdn    = action.payload.fdn;
            let newState = clone( state );
            let _state   = getIn( fdn , newState );
            _state[ fdn.last() ].push( query );
            return newState
        }
        case ModelActions.REMOVE_AT: {
            const query  = action.payload.query;
            const fdn    = action.payload.fdn;
            let newState = clone( state );
            let _state   = getIn( fdn , newState );
            _state[ fdn.last() ].splice( query , 1 );
            return newState
        }
        case ModelActions.REMOVE_ALL: {
            const fdn    = action.payload.fdn;
            let newState = clone( state );
            let _state   = getIn( fdn , newState );
            while ( _state[ fdn.last() ].length ) {
                _state[ fdn.last() ].splice( 0 , 1 );
            }
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
