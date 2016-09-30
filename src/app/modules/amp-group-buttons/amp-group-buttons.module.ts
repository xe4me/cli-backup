import { NgModule } from '@angular/core';
import { AmpGroupButtonsComponent } from './components/amp-group-buttons/amp-group-buttons.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const DECLARATIONS = [ AmpGroupButtonsComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpGroupButtonsModule {
}
