import { NgModule } from '@angular/core';
import { AmpQasAddressComponent } from './amp-qas-address.component';
import { AmpQasAddressService } from './amp-qas-address.service';
import { AmpTypeaheadModule } from '../amp-typeahead/amp-typeahead.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AmpErrorModule } from '../amp-error/amp-error.module';
import { Http } from '@angular/http';
@NgModule( {
    declarations : [
        AmpQasAddressComponent
    ] ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule ,
        AmpErrorModule ,
        AmpTypeaheadModule
    ] ,
    providers    : [ AmpQasAddressService , Http ] ,
    exports      : [ AmpQasAddressComponent ]
} )
export class AmpQasAddressModule {
}
