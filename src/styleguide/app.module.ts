import { NgModule , ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles , createNewHosts } from '@angularclass/hmr';
import { Store , StoreModule } from '@ngrx/store';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { StyleGuideApp } from './app.component';
import { LeftNavigationComponent } from './styleguide-components';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import { AmpStyleguideReduxModule } from "../app/redux/amp-styleguide-redux.module";
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS ,
    AppState
];
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule( {
    bootstrap    : [ StyleGuideApp ] ,
    declarations : [
        StyleGuideApp ,
        LeftNavigationComponent ,
        IndexPage ,
        ComponentPage
    ] ,
    imports      : [
        AmpStyleguideReduxModule ,
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule ,
        HttpModule ,
        RouterModule.forRoot( ROUTES , { useHash : false } )
    ] ,
    providers    : [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS ,
        APP_PROVIDERS
    ]
} )
export class StyleGuideAppModule {
    constructor ( public appRef : ApplicationRef , public appState : AppState ) {
    }

    hmrOnInit ( store ) {
        if ( ! store || ! store.state ) return;
        console.log( 'HMR store' , store );
        this.appState.state = store.state;
        delete store.state;
    }

    hmrOnDestroy ( store ) {
        var cmpLocation       = this.appRef.components.map( cmp => cmp.location.nativeElement );
        // recreate elements
        var state             = this.appState.state;
        store.state           = state;
        store.disposeOldHosts = createNewHosts( cmpLocation );
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy ( store ) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
