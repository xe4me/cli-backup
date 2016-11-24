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

    //
    // Base64 Data to Object
    //

    let base64Input = btoa('James#j.bond@gmail.com#NSW#12345678');

    let base64Output = {
        name: 'James',
        email: 'j.bond@gmail.com',
        state: 'NSW',
        customer_id: '12345678'
    };

    it( 'Get user data from base64 encoded string - Standard usage' , () => {
            expect( BasicUtils.base64DatatoObject( base64Input ) ).toEqual( base64Output );
        }
    );

    // Different Seperator

    let base64InputSeperator = btoa('James/j.bond@gmail.com/NSW/12345678');

    it( 'Get user data from base64 encoded string - Different Seperator' , () => {
            expect( BasicUtils.base64DatatoObject( base64InputSeperator , ['name', 'email', 'state', 'customer_id'] , '/' ) ).toEqual( base64Output );
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

    it( 'Get user data from base64 encoded string - Different order' , () => {
            expect( BasicUtils.base64DatatoObject( base64InputDifferentOrder , ['customer_id', 'email', 'state', 'name'] ) ).toEqual( base64OutputDifferentOrder );
        }
    );

    // Not enough data passed into encoded string

    let base64InputInvalid = btoa('James#12345678');

    it( 'Get user data from base64 encoded string - Invalid data' , () => {
            expect( BasicUtils.base64DatatoObject( base64InputInvalid ) ).toEqual( {} );
        }
    );

    // Invalid encoded string

    it( 'Get user data from base64 encoded string - Invalid encoded string' , () => {
            expect( BasicUtils.base64DatatoObject( 'SmF3asdTIzNDU2Nzg' ) ).toEqual( {} );
        }
    );
} );
