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
import { SaveService } from './save.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Save service ', () => {
    let saveEndPoint              = '/save';
    let saveSampleResponse        = {
        referenceId : '324234234'
    };
    let saveService : SaveService = null;
    let backend : MockBackend     = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                SaveService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ SaveService, MockBackend ],
        ( _saveService : SaveService, _mockBackend : MockBackend ) => {
            saveService = _saveService;
            backend     = _mockBackend;
        } ) );

    it( 'should post the model to the specified url', ( done ) => {
        let model = { name : "Milad" };
        backend.connections.subscribe( ( connection : MockConnection ) => {

            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Post );
            expect( connection.request.url ).toBe( saveEndPoint );
            connection.mockRespond( new Response( options ) );
        } );

        saveService.save( model )
                   .subscribe(
                       ( response ) => {
                           expect( response ).toEqual( saveSampleResponse );
                           done();
                       },
                       ( error ) => {
                           done.fail( 'Server failure' );
                       }
                   );
    } );

    it( 'should change the url and append the referenceId if save is already done and referenceId exist', fakeAsync( () => {
        let model        = { name : "Milad" };
        let savedCounter = 0;
        backend.connections.subscribe( ( connection : MockConnection ) => {

            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Post );
            if ( savedCounter == 0 ) { // first save
                expect( connection.request.url ).toBe( saveEndPoint );
                expect( saveService.referenceId ).toBe( null );
            } else {// later saves
                expect( connection.request.url ).toBe( saveEndPoint + `?id=${saveSampleResponse.referenceId}` );
                expect( saveService.referenceId ).toBe( saveSampleResponse.referenceId );
            }
            connection.mockRespond( new Response( options ) );
            savedCounter++;
        } );

        saveService.save( model );
        tick( 1000 );
        saveService.save( model );
    } ) );
    it( 'should use the provided url in the function if its specified and ignore the baseUrl', ( done ) => {
        let model = { name : "Milad" };
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            expect( connection.request.url ).toBe( 'someUrl' );
            connection.mockRespond( new Response( options ) );
        } );
        saveService.save( model, 'someUrl' ).subscribe( done, done );
    } );

    it( 'should handle the error and show the message inside it', ( done ) => {
        let model = { name : "Milad" };
        let error = JSON.stringify( { message : "Serve is down" } );
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new Error( error );
            connection.mockError( options );
        } );

        saveService.save( model )
                   .subscribe(
                       done,
                       ( error ) => {
                           expect( error ).toEqual( error );
                           done();
                       }
                   );
    } );
    it( 'should do the save and subscribe together without user doing the subscribe', fakeAsync( () => {
        let model = { name : "Milad" };
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            connection.mockRespond( new Response( options ) );
        } );
        saveService.save( model );
        tick();
    } ) );
    it( 'should replay with the latest saved result if a save has happened', fakeAsync( () => {
        let model = { name : "Milad" };
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            connection.mockRespond( new Response( options ) );
        } );
        saveService.save( model );
        tick();
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                expect( response ).toEqual( saveSampleResponse );
            }
        );
    } ) );
    it( 'should save and emit the response to any subscriber to $onSaveResponse', fakeAsync( () => {
        let model         = { name : "Milad" };
        let saveCounter   = 0;
        let replayCounter = 0;
        backend.connections.subscribe( ( connection : MockConnection ) => {
            saveCounter++;
            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            connection.mockRespond( new Response( options ) );
            expect( saveCounter ).toBe( 1 );
        } );
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                replayCounter++;
                expect( replayCounter ).toBe( 1 );
                expect( response ).toEqual( saveSampleResponse );
            }
        );
        tick();
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                replayCounter++;
                expect( replayCounter ).toBe( 2 );
                expect( response ).toEqual( saveSampleResponse );
            }
        );
        tick();
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                replayCounter++;
                expect( replayCounter ).toBe( 3 );
                expect( response ).toEqual( saveSampleResponse );
            }
        );
        tick();
    } ) );

    it( 'should save and emit the response to all the subscribers which subscribed to $onSaveResponse before save has happend', fakeAsync( () => {
        let model       = { name : "Milad" };
        let saveCounter = 0;
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                expect( response ).toEqual( saveSampleResponse );
            }
        );
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                expect( response ).toEqual( saveSampleResponse );
            }
        );
        saveService.$onSaveResponse.subscribe(
            ( response ) => {
                expect( response ).toEqual( saveSampleResponse );
            }
        );
        backend.connections.subscribe( ( connection : MockConnection ) => {
            saveCounter++;
            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            connection.mockRespond( new Response( options ) );
            expect( saveCounter ).toBe( 1 );
        } );
        saveService.save( model );
        tick();
    } ) );

} );

