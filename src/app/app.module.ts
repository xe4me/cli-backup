import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Routes , RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {
    Footer
} from './blocks/footer/footer.component';
import {
    AmpTypeaheadModule ,
    AmpTooltipModule ,
    AmpPipesModule ,
    AmpDirectivesModule ,
    AmpQasAddressModule ,
    AmpInputsModule ,
    AmpCheckboxModule ,
    AmpTextareaModule ,
    AmpGroupButtonsModule ,
    AmpRadioButtonGroupModule ,
    AmpErrorModule ,
    AmpButtonModule ,
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    AmpFormBlockComponent ,
    AMPGoogleAddressComponentGroup ,
    AmpFormRowComponent ,
    AmpButton ,
    AmpOverlayComponent ,
    AmpIntroBlockComponent ,
    AmpLoadingComponent ,
    AmpRowRepeaterModule ,
    AmpFormRowModule ,
    AmpStandAloneMenuModule ,
    AmpGreenidModule ,
    AMPGoogleAddressComponent ,
    AmpGoogleRecaptchaModule,
    AmpLogoModule
} from 'amp-ddc-components';
// the bellow import will be replaced with a proper one as soon as we completely remove amp-dropdown and moved to
// the new one
import { AmpDropdownNewModule } from 'amp-ddc-components/src/app/modules/amp-dropdown-new';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { NormalAccountPage } from './pages/confirmation/normal-account-page';
import {
    PostnoneSingleAccountPage
} from './pages/confirmationWithConditionSingle/postnone-account-page';
import {
    PostnoneJointAccountPage
} from './pages/confirmationWithConditionJoint/postnone-account-page';
import { SubmitErrorPage } from './pages/submitError/submit-error-page';
import {
    StickySaveButton
} from './components/sticky-save-button/sticky-save-button';
import { BetterFormComponent } from './forms/better-form/better-form.component';
import {
    AccountsListBlock
} from './blocks/accounts-list/accounts-list.component';
import {
    Header
} from './blocks/header/header.component';
import {
    RequestRefViaSMSPage
} from './pages/request-ref-via-sms/request-ref-via-sms-page';
import {
    SharedFormDataService ,
    ApplicantGeneratorService ,
    AccountsListDataService
} from './shared';
const DECLARATIONS    = [
    AmpIntroBlockComponent ,
    AmpFormBlockComponent ,
    AmpOverlayComponent ,
    AmpLoadingComponent ,
    StickySaveButton,
    AccountsListBlock,
    Header,
    Footer
];
const routes : Routes = [
    { path : '' , component : BetterFormComponent },
    { path : 'confirmation' , component : NormalAccountPage },
    { path : 'confirmationWithConditionSingle' , component : PostnoneSingleAccountPage },
    { path : 'confirmationWithConditionJoint' , component : PostnoneJointAccountPage },
    { path : 'submitError/:errorId', component : SubmitErrorPage },
    { path : 'requestsms/:referenceId/:mobileNumber' , component : RequestRefViaSMSPage }
];
const IMPORTS         = [
    AmpRowRepeaterModule ,
    AmpFormRowModule ,
    AmpTooltipModule ,
    AmpButtonModule ,
    AmpTypeaheadModule ,
    AmpDropdownNewModule ,
    AmpPipesModule ,
    AmpDirectivesModule ,
    AmpQasAddressModule ,
    AmpGreenidModule ,
    AmpGoogleRecaptchaModule ,
    AmpInputsModule ,
    AmpErrorModule ,
    AmpCheckboxModule ,
    AmpTextareaModule ,
    AmpGroupButtonsModule ,
    AmpRadioButtonGroupModule ,
    AmpStandAloneMenuModule ,
    AmpLogoModule ,
    BrowserModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpModule ,
    RouterModule.forRoot( routes )
];
@NgModule( {
    declarations : [
        AppComponent ,
        BetterFormComponent ,
        ...DECLARATIONS
    ] ,
    imports      : IMPORTS ,
    providers    : [
        ...APP_RESOLVER_PROVIDERS ,
        SharedFormDataService ,
        ApplicantGeneratorService ,
        AccountsListDataService
    ] ,
    bootstrap    : [ AppComponent ]
} )
export class AppModule {
}
