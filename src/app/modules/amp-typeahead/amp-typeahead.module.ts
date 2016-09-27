import { NgModule } from '@angular/core';
import { AmpTypeaheadComponent } from './amp-typeahead.component.ts';
import { AmpDirectivesModule } from '../amp-directives/amp-directives.module';
import { AmpInputModule } from '../amp-input/amp-input.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
@NgModule( {
    declarations : [
        AmpTypeaheadComponent
    ] ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule ,
        AmpDirectivesModule ,
        AmpInputModule
    ] ,
    exports      : [ AmpTypeaheadComponent ]
} )
export class AmpTypeaheadModule {
}
