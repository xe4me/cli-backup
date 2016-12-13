import {
    Http,
    ConnectionBackend,
    BaseRequestOptions,
    Response,
    ResponseOptions
} from '@angular/http';
import {
    TestBed,
    inject,
    tick,
    fakeAsync
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { AmpHttpService } from '../../../../app/services/amp-http/amp-http.service';
import { AmpGreenIdServices } from '../../../../app/modules/amp-greenid-block/components/services/amp-greenid-service';
import { IGreenIdFormModel } from '../../../../app/modules/amp-greenid-block/components/interfaces/formModel';

// Skipped as the test has not been implemented correctly and is failing with an error
// GitLab issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/5
xdescribe('AmpGreenIdService', () => {
    const modelValue : IGreenIdFormModel = {
        firstName: 'John',
        lastName: 'Smith',
        middleNames: 'Danger',
        title: 'Mr',
        dateOfBirth: '27/11/2013',
        email: 'sample@test.com',
        verificationId: 'M1Crf19U',
        verificationStatus: 'VERIFIED',
        address: {
            country: 'AU',
            state: 'NSW',
            flatNumber: 'U 2',
            streetName: 'SURF',
            streetNumber: '53-57',
            suburb: 'SYDNEY',
            postcode: '2000',
            streetType: 'RD'
        }
    };

    beforeEach(() => {
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

    it('registerUser - should get the verification id via the services',
        fakeAsync(inject([AmpGreenIdServices, MockBackend], (ampGreenIdServices : AmpGreenIdServices, mockBackend : MockBackend) => {
            let res : Response;
            mockBackend.connections.subscribe(( c ) => {
                expect(c.request.url).toContain('/green-id/register');
                let response = new ResponseOptions({body: `[{"verificationId": "M1Crf19U"]`});
                c.mockRespond(new Response(response));
            });
            ampGreenIdServices.registerUser(modelValue).subscribe((response) => {
                res = response;
            });
            tick();
            expect(res[0].verificationId).toBe('M1Crf19U');
        }))
    );

    it('getToken - should get the token via the services',
        fakeAsync(inject([AmpGreenIdServices, MockBackend], (ampGreenIdServices : AmpGreenIdServices, mockBackend : MockBackend) => {
            const verificationId : string = 'M1Crf19U';
            let res : Response;

            mockBackend.connections.subscribe(( c ) => {
                expect(c.request.url).toContain('/green-id/token');
                let response = new ResponseOptions({body: `[{"verificationToken": "fee72af1cf0f1ccd0a7f7a2af8a69ecfb40da449"}]`});
                c.mockRespond(new Response(response));
            });
            ampGreenIdServices.getToken(verificationId).subscribe((response) => {
                res = response;
            });
            tick();
            expect(res[0].verificationToken).toBe('fee72af1cf0f1ccd0a7f7a2af8a69ecfb40da449');
        }))
    );
});
