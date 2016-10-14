import { async , ComponentFixture , TestBed, inject } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable, Output } from '@angular/core';
import { DomUtils } from '../../../app/modules/amp-utils/dom-utils';
import { By } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
describe( 'Dom Utils functions test' , () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {

            declarations : [
                TestComponent2
            ] ,
            providers    : [
                DomUtils,
                BrowserDomAdapter
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Dom Utils check if the div is found' , () => {
         let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
         let compiledTestComponentDiv = fixture.debugElement;
         let compiledNav = compiledTestComponentDiv.query( By.css( 'div.thisisaclass' ) );
         expect( compiledNav.nativeElement).toBeDefined();
    } );
    it( 'Dom Utils check if the div is found and has a class on it' , () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv = fixture.debugElement;
        let compiledNav = compiledTestComponentDiv.query( By.css( 'div' ) );
        expect( compiledNav.nativeElement).toBeDefined();
        let domUtils = new DomUtils();
        expect( domUtils.hasClass( compiledNav.nativeElement, 'thisisaclass')).toBe(true);
    } );
    it( 'Dom Utils check if the div is found and we can add a class to it' , () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv = fixture.debugElement;
        let compiledDiv = compiledTestComponentDiv.query( By.css( 'div' ) );
        let domUtils = new DomUtils();
        domUtils.addClass( compiledDiv.nativeElement, 'thisisaclass2');
        expect( domUtils.hasClass( compiledDiv.nativeElement, 'thisisaclass2')).toBe(true);
    } );
    it( 'Dom Utils check if the div is found and we have removed classes' , () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentDiv = fixture.debugElement;
        let compiledDiv = compiledTestComponentDiv.query( By.css( 'div' ) );
        let domUtils = new DomUtils();
        domUtils.removeClass( compiledDiv.nativeElement, 'thisisaclass');
        expect( domUtils.hasClass( compiledDiv.nativeElement, 'thisisaclass')).toBe(false);
    } );
} );

@Component( {
    template : `
    <div class="thisisaclass">hi, i'm a div</div>
    `
} )
class TestComponent2 {
    constructor( ) {

    }
}
