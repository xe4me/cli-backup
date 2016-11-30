import { NgModule , ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles , createNewHosts } from '@angularclass/hmr';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { StyleGuideApp } from './app.component';
import { LeftNavigationComponent } from './styleguide-components';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import { AmpStyleguideReduxModule } from '../app/redux/amp-styleguide-redux.module';
import { AmpQasAddressModule } from '../app/modules/amp-qas-address';
import { AmpTypeaheadModule } from '../app/modules/amp-typeahead';
import { AmpLoadingComponent } from '../app/components/amp-loading/amp-loading.component';
import { AmpDirectivesModule } from '../app/modules/amp-directives';
import { AmpInputsModule } from '../app/modules/amp-inputs';
import { AmpPipesModule } from '../app/modules/amp-pipes';
import { AmpErrorModule } from '../app/modules/amp-error/amp-error.module';
import { AmpCheckboxModule } from '../app/modules/amp-checkbox';
import { AmpDropdownNewModule } from '../app/modules/amp-dropdown-new';
import { AmpTextareaModule } from '../app/modules/amp-textarea';
import { AmpGroupButtonsModule } from '../app/modules/amp-group-buttons';
import { AmpRadioButtonGroupModule } from '../app/modules/amp-radio-button-group';
import { AmpButtonModule } from '../app/modules/amp-button';
import { AmpStandAloneMenuModule } from '../app/modules/amp-standalone-menu';
import { AmpFormRowModule } from '../app/modules/amp-form-row/amp-form-row.module';
import { AmpRowRepeaterModule } from '../app/modules/amp-row-repeater/amp-row-repeater.module';
import { AmpTooltipModule } from '../app/modules/amp-tooltip/amp-tooltip.module';
import { PortalModule } from '@angular2-material/core';
import { AmpGreenidModule } from '../app/modules/amp-greenid-block/amp-greenid.module';
import { AmpGoogleRecaptchaModule } from '../app/modules/amp-google-recaptcha/amp-google-recaptcha.module';
import { AmpLogoModule } from '../app/modules/amp-logo/amp-logo.module';
import { AmpCardsModule } from '../app/modules/amp-cards/amp-cards.module';
import { AmpPopDownModule } from '../app/modules/amp-pop-down/amp-pop-down.module';
import { AmpHeaderModule } from '../app/modules/amp-header/amp-header.module';
/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component
const APP_PROVIDERS                         = [
    ...APP_RESOLVER_PROVIDERS ,
    AppState
];
const shouldBeReplacedWithModulesComponents = [
    AmpLoadingComponent ,
];
const IMPORTS                               = [
    AmpTooltipModule.forRoot() ,
    AmpRowRepeaterModule ,
    AmpFormRowModule ,
    AmpStandAloneMenuModule ,
    AmpButtonModule ,
    AmpRadioButtonGroupModule ,
    AmpGroupButtonsModule ,
    AmpTextareaModule ,
    AmpCheckboxModule ,
    AmpErrorModule ,
    AmpPipesModule ,
    AmpDirectivesModule ,
    AmpDropdownNewModule ,
    AmpInputsModule ,
    AmpTypeaheadModule ,
    AmpQasAddressModule ,
    AmpStyleguideReduxModule ,
    AmpGreenidModule,
    AmpLogoModule,
    AmpGoogleRecaptchaModule,
    AmpCardsModule,
    AmpPopDownModule,
    PortalModule ,
    BrowserModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpModule ,
    AmpHeaderModule ,
    RouterModule.forRoot( ROUTES , { useHash : false } )
];
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule( {
    bootstrap    : [ StyleGuideApp ] ,
    declarations : [
        ...shouldBeReplacedWithModulesComponents ,
        StyleGuideApp ,
        LeftNavigationComponent ,
        IndexPage ,
        ComponentPage
    ] ,
    imports      : IMPORTS ,
    providers    : [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS ,
        APP_PROVIDERS
    ]
} )
export class StyleGuideAppModule {
    constructor ( public appRef : ApplicationRef , public appState : AppState ) {
    }

    hmrOnInit ( store ) {
        if ( ! store || ! store.state ) {
            return;
        }
        console.log( 'HMR store' , store );
        this.appState.state = store.state;
        delete store.state;
    }

    hmrOnDestroy ( store ) {
        let cmpLocation       = this.appRef.components.map( ( cmp ) => cmp.location.nativeElement );
        // recreate elements
        let state             = this.appState.state;
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
