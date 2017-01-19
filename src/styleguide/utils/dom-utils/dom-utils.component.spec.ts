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
        let domUtils = new DomUtils();
        expect( domUtils.hasClass( compiledNav.nativeElement, 'thisisaclass' ) ).toBe( true );
    } );

    it( 'Dom Utils check if the div is found and we can add a class to it', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        let domUtils                                   = new DomUtils();
        domUtils.addClass( compiledDiv.nativeElement, 'thisisaclass2' );
        expect( domUtils.hasClass( compiledDiv.nativeElement, 'thisisaclass2' ) ).toBe( true );
    } );

    it( 'Dom Utils check if the div is found and we have removed classes', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        let domUtils                                   = new DomUtils();
        domUtils.removeClass( compiledDiv.nativeElement, 'thisisaclass' );
        expect( domUtils.hasClass( compiledDiv.nativeElement, 'thisisaclass' ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (display property)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-1' ) );
        let domUtils                                   = new DomUtils();
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (opacity property)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-2' ) );
        let domUtils                                   = new DomUtils();
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (height property)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-3' ) );
        let domUtils                                   = new DomUtils();
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils check if the div is visible (hidden attribute)', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-4' ) );
        let domUtils                                   = new DomUtils();
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils hide element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
        let domUtils                                   = new DomUtils();
        domUtils.hide( compiledDiv.nativeElement );
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils show element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-isvisibile-4' ) );
        let domUtils                                   = new DomUtils();
        domUtils.show( compiledDiv.nativeElement );
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( true );
    } );

    it( 'Dom Utils toggle hiding element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-toggle-hide' ) );
        let domUtils                                   = new DomUtils();
        domUtils.toggle( compiledDiv.nativeElement );
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( false );
    } );

    it( 'Dom Utils toggle showing element', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-toggle-show' ) );
        let domUtils                                   = new DomUtils();
        domUtils.toggle( compiledDiv.nativeElement );
        expect( domUtils.isVisible( compiledDiv.nativeElement ) ).toBe( true );
    } );

    it( 'should NOT find any closest element from string selector', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-closest-child' ) );
        let domUtils                                   = new DomUtils();
        expect( domUtils.closest( compiledDiv.nativeElement, '.test-does-not-exist' ) ).toBeNull();
    } );

    it( 'should find the closest ancestor from string selector', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-closest-child' ) );
        let domUtils                                   = new DomUtils();
        let parentClassName                            = 'test-closest-parent';
        let parentEl                                   = domUtils.closest( compiledDiv.nativeElement, '.' + parentClassName );
        expect( domUtils.hasClass(parentEl, parentClassName) ).toBe( true );
    } );

    it( 'should find a previous ancestor from string selector', () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv                   = fixture.debugElement;
        let compiledDiv                                = compiledTestComponentDiv.query( By.css( 'div.test-closest-child' ) );
        let domUtils                                   = new DomUtils();
        let parentClassName                            = 'test-closest-grandparent';
        let parentEl                                   = domUtils.closest( compiledDiv.nativeElement, '.' + parentClassName );
        expect( domUtils.hasClass(parentEl, parentClassName) ).toBe( true );
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
