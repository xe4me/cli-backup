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
        address         : '33 Alfred Street' ,
        city            : '' ,
        countryDropdown : {
            Query        : 'Australia' ,
            SelectedItem : 'AUS'
        } ,
        stateDropdown   : {
            Query        : 'NSW' ,
            SelectedItem : 'NSW'
        } ,
        suburb          : 'Sydney' ,
        postCode        : '2000'
    };
    let ausAddressOutput = '33 Alfred Street, Sydney NSW 2000, Australia';
    let nzAddress = {
        address         : '42 Shotover St' ,
        city            : 'Queenstown' ,
        countryDropdown : {
            Query        : 'New Zealand' ,
            SelectedItem : 'NZL'
        } ,
        stateDropdown   : {
            Query        : '' ,
            SelectedItem : ''
        } ,
        suburb          : 'QT' ,
        postCode        : '9300'
    };
    let nzAddressOutput = '42 Shotover St, QT, Queenstown 9300, New Zealand';
    let ukAddress = {
        address         : '10 Downing Street' ,
        city            : 'London' ,
        countryDropdown : {
            Query        : 'United Kingdom' ,
            SelectedItem : 'UK'
        } ,
        stateDropdown   : {
            Query        : '' ,
            SelectedItem : ''
        } ,
        suburb          : '' ,
        postCode        : 'SW1A 2AA'
    };
    let ukAddressOutput = '10 Downing Street, London SW1A 2AA, United Kingdom';
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

});

//
// Base64 Data to Object
//

describe( 'Get user data from base64 encoded string' , () => {

    let base64Input = btoa('James#j.bond@gmail.com#NSW#12345678');

    let base64Output = {
        name: 'James',
        email: 'j.bond@gmail.com',
        state: 'NSW',
        customer_id: '12345678'
    };

    it( 'should split a base64 string and store parts in an object' , () => {
            expect( BasicUtils.base64DatatoObject( base64Input ) ).toEqual( base64Output );
        }
    );

    // Different Order

    let base64InputDifferentOrder = btoa('12345678#j.bond@gmail.com#NSW#James');

    let base64OutputDifferentOrder = {
        customer_id: '12345678',
        email: 'j.bond@gmail.com',
        state: 'NSW',
        name: 'James'
    };

    it( 'should split a base64 string and store parts in an object when passed a custom property ordering' , () => {
            expect( BasicUtils.base64DatatoObject( base64InputDifferentOrder , ['customer_id', 'email', 'state', 'name'] ) ).toEqual( base64OutputDifferentOrder );
        }
    );

    // Different Separator

    let base64InputSeparator = btoa('James/j.bond@gmail.com/NSW/12345678');

    it( 'should split a base64 string and store parts in an object using a custom separator' , () => {
            expect( BasicUtils.base64DatatoObject( base64InputSeparator , ['name', 'email', 'state', 'customer_id'] , '/' ) ).toEqual( base64Output );
        }
    );

    // Not enough data passed into encoded string

    let base64InputInvalid = btoa('James#12345678');

    it( 'should return empty object when string does not contain enough data' , () => {
            expect( BasicUtils.base64DatatoObject( base64InputInvalid ) ).toEqual( {} );
        }
    );

    // Invalid encoded string

    it( 'should return empty object when passed invalid encoded string' , () => {
            expect( BasicUtils.base64DatatoObject( 'SmF3asdTIzNDU2Nzg' ) ).toEqual( {} );
        }
    );
} );
