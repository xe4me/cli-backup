import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { DomUtils } from '../../../app/modules/amp-utils/dom-utils';
import { By } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

describe( 'Dom Utils functions test', () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {

            declarations : [
                TestComponent2
            ],
            providers    : [
                DomUtils,
                BrowserDomAdapter
            ]
        } );
        TestBed.compileComponents();
    } ) );

    it( 'Dom Utils check if the div is found', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledNav                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        expect( compiledNav.nativeElement ).toBeDefined();
    } );

    it( 'Dom Utils check if the div is found and has a class on it', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledNav                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        expect( compiledNav.nativeElement ).toBeDefined();

        expect( DomUtils.hasClass( compiledNav.nativeElement, 'thisisaclass' ) ).toBe( true );
    } );

    it( 'Dom Utils check if the div is found and we can add a class to it', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        DomUtils.addClass( compiledDiv.nativeElement, 'thisisaclass2' );
        expect( DomUtils.hasClass( compiledDiv.nativeElement, 'thisisaclass2' ) ).toBe( true );
    } );

    it( 'Dom Utils check if the div is found and we have removed classes', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        DomUtils.removeClass( compiledDiv.nativeElement, 'thisisaclass' );
        expect( DomUtils.hasClass( compiledDiv.nativeElement, 'thisisaclass' ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (display property)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-1' ) );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (opacity property)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-2' ) );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (height property)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-3' ) );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (hidden attribute)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-4' ) );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils hide element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        DomUtils.hide( compiledDiv.nativeElement );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils show element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-4' ) );
        DomUtils.show( compiledDiv.nativeElement );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( true );
    } );

    it( 'Dom Utils toggle hiding element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-toggle-hide' ) );
        DomUtils.toggle( compiledDiv.nativeElement );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils toggle showing element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-toggle-show' ) );
        DomUtils.toggle( compiledDiv.nativeElement );
        expect( DomUtils.isVisible( compiledDiv.nativeElement ) ).toBe( true );
    } );

    it( 'should NOT find any closest element from string selector', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-closest-child' ) );
        expect( DomUtils.closest( compiledDiv.nativeElement, '.test-does-not-exist' ) ).toBeNull();
    } );

    it( 'should find the closest ancestor from string selector', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-closest-child' ) );
        let parentClassName                            = 'test-closest-parent';
        let parentEl                                   = DomUtils.closest( compiledDiv.nativeElement, '.' + parentClassName );
        expect( DomUtils.hasClass(parentEl, parentClassName) ).toBe( true );
    } );

    it( 'should find a previous ancestor from string selector', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-closest-child' ) );
        let parentClassName                            = 'test-closest-grandparent';
        let parentEl                                   = DomUtils.closest( compiledDiv.nativeElement, '.' + parentClassName );
        expect( DomUtils.hasClass(parentEl, parentClassName) ).toBe( true );
    } );
} );

@Component( {
    template : `
    <div class="thisisaclass">hi, i'm a div</div>
    <div class="test-isvisibile-1" style="display: none">hi, i'm a div</div>
    <div class="test-isvisibile-2" style="opacity: 0">hi, i'm a div</div>
    <div class="test-isvisibile-3" style="height: 0">hi, i'm a div</div>
    <div class="test-isvisibile-4" hidden>hi, i'm a div</div>
    <div class="test-toggle-hide">hi, i'm a div</div>
    <div class="test-toggle-show" hidden>hi, i'm a div</div>
    <div class="test-closest-grandparent">
        <div class="test-closest-parent">
            <div class="test-closest-child">hi, i'm a child div</div>
        </div>
    </div>
    `
} )
class TestComponent2 {
    constructor () {

    }
}
