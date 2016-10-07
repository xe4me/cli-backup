import {
    addProviders,
    inject,
    async,
    TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { provide } from '@angular/core';

import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
 } from '@angular/http';

import { ProfileService } from './profile.service';
import { AmpHttpService } from '../amp-http/amp-http.service';

const profileBody = {
    'errors': [],
    'data': {
        'partyType': 'PRACTICE',
        'partyKey': 3118,
        'ownernum': 'NCBTD-K',
        'payeeId': 'NCBTD-K',
        'partyIdTypeCode': 'O',
        'partyStatusCode': 'A',
        'specifiedOfficer': 'NAEJY-R',
        'lastName': 'ISIS Financial Planners Pty Ltd',
        'nickName': 'ISIS Financial Planners Pty Ltd',
        'address': 'Unit 17 23-25 Skyreach Street Qld/Northern NSW',
        'suburb': 'CABOOLTURE',
        'state': 'QLD',
        'postCode': '4510',
        'country': 'AUSTRALIA',
        'workPhoneNumber': '0754958007',
        'workFaxNumber': '0754954160',
        'emailAddress': 'advice@isisfinancialplanners.com.au',
        'parentPosition': 0,
        'segment': 'PLA_GROWTH',
        'companyName': 'ISIS Financial Planners Pty Ltd',
        'agreementTypeCode': 'Practice Agreement (PA)',
        'interestAreas': [],
        'conversionIndicator': 'N',
        'dataSyncUpdate': 'N',
        'commPrefFlag': false,
        'isBankIdCheckCompleted': false,
        'visibilityTypeCode': 'FULL'
    }
};

const mockHttpProvider = {
    deps:       [ MockBackend, BaseRequestOptions ],
    useFactory: (backend : MockBackend, defaultOptions : BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe( 'Fetch advisor profile from server' , () => {
    let subject : ProfileService = null;
    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers    : [ BaseRequestOptions,
                             ProfileService,
                             MockBackend,
                             provide(AmpHttpService, mockHttpProvider) ]
        } );
        TestBed.compileComponents();
    }));

    beforeEach( inject( [ProfileService, MockBackend],
                        (profileService : ProfileService, mockBackend : MockBackend) => {
        subject = profileService;
        backend = mockBackend;
    }));

    it('gets the profile with an http call to /profile.', (done) => {
        backend.connections.subscribe((connection : MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify( profileBody )
            });
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe('/profile');
            connection.mockRespond(new Response(options));
        });

        subject.fetchProfile()
               .subscribe(
                    (response) => {
                        expect(response).toEqual(profileBody);
                        done();
                    },
                    (error) => {
                        done.fail('Failed to fetch advisor profile');
                    }
                );
      });
});
