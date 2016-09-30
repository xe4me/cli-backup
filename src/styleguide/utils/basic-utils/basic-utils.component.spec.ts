import { BasicUtils } from '../../../app/modules/amp-utils/basic-utils';
describe( 'Basic Util functions test' , () => {
    let valueAsString : string     = '2,000,00';
    let valueAsInt : number        = 200000;
    let valueWithCurrency : string = '$200,000.00';
    it( 'Format String to Number' , () => {
            expect( BasicUtils.formatStringToNumber( valueAsString ) ).toEqual( valueAsInt );
        }
    );
    it( 'Prefix currency symbol to string' , () => {
            expect( BasicUtils.formatCurrency( valueAsString ) ).toEqual( valueWithCurrency );
        }
    );
} );
