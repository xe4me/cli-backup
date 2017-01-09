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
import { SubmitService } from '../submit/submit.service';
import { SaveService } from '../save/save.service';
import { SaveAndSubmitService } from './save-and-submit.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};
describe( 'SaveAndSubmit service', () => {
    let saveAndSubmitService : SaveAndSubmitService = null;
    let submitService : SubmitService               = null;
    let backend : MockBackend                       = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                SubmitService,
                SaveService,
                BaseRequestOptions,
                SaveAndSubmitService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );

    describe( 'SaveAndSubmit', () => {
        beforeEach( inject( [ SaveAndSubmitService, MockBackend, SubmitService ],
            ( _saveAndSubmitService : SaveAndSubmitService, _mockBackend : MockBackend, _submitService : SubmitService ) => {
                saveAndSubmitService = _saveAndSubmitService;
                submitService        = _submitService;
                backend              = _mockBackend;
            } ) );

        it( 'should do a save and then a submit and emit the result to the subscription', ( done ) => {
            let referenceId    = '4234234234';
            let model          = { name : 'Milad' };
            let saveResponse   = {
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
            let submitResponse = { submitted : true };
            let callCounter    = 0;
            backend.connections.subscribe( ( connection : MockConnection ) => {
                callCounter++;
                expect( connection.request.method ).toBe( RequestMethod.Post );
                if ( callCounter === 1 ) {
                    let options = new ResponseOptions( {
                        body : JSON.stringify( saveResponse )
                    } );
                    expect( connection.request.getBody() ).toEqual( JSON.stringify( model ) );
                    connection.mockRespond( new Response( options ) );
                } else if ( callCounter === 2 ) {
                    let options = new ResponseOptions( {
                        body : JSON.stringify( submitResponse )
                    } );
                    expect( connection.request.getBody() ).toEqual( '{}' );
                    connection.mockRespond( new Response( options ) );
                }
                expect( callCounter ).toBeLessThan( 3 );
            } );

            saveAndSubmitService.saveAndSubmit( model, referenceId )
                                .subscribe(
                                    ( response ) => {
                                        expect( response ).toEqual( submitResponse );
                                        done();
                                    },
                                    ( error ) => {
                                        done.fail( 'Server failure' );
                                    }
                                );
        } );

        it( 'should let the save and submit urls to be overridden', fakeAsync( () => {
            let referenceId = '4234234234';
            let model       = { name : 'Milad' };
            let saveUrl     = '/saveChangedUrl';
            let submitUrl   = '/submitChangedUrl?someParams=somedsfsdf';
            let callCounter = 0;
            backend.connections.subscribe( ( connection : MockConnection ) => {
                callCounter++;
                let options = new ResponseOptions( {
                    body : JSON.stringify( {} )
                } );
                connection.mockRespond( new Response( options ) );
                if ( callCounter === 1 ) {
                    expect( connection.request.url ).toBe( saveUrl );
                } else if ( callCounter === 2 ) {
                    expect( connection.request.url ).toBe( submitUrl );
                }
                expect( callCounter ).toBeLessThan( 3 );
            } );

            saveAndSubmitService.saveAndSubmit( model, referenceId, { saveUrl, submitUrl } );
            tick();
        } ) );

        it( 'should get the referenceId from the save result if it\'s passed in as null in arguments', fakeAsync( ( done ) => {
            let referenceId    = '4234234234';
            let model          = { name : 'Milad' };
            let saveResponse   = { referenceId };
            let submitResponse = { submitted : true };
            let callCounter    = 0;
            backend.connections.subscribe( ( connection : MockConnection ) => {
                callCounter++;
                expect( connection.request.method ).toBe( RequestMethod.Post );
                if ( callCounter === 1 ) {
                    let options = new ResponseOptions( {
                        body : JSON.stringify( saveResponse )
                    } );
                    connection.mockRespond( new Response( options ) );
                } else if ( callCounter === 2 ) {
                    let options = new ResponseOptions( {
                        body : JSON.stringify( submitResponse )
                    } );
                    expect( connection.request.url ).toEqual( submitService.generateUrlWithRef( referenceId ) );
                    connection.mockRespond( new Response( options ) );
                }
                expect( callCounter ).toBeLessThan( 3 );
            } );

            saveAndSubmitService.saveAndSubmit( model );
            tick();
        } ) );
    } );
} );
