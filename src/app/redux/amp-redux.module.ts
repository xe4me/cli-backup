import { NgModule } from "@angular/core";
import { compose } from '@ngrx/core/compose';
import { AmpReduxComponent } from "./components/amp-redux/amp-redux.component";
import actions from './actions/model.action';
import models from './models';
import reducers from './reducers/model.reducer';
import { ModelActions } from "./actions/model.action";
import { StoreModule } from "@ngrx/store";
/*
 * TODO : Where is the best place to put bellow code ?
 * */
if ( ! Array.prototype.last ) {
    Array.prototype.last = function() {
        return this[ this.length - 1 ];
    };
}
const ACTIONS = [
    ModelActions
];
@NgModule( {
    declarations : [
        AmpReduxComponent
    ] ,
    providers    : [ ACTIONS ] ,
    exports      : [ AmpReduxComponent ]
} )
export class AmpReduxModule {
    public static provideAmpStore ( _initialState , _reducers? ) {
        let composedReducers = _reducers ? compose( _reducers , reducers ) : reducers;
        return StoreModule.provideStore( composedReducers , _initialState );
    }
}