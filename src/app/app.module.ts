import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,
         ReactiveFormsModule
} from '@angular/forms';
import { Routes,
         RouterModule
} from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import {
    StickyProgressHeaderBlockComponent
} from './blocks/sticky-progress-header-block/sticky-progress-header-block.component';

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
    AmpErrorModule,
    AmpButtonModule,
    FormBlock,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    AmpFormBlockComponent ,
    AMPGoogleAddressComponentGroup ,
    AmpFormRowComponent ,
    AmpButton ,
    AmpOverlayComponent ,
    FormService,
    AmpIntroBlockComponent,
    AmpRowRepeaterModule,
    AmpFormRowModule,
    AmpStandAloneMenuModule
} from 'amp-ddc-components';
import {
    SharedFormDataService
} from './shared/shared-form-data.service';
const PROVIDERS    = [
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
];
const DECLARATIONS = [
    AmpIntroBlockComponent,
    AmpFormBlockComponent ,
    AmpOverlayComponent,
    StickyProgressHeaderBlockComponent
];

const routes : Routes = [
    { path: '', component: BetterFormComponent },
];

const IMPORTS = [
    AmpRowRepeaterModule,
    AmpFormRowModule,
    AmpButtonModule,
    AmpTypeaheadModule,
    AmpDropdownModule,
    AmpPipesModule,
    AmpDirectivesModule,
    AmpQasAddressModule,
    AmpInputsModule,
    AmpErrorModule,
    AmpCheckboxModule,
    AmpTextareaModule,
    AmpGroupButtonsModule,
    AmpRadioButtonGroupModule,
    AmpStandAloneMenuModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
        ...APP_RESOLVER_PROVIDERS,
        SharedFormDataService
    ] ,
    bootstrap    : [ AppComponent ]
} )
export class AppModule {
}
