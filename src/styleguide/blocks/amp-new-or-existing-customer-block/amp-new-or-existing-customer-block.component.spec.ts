import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpNewOrExistingCustomerBlockModule } from '../../../app/modules/amp-new-or-existing-customer-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

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

fdescribe( 'amp-new-or-existing-customer-block component', () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [ FormsModule, AmpNewOrExistingCustomerBlockModule, HttpModule ],
            declarations: [ TestComponent ],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        } );
        custom = {
            controls : [ { id : 'ampNewOrExistingCustomer' } ]
        };
    } ) );

    describe( 'When the component is loaded', () => {
        it( 'the component should be defined with one control for each input', () => {
            loadComponent();
            expect( component ).toBeDefined();
        } );
    } );

    describe( 'Block title', () => {
        describe( 'when no block title has been defined', () => {
            it( 'should not have the block title h2', () => {
                loadComponent();
                const titleEl = domElement.querySelector( 'h2' );
                expect( titleEl ).toBe( null );
            } );
        } );
        describe( 'when a block title has been defined', () => {
            it( 'should display the given title', () => {
                custom.blockTitle = 'My NewOrExistingCustomer block title';
                loadComponent();
                const titleEl = domElement.querySelector( 'h2' );
                expect( titleEl ).toBeDefined();
                expect( titleEl.textContent ).toEqual( 'My NewOrExistingCustomer block title' );
            } );
        } );
    } );

    describe( 'New button label', () => {
        describe( 'when no lavel has been defined', () => {
            it( 'should have the default value', () => {
                loadComponent();
                const button = domElement.querySelector( '#newButton' );
                expect( button ).toBeDefined();
                expect( button.textContent.trim() ).toEqual( 'New' );
            } );
        } );
        describe( 'when a block title has been defined', () => {
            it( 'should display the given title', () => {
                custom.newButtonLabel = 'custom label';
                loadComponent();
                const button = domElement.querySelector( '#newButton' );
                expect( button ).toBeDefined();
                expect( button.textContent.trim() ).toEqual( 'custom label' );
            } );
        } );
    } );

    describe( 'Existing button label', () => {
        describe( 'when no lavel has been defined', () => {
            it( 'should have the default value', () => {
                loadComponent();
                const button = domElement.querySelector( '#existingButton' );
                expect( button ).toBeDefined();
                expect( button.textContent.trim() ).toEqual( 'Existing' );
            } );
        } );
        describe( 'when a block title has been defined', () => {
            it( 'should display the given title', () => {
                custom.existingButtonLabel = 'custom label 2';
                loadComponent();
                const button = domElement.querySelector( '#existingButton' );
                expect( button ).toBeDefined();
                expect( button.textContent.trim() ).toEqual( 'custom label 2' );
            } );
        } );
    } );

} );

@Component( {
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="amp-new-or-existing-customer-block">
            <amp-new-or-existing-customer-block #block>
            </amp-new-or-existing-customer-block>
        </div>
    </form>
    `
} )
class TestComponent implements OnInit {

    @ViewChild( 'block' ) block;

    ngOnInit () {
        this.block.__fdn = [ 'Application' ];
        this.block.__custom = custom;
        this.block.__controlGroup = new FormGroup( {} );

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
