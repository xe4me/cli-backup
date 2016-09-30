import { NgModule } from '@angular/core';
import { AmpTypeaheadComponent } from './components/amp-typeahead/amp-typeahead.component';
import { AmpDirectivesModule } from '../amp-directives/amp-directives.module';
import { AmpInputsModule } from '../amp-inputs/amp-inputs.module';
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
        AmpInputsModule
    ] ,
    exports      : [ AmpTypeaheadComponent ]
} )
export class AmpTypeaheadModule {
}
