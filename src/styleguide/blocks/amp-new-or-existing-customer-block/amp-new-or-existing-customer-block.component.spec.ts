import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpNewOrExistingCustomerBlockModule } from '../../../app/modules/amp-new-or-existing-customer-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

function loadComponent () {
    fixture = TestBed.createComponent( TestComponent );
    fixture.detectChanges();
    component  = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement  = fixture.debugElement;
}

describe( 'amp-new-or-existing-customer-block component', () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, AmpNewOrExistingCustomerBlockModule, HttpModule ],
            declarations : [ TestComponent ],
            providers    : [
                ...APP_RESOLVER_PROVIDERS
            ]
        } );
    } ) );

    describe( 'When the component is loaded', () => {
        it( 'the component should be defined', () => {
            loadComponent();
            expect( component ).toBeDefined();
        } );
    } );

} );

@Component( {
    template : `
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
        this.block.__fdn          = [ 'Application' ];
        this.block.__controlGroup = new FormGroup( {} );

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
