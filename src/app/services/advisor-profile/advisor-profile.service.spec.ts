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
import { ProfileService } from '../profile/profile.service';
import {
    AdvisorsService,
    Advisor
} from '../advisors/advisors.service';
import { AdvisorProfileService } from './advisor-profile.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'AdvisorProfile service ', () => {
    let backend;
    let advisorProfileService : AdvisorProfileService;
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                ProfileService,
                AdvisorProfileService,
                AdvisorsService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ AdvisorProfileService, MockBackend ],
        ( _advisorProfileService : AdvisorProfileService, _mockBackend : MockBackend ) => {
            advisorProfileService = _advisorProfileService;
            backend               = _mockBackend;
        } ) );

    it( 'gets the profile and then the advisors', ( done ) => {
        let profileResponse        = {
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
        let advisorsResponse       = {
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
        let foundAdvisor : Advisor = {
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
        };
        let callCounter            = 0;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            callCounter++;
            expect( connection.request.method ).toBe( RequestMethod.Get );
            let options;
            if ( callCounter === 1 ) {
                options = new ResponseOptions( {
                    body : JSON.stringify( profileResponse )
                } );
            } else if ( callCounter === 2 ) {
                options = new ResponseOptions( {
                    body : JSON.stringify( advisorsResponse )
                } );
            }
            connection.mockRespond( new Response( options ) );
            expect( callCounter ).toBeLessThan( 3 );
        } );

        advisorProfileService
            .getAdvisorForProfile()
            .subscribe(
                ( response ) => {
                    expect( response ).toEqual( foundAdvisor );
                    done();
                },
                ( error ) => {
                    done.fail( 'Server failure' );
                }
            );
    } );

    it( 'should only cal once each of the services even if subscribed to them multiple times', fakeAsync( () => {
        let profileResponse        = {
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
        let advisorsResponse       = {
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
        let foundAdvisor : Advisor = {
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
        };
        let callCounter            = 0;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            callCounter++;
            expect( connection.request.method ).toBe( RequestMethod.Get );
            let options;
            if ( callCounter === 1 ) {
                options = new ResponseOptions( {
                    body : JSON.stringify( profileResponse )
                } );
            } else if ( callCounter === 2 ) {
                options = new ResponseOptions( {
                    body : JSON.stringify( advisorsResponse )
                } );
            }
            connection.mockRespond( new Response( options ) );
            expect( callCounter ).toBeLessThan( 3 );
        } );

        advisorProfileService.getAdvisorForProfile();
        tick();
        advisorProfileService.getAdvisorForProfile();
        tick();
        advisorProfileService.getAdvisorForProfile();
        tick();
        advisorProfileService.getAdvisorForProfile().subscribe( ( result ) => {
            expect( result ).toEqual( foundAdvisor );
        } );
        tick();
    } ) );
    it( 'should filter the advisors and find the advisor based on the given profile', () => {
        let profile                = {
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

        };
        let advisors               = [
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
        ];
        let foundAdvisor : Advisor = {
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
        };
        let found                  = advisorProfileService.findAdvisor( profile, advisors );
        expect( found ).toEqual( foundAdvisor );
    } );
} );
