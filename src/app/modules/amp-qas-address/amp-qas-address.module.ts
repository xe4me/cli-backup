import { NgModule } from '@angular/core';
import { AmpQasAddressComponent , AmpQasAddressService , AmpManualAddressComponent } from './index';
import { AmpTypeaheadModule } from '../amp-typeahead/amp-typeahead.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AmpErrorModule } from '../amp-error/amp-error.module';
import { Http } from '@angular/http';
import { AmpInputsModule } from '../amp-inputs';
const DECLARATIONS = [
    AmpQasAddressComponent ,
    AmpManualAddressComponent
];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule ,
        AmpInputsModule ,
        AmpErrorModule ,
        AmpTypeaheadModule
    ] ,
    providers    : [ AmpQasAddressService , Http ] ,
    exports      : DECLARATIONS
} )
export class AmpQasAddressModule {
}
