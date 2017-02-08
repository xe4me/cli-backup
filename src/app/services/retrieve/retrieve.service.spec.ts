import {
    inject,
    async,
    TestBed
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
import { RetrieveService } from './retrieve.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Retrieve service', () => {

    let retrieveService : RetrieveService = null;
    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers: [
                BaseRequestOptions,
                RetrieveService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );

    describe( 'Retrieve', () => {

        beforeEach( inject( [ RetrieveService, MockBackend ],
            ( _retrieveService : RetrieveService, _mockBackend : MockBackend ) => {
                retrieveService = _retrieveService;
                backend        = _mockBackend;
            } ) );

        it( 'should be success when no http error', ( done ) => {

            backend.connections.subscribe( ( connection : MockConnection ) => {
                let options = new ResponseOptions( {
                    body : JSON.stringify( { payload : { status: 'success' } } )
                } );
                expect( connection.request.method ).toBe( RequestMethod.Post );
                expect( connection.request.url ).toBe( '/undefined/retrieve' );
                connection.mockRespond( new Response( options ) );
            } );

            retrieveService.retrieve( '4234234234', 'erwan', '11/11/1111', (error, payload) => {
                expect( error ).toEqual( null );
                expect( payload.status ).toEqual( 'success' );
                done();
            } );

        } );

    } );
} );
