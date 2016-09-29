"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var environments_abstract_ts_1 = require('../../abstracts/environments/environments.abstract.ts');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var TAM_GW_API_KEY = 'apiKey';
var BASIC_AUTH_BEARER = 'Bearer ';
var CACHE_CONTROL = 'Cache-Control';
var AmpHttpService = (function () {
    function AmpHttpService(http) {
        this.http = http;
    }
    AmpHttpService.prototype.get = function (url, options) {
        if (url.startsWith('http')) {
            return this.http.get(url, this.injectCustomOptions(url, options));
        }
        return this.http.get(environments_abstract_ts_1.Environments.host + url, this.injectCustomOptions(url, options));
    };
    AmpHttpService.prototype.post = function (url, data, options) {
        if (url.startsWith('http')) {
            return this.http.post(url, data, this.injectCustomOptions(url, options));
        }
        return this.http.post(environments_abstract_ts_1.Environments.host + url, data, this.injectCustomOptions(url, options));
    };
    AmpHttpService.prototype.injectCustomOptions = function (url, options) {
        if (url && options) {
            if (url.indexOf(environments_abstract_ts_1.Environments.property.GwPracticeService.Path) > -1) {
                this.addHeader(options, TAM_GW_API_KEY, BASIC_AUTH_BEARER + environments_abstract_ts_1.Environments.property.GwPracticeService.ApiKey);
            }
            else if (url.indexOf(environments_abstract_ts_1.Environments.property.GwDDCService.Path) > -1) {
                this.addHeader(options, TAM_GW_API_KEY, BASIC_AUTH_BEARER + environments_abstract_ts_1.Environments.property.GwDDCService.ApiKey);
            }
        }
        // Default Cache-Control to no-cache header if none is specified.
        if (!(options && options.headers && options.headers.has(CACHE_CONTROL))) {
            this.addHeader(options, CACHE_CONTROL, 'no-cache');
        }
        return options;
    };
    AmpHttpService.prototype.addHeader = function (option, key, value) {
        if (option && option.headers) {
            // Will override whatever value in the existing headers
            option.headers.set(key, value);
        }
        else {
            option.headers = new http_1.Headers((_a = {}, _a[key] = value, _a));
        }
        var _a;
    };
    AmpHttpService = __decorate([
        core_1.Injectable()
    ], AmpHttpService);
    return AmpHttpService;
}());
exports.AmpHttpService = AmpHttpService;
