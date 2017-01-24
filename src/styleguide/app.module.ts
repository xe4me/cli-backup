import {
    NgModule,
    ApplicationRef
} from '@angular/core';
import {
    MaterialModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    HttpModule,
    Http
} from '@angular/http';
import {
    removeNgStyles,
    createNewHosts,
    createInputTransfer
} from '@angularclass/hmr';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { StyleGuideApp } from './app.component';
import { LeftNavigationComponent } from './styleguide-components';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import {
    AppState,
    InternalStateType
} from './app.service';
import { AmpBlockLoaderDirective } from './amp-block-loader.directive';
import { StickyProgressHeaderBlockComponent } from './blocks/amp-form-block/sticky-progress-header-block/sticky-progress-header-block.component';
import { AmpSubmitReceiptComponent } from '../app/modules/amp-submit-receipt/components/amp-submit-receipt/amp-submit-receipt.component';
import {
    ExampleComponent,
    ExampleDirective
} from './example';
import { Highlight } from './highlight';
import { HighlightCodeDirective } from './highlight.directive';
import { DYNAMICALLY_LOADED_COMPONENTS } from './app.entry-components';
import { AMP_MODULES } from './app.modules';
import { PageSectionComponent } from '../app/sections/page-section.component';
import { AmpLoadingComponent } from '../app/components/amp-loading/amp-loading.component';
import { AmpDropdownNewModule } from './.';
import { AmpFormRowModule } from '../app/modules/amp-form-row/amp-form-row.module';
import { AmpHeaderModule } from '../app/modules/amp-header/amp-header.module';
import { InterceptedHttp } from '../app/modules/amp-loading-button/services/amp-http/amp-http.service';

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];
type StoreType = {
    state : InternalStateType,
    restoreInputValues : () => void,
    disposeOldHosts : () => void
};

export const shouldBeReplacedWithModulesComponents = [
    PageSectionComponent,
    ExampleComponent,
    ExampleDirective,
    AmpSubmitReceiptComponent,
    AmpBlockLoaderDirective,
    StickyProgressHeaderBlockComponent,
    Highlight
];
const IMPORTS                                      = [
    ...AMP_MODULES,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // RouterModule.forRoot( ROUTES , { useHash : false , preloadingStrategy : PreloadAllModules } )

    AmpHeaderModule,

    RouterModule.forRoot( ROUTES, { useHash : false } )
];
@NgModule( {
    bootstrap       : [ StyleGuideApp ],
    declarations    : [
        ...DYNAMICALLY_LOADED_COMPONENTS,
        ...shouldBeReplacedWithModulesComponents,
        StyleGuideApp,
        LeftNavigationComponent,
        IndexPage,
        ComponentPage,
        HighlightCodeDirective
    ],
    entryComponents : DYNAMICALLY_LOADED_COMPONENTS,
    imports         : IMPORTS,
    providers       : [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS

    ]
} )
export class StyleGuideAppModule {
    constructor ( public appRef : ApplicationRef, public appState : AppState ) {
    }

    hmrOnInit ( store : StoreType ) {
        if ( !store || !store.state ) {
            return;
        }
        console.log( 'HMR store', JSON.stringify( store, null, 2 ) );
        // set state
        this.appState._state = store.state;
        // set input values
        if ( 'restoreInputValues' in store ) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout( restoreInputValues );
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy ( store : StoreType ) {
        const cmpLocation        = this.appRef.components.map( ( cmp ) => cmp.location.nativeElement );
        // save state
        const state              = this.appState._state;
        store.state              = state;
        // recreate root elements
        store.disposeOldHosts    = createNewHosts( cmpLocation );
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy ( store : StoreType ) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
