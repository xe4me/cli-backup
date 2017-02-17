import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule , useLogMonitor } from '@ngrx/store-log-monitor';
import { AmpReduxModule } from '../app/redux/amp-redux.module';
const initialState = require( './blocks/amp-form-block/Application.model.json' );
@NgModule( {
    imports : [
        AmpReduxModule ,
        AmpReduxModule.provideAmpStore( initialState ) ,
        StoreDevtoolsModule.instrumentStore( {
            monitor : useLogMonitor( {
                visible  : true ,
                position : 'right'
            } )
        } ) ,
        StoreLogMonitorModule
    ] ,
    exports : [ StoreLogMonitorModule , StoreDevtoolsModule , AmpReduxModule ]
} )
export class AmpStyleguideReduxModule {
}