import { NgModule } from '@angular/core';
import { AmpTextareaComponent } from './components/amp-textarea/amp-textarea.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const DECLARATIONS = [ AmpTextareaComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpTextareaModule {
}
