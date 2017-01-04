import {
  inject
} from '@angular/core/testing';

import { AmpDateService } from './amp-date.service';
// Load the implementations that should be tested
describe( 'AmpDate public date methods' , () => {
    it( 'Should have a "today" getter which provides today\'s date in the dd/mm/yyyy format' ,
        inject( [] , () => {
            let ampDateService                             = new AmpDateService();
            let today_string                               = '';
            let today                                      = new Date();
            let dd                                         = today.getDate();
            let mm                                         = today.getMonth() + 1; // January is 0!
            let yyyy                                       = today.getFullYear();
            let DD : any = dd;
            let MM : any = mm;
            let YYYY : any = yyyy;
            if ( dd < 10 ) {
                DD = '0' + dd;
            }
            if ( mm < 10 ) {
                MM = '0' + mm;
            }
            today_string = DD + '/' + MM + '/' + YYYY;
            expect( ampDateService.today ).toBe( today_string );
        } ) );
    it( 'Should return a number which is the different between 2 dates that is provided to the function ' ,
        inject( [] , () => {
            let ampDateService = new AmpDateService();
            let aDate       = '10/9/2010';
            let aFutureDate = '10/10/2020';
            expect( ampDateService.getDatesDiff( aDate , aFutureDate ) ).toBe( 3683 );
        } ) );
    it( 'Should return a Date object created from the date string in the provided format' ,
        inject( [] , () => {
            let ampDateService = new AmpDateService();
            let aFutureDate    = '10/10/2020';
            let format         = 'dd/mm/yyyy';
            let delimeter      = '/';
            let year           = 2020;
            let month          = 10 - 1;
            let day            = 10;
            let date           = new Date( year , month , day );
            expect( ampDateService.stringToDate( aFutureDate , format , delimeter ) ).toBe( date );
        } ) );
    it( 'Should return null if the string provided is null or not in the correct date format' ,
        inject( [] , () => {
            let ampDateService    = new AmpDateService();
            let aBrokenFutureDate = '/10/10/';
            let aNullFutureDate   = null;
            let format            = 'dd/mm/yyyy';
            let delimeter         = '/';
            expect( ampDateService.stringToDate( aBrokenFutureDate , format , delimeter ) ).toBeNull();
            expect( ampDateService.stringToDate( aNullFutureDate , format , delimeter ) ).toBeNull();
        } ) );
} );
