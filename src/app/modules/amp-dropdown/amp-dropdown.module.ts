import { NgModule } from '@angular/core';
import { AmpDropdownComponent } from './index';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AmpDirectivesModule } from '../amp-directives';
const DECLARATIONS = [ AmpDropdownComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        AmpDirectivesModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpDropdownModule {
}
