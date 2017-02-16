import * as moment from 'moment';
import {
    MaxAgeValidator,
    MinAgeValidator,
    PatterValidator
} from './validations';

describe( 'validations', () => {

    describe( 'Pattern validator ', () => {
        describe( 'pattern parser ', () => {
            let needle = 'FLAGS:';
            it( `should have the flags as undefined if the there is not ${needle} defined at the end`, () => {
                let givenPattern  = '^[A-Za-z]\/g[A-Z|a-z|\'| |-]*[a-z]$';
                let parsedPattern = PatterValidator.parsePattern( givenPattern, needle );
                expect( parsedPattern ).toBeDefined();
                expect( parsedPattern.regex ).toBe( givenPattern );
                expect( parsedPattern.flags ).toBeUndefined();
            } );
            it( `should have the flags as im if the there is ${needle}im defined at the end`, () => {
                let givenPattern  = `^[A-Za-z]\/g[A-Z|a-z|\'| |-]*[a-z]$${needle}im`;
                let parsedPattern = PatterValidator.parsePattern( givenPattern, needle );
                expect( parsedPattern ).toBeDefined();
                expect( parsedPattern.regex ).toBe( '^[A-Za-z]\/g[A-Z|a-z|\'| |-]*[a-z]$' );
                expect( parsedPattern.flags ).toBe( 'im' );
            } );
            it( `should have the flags as undefined if the ${needle} are  defined in the middle of the given pattern`, () => {
                let givenPattern  = `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]$`;
                let parsedPattern = PatterValidator.parsePattern( givenPattern, needle );
                expect( parsedPattern ).toBeDefined();
                expect( parsedPattern.regex ).toBe( `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]$` );
                expect( parsedPattern.flags ).toBeUndefined();
            } );
            it( `should have the flags as if ${needle}whatever is defined in the middle of the given pattern and there is also ${needle} at the end`, () => {
                let givenPattern  = `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]${needle}i`;
                let parsedPattern = PatterValidator.parsePattern( givenPattern, needle );
                expect( parsedPattern ).toBeDefined();
                expect( parsedPattern.regex ).toBe( `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]` );
                expect( parsedPattern.flags ).toBe( 'i' );
            } );
            it( `should also work with other needles defined by the user`, () => {
                let myNeedle      = 'NEEDLE';
                let givenPattern  = `^[A-Za-z]\/g[A-Zim|a-z|\'| |-]*[a-z]${myNeedle}ig`;
                let parsedPattern = PatterValidator.parsePattern( givenPattern, myNeedle );
                expect( parsedPattern ).toBeDefined();
                expect( parsedPattern.regex ).toBe( `^[A-Za-z]\/g[A-Zim|a-z|\'| |-]*[a-z]` );
                expect( parsedPattern.flags ).toBe( 'ig' );
            } );
            it( `should return flags as undefined if the given flags are something more than igm`, () => {
                let givenPattern  = `^[A-Za-z]\/g[A-Zim|a-z|\'| |-]*[a-z]${needle}igmz`;
                let parsedPattern = PatterValidator.parsePattern( givenPattern, needle );
                expect( parsedPattern ).toBeDefined();
                expect( parsedPattern.regex ).toBe( givenPattern );
                expect( parsedPattern.flags ).toBeUndefined();
            } );
        } );
    } );

    describe( 'MinAgeValidator', () => {
        describe( 'Given the minAge is 18', () => {

            const minAge    = 18;
            const noPattern = undefined;

            beforeEach( () => {
                // Mock today's date
                const today = moment( '2000-02-15' ).toDate();
                jasmine.clock().mockDate( today );
            } );

            afterEach( () => {
                // Restore today's date
                jasmine.clock().mockDate();
            } );

            describe( 'when giving a date of birth that is older than the min age (20 years old)', () => {
                it( 'should be considered as valid', () => {
                    // Age = 20 years 0 month 1 day
                    const validationResult = MinAgeValidator.minAgeValidator( minAge, noPattern )( { value : '14/02/1980' } );
                    expect( validationResult ).toBeNull();
                } );
            } );
            describe( 'when giving a date of birth that is the same age as the min age (18 years old)', () => {
                it( 'should be considered as valid', () => {
                    // Age = 18 years 0 month 1 day
                    const validationResult = MinAgeValidator.minAgeValidator( minAge, noPattern )( { value : '14/02/1982' } );
                    expect( validationResult ).toBeNull();
                } );
            } );
            describe( 'when giving a date of birth that is younger than the min age (17 years old)', () => {
                it( 'should be considered as invalid', () => {
                    // Age = 17 years 0 month 1 day
                    const validationResult = MinAgeValidator.minAgeValidator( minAge, noPattern )( { value : '14/02/1983' } );
                    expect( validationResult ).not.toBeNull();
                } );
            } );
        } );
    } );

    describe( 'MaxAgeValidator - maxAge = 100', () => {

        const maxAge    = 100;
        const noPattern = undefined;

        beforeEach( () => {
            // Mock today's date
            const today = moment( '2000-02-15' ).toDate();
            jasmine.clock().mockDate( today );
        } );

        describe( 'when giving a date of birth that is younger than the max age (99 years old)', () => {
            it( 'should be considered as valid', () => {
                // Age = 99 years 0 month 1 day
                const validationResult = MaxAgeValidator.maxAgeValidator( maxAge, noPattern )( { value : '14/02/1901' } );
                expect( validationResult ).toBeNull();
            } );
        } );
        describe( 'when giving a date of birth that is the same age as the max age (100 years old)', () => {
            it( 'should be considered as invalid', () => {
                // Age = 100 years 0 month 1 day
                const validationResult = MaxAgeValidator.maxAgeValidator( maxAge, noPattern )( { value : '14/02/1900' } );
                expect( validationResult ).not.toBeNull();
            } );
        } );
        describe( 'when giving a date of birth that is older than the max age (101 years old)', () => {
            it( 'should be considered as invalid', () => {
                // Age = 101 years 0 month 1 day
                const validationResult = MaxAgeValidator.maxAgeValidator( maxAge, noPattern )( { value : '14/02/1899' } );
                expect( validationResult ).not.toBeNull();
            } );
        } );
    } );

} );
