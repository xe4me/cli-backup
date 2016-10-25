
import { async , ComponentFixture , TestBed, inject } from '@angular/core/testing';
// import {tick, fakeAsync} from '@angular/core/esm/testing/fake_async';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable, Output } from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { By } from '@angular/platform-browser';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import {AmpHttpService} from '../../../app/services/amp-http/amp-http.service';

/*

This test is failing DUE an error with the fakeAsync module not being imported

describe('AmpGreenIdServices - getTheToken', () => {
    beforeEach(() => {

        const modelValue = {
            firstName: 'John',
            lastName: 'Smith',
            middleNames: 'Danger',
            honorific: 'Mr',
            dateOfBirth2: '27/11/2013',
            dateOfBirth:  '2001-04-12',
            email: 'sample@test.com',
            verificationId: 'fred',
            verificationToken: 'fred',
            verficationStatus: 'fred',
            address: {
                country: 'AU',
                state: 'NSW',
                streetName: 'SMITH',
                flatNumber: 'U 2',
                streetNumber: '53-57',
                suburb: 'SYDNEY'
            }
        };

        TestBed.configureTestingModule({
            imports: [AmpHttpService],
            providers: [
                {
                    provide : Http, useFactory : (backend : ConnectionBackend, defaultOptions : BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps : [MockBackend, BaseRequestOptions]
                },
                {provide : AmpHttpService, useClass : AmpHttpService},
                {provide : MockBackend, useClass : MockBackend},
                {provide : BaseRequestOptions, useClass : BaseRequestOptions}
            ]
        });
    });

    it('should get the token via the services',
        fakeAsync(inject([AmpGreenIdServices, MockBackend], (ampGreenIdServices : AmpGreenIdServices, mockBackend : MockBackend) => {
            let res : Response;
            mockBackend.connections.subscribe(( c ) => {
                expect(c.request.url).toBe('http://localhost:8082/ddc/public/api/green-id/registerVerification');
                let response = new ResponseOptions({body: `[{"verificationId": "M1Crf19U", "verificationToken": "fee72af1cf0f1ccd0a7f7a2af8a69ecfb40da449"}]`});
                c.mockRespond(new Response(response));
            });
            ampGreenIdServices.getTheToken(this.modelValue).subscribe((response) => {
                res = response;
            });
            tick();
            expect(res[0].verificationId).toBe('M1Crf19U');
        }))
    );
});*/
