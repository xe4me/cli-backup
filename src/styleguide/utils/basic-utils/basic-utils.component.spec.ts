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

    //
    // Format Address
    //

    let ausAddress = {
        address_: '33 Alfred Street',
        city_: '',
        country_: 'AUS',
        state_: 'NSW',
        suburb_: 'Sydney',
        postCode_: '2000'
    };

    let ausAddressOutput = '33 Alfred Street, Sydney NSW 2000, AUS';

    let nzAddress = {
        address_: '42 Shotover St',
        city_: 'Queenstown',
        country_: 'NZL',
        state_: '',
        suburb_: 'QT',
        postCode_: '9300'
    };

    let nzAddressOutput = '42 Shotover St, QT, Queenstown 9300, NZL';

    let ukAddress = {
        address_: '10 Downing Street',
        city_: 'London',
        country_: 'UK',
        state_: '',
        suburb_: '',
        postCode_: 'SW1A 2AA'
    };

    let ukAddressOutput = '10 Downing Street, London SW1A 2AA, UK';

    it( 'Format Australian address correctly' , () => {
            expect( BasicUtils.formatAddress( ausAddress ) ).toEqual( ausAddressOutput );
        }
    );

    it( 'Format New Zealand address correctly' , () => {
            expect( BasicUtils.formatAddress( nzAddress ) ).toEqual( nzAddressOutput );
        }
    );

    it( 'Format UK address correctly' , () => {
            expect( BasicUtils.formatAddress( ukAddress ) ).toEqual( ukAddressOutput );
        }
    );
} );
