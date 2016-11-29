import { NgModule } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { AmpReduxComponent } from './components/amp-redux/amp-redux.component';
import reducers from './reducers/model/model.reducer';
import { ModelActions } from './actions/model/model.action';
import { StoreModule , Store } from '@ngrx/store';
import { StoreService } from './services/store/store.service';
import { ModuleWithProviders } from '@angular/core';
/*
 * TODO : Where is the best place to put bellow code ?
 * */
interface Array<T> {
    last() : Array<T>;
}
if ( ! (<any> Array.prototype).last ) {
    (<any> Array.prototype).last = function() {
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
    providers    : [ ACTIONS , StoreService ] ,
    exports      : [ AmpReduxComponent ]
} )
export class AmpReduxModule {
    public static provideAmpStore ( _initialState , _reducers? ) {
        let composedReducers = _reducers ? compose( _reducers , reducers ) : reducers;
        return StoreModule.provideStore( composedReducers , _initialState );
    }
}
