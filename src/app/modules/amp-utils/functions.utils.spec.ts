import { toTitleCase } from './functions.utils';
describe( 'Utils ' , () => {
    describe( 'toTitleCase ' , () => {
        it( 'should convert all the words in the string to be title case' , () => {
            let wordSample          = 'we sHouLd all BE FRIENDS togethER';
            let wordSampleTitleCase = 'We Should All Be Friends Together';
            expect( toTitleCase( wordSample ) ).toEqual( wordSampleTitleCase );
        } );
        it( 'should convert single word to title case' , () => {
            let wordSample          = 'aLonGWord';
            let wordSampleTitleCase = 'Alongword';
            expect( toTitleCase( wordSample ) ).toEqual( wordSampleTitleCase );
        } );
        it( 'should return null if the word is null' , () => {
            expect( toTitleCase( null ) ).toEqual( null );
        } );
        it( 'should return the number if the word is a number' , () => {
            let wordSample          = 12345600;
            let wordSampleTitleCase = 12345600;
            expect( toTitleCase( wordSample ) ).toEqual( wordSampleTitleCase );
        } );
    } );
} );
