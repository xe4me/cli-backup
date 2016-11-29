import { AmpBlockLoaderDirective } from 'amp-ddc-components/src/app/amp-block-loader.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { AppComponent } from './app.component';
import { AMP_DDC_MODULES } from './app.modules';
import { AMP_DDC_PROVIDERS } from './app.providers';
import { DYNAMIC_BLOCKS } from './app.dynamic-blocks';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
import { AppRoutingModule } from './app.routes';
@NgModule( {
    declarations : [
        ...DYNAMIC_BLOCKS,
        AmpBlockLoaderDirective,
        ApplicationFormComponent,
        AppComponent
    ],
    imports : [
        ...AMP_DDC_MODULES,
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    entryComponents:DYNAMIC_BLOCKS,
    providers : [
        ...AMP_DDC_PROVIDERS,
        BrowserDomAdapter
    ],
    bootstrap : [ AppComponent ]
} )
export class AppModule {
}



