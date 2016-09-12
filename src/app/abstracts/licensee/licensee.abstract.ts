export abstract class LicenseesAbstract {
    private static _licensees: any                 = {
        DEA_AMPFP   : 'AMP Financial Planning' ,
        DEA_HILLROSS: 'Hillross' ,
        DEA_CHARTER : 'Charter' ,
        DEA_ASSURED : 'AMP Financial Planning'
    };
    private static _licenseeBuybackFacilities: any = {
        DEA_AMPFP   : 'Buyer of last resort' ,
        DEA_HILLROSS: 'Licensee / Enhanced buyback' ,
        DEA_CHARTER : 'Buy out option' ,
        DEA_ASSURED : 'Buyer of last resort'
    };
    public static get licenseeBuybackFacilities () {
        return this._licenseeBuybackFacilities;
    }

    public static  getLicenseeBuybackFacility ( name ) {
        if ( this._licenseeBuybackFacilities.hasOwnProperty( name ) ) {
            return this._licenseeBuybackFacilities[ name ];
        } else {
            return 'licensee not exist';
        }
    }

    public static get licensees () {
        return this._licensees;
    }

    public static  getLicensee ( name ) {
        if ( this.licensees.hasOwnProperty( name ) ) {
            return this.licensees[ name ];
        } else {
            return 'licensee not exist';
        }
    }
}
