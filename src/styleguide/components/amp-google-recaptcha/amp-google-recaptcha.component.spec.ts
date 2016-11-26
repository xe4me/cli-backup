import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpGoogleRecaptchaModule } from '../../../app/modules/amp-google-recaptcha/amp-google-recaptcha.module';

describe( 'amp-google-recaptcha component', () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports : [ AmpGoogleRecaptchaModule ],
            declarations : [
                AmpGoogleRecaptchaTest
            ],
            providers : [
                { provide : Window, useClass : window },
                { provide : ComponentFixtureAutoDetect, useValue : true }
            ]
        } );
        TestBed.compileComponents();
    } ) );

    it( 'Should create the amp google recaptcha component', () => {
        let fixture : ComponentFixture<AmpGoogleRecaptchaTest> = TestBed.createComponent( AmpGoogleRecaptchaTest );
        fixture.detectChanges();
        let Element = fixture.nativeElement;
        let ampGoogleRecaptchaTest = fixture.debugElement;
        let Component = ampGoogleRecaptchaTest.componentInstance;
        let myRecaptcha = Component.myRecaptcha;
        expect( myRecaptcha.id ).toBe( 'amp-google-recaptcha-check' );
        expect( myRecaptcha.sitekey ).toBe( '6LcWZwsUAAAAABf92GVXFx5XqcINVs8vBfK_fx1W' );
    } );
} );

@Component( {
    template : `
    <amp-google-recaptcha #myRecaptcha data-sitekey="6LcWZwsUAAAAABf92GVXFx5XqcINVs8vBfK_fx1W"></amp-google-recaptcha>
    `
} )
class AmpGoogleRecaptchaTest {
    @ViewChild( 'myRecaptcha' ) myRecaptcha;

    constructor( private _elementRef : ElementRef ) {
    }
}
