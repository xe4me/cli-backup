import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import { PrepopAmpContactDetailsService } from '../../../app/modules/amp-contact-details-block/services/prepop-amp-contact-details.service';

describe( 'Service: PrepopAmpContactDetailsService' , () => {
    const prepopAmpContactDetailsService = new PrepopAmpContactDetailsService(null, null);

    // Note: Google i18n looks like a good option is we need start trying to get too smart
    // https://github.com/googlei18n/libphonenumber/tree/master/javascript/i18n/phonenumbers
    describe ( 'parseMobile', () => {
        it( 'should replace whitespace', () => {
            expect(prepopAmpContactDetailsService['parseMobile']('0413 123 123')).toBe('0413123123');
        });
        it( 'should replace +61 with 0', () => {
            expect(prepopAmpContactDetailsService['parseMobile']('+61413123123')).toBe('0413123123');
        });
        it( 'should prepopulate only when processed number pass regular express 04nnnnnnnn', () => {
            expect(prepopAmpContactDetailsService['parseMobile']('41+613123123')).toBeNull();

            expect(prepopAmpContactDetailsService['parseMobile']('  + 6  1 0 4  13 1   23123   ')).toBeNull();

            expect(prepopAmpContactDetailsService['parseMobile']('1234567890')).toBeNull();
        });
    });
});
