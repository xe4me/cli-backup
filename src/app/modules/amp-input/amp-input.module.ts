import { NgModule } from '@angular/core';
import { AmpInputComponent } from "./amp-input.component";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
@NgModule( {
    declarations : [
        AmpInputComponent
    ] ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : [ AmpInputComponent ]
} )
export class AmpInputModule {
}
