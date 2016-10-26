export abstract class LicenseesAbstract {
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

    public static getLicensee ( name ) {
        return this.hasLicensee( name ) ? this.licensees[ name ] : 'licensee does not exist';
    }

    public static hasLicensee ( name ) {
        return this.licensees.hasOwnProperty( name );
    }

    private static _licensees : any                 = {
        DEA_AMPFP   : 'AMP Financial Planning' ,
        DEA_HILLROSS: 'Hillross' ,
        DEA_CHARTER : 'Charter' ,
        DEA_ASSURED : 'AMP Financial Planning'
    };

    private static _licenseeBuybackFacilities : any = {
        DEA_AMPFP   : 'Buyer of last resort' ,
        DEA_HILLROSS: 'Licensee / Enhanced buyback' ,
        DEA_CHARTER : 'Buy out option' ,
        DEA_ASSURED : 'Buyer of last resort'
    };
}
