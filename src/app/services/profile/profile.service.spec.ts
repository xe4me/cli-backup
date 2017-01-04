import {
    inject,
    async,
    TestBed,
    tick,
    fakeAsync
} from '@angular/core/testing';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
} from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import {
    ProfileService,
    Profile
} from './profile.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Profile service ', () => {
    let baseUrl                         = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
    let profileEndpoint                 = baseUrl + '/profile';
    let backend : MockBackend           = null;
    let profileService : ProfileService = null;

    let profileresponse = {
        'errors' : [],
        'data'   : {
            'partyType'              : 'PRACTICE',
            'partyKey'               : 3118,
            'ownernum'               : 'NCBTD-K',
            'payeeId'                : 'NCBTD-K',
            'partyIdTypeCode'        : 'O',
            'partyStatusCode'        : 'A',
            'specifiedOfficer'       : 'NAEJY-R',
            'lastName'               : 'ISIS Financial Planners Pty Ltd',
            'nickName'               : 'ISIS Financial Planners Pty Ltd',
            'address'                : 'Unit 17 23-25 Skyreach Street Qld/Northern NSW',
            'suburb'                 : 'CABOOLTURE',
            'state'                  : 'QLD',
            'postCode'               : '4510',
            'country'                : 'AUSTRALIA',
            'workPhoneNumber'        : '0754958007',
            'workFaxNumber'          : '0754954160',
            'emailAddress'           : 'advice@isisfinancialplanners.com.au',
            'parentPosition'         : 0,
            'segment'                : 'PLA_GROWTH',
            'companyName'            : 'ISIS Financial Planners Pty Ltd',
            'agreementTypeCode'      : 'Practice Agreement (PA)',
            'interestAreas'          : [],
            'conversionIndicator'    : 'N',
            'dataSyncUpdate'         : 'N',
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        }
    };
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                ProfileService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ ProfileService, MockBackend ],
        ( _profileService : ProfileService, _mockBackend : MockBackend ) => {
            profileService = _profileService;
            backend        = _mockBackend;
        } ) );

    it( 'get the profile details when subscribed', ( done ) => {
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( profileresponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( profileEndpoint );
            connection.mockRespond( new Response( options ) );
        } );

        profileService.getProfile()
                      .subscribe(
                          ( response ) => {
                              expect( response ).toEqual( profileresponse.data );
                              done();
                          },
                          ( error ) => {
                              done.fail( 'Server failure' );
                          }
                      );
    } );
    it( 'should only do one ajax call with multiple subscribers', fakeAsync( () => {
        let callsCounter = 0;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            callsCounter++;
            let options = new ResponseOptions( {
                body : JSON.stringify( profileresponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( profileEndpoint );
            connection.mockRespond( new Response( options ) );
            expect( callsCounter ).toBe( 1 );
        } );

        profileService.getProfile();
        tick();
        profileService.getProfile();
        tick();
        profileService.getProfile().subscribe( ( res ) => {
            expect( res ).toEqual( profileresponse.data );
        } );
        tick();
        profileService.getProfile().subscribe( ( res ) => {
            expect( res ).toEqual( profileresponse.data );
        } );
        tick();
    } ) );

} );
