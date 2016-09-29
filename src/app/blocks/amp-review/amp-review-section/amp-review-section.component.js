"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_button_component_1 = require('../../../components/amp-button/amp-button.component');
var AmpReviewSection = (function () {
    function AmpReviewSection() {
    }
    AmpReviewSection.prototype.onChangeClick = function () {
        if (typeof this.changeCallback === 'function') {
            this.changeCallback(this.changeTarget);
        }
    };
    Object.defineProperty(AmpReviewSection.prototype, "shouldShowChangeLink", {
        get: function () {
            return typeof this.changeCallback === 'function';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], AmpReviewSection.prototype, "changeCallback");
    __decorate([
        core_1.Input()
    ], AmpReviewSection.prototype, "changeTarget");
    AmpReviewSection = __decorate([
        core_1.Component({
            selector: 'amp-review-section',
            template: "\n          <div class=\"grid amp-review-section pv\">\n            <div class=\"grid__item_floated\" *ngIf=\"title\">\n              <h3 class=\"amp-review-section__title mb-10\">\n                {{title}}\n              </h3>\n            </div>\n            <div class=\"amp-review-section__change-link\" *ngIf=\"shouldShowChangeLink\">\n              <amp-button (click)='onChangeClick()' class='btn btn-anchor'>\n                Change\n              </amp-button>\n            </div>\n            <ng-content></ng-content>\n          </div>\n        ",
            styles: [require('./amp-review-section.scss').toString()],
            directives: [amp_button_component_1.AmpButton],
            inputs: [
                'title'
            ]
        })
    ], AmpReviewSection);
    return AmpReviewSection;
}());
exports.AmpReviewSection = AmpReviewSection;
