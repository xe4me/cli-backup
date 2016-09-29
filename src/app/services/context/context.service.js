"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var environments_abstract_1 = require('../../abstracts/environments/environments.abstract');
var ContextService = (function () {
    function ContextService(http) {
        this.http = http;
        this._context = { initialized: false };
        this._contextUrl = environments_abstract_1.Environments.property.TamServicePath + environments_abstract_1.Environments.property.GwDDCService.EnvPath + environments_abstract_1.Environments.property.GwDDCService.Path + '/usersession';
    }
    Object.defineProperty(ContextService.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (ctx) {
            Object.assign(this._context, ctx);
            this._context.initialized = true;
        },
        enumerable: true,
        configurable: true
    });
    ContextService.prototype.fetchContext = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, body: '' });
        return this.http.get(this._contextUrl, options)
            .map(function (res) { return res.json(); });
    };
    ContextService = __decorate([
        core_1.Injectable()
    ], ContextService);
    return ContextService;
}());
exports.ContextService = ContextService;
