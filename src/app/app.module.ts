import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';

import { BetterFormComponent } from './forms/better-form/better-form.component';
import {
    AmpTypeaheadModule ,
    AmpDropdownModule ,
    AmpPipesModule ,
    AmpDirectivesModule ,
    AmpQasAddressModule ,
    AmpInputsModule ,
    AmpCheckboxModule ,
    AmpTextareaModule ,
    AmpGroupButtonsModule ,
    AmpRadioButtonGroupModule ,
    AmpErrorModule
} from 'amp-ddc-components';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    AmpFormBlockComponent ,
    AMPGoogleAddressComponentGroup ,
    AmpFormRowComponent ,
    AmpButton ,
    AmpOverlayComponent ,
    FormService,
    AmpIntroBlockComponent
} from 'amp-ddc-components';
const PROVIDERS    = [
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
];
const DECLARATIONS = [
    AmpFormRowComponent,
    AmpIntroBlockComponent,
    AmpFormBlockComponent ,
    AmpOverlayComponent ,
];

const IMPORTS = [
    AmpTypeaheadModule ,
    AmpDropdownModule ,
    AmpPipesModule ,
    AmpDirectivesModule ,
    AmpQasAddressModule ,
    AmpInputsModule ,
    AmpErrorModule ,
    AmpCheckboxModule ,
    AmpTextareaModule ,
    AmpGroupButtonsModule ,
    AmpRadioButtonGroupModule ,
    BrowserModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpModule
];

@NgModule( {
    declarations : [
        AppComponent ,
        BetterFormComponent ,
        ...DECLARATIONS
    ] ,
    imports      : IMPORTS ,
    providers    : [
        ...APP_RESOLVER_PROVIDERS
    ] ,
    bootstrap    : [ AppComponent ]
} )
export class AppModule {
}
