import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Routes , RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { StickyProgressHeaderBlockComponent } from './blocks/sticky-progress-header-block/sticky-progress-header-block.component';
import { BetterFormComponent } from './forms/better-form/better-form.component';
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
    AmpRowRepeaterModule ,
    AmpFormRowModule ,
    AmpStandAloneMenuModule ,
    AmpGreenidModule
} from 'amp-ddc-components';
// the bellow import will be replaced with a proper one as soon as we completely remove amp-dropdown and moved to
// the new one
import { AmpDropdownNewModule } from 'amp-ddc-components/src/app/modules/amp-dropdown-new';
import { SharedFormDataService , ApplicantGeneratorService } from './shared';
const DECLARATIONS    = [
    AmpIntroBlockComponent ,
    AmpFormBlockComponent ,
    AmpOverlayComponent ,
    StickyProgressHeaderBlockComponent
];
const routes : Routes = [
    { path : '' , component : BetterFormComponent } ,
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
    AmpInputsModule ,
    AmpErrorModule ,
    AmpCheckboxModule ,
    AmpTextareaModule ,
    AmpGroupButtonsModule ,
    AmpRadioButtonGroupModule ,
    AmpStandAloneMenuModule ,
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
        ApplicantGeneratorService
    ] ,
    bootstrap    : [ AppComponent ]
} )
export class AppModule {
}
