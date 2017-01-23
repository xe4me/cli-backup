import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmpButton } from '../../../app/modules/amp-button/components/amp-button/amp-button.component';
import { AmpConfirmationPageComponent } from '../../../app/pages/amp-confirmation-page/amp-confirmation-page.component';

import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

function loadComponent () {
    fixture = TestBed.createComponent( TestComponent );
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;
}

describe( 'amp-confirmation-page component', () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [ FormsModule, HttpModule ],
            declarations: [ AmpConfirmationPageComponent, AmpButton, TestComponent ],
            providers: [ ...APP_RESOLVER_PROVIDERS ]
        } );
    } ) );

    describe( 'When the component is loaded', () => {
        it( 'the component should be defined with one control for each input', () => {
            loadComponent();
            expect( component ).toBeDefined();
        } );
    } );

    describe( 'Block title', () => {
        describe( 'when a title has been defined', () => {
            it( 'should not have the block title h3', () => {
                loadComponent();
                const titleEl = domElement.querySelector( 'h3' );
                expect( titleEl ).toBeDefined();
                expect( titleEl.textContent ).toEqual( 'My title' );

            } );
        } );
    } );
} );

@Component( {
    template: `
        <div class="amp-confirmation-page">
            <amp-confirmation-page title="My title">
            </amp-confirmation-page>
        </div>
    `
} )
class TestComponent {

}
