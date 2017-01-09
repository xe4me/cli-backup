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
import { AmpHttpService } from '../amp-http/amp-http.service';
import { SubmitService } from './submit.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};
describe( 'Submit service', () => {
    let subject : SubmitService = null;
    let backend : MockBackend   = null;
    let submitUrl               = `/api-${Environments.property.ExperienceName}/submit`;
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                SubmitService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );

    describe( 'Submit ', () => {
        beforeEach( inject( [ SubmitService, MockBackend ],
            ( saveFormService : SubmitService, mockBackend : MockBackend ) => {
                subject = saveFormService;
                backend = mockBackend;
            } ) );

        it( 'should send an empty post request to the url, with subscribing to it', ( done ) => {

            let referenceId    = '32345345345';
            let urlToBe        = submitUrl + '?id=' + referenceId;
            let sampleResponse = {};
            backend.connections.subscribe( ( connection : MockConnection ) => {
                let options = new ResponseOptions( {
                    body : JSON.stringify( sampleResponse )
                } );
                expect( connection.request.method ).toBe( RequestMethod.Post );
                expect( connection.request.url ).toBe( urlToBe );
                expect( connection.request.getBody() ).toEqual( '{}' );
                connection.mockRespond( new Response( options ) );
            } );

            subject.submit( referenceId )
                   .subscribe(
                       ( response ) => {
                           expect( response ).toEqual( sampleResponse );
                           done();
                       },
                       ( error ) => {
                           done.fail( 'Server failure' );
                       }
                   );
        } );
        it( 'should send an empty post request to the url , without subscribing ', fakeAsync( () => {

            let referenceId = '32345345345';
            let urlToBe     = submitUrl + '?id=' + referenceId;
            let response    = {};
            backend.connections.subscribe( ( connection : MockConnection ) => {
                let options = new ResponseOptions( {
                    body : JSON.stringify( response )
                } );
                expect( connection.request.method ).toBe( RequestMethod.Post );
                expect( connection.request.url ).toBe( urlToBe );
                expect( connection.request.getBody() ).toEqual( '{}' );
                connection.mockRespond( new Response( options ) );
            } );

            subject.submit( referenceId );
            tick();
        } ) );
        it( 'should let the user to override the url', fakeAsync( () => {

            let referenceId = '32345345345';
            let urlToBe     = submitUrl + '?id=' + referenceId + '&something=thingly';
            let response    = {};
            backend.connections.subscribe( ( connection : MockConnection ) => {
                let options = new ResponseOptions( {
                    body : JSON.stringify( response )
                } );
                expect( connection.request.method ).toBe( RequestMethod.Post );
                expect( connection.request.url ).toBe( urlToBe );
                expect( connection.request.getBody() ).toEqual( '{}' );
                connection.mockRespond( new Response( options ) );
            } );

            subject.submit( referenceId, urlToBe );
            tick();
        } ) );
        it( 'multiple submit should do multiple post request, weather subscribed or not', fakeAsync( () => {

            let referenceId   = '1';
            let response      = {};
            let submitCounter = 0;
            backend.connections.subscribe( ( connection : MockConnection ) => {
                let urlToBe = submitUrl + '?id=' + referenceId + submitCounter;
                let options = new ResponseOptions( {
                    body : JSON.stringify( response )
                } );
                expect( connection.request.method ).toBe( RequestMethod.Post );
                expect( connection.request.url ).toBe( urlToBe );
                expect( connection.request.getBody() ).toEqual( '{}' );
                connection.mockRespond( new Response( options ) );
                submitCounter++;
            } );

            subject.submit( referenceId + submitCounter );
            tick();
            subject.submit( referenceId + submitCounter );
            tick();
            subject.submit( referenceId + submitCounter );
            tick();
        } ) );
    } );
} );
