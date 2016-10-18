
import { async , ComponentFixture , TestBed, inject } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable, Output } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup, FormBuilder } from '@angular/forms';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
describe( 'Green id unit tests' , () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ AmpGreenidBlockComponent ] ,
            declarations : [

            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true },
                { provide : AmpGreenidBlockComponent , useClass: TestComponent2 },
                BrowserDomAdapter
            ]
        } );
        TestBed.compileComponents();
    } ) );

});
class MockElementRef implements ElementRef {
    nativeElement = {};
}
class TestComponent2 {

    constructor() {

    }

}
