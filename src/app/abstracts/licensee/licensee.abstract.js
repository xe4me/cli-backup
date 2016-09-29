"use strict";
var LicenseesAbstract = (function () {
    function LicenseesAbstract() {
    }
    Object.defineProperty(LicenseesAbstract, "licenseeBuybackFacilities", {
        get: function () {
            return this._licenseeBuybackFacilities;
        },
        enumerable: true,
        configurable: true
    });
    LicenseesAbstract.getLicenseeBuybackFacility = function (name) {
        if (this._licenseeBuybackFacilities.hasOwnProperty(name)) {
            return this._licenseeBuybackFacilities[name];
        }
        else {
            return 'licensee not exist';
        }
    };
    Object.defineProperty(LicenseesAbstract, "licensees", {
        get: function () {
            return this._licensees;
        },
        enumerable: true,
        configurable: true
    });
    LicenseesAbstract.getLicensee = function (name) {
        if (this.licensees.hasOwnProperty(name)) {
            return this.licensees[name];
        }
        else {
            return 'licensee not exist';
        }
    };
    LicenseesAbstract._licensees = {
        DEA_AMPFP: 'AMP Financial Planning',
        DEA_HILLROSS: 'Hillross',
        DEA_CHARTER: 'Charter',
        DEA_ASSURED: 'AMP Financial Planning'
    };
    LicenseesAbstract._licenseeBuybackFacilities = {
        DEA_AMPFP: 'Buyer of last resort',
        DEA_HILLROSS: 'Licensee / Enhanced buyback',
        DEA_CHARTER: 'Buy out option',
        DEA_ASSURED: 'Buyer of last resort'
    };
    return LicenseesAbstract;
}());
exports.LicenseesAbstract = LicenseesAbstract;
