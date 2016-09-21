import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { BetterFormComponent } from './forms/better-form/better-form.component';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    AmpFormBlockComponent ,
    AMPGoogleAddressComponentGroup ,
    AmpInputComponent ,
    AmpFormRowComponent ,
    AmpFirstNameComponent ,
    AmpLastNameComponent ,
    AmpContactNumberComponent ,
    AmpEmailComponent ,
    AmpDropdownComponent ,
    AmpCheckboxComponent ,
    AmpButton ,
    AmpOverlayComponent ,
    AmpLinearProgressBarComponent ,
    AmpErrorComponent ,
    AmpTextareaComponent ,
    AmpGroupButtonsComponent ,
    AmpRadioButtonGroupComponent ,
    FormService,
    AmpHomeNumberComponent,
    AmpIntroBlockComponent
} from "amp-ddc-components";
const PROVIDERS    = [
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
];
const DECLARATIONS = [
    AmpIntroBlockComponent,
    AmpFormBlockComponent ,
    AMPGoogleAddressComponentGroup ,
    AmpInputComponent ,
    AmpFormRowComponent ,
    AmpFirstNameComponent ,
    AmpLastNameComponent ,
    AmpContactNumberComponent ,
    AmpEmailComponent ,
    AmpDropdownComponent ,
    AmpCheckboxComponent ,
    AmpButton ,
    AmpOverlayComponent ,
    AmpLinearProgressBarComponent ,
    AmpErrorComponent ,
    AmpTextareaComponent ,
    AmpGroupButtonsComponent ,
    AmpRadioButtonGroupComponent ,
    AmpHomeNumberComponent
];
@NgModule( {
    declarations : [
        AppComponent ,
        BetterFormComponent ,
        ...DECLARATIONS
    ] ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule ,
        HttpModule
    ] ,
    providers    : [
        ...APP_RESOLVER_PROVIDERS
    ] ,
    bootstrap    : [ AppComponent ]
} )
export class AppModule {
}
