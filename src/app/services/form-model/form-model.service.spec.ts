import { FormModelService } from './form-model.service';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { FormBuilder } from '@angular/forms';
import { BaseRequestOptions, Http, ResponseOptions, RequestMethod, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';

const testModel = {
    'errors' : [],
    'data' : {
        'realUser' : 'BCABB-F',
        'actingAsUser' : null,
        'impersonatedUser' : '',
        'isPrincipal' : true,
        'practiceName' : 'Pinnacle Financial Pty Ltd',
        'licensee' : 'DEA_AMPFP',
        'payeeID' : 'BCABB-F',
        'practicePrincipalFirstName' : 'Darron',
        'practicePrincipalLastName' : 'Smith',
        'iat' : 1461207449,
        'exp' : 1466474035,
        'jwt_realUserFirstName' : 'Tamas',
        'jwt_realUserLastName' : 'Ridly',
        'jwt_realUser' : 'BCABB-F',
        'jwt_iss' : 'Portal',
        'jwt_impersonatedUser' : ''
    }
};

const mockHttpProvider = {
    provide : Http,
    deps : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'Save model to the server', () => {
    let subject : FormModelService = null;
    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                FormModelService,
                FormBuilder,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );

    beforeEach( inject( [ FormModelService, MockBackend ],
        ( formModelService : FormModelService, mockBackend : MockBackend ) => {
            subject = formModelService;
            backend = mockBackend;
        } ) );

    it( 'Saves the model with an http POST call to /saveTheWorld.', ( done ) => {
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( testModel )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Post );
            expect( connection.request.url ).toBe( '/saveTheWorld' );
            connection.mockRespond( new Response( options ) );
        } );
        subject.overrideApiBaseUrl( '/' );
        subject.setSaveRelativeUrl( 'saveTheWorld' );
        subject.saveResponse.subscribe( ( response ) => {
            expect( response ).toEqual( testModel );
            done();
        } );
        subject.save( testModel );
    } );

    it( 'Fails to save the model with an http POST call to /saveTheWorld.', ( done ) => {
        const errorMessage = 'Simulated error response';
        backend.connections.subscribe( ( connection : MockConnection ) => {
            expect( connection.request.method ).toBe( RequestMethod.Post );
            expect( connection.request.url ).toBe( '/saveTheWorld' );
            connection.mockError( new Error( errorMessage ) );
        } );
        subject.overrideApiBaseUrl( '/' );
        subject.setSaveRelativeUrl( 'saveTheWorld' );
        subject.saveError.subscribe( ( error ) => {
            expect( error.toString() ).toEqual( 'Error: Simulated error response' );
            done();
        } );
        subject.save( testModel );
    } );

    it( 'Throws an exception because no URL was set.', ( done ) => {
        subject.setSaveRelativeUrl( null );
        try {
            subject.save( testModel );
        }
        catch ( e ) {
            expect( e ).toEqual( new Error( 'Relative URL not set in FormModelService for save!' ) );
            done();
        }
    } );

} );
