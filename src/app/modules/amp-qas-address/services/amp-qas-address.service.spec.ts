import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';
@Injectable()
export class MockAmpQasAddressService {
    public static sampleSearchTerm                             = 'Pymble';
    public static sampleSearchTermWhichDoesNotExistInQASServer = 'somethingThatServerCannotFind';
    public static sampleSearchTermWithServerErrorBadFormatted  = 'badFormatErroFromServer';
    public static DEFAULT_ERROR_TEXT                           = 'Server error';
    public static errorResponse                                = {
        message : 'some error message' ,
        status  : 500
    };
    public static sampleResponse                               = [
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'COAUSHAfgBwMAAQAARkumQAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, MILLTHORPE  NSW  2798' ,
            'Picklist'       : 'Pym Street, MILLTHORPE  NSW' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : '1OAUSHAfgBwMAAQAAgnUMgAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, BOONDALL  QLD  4034' ,
            'Picklist'       : 'Pym Street, BOONDALL  QLD' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'uOAUSHAfgBwMAAQAAyu6_wAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, BELAIR  SA  5052' ,
            'Picklist'       : 'Pym Street, BELAIR  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : '7OAUSHAfgBwMAAQAAzYdWwAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, CROYDON PARK  SA  5008' ,
            'Picklist'       : 'Pym Street, CROYDON PARK  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'BOAUSHAfgBwMAAQAAzf0CgAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, DUDLEY PARK  SA  5008' ,
            'Picklist'       : 'Pym Street, DUDLEY PARK  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'TOAUSHAfgBwMAAQAA0tIzAAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Road, INKERMAN  SA  5550' ,
            'Picklist'       : 'Pym Road, INKERMAN  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'COAUSHAfgBwMAAQAA1bYuwAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, MIDDLETON  SA  5213' ,
            'Picklist'       : 'Pym Street, MIDDLETON  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'JOAUSHAfgBwMAAQAA3B47AAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, PROSPECT  SA  5082' ,
            'Picklist'       : 'Pym Street, PROSPECT  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : '2OAUSHAfgBwMAAQAA3OcqgAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Road, ROCKLEIGH  SA  5254' ,
            'Picklist'       : 'Pym Road, ROCKLEIGH  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        }
    ];
    private subject                                            = new BehaviorSubject( MockAmpQasAddressService.sampleResponse );
    private nullSubject                                        = new BehaviorSubject( null );
    public query                                               = ( queryValue : string ) : Observable<any> => {
        if ( queryValue === MockAmpQasAddressService.sampleSearchTerm ) {
            return this.subject.asObservable();
        }
        if ( queryValue === MockAmpQasAddressService.sampleSearchTermWhichDoesNotExistInQASServer ) {
            return this.nullSubject.asObservable();
        }
        if ( queryValue === MockAmpQasAddressService.sampleSearchTermWithServerErrorBadFormatted ) {
            return this.handleError( 'bad formated error from server' );
        }
        return this.handleError( MockAmpQasAddressService.errorResponse );
    }

    private handleError ( error : any ) {
        let errMsg = (error.message) ? error.message : error.status ? error.status : MockAmpQasAddressService.DEFAULT_ERROR_TEXT;
        return Observable.throw( errMsg );
    }
}
describe( 'QAS address service ' , () => {
    let _mockService;
    describe( 'Query' , () => {
        beforeEach( () => {
            _mockService = new MockAmpQasAddressService();
        } );
        it( 'should have a method called query' , () => {
            expect( _mockService.query ).toBeDefined();
        } );
        it( 'it should always return an Observable' , () => {
            let queryResult = _mockService.query();
            expect( queryResult instanceof Observable ).toBeTruthy();
            queryResult = _mockService.query( 'pymble' );
            expect( queryResult instanceof Observable ).toBeTruthy();
            queryResult = _mockService.query( 'asfhgsajdhgpymble' );
            expect( queryResult instanceof Observable ).toBeTruthy();
        } );
        it( 'it should return an observable of the search result if the search term is ' + MockAmpQasAddressService.sampleSearchTerm , () => {
            let queryResult = _mockService.query( MockAmpQasAddressService.sampleSearchTerm );
            queryResult.subscribe( ( results ) => {
                expect( results ).toEqual( MockAmpQasAddressService.sampleResponse );
            } );
        } );
        it( 'if should return and Observable of null if the search term is NOT' + MockAmpQasAddressService.sampleSearchTerm , () => {
            let queryResult = _mockService.query( MockAmpQasAddressService.sampleSearchTermWhichDoesNotExistInQASServer );
            queryResult.subscribe( ( results ) => {
                expect( results ).toEqual( null );
            } );
        } );
        it( 'it should return an observable of error if the server error is not formatted , that contains ' + MockAmpQasAddressService.DEFAULT_ERROR_TEXT , () => {
            let queryResult = _mockService.query( MockAmpQasAddressService.sampleSearchTermWithServerErrorBadFormatted );
            queryResult.subscribe( ( results ) => {
                expect( results ).toEqual( null );
            } , ( error ) => {
                expect( error ).toEqual( MockAmpQasAddressService.DEFAULT_ERROR_TEXT );
            } );
        } );
        it( 'it should return an observable of error if the QAS server is not responding' , () => {
            let queryResult = _mockService.query( 'search for something but server is down' );
            queryResult.subscribe( ( results ) => {
                expect( results ).toEqual( null );
            } , ( error ) => {
                expect( error ).toEqual( MockAmpQasAddressService.errorResponse.message );
            } );
        } );
    } );
} );
