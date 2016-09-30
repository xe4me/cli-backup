import { NgModule } from '@angular/core';
import { AmpRadioButtonGroupComponent } from './components/amp-radio-button-group/amp-radio-button-group.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const DECLARATIONS = [ AmpRadioButtonGroupComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpRadioButtonGroupModule {
}
