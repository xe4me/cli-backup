"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_block_loader_1 = require('./amp-block-loader');
(function (BlockLayout) {
    BlockLayout[BlockLayout["INLINE"] = 0] = "INLINE";
    BlockLayout[BlockLayout["PAGE"] = 1] = "PAGE";
    BlockLayout[BlockLayout["SECTION"] = 2] = "SECTION";
})(exports.BlockLayout || (exports.BlockLayout = {}));
var BlockLayout = exports.BlockLayout;
(function (RequireMethod) {
    RequireMethod[RequireMethod["ALL"] = 0] = "ALL";
    RequireMethod[RequireMethod["IN_ORDER"] = 1] = "IN_ORDER";
})(exports.RequireMethod || (exports.RequireMethod = {}));
var RequireMethod = exports.RequireMethod;
var AmpBlockLoaderDirective = (function (_super) {
    __extends(AmpBlockLoaderDirective, _super);
    function AmpBlockLoaderDirective(viewContainer, compiler, formSectionService, componentResolver) {
        _super.call(this, viewContainer, compiler, formSectionService, componentResolver);
        this.viewContainer = viewContainer;
        this.compiler = compiler;
        this.formSectionService = formSectionService;
        this.componentResolver = componentResolver;
        this.fdn = [];
        this.requireMethod = RequireMethod[RequireMethod.IN_ORDER];
        this.loaded = new core_1.EventEmitter();
    }
    AmpBlockLoaderDirective.prototype.getCustomBundle = function (path) {
        try {
            return require('../../../../src/app/' + path + '\.ts');
        }
        catch (err) {
            console.log('Did not find the experience components, maybe we are not in an experience');
        }
        return null;
    };
    __decorate([
        core_1.Input('amp-block-loader')
    ], AmpBlockLoaderDirective.prototype, "blockLoader");
    __decorate([
        core_1.Input('fdn')
    ], AmpBlockLoaderDirective.prototype, "fdn");
    __decorate([
        core_1.Input('form')
    ], AmpBlockLoaderDirective.prototype, "form");
    __decorate([
        core_1.Input('requireMethod')
    ], AmpBlockLoaderDirective.prototype, "requireMethod");
    __decorate([
        core_1.Output()
    ], AmpBlockLoaderDirective.prototype, "loaded");
    AmpBlockLoaderDirective = __decorate([
        core_1.Directive({
            selector: '[amp-block-loader]'
        })
    ], AmpBlockLoaderDirective);
    return AmpBlockLoaderDirective;
}(amp_block_loader_1.AmpBlockLoader));
exports.AmpBlockLoaderDirective = AmpBlockLoaderDirective;
