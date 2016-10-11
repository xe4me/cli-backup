import { stringTemplate } from '../../../app/modules/amp-utils/functions.utils';

describe( 'Functions tests' , () => {

    //
    // String Template
    //

    let str = {
        literal: 'The name is {last}, {first} {last}',
        array: 'The name is {1}, {0} {1}',
        output: 'The name is Bond, James Bond'
    };

    it( 'String Template works correctly with object literal' , () => {
            expect( stringTemplate( str.literal, { first: 'James', last: 'Bond' } ) ).toEqual( str.output );
        }
    );

    it( 'String Template works correctly with array' , () => {
            expect( stringTemplate( str.array, ['James', 'Bond'] ) ).toEqual( str.output );
        }
    );
} );
