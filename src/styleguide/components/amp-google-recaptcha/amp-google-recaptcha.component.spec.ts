
import { async , ComponentFixture , TestBed, inject } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable, Output } from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { By } from '@angular/platform-browser';

import { AmpReCaptchaService } from '../../../app/modules/amp-google-recaptcha/services/amp-recaptcha.service';
import { AmpReCaptchaComponent } from '../../../app/modules/amp-google-recaptcha/components/amp-recaptcha.component';
import { AmpGoogleRecaptchaModule } from '../../../app/modules/amp-google-recaptcha/amp-google-recaptcha.module';

describe( 'amp-google-recaptcha service' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ AmpGoogleRecaptchaModule ]
        } );
        TestBed.compileComponents();
    } ) );

    it('should load the Google Recaptcha API script', inject([AmpReCaptchaService], (captchaService) => {
        let myCaptchaService = captchaService;
        expect(myCaptchaService).toBeDefined();
        expect(myCaptchaService.scriptLoaded).toBe(false);
        myCaptchaService.loadScript(null);
        expect(myCaptchaService.scriptLoaded).toBe(true);
    } ) );

});

describe( 'amp-google-recaptcha component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ AmpGoogleRecaptchaModule ] ,
            declarations : [
                AmpGoogleRecaptchaTest
            ] ,
            providers    : [
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ]
        } );
        TestBed.compileComponents();
    } ) );

    it('Should create the amp google recaptcha component', () => {
        let fixture : ComponentFixture<AmpGoogleRecaptchaTest> = TestBed.createComponent(AmpGoogleRecaptchaTest);
        fixture.detectChanges();
        let Element = fixture.nativeElement;
        let ampGoogleRecaptchaTest = fixture.debugElement;
        let Component = ampGoogleRecaptchaTest.componentInstance;
        let myRecaptcha = Component.myRecaptcha;
        expect(myRecaptcha.id).toBe('amp-google-recaptcha-check');
        expect(myRecaptcha.sitekey).toBe('6LcWZwsUAAAAABf92GVXFx5XqcINVs8vBfK_fx1W');
    });
});

// test a public method inside the class
@Component( {
    template : `
    <amp-google-recaptcha #myRecaptcha data-sitekey="6LcWZwsUAAAAABf92GVXFx5XqcINVs8vBfK_fx1W"></amp-google-recaptcha>
    `
} )
class AmpGoogleRecaptchaTest {
    @ViewChild( 'myRecaptcha' ) myRecaptcha;
    constructor(private _elementRef : ElementRef) {
    }
}
