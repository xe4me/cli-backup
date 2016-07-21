"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Ruler_1 = require('../util/Ruler');
// import * as browser from '@angular/platform-browser';
var browser_adapter_1 = require('@angular/platform-browser/src/browser/browser_adapter');
var core_2 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_2 = require('@angular/platform-browser');
var AmpStickyOnScrollDirective = (function () {
    function AmpStickyOnScrollDirective(zone, el, renderer) {
        this.zone = zone;
        this.el = el;
        this.renderer = renderer;
        this.sticked = false;
        this.domAdapter = new browser_adapter_1.BrowserDomAdapter();
        this.ruler = new Ruler_1.Ruler(this.domAdapter);
    }
    AmpStickyOnScrollDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initialPosition = this.domAdapter.getStyle(this.el.nativeElement, 'position') || 'initial';
        this.initialTop = this.domAdapter.getStyle(this.el.nativeElement, 'top') || '0';
        this.zone.runOutsideAngular(function () {
            var manager = new platform_browser_2.EventManager([new platform_browser_1.DomEventsPlugin()], new core_2.NgZone({ enableLongStackTrace: false }));
            manager.addGlobalEventListener('window', 'scroll', function (e) {
                _this.onScroll();
            });
        });
        return undefined;
    };
    AmpStickyOnScrollDirective.prototype.onScroll = function () {
        if (this.shouldStick()) {
            this.stick();
        }
        else {
            this.unstick();
        }
    };
    AmpStickyOnScrollDirective.prototype.stick = function () {
        var _this = this;
        if (this.sticked === false) {
            this
                .ruler
                .measure(this.el)
                .then(function (rect) {
                var top = rect.top;
                _this.renderer.setElementStyle(_this.el.nativeElement, 'position', 'fixed');
                _this.renderer.setElementStyle(_this.el.nativeElement, 'top', top + 'px');
                _this.sticked = true;
            });
        }
    };
    AmpStickyOnScrollDirective.prototype.unstick = function () {
        if (this.sticked === true) {
            this.renderer.setElementStyle(this.el.nativeElement, 'position', this.initialPosition);
            this.renderer.setElementStyle(this.el.nativeElement, 'top', this.initialTop + 'px');
            this.sticked = false;
        }
    };
    __decorate([
        core_1.Input('sticky-on-scroll')
    ], AmpStickyOnScrollDirective.prototype, "shouldStick");
    AmpStickyOnScrollDirective = __decorate([
        core_1.Directive({
            selector: '[sticky-on-scroll]'
        })
    ], AmpStickyOnScrollDirective);
    return AmpStickyOnScrollDirective;
}());
exports.AmpStickyOnScrollDirective = AmpStickyOnScrollDirective;
