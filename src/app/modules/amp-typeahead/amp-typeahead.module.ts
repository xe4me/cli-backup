import { NgModule } from '@angular/core';
import { AmpTypeaheadComponent } from './index';
import { AmpDirectivesModule } from '../amp-directives';
import { AmpInputsModule } from '../amp-inputs';
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
