/* tslint:disable:no-unused-variable */
import {
    TestBed,
    async
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { Renderer } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { AMP_DDC_MODULES } from './app.modules';
import { AMP_DDC_PROVIDERS } from './app.providers';
import { DECLARATIONS } from './app.declarations';
import { AppRoutingModule } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
describe( 'AppComponent', () => {
    beforeEach( () => {
        TestBed.configureTestingModule( {
            imports      : [
                ...AMP_DDC_MODULES,
                BrowserModule,
                FormsModule,
                HttpModule,
                ReactiveFormsModule,
                AppRoutingModule
            ],
            providers    : [
                {
                    provide  : APP_BASE_HREF,
                    useValue : '/'
                },
                ...AMP_DDC_PROVIDERS,
                <any>Renderer,
                BrowserDomAdapter
            ],
            declarations : DECLARATIONS,
        } );
    } );

    it( 'should create the app', async( () => {
        let fixture = TestBed.createComponent( AppComponent );
        let app     = fixture.debugElement.componentInstance;
        expect( app ).toBeTruthy();
    } ) );

    it( `should have as title 'app , welcome to your new DDC experience!'`, async( () => {
        let fixture = TestBed.createComponent( AppComponent );
        let app     = fixture.debugElement.componentInstance;
        expect( app.title ).toEqual( '<%= prefix %> , welcome to your new DDC experience!' );

    } ) );
} );
