import { NgModule } from '@angular/core';
import { AmpErrorItemComponent , AmpErrorComponent } from "./amp-error.component";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
@NgModule( {
    declarations : [
        AmpErrorComponent ,
        AmpErrorItemComponent
    ] ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : [
        AmpErrorComponent ,
        AmpErrorItemComponent
    ]
} )
export class AmpErrorModule {
}
