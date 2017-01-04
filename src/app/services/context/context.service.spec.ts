import {
    inject,
    async,
    TestBed,
    fakeAsync,
    tick
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
import { ContextService } from './context.service';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';
const contextBody = {
    'errors' : [],
    'data'   : {
        'realUser'                   : 'BCABB-F',
        'actingAsUser'               : null,
        'impersonatedUser'           : '',
        'isPrincipal'                : true,
        'initialized'                : false,
        'practiceName'               : 'Pinnacle Financial Pty Ltd',
        'licensee'                   : 'DEA_AMPFP',
        'payeeID'                    : 'BCABB-F',
        'practicePrincipalFirstName' : 'Darron',
        'practicePrincipalLastName'  : 'Smith',
        'iat'                        : 1461207449,
        'exp'                        : 1466474035,
        'jwt_realUserFirstName'      : 'Tamas',
        'jwt_realUserLastName'       : 'Ridly',
        'jwt_realUser'               : 'BCABB-F',
        'jwt_iss'                    : 'Portal',
        'jwt_impersonatedUser'       : ''
    }
};

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Context service', () => {
    let subject : ContextService = null;
    let backend : MockBackend    = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [ BaseRequestOptions,
                ContextService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );

    beforeEach( inject( [ ContextService, MockBackend ],
        ( contextService : ContextService, mockBackend : MockBackend ) => {
            subject = contextService;
            backend = mockBackend;
        } ) );

    it( 'should get the context with an get http call to /usersession.', ( done ) => {
        let baseUrl         = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
        let contextEndpoint = '/usersession';
        let contextUrl      = baseUrl + contextEndpoint;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( contextBody )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( contextUrl );
            connection.mockRespond( new Response( options ) );
        } );
        let contextDataInitialized         = contextBody.data;
        contextDataInitialized.initialized = true;
        subject.getContext()
               .subscribe(
                   ( response ) => {
                       expect( response ).toEqual( contextDataInitialized );
                       done();
                   },
                   ( error ) => {
                       done.fail( 'Failed to obtain the context' );
                   }
               );
    } );
    it( 'planner context should only be valid if the realUser exist and has value', fakeAsync( () => {
        let baseUrl         = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
        let contextEndpoint = '/usersession';
        let contextUrl      = baseUrl + contextEndpoint;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( contextBody )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( contextUrl );
            connection.mockRespond( new Response( options ) );
        } );
        let contextDataInitialized         = contextBody.data;
        contextDataInitialized.initialized = true;
        subject.getContext();
        tick();
        expect( subject.isPlannerContextValid() ).toBe( true );

    } ) );
    it( 'should have an null context first and then after the first call , it should have value with initialized=true', fakeAsync( () => {
        let baseUrl         = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
        let contextEndpoint = '/usersession';
        let contextUrl      = baseUrl + contextEndpoint;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( contextBody )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( contextUrl );
            connection.mockRespond( new Response( options ) );
        } );
        let contextDataInitialized         = contextBody.data;
        contextDataInitialized.initialized = true;
        expect( subject.context ).toEqual( { initialized: false } );
        expect( subject.context.initialized ).toBe( false );
        subject.getContext();
        tick();
        expect( subject.context.initialized ).toBe( true );
        expect( subject.context ).toEqual( contextDataInitialized );
    } ) );
} );
