
import { async , ComponentFixture , TestBed, inject } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable, Output } from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { By } from '@angular/platform-browser';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import {AmpHttpService} from "../../../app/services/amp-http/amp-http.service";
describe( 'Green id unit tests' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [
                TestComponent2
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true },
                { provide : AmpGreenidBlockComponent , useClass: TestComponent2 },
                { provide : AmpGreenIdServices , useClass: TestComponent2 },
                BrowserDomAdapter

            ]
        } );
        //this.ampGreenIdServices = new AmpGreenIdServices();
        TestBed.compileComponents();
    } ) );
    it( 'greenid service is defined' , () => {
       //console.log(this.ampGreenIdServices);
        //let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        //fixture.detectChanges();
      /*  let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        fixture.detectChanges();*/
    } );
});
class MockElementRef implements ElementRef {
    nativeElement = {};
}
@Component( {
    template : `
    <div class="thisisaclass">hi, i'm a div</div>
    `
} )
class TestComponent2 extends AmpGreenIdServices {

    constructor( ) {
        super(null);
    }
}
