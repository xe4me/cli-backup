import { BrowserModule } from '@angular/platform-browser';
import {
    NgModule,
    Renderer
} from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { AppComponent } from './app.component';
import { AMP_DDC_MODULES } from './app.modules';
import { AMP_DDC_PROVIDERS } from './app.providers';
import { DYNAMIC_BLOCKS } from './app.dynamic-blocks';
import { DECLARATIONS } from './app.declarations';
import { AppRoutingModule } from './app.routes';

@NgModule( {
    declarations: DECLARATIONS,
    imports: [
        ...AMP_DDC_MODULES,
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    entryComponents: DYNAMIC_BLOCKS,
    providers: [
        ...AMP_DDC_PROVIDERS,
        <any> Renderer,
        BrowserDomAdapter
    ],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
}
