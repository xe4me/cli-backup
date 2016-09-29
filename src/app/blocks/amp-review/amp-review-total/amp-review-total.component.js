"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AmpReviewTotal = (function () {
    function AmpReviewTotal() {
    }
    AmpReviewTotal = __decorate([
        core_1.Component({
            selector: 'amp-review-total',
            template: "\n          <div class=\"grid__container amp-review-total pv\">\n            <h3 class=\"grid__item_floated amp-review-total__label 2/5\">\n              <span>{{label}}</span>\n            </h3><!--\n         --><div class=\"amp-review-total__value grid__item_floated 3/5 pl\">\n              <span *ngIf=\"value\">\n                <span>{{value}}</span>\n                <span *ngIf=\"frequency\">{{frequency}}</span>\n              </span>\n              <span *ngIf=\"!value\">-</span>\n            </div>\n          </div>\n        ",
            styles: [require('./amp-review-total.scss').toString()],
            inputs: [
                'label',
                'value',
                'frequency'
            ]
        })
    ], AmpReviewTotal);
    return AmpReviewTotal;
}());
exports.AmpReviewTotal = AmpReviewTotal;
