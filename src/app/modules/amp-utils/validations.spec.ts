import { PatterValidator } from './validations';
describe( 'Pattern validator ', () => {
    describe( 'pattern parser ', () => {
        let needle = 'FLAGS:';
        it( `should have the flags as undefined if the there is not ${needle} defined at the end`, () => {
            let givenPattern = '^[A-Za-z]\/g[A-Z|a-z|\'| |-]*[a-z]$';
            let parsedPattern = PatterValidator.parsePattern( givenPattern , needle );
            expect( parsedPattern ).toBeDefined();
            expect( parsedPattern.regex ).toBe( givenPattern );
            expect( parsedPattern.flags ).toBeUndefined();
        } );
        it( `should have the flags as im if the there is ${needle}im defined at the end`, () => {
            let givenPattern = `^[A-Za-z]\/g[A-Z|a-z|\'| |-]*[a-z]$${needle}im`;
            let parsedPattern = PatterValidator.parsePattern( givenPattern , needle );
            expect( parsedPattern ).toBeDefined();
            expect( parsedPattern.regex ).toBe( '^[A-Za-z]\/g[A-Z|a-z|\'| |-]*[a-z]$' );
            expect( parsedPattern.flags ).toBe('im');
        } );
        it( `should have the flags as undefined if the ${needle} are  defined in the middle of the given pattern`, () => {
            let givenPattern = `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]$`;
            let parsedPattern = PatterValidator.parsePattern( givenPattern , needle );
            expect( parsedPattern ).toBeDefined();
            expect( parsedPattern.regex ).toBe( `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]$` );
            expect( parsedPattern.flags ).toBeUndefined();
        } );
        it( `should have the flags as if ${needle}whatever is defined in the middle of the given pattern and there is also ${needle} at the end`, () => {
            let givenPattern = `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]${needle}i`;
            let parsedPattern = PatterValidator.parsePattern( givenPattern , needle );
            expect( parsedPattern ).toBeDefined();
            expect( parsedPattern.regex ).toBe( `^[A-Za-z]\/g[A-Z${needle}im|a-z|\'| |-]*[a-z]` );
            expect( parsedPattern.flags ).toBe('i');
        } );
        it( `should also work with other needles defined by the user`, () => {
            let myNeedle = 'NEEDLE';
            let givenPattern = `^[A-Za-z]\/g[A-Zim|a-z|\'| |-]*[a-z]${myNeedle}ig`;
            let parsedPattern = PatterValidator.parsePattern( givenPattern , myNeedle );
            expect( parsedPattern ).toBeDefined();
            expect( parsedPattern.regex ).toBe( `^[A-Za-z]\/g[A-Zim|a-z|\'| |-]*[a-z]` );
            expect( parsedPattern.flags ).toBe('ig');
        } );
        it( `should return flags as undefined if the given flags are something more than igm`, () => {
            let givenPattern = `^[A-Za-z]\/g[A-Zim|a-z|\'| |-]*[a-z]${needle}igmz`;
            let parsedPattern = PatterValidator.parsePattern( givenPattern , needle );
            expect( parsedPattern ).toBeDefined();
            expect( parsedPattern.regex ).toBe( givenPattern );
            expect( parsedPattern.flags ).toBeUndefined();
        } );
    } );
} );
