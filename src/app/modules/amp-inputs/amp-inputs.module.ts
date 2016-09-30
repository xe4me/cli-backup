import { NgModule } from '@angular/core';
import { AmpInputComponent } from './components/amp-input/amp-input.component';
import { AmpContactNumberComponent } from './components/amp-contact-number/amp-contact-number.component';
import { AmpEmailComponent } from './components/amp-email/amp-email.component';
import { AmpFirstNameComponent } from './components/amp-first-name/amp-first-name.component';
import { AmpHomeNumberComponent } from './components/amp-home-number/amp-home-number.component';
import { AmpLastNameComponent } from './components/amp-last-name/amp-last-name.component';
import { AmpMobileNumberComponent } from './components/amp-mobile-number/amp-mobile-number.component';
import { AmpWorkNumberComponent } from './components/amp-work-number/amp-work-number.component';
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
        ReactiveFormsModule ,
        MdInputModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpInputsModule {
}