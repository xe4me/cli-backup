import { NgModule } from '@angular/core';
import { AmpStandAloneMenuComponent } from './components/amp-standalone-menu/amp-standalone-menu.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const DECLARATIONS = [ AmpStandAloneMenuComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpStandAloneMenuModule {
}
