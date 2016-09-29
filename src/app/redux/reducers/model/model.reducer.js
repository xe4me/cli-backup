"use strict";
require('@ngrx/core/add/operator/select');
var model_action_1 = require('../../actions/model/model.action');
var amp_utils_1 = require('../../../modules/amp-utils');
function default_1(state, action) {
    switch (action.type) {
        case model_action_1.ModelActions.UPDATE: {
            var query = action.payload.query;
            var fdn = action.payload.fdn;
            var newState = amp_utils_1.clone(state);
            var _state = amp_utils_1.getIn(fdn, newState);
            _state[fdn.last()] = query;
            return newState;
        }
        case model_action_1.ModelActions.PUSH: {
            var query = action.payload.query;
            var fdn = action.payload.fdn;
            var newState = amp_utils_1.clone(state);
            var _state = amp_utils_1.getIn(fdn, newState);
            _state[fdn.last()].push(query);
            return newState;
        }
        case model_action_1.ModelActions.REMOVE_AT: {
            var query = action.payload.query;
            var fdn = action.payload.fdn;
            var newState = amp_utils_1.clone(state);
            var _state = amp_utils_1.getIn(fdn, newState);
            _state[fdn.last()].splice(query, 1);
            return newState;
        }
        case model_action_1.ModelActions.REMOVE_ALL: {
            var fdn = action.payload.fdn;
            var newState = amp_utils_1.clone(state);
            var _state = amp_utils_1.getIn(fdn, newState);
            while (_state[fdn.last()].length) {
                _state[fdn.last()].splice(0, 1);
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}
exports.__esModule = true;
exports["default"] = default_1;
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
