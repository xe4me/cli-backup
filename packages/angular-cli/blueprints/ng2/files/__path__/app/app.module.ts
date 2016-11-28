import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';<% if (routing) { %>
import { AppRoutingModule } from './app-routing.module';<% } %>
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    FormModelService,
    ScrollService,
    ProgressObserverService,
    AmpHttpService,
    FormSectionService
} from 'amp-ddc-components';


import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    HttpModule<% if (routing) { %>,
    AppRoutingModule<% } %>
  ],
providers : [
    FormModelService,
    ScrollService,
    ProgressObserverService,
    AmpHttpService,
    FormSectionService,
    BrowserDomAdapter
],
  bootstrap: [AppComponent]
})
export class AppModule { }



