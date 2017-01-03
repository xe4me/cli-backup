import { BrowserModule } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    NgModule,
    Renderer
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Footer } from './blocks/footer/footer.component';
import {
    ErrorPageComponent,
    AmpBlockLoaderDirective
} from 'amp-ddc-components';
import { DYNAMIC_BLOCKS } from './app.dynamic-blocks';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { Bett3rBannerBlock } from './blocks/bett3r-banner/bett3r-banner.component';
import { Bett3rExitButtonComponent } from './blocks/bett3r-exit-button/bett3r-exit-button.component';
import { NormalAccountPage } from './pages/confirmation/normal-account-page';
import { PostnoneSingleAccountPage } from './pages/confirmationWithConditionSingle/postnone-account-page';
import { PostnoneJointAccountPage } from './pages/confirmationWithConditionJoint/postnone-account-page';
import { TransitioningAccountPage } from './pages/confirmationFromTransitioning/transitioning-account-page';
import { SaveConfirmationPage } from './pages/saveConfirmation/save-confirmation-page';
import { SubmitErrorPage } from './pages/submitError/submit-error-page';
import { StickySaveButton } from './components/sticky-save-button/sticky-save-button';
import { BetterFormComponent } from './forms/better-form/better-form.component';
import { AccountsListBlock } from './blocks/accounts-list/accounts-list.component';
import { Header } from './blocks/header/header.component';
import { RequestRefViaSMSPage } from './pages/request-ref-via-sms/request-ref-via-sms-page';
import {
    SharedFormDataService,
    ApplicantGeneratorService,
    AccountsListDataService
} from './shared';
import { AccountsListPipe } from './blocks/accounts-list/accounts-list.pipe';
import { AMP_DDC_MODULES } from './app.modules';
import { AppRoutingModule } from './app.routes';
export const DECLARATIONS = [
    ...DYNAMIC_BLOCKS,
    AmpBlockLoaderDirective,
    ErrorPageComponent,
    StickySaveButton,
    AccountsListBlock,
    NormalAccountPage,
    Bett3rBannerBlock,
    Bett3rExitButtonComponent,
    PostnoneSingleAccountPage,
    PostnoneJointAccountPage,
    TransitioningAccountPage,
    SubmitErrorPage,
    RequestRefViaSMSPage,
    SaveConfirmationPage,
    Header,
    AccountsListPipe,
    Footer
];
const AMP_MODULES         = [
    ...AMP_DDC_MODULES,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
];

const IMPORTS = [
    ...AMP_MODULES,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
];

@NgModule( {
    declarations    : [
        AppComponent,
        BetterFormComponent,
        ...DECLARATIONS
    ],
    imports         : IMPORTS,
    entryComponents : DYNAMIC_BLOCKS,
    providers       : [
        <any>Renderer,
        BrowserDomAdapter,
        ...APP_RESOLVER_PROVIDERS,
        SharedFormDataService,
        ApplicantGeneratorService,
        AccountsListDataService
    ],
    bootstrap       : [ AppComponent ]
} )
export class AppModule {
}
