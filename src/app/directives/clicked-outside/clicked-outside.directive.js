"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ClickedOutsideDirective = (function () {
    function ClickedOutsideDirective(_el) {
        this._el = _el;
        this.outsideClick = new core_1.EventEmitter();
    }
    ClickedOutsideDirective.prototype.onClick = function (event) {
        if (this.clickedOutside(event)) {
            this.outsideClick.emit(true);
            if (this.callback) {
                this.callback();
            }
        }
    };
    ClickedOutsideDirective.prototype.clickedOutside = function (event) {
        var clickedTarget = event.target;
        var host = this._el.nativeElement;
        do {
            if (clickedTarget === host) {
                return false;
            }
            clickedTarget = clickedTarget.parentNode;
        } while (clickedTarget);
        return true;
    };
    __decorate([
        core_1.Input('clicked-outside')
    ], ClickedOutsideDirective.prototype, "callback");
    ClickedOutsideDirective = __decorate([
        core_1.Directive({
            selector: '[clicked-outside]',
            host: {
                '(document:click)': 'onClick($event)'
            },
            outputs: ['outsideClick']
        })
    ], ClickedOutsideDirective);
    return ClickedOutsideDirective;
}());
exports.ClickedOutsideDirective = ClickedOutsideDirective;
