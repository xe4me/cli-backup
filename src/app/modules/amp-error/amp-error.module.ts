import { NgModule } from '@angular/core';
import { AmpErrorItemComponent , AmpErrorComponent } from './index';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AmpPipesModule } from '../amp-pipes';
const DECLARATIONS = [ AmpErrorItemComponent , AmpErrorComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpPipesModule ,
        BrowserModule ,
        FormsModule ,
        ReactiveFormsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpErrorModule {
}
