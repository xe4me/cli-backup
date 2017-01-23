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
import { AmpHttpService } from '../../../services/amp-http/amp-http.service';
import {
    AmpCountryService,
    Country
} from './amp-country.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe( 'amp-country service ', () => {
    let countryServiceEndPoint = AmpCountryService.BASE_URL + AmpCountryService.COUNTRY_URL ;
    let backend : MockBackend           = null;
    let countryService : AmpCountryService = null;

    const countries = [
        {
            countryCode : 'AUS',
            country     : 'Australia'
        },
        {
            countryCode : 'NZL',
            country     : 'New Zealand'
        },
        {
            countryCode : 'AFG',
            country     : 'Afghanistan'
        },
        {
            countryCode : 'ALB',
            country     : 'Albania'
        },
        {
            countryCode : 'DZA',
            country     : 'Algeria'
        },
        {
            countryCode : 'ASM',
            country     : 'American Samoa'
        },
        {
            countryCode : 'AND',
            country     : 'Andorra'
        },
        {
            countryCode : 'AGO',
            country     : 'Angola'
        },
        {
            countryCode : 'AIA',
            country     : 'Anguilla'
        },
        {
            countryCode : 'ATA',
            country     : 'Antarctica'
        },
        {
            countryCode : 'ATG',
            country     : 'Antigua and Barbuda'
        },
        {
            countryCode : 'ARG',
            country     : 'Argentina'
        },
        {
            countryCode : 'ARM',
            country     : 'Armenia'
        },
        {
            countryCode : 'ABW',
            country     : 'Aruba'
        },
        {
            countryCode : 'AUT',
            country     : 'Austria'
        },
        {
            countryCode : 'AZE',
            country     : 'Azerbaijan'
        },
        {
            countryCode : 'BHS',
            country     : 'Bahamas'
        },
        {
            countryCode : 'BHR',
            country     : 'Bahrain'
        },
        {
            countryCode : 'BGD',
            country     : 'Bangladesh'
        },
        {
            countryCode : 'BRB',
            country     : 'Barbados'
        },
        {
            countryCode : 'BLR',
            country     : 'Belarus'
        },
        {
            countryCode : 'BEL',
            country     : 'Belgium'
        },
        {
            countryCode : 'BLZ',
            country     : 'Belize'
        },
        {
            countryCode : 'BEN',
            country     : 'Benin'
        },
        {
            countryCode : 'BMU',
            country     : 'Bermuda'
        },
        {
            countryCode : 'BTN',
            country     : 'Bhutan'
        },
        {
            countryCode : 'BOL',
            country     : 'Bolivia'
        },
        {
            countryCode : 'BIH',
            country     : 'Bosnia and Herzegowina'
        },
        {
            countryCode : 'BWA',
            country     : 'Botswana'
        },
        {
            countryCode : 'BVT',
            country     : 'Bouvet Island'
        },
        {
            countryCode : 'BRA',
            country     : 'Brazil'
        },
        {
            countryCode : 'IOT',
            country     : 'British Indian Ocean Territory'
        },
        {
            countryCode : 'BRN',
            country     : 'Brunei Darussalam'
        },
        {
            countryCode : 'BGR',
            country     : 'Bulgaria'
        },
        {
            countryCode : 'BFA',
            country     : 'Burkina Faso'
        },
        {
            countryCode : 'BDI',
            country     : 'Burundi'
        },
        {
            countryCode : 'HRV',
            country     : 'CROATIA (Local Name: Hrvatska)'
        },
        {
            countryCode : 'KHM',
            country     : 'Cambodia'
        },
        {
            countryCode : 'CMR',
            country     : 'Cameroon'
        }
    ];
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                BaseRequestOptions,
                AmpCountryService,
                MockBackend,
                AmpHttpService,
                mockHttpProvider
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ AmpCountryService, MockBackend ],
        ( _countryService : AmpCountryService, _mockBackend : MockBackend ) => {
            countryService = _countryService;
            backend        = _mockBackend;
        } ) );

    it( 'get the country list when subscribed', ( done ) => {
        backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( {payload : countries} )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( countryServiceEndPoint );
            connection.mockRespond( new Response( options ) );
        } );

        countryService.getCountries()
            .subscribe(
                ( response ) => {
                    expect( response).toEqual( countries );
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
                body : JSON.stringify( {payload : countries} )
            } );
            expect( connection.request.method ).toBe( RequestMethod.Get );
            expect( connection.request.url ).toBe( countryServiceEndPoint );
            connection.mockRespond( new Response( options ) );
            expect( callsCounter ).toBe( 1 );
        } );

        countryService.getCountries();
        tick();
        countryService.getCountries();
        tick();
        countryService.getCountries().subscribe( ( res ) => {
            expect( res ).toEqual( countries );
        } );
        tick();
        countryService.getCountries().subscribe( ( res ) => {
            expect( res ).toEqual( countries );
        } );
        tick();
    } ) );

} );
