"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AmpFormRowComponent = (function () {
    function AmpFormRowComponent() {
    }
    __decorate([
        core_1.Input('title')
    ], AmpFormRowComponent.prototype, "title");
    AmpFormRowComponent = __decorate([
        core_1.Component({
            selector: 'amp-form-row',
            template: "\n        <div class='form__row'>\n            <div class=\"grid__container 1/1 palm-1/1\">\n                <label class='grid__item_floated 1/1 form-row-label-full-width' *ngIf='title'>{{ title }}</label>\n               <ng-content></ng-content>\n             </div>\n        </div>\n    ",
            styles: [require('./amp-form-row.component.scss').toString()]
        })
    ], AmpFormRowComponent);
    return AmpFormRowComponent;
}());
exports.AmpFormRowComponent = AmpFormRowComponent;
