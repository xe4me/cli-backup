import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmpButton } from '../../../app/modules/amp-button/components/amp-button/amp-button.component';
import { AmpHeaderNoTextComponent } from '../../../app/modules/amp-header/components/amp-header-no-text/amp-header-no-text.component';
import { AmpLogoComponent } from '../../../app/modules/amp-logo/components/amp-logo/amp-logo.component';
import { AmpTransitioningAccountPageComponent } from '../../../app/pages/amp-transitioning-account-page/amp-transitioning-account-page.component';

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

describe( 'amp-transitioning-account-page component', () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [ FormsModule, HttpModule ],
            declarations: [ AmpTransitioningAccountPageComponent, AmpButton, TestComponent, AmpHeaderNoTextComponent, AmpLogoComponent ],
            providers: [ ...APP_RESOLVER_PROVIDERS ]
        } );
    } ) );

    describe( 'When the component is loaded', () => {
        it( 'the component should be defined with one control for each input', () => {
            loadComponent();
            expect( component ).toBeDefined();
        } );
        it( 'the component should contain an amp-header-no-text', () => {
            loadComponent();
            expect( domElement.querySelector( 'amp-header-no-text' ) ).toBeDefined();
        } );
        it( 'the component should contain an amp-button', () => {
            loadComponent();
            expect( domElement.querySelector( 'amp-button' ) ).toBeDefined();
        } );
    } );

    describe( 'Block title', () => {
        describe( 'when a title has been passed to the component as an input', () => {
            it( 'should display the title in a h3 tag', () => {
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
        <div class="amp-transitioning-account-page">
            <amp-transitioning-account-page title="My title">
            </amp-transitioning-account-page>
        </div>
    `
} )
class TestComponent {

}
