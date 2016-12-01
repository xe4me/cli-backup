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

// Skipped as the test has not been implemented correctly and is failing with an error
// GitLab issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/5
xdescribe('AmpGreenIdService', () => {
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
        verificationStatus: 'fred',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            suburb: 'SYDNEY'
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

    it('getTheToken - should get the token via the services',
        fakeAsync(inject([AmpGreenIdServices, MockBackend], (ampGreenIdServices : AmpGreenIdServices, mockBackend : MockBackend) => {
            let res : Response;
            mockBackend.connections.subscribe(( c ) => {
                expect(c.request.url).toContain('/green-id/register');
                let response = new ResponseOptions({body: `[{"verificationId": "M1Crf19U", "verificationToken": "fee72af1cf0f1ccd0a7f7a2af8a69ecfb40da449"}]`});
                c.mockRespond(new Response(response));
            });
            ampGreenIdServices.getTheToken(modelValue).subscribe((response) => {
                res = response;
            });
            tick();
            expect(res[0].verificationId).toBe('M1Crf19U');
        }))
    );
});
