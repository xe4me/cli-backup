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
import { Environments } from '../../abstracts/environments/environments.abstract';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Save service ', () => {
    let saveEndPoint              = `/api-${Environments.property.ExperienceName}/save`;
    let saveSampleResponse        = {
        'meta'       : {
            'url'            : '/ddc/public/api/bett3r/save?id=6812434564',
            'method'         : 'POST',
            'timestamp'      : 'Fri Jan 06 2017 13:57:23 GMT+1100 (AEDT)',
            'responseTimeMs' : 70,
            'requestId'      : '0c05d1a0d7c5499583f5f093bdd3261c',
            'hostname'       : 'api-bett3r-dev-v154-iyrtb',
            'pid'            : 17,
            'params'         : { 'id' : '6812434564' },
            'count'          : 1
        },
        'payload'    : {
            'meta' : {
                'name'         : 'BETT3R',
                'modelVersion' : '1.0.0',
                'id'           : '6812434564',
                'modified'     : '2017-01-06T02:57:23.161Z',
                'created'      : '2017-01-06T02:57:04.544Z',
                'owner'        : {
                    'type' : 'customer',
                    'id'   : null
                },
                'status'       : 'open'
            }
        },
        'statusCode' : 200
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
        let model = { name : 'Milad' };
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
        let model        = { name : 'Milad' };
        let savedCounter = 0;
        backend.connections.subscribe( ( connection : MockConnection ) => {

            let options = new ResponseOptions( {
                body : JSON.stringify( saveSampleResponse )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Post );
            if ( savedCounter === 0 ) { // first save
                expect( connection.request.url ).toBe( saveEndPoint );
                expect( saveService.referenceId ).toBe( null );
            } else {// later saves
                expect( connection.request.url ).toBe( saveEndPoint + `?id=${saveSampleResponse.payload.meta.id}` );
                expect( saveService.referenceId ).toBe( saveSampleResponse.payload.meta.id );
            }
            connection.mockRespond( new Response( options ) );
            savedCounter++;
        } );

        saveService.save( model );
        tick( 1000 );
        saveService.save( model );
    } ) );
    it( 'should use the provided url in the function if its specified and ignore the baseUrl', ( done ) => {
        let model = { name : 'Milad' };
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
        let model       = { name : 'Milad' };
        let sampleRrror = JSON.stringify( { message : 'Serve is down' } );
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new Error( sampleRrror );
            connection.mockError( options );
        } );

        saveService.save( model )
                   .subscribe(
                       done,
                       ( error ) => {
                           expect( error ).toEqual( sampleRrror );
                           done();
                       }
                   );
    } );
    it( 'should do the save and subscribe together without user doing the subscribe', fakeAsync( () => {
        let model = { name : 'Milad' };
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
        let model = { name : 'Milad' };
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
        let model         = { name : 'Milad' };
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
        let model       = { name : 'Milad' };
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
