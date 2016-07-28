/*
 * Providers provided by Angular
 */
import * as ngCore from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import * as browser from '@angular/platform-browser';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { FORM_PROVIDERS, LocationStrategy , HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
// Add all operators to Observable
import 'rxjs/Rx';

/*
 * App Environment Providers
 * providers that only live in certain environment
 */
const ENV_PROVIDERS = [];
if ( 'production' === process.env.ENV ) {
    ngCore.enableProdMode();
    // ENV_PROVIDERS.push( browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE );
} else {
    ENV_PROVIDERS.push( browser.ELEMENT_PROBE_PROVIDERS );
}
/*
 * App Component
 * our top level component that holds all of our components
 */
import { StyleGuideApp } from './styleguide/app';
// import { DemosApp } from './styleguide/app';
// import {BuyBackFormComponent} from './app/forms/derby/buybackform.component';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main () {
    return bootstrap( //DemosApp , [
                      StyleGuideApp, [
                      ...ENV_PROVIDERS ,
                      ...HTTP_PROVIDERS ,
                      ...ROUTER_PROVIDERS ,
                      ...FORM_PROVIDERS,
                      ngCore.provide( Window , { useValue : window } )
                  ] )
                  .catch( err => console.error( err ) );
}
/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
function bootstrapDomReady () {
    // bootstrap after document is ready
    return document.addEventListener( 'DOMContentLoaded' , main );
}
if ( 'development' === process.env.ENV ) {
    // activate hot module reload
    if ( process.env.HMR ) {
        if ( document.readyState === 'complete' ) {
            main();
        } else {
            bootstrapDomReady();
        }
        module.hot.accept();
    } else {
        bootstrapDomReady();
    }
} else {
    bootstrapDomReady();
}
