import { FormUtils } from '../../../app/modules/amp-utils/form-utils';
import * as moment from 'moment';

describe( 'Form Util functions test', () => {

    describe( 'Is Within Times', () => {

        let time = ( moment ) => {
            return moment.hours() + ':' + moment.minutes();
        };

        it( 'should return false when first argument is not a valid time time (HH:MM)', () => {
            expect( FormUtils.isWithinTimes( '08.30', '17:00' ) ).toEqual( false );
        } );

        it( 'should return false when second argument is not a valid time time (HH:MM)', () => {
            expect( FormUtils.isWithinTimes( '08:30', '17.00' ) ).toEqual( false );
        } );

        it( 'time now should be within opening times', () => {
            let start = moment().subtract( 1, 'h' );
            let end   = moment().add( 1, 'h' );

            expect( FormUtils.isWithinTimes( time( start ), time( end ) ) ).toEqual( true );
        } );

        it( 'time now should be outside opening times (before)', () => {
            let start = moment().add( 1, 'h' );
            let end   = moment().add( 2, 'h' );

            expect( FormUtils.isWithinTimes( time( start ), time( end ) ) ).toEqual( false );
        } );

        it( 'time now should be outside opening times (after)', () => {
            let start = moment().subtract( 2, 'h' );
            let end   = moment().subtract( 1, 'h' );

            expect( FormUtils.isWithinTimes( time( start ), time( end ) ) ).toEqual( false );
        } );

    } );
} );
