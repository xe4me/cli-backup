import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';<% if (routing) { %>
import { AppRoutingModule } from './app-routing.module';<% } %>
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { AppComponent } from './app.component';
import { AMP_DDC_MODULES } from './app.modules';
import { AMP_DDC_PROVIDERS } from './app.providers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...AMP_DDC_MODULES,
    BrowserModule,
    FormsModule,
    HttpModule<% if (routing) { %>,
    AppRoutingModule<% } %>
  ],
providers : [
    ...AMP_DDC_PROVIDERS,
    BrowserDomAdapter
],
  bootstrap: [AppComponent]
})
export class AppModule { }



