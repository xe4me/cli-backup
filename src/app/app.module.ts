import { BrowserModule } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    NgModule,
    Renderer
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DYNAMIC_BLOCKS } from './app.dynamic-blocks';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { AMP_DDC_MODULES } from './app.modules';
import { AppRoutingModule } from './app.routes';
import { DECLARATIONS } from './app.declarations';
import { TransformService } from 'amp-ddc-components';
import { Bett3rTransformService } from './shared/transform-model/bett3r-transform.service';

const IMPORTS = [
    ...AMP_DDC_MODULES,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
];

@NgModule( {
    declarations    : [
        ...DECLARATIONS
    ],
    imports         : IMPORTS,
    entryComponents : DYNAMIC_BLOCKS,
    providers       : [
        <any> Renderer,
        BrowserDomAdapter,
        ...APP_RESOLVER_PROVIDERS,
        { provide : TransformService, useClass : Bett3rTransformService }
    ],
    bootstrap       : [ AppComponent ]
} )
export class AppModule {
}
