import { NgModule } from '@angular/core';
import {
    AmpInputComponent ,
    AmpContactNumberComponent ,
    AmpEmailComponent ,
    AmpFirstNameComponent ,
    AmpHomeNumberComponent ,
    AmpLastNameComponent ,
    AmpMobileNumberComponent ,
    AmpWorkNumberComponent
} from './index';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdInputModule } from '@angular2-material/input';
const DECLARATIONS = [
    AmpInputComponent ,
    AmpContactNumberComponent ,
    AmpEmailComponent ,
    AmpFirstNameComponent ,
    AmpHomeNumberComponent ,
    AmpLastNameComponent ,
    AmpMobileNumberComponent ,
    AmpWorkNumberComponent
];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule,
        MdInputModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpInputsModule {
}
