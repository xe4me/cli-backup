"use strict";
var GwServiceEnvProperty = (function () {
    function GwServiceEnvProperty() {
    }
    return GwServiceEnvProperty;
}());
exports.GwServiceEnvProperty = GwServiceEnvProperty;
/**
 * ***GENERIC*** Property JSON structure - this surfaces any properties defined in various Experience repo
 *                    1, bolrnotification.js in Experience repo
 *                    2, **Maybe** goals.js in Experience repo
 */
var RootEnvProperty = (function () {
    function RootEnvProperty() {
        if (_process_env) {
            Object.assign(this, _process_env);
        }
    }
    return RootEnvProperty;
}());
exports.RootEnvProperty = RootEnvProperty;
var Environments = (function () {
    function Environments() {
    }
    Object.defineProperty(Environments, "host", {
        get: function () {
            if (Environments.property.ENV === 'development') {
                return 'http://localhost:8882';
            }
            else {
                /*
                 * NOTE:
                 * Find out what is the different env urls
                 *
                 * */
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Environments.property = new RootEnvProperty();
    return Environments;
}());
exports.Environments = Environments;
