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
    AdvisorsService,
    Advisor
} from './advisors.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Advisors service ', () => {
    let baseUrl                           = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
    let advisorsEndpoint                  = baseUrl + '/advisors';
    let backend : MockBackend             = null;
    let advisorsService : AdvisorsService = null;

    let advisorsResponse                  = {
        'errors' : [],
        'data'   : [
            {
                'ownernum'               : 'NCOLD-V',
                'lastName'               : 'Blanch',
                'firstName'              : 'Lindsay',
                'personalTitle'          : 'Mr',
                'workPhoneNumber'        : '02 4940 8999',
                'workFaxNumber'          : '02 4940 8822',
                'emailAddress'           : 'lindsay@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0420 307 133',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NAEJY-R',
                'lastName'               : 'Frater',
                'firstName'              : 'Graham',
                'personalTitle'          : 'Mr',
                'workPhoneNumber'        : '02 4940 8999',
                'workFaxNumber'          : '02 4940 8822',
                'emailAddress'           : 'graham@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0408 726 000',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NDAGY-G',
                'lastName'               : 'Hesse',
                'firstName'              : 'Thomas',
                'middleName'             : 'Benjamin',
                'personalTitle'          : 'Mr',
                'workPhoneNumber'        : '02 4940 8999',
                'workFaxNumber'          : '02 4940 8822',
                'emailAddress'           : 'tom@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0402 768 359',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'BCABB-F',
                'lastName'               : 'Mink',
                'firstName'              : 'Darron',
                'personalTitle'          : 'Mr',
                'workPhoneNumber'        : '02 4940 8999',
                'workFaxNumber'          : '02 4940 8822',
                'emailAddress'           : 'aimee@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0418 494 997',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NDFAZ-D',
                'lastName'               : 'Mossman',
                'firstName'              : 'Cheryl',
                'personalTitle'          : 'Ms',
                'workPhoneNumber'        : '02 4940 8999',
                'emailAddress'           : 'cmossman@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0402 461 865',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NCERQ-Q',
                'lastName'               : 'Mossman',
                'firstName'              : 'Rebecca',
                'personalTitle'          : 'Ms',
                'workPhoneNumber'        : '02 4940 8999',
                'workFaxNumber'          : '02 4940 8822',
                'emailAddress'           : 'rebecca@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0434 151 761',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NBSUW-Q',
                'lastName'               : 'Murphy',
                'firstName'              : 'Adam',
                'middleName'             : 'Luke',
                'personalTitle'          : 'Mr',
                'workPhoneNumber'        : '02 4940 8999',
                'workFaxNumber'          : '02 4940 8822',
                'emailAddress'           : 'adam@pinnaclefinancial.com.au',
                'parentPosition'         : 0,
                'mobilePhoneNumber'      : '0412 556 134',
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NCWEG-U',
                'lastName'               : 'Lukas',
                'firstName'              : 'Anthony',
                'personalTitle'          : 'Mr',
                'parentPosition'         : 0,
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            },
            {
                'ownernum'               : 'NAAQE-C',
                'lastName'               : 'Roger B Lescun Pty Ltd',
                'parentPosition'         : 0,
                'clientNumber'           : '',
                'interestAreas'          : [],
                'commPrefFlag'           : false,
                'isBankIdCheckCompleted' : false,
                'visibilityTypeCode'     : 'FULL'
            }
        ]
    };
    let filteredAdvisors : Advisor[] = [
        {
            'ownernum'               : 'NCOLD-V',
            'lastName'               : 'Blanch',
            'firstName'              : 'Lindsay',
            'personalTitle'          : 'Mr',
            'workPhoneNumber'        : '02 4940 8999',
            'workFaxNumber'          : '02 4940 8822',
            'emailAddress'           : 'lindsay@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0420 307 133',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'NAEJY-R',
            'lastName'               : 'Frater',
            'firstName'              : 'Graham',
            'personalTitle'          : 'Mr',
            'workPhoneNumber'        : '02 4940 8999',
            'workFaxNumber'          : '02 4940 8822',
            'emailAddress'           : 'graham@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0408 726 000',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'NDAGY-G',
            'lastName'               : 'Hesse',
            'firstName'              : 'Thomas',
            'middleName'             : 'Benjamin',
            'personalTitle'          : 'Mr',
            'workPhoneNumber'        : '02 4940 8999',
            'workFaxNumber'          : '02 4940 8822',
            'emailAddress'           : 'tom@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0402 768 359',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'BCABB-F',
            'lastName'               : 'Mink',
            'firstName'              : 'Darron',
            'personalTitle'          : 'Mr',
            'workPhoneNumber'        : '02 4940 8999',
            'workFaxNumber'          : '02 4940 8822',
            'emailAddress'           : 'aimee@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0418 494 997',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'NDFAZ-D',
            'lastName'               : 'Mossman',
            'firstName'              : 'Cheryl',
            'personalTitle'          : 'Ms',
            'workPhoneNumber'        : '02 4940 8999',
            'emailAddress'           : 'cmossman@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0402 461 865',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'NCERQ-Q',
            'lastName'               : 'Mossman',
            'firstName'              : 'Rebecca',
            'personalTitle'          : 'Ms',
            'workPhoneNumber'        : '02 4940 8999',
            'workFaxNumber'          : '02 4940 8822',
            'emailAddress'           : 'rebecca@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0434 151 761',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'NBSUW-Q',
            'lastName'               : 'Murphy',
            'firstName'              : 'Adam',
            'middleName'             : 'Luke',
            'personalTitle'          : 'Mr',
            'workPhoneNumber'        : '02 4940 8999',
            'workFaxNumber'          : '02 4940 8822',
            'emailAddress'           : 'adam@pinnaclefinancial.com.au',
            'parentPosition'         : 0,
            'mobilePhoneNumber'      : '0412 556 134',
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        },
        {
            'ownernum'               : 'NCWEG-U',
            'lastName'               : 'Lukas',
            'firstName'              : 'Anthony',
            'personalTitle'          : 'Mr',
            'parentPosition'         : 0,
            'clientNumber'           : '',
            'interestAreas'          : [],
            'commPrefFlag'           : false,
            'isBankIdCheckCompleted' : false,
            'visibilityTypeCode'     : 'FULL'
        }
    ];
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                AdvisorsService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ AdvisorsService, MockBackend ],
        ( _advisorsService : AdvisorsService, _mockBackend : MockBackend ) => {
            advisorsService       = _advisorsService;
            backend               = _mockBackend;
        } ) );

    it( 'get the advisors details when subscribed', ( done ) => {
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( advisorsResponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( advisorsEndpoint );
            connection.mockRespond( new Response( options ) );
        } );

        advisorsService.getAdvisors()
                       .subscribe(
                           ( response ) => {
                               expect( response ).toEqual( filteredAdvisors );
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
                body : JSON.stringify( advisorsResponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( advisorsEndpoint );
            connection.mockRespond( new Response( options ) );
            expect( callsCounter ).toBe( 1 );
        } );

        advisorsService.getAdvisors();
        tick();
        advisorsService.getAdvisors();
        tick();
        advisorsService.getAdvisors().subscribe( ( res ) => {
            expect( res ).toEqual( filteredAdvisors );
        } );
        tick();
        advisorsService.getAdvisors().subscribe( ( res ) => {
            expect( res ).toEqual( filteredAdvisors );
        } );
        tick();
    } ) );

    it( 'should filter the results and only return the ones with personalTitle', fakeAsync( () => {
        let filteredWithService : Advisor[] = advisorsService.filterWithPrsonalTitle( advisorsResponse.data );
        expect( filteredWithService ).toEqual( filteredAdvisors );
    } ) );

} );
