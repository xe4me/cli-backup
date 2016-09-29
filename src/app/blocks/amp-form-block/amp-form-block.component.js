"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_error_1 = require('../../modules/amp-error');
var amp_button_component_1 = require('../../components/amp-button/amp-button.component');
var amp_overlay_component_1 = require('../../components/amp-overlay/amp-overlay.component');
var AmpFormBlockComponent = (function () {
    function AmpFormBlockComponent() {
    }
    AmpFormBlockComponent.prototype.ngOnInit = function () {
        if (!this.context) {
            console.error('Most of the amp-form-block functionalities would not be working because you have not' +
                ' passed in the context ');
        }
        return undefined;
    };
    AmpFormBlockComponent.prototype.onKeyupEnter = function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') {
            this.context.onNext();
        }
    };
    __decorate([
        core_1.Input('context')
    ], AmpFormBlockComponent.prototype, "context");
    __decorate([
        core_1.Input('noError')
    ], AmpFormBlockComponent.prototype, "noError");
    __decorate([
        core_1.Input('theme')
    ], AmpFormBlockComponent.prototype, "theme");
    AmpFormBlockComponent = __decorate([
        core_1.Component({
            selector: 'amp-form-block',
            template: "\n        <div (keyup.enter)=\"onKeyupEnter($event)\" class=\"FormBlocK \" id='{{ context?.selectorName }}'>\n             <amp-overlay [active]='!context?.isActive'></amp-overlay>\n            <h2 class=\"heading heading-intro\" [innerHtml]=\"context?.__custom.blockTitle\"></h2>\n             <ng-content></ng-content>\n             <div *ngIf=\"!noError\">\n                <amp-error [controlGroup]=\"context?.__controlGroup\"></amp-error>\n             </div>\n             <div class=\"block-buttons\">\n                 <amp-button\n                    [context]=\"context\"\n                    *ngIf='!context?.isInSummaryState'\n                    [attr.theme]=\"theme\"\n                    (click)='context.onNext()'\n                    [disabled]='!context?.canGoNext' class='btn btn-ok'>\n                    OK\n                </amp-button>\n                <amp-button\n                    [context]=\"context\"\n                    *ngIf='context?.isInSummaryState'\n                    [attr.theme]=\"theme\"\n                    (click)='context.onEdit()'\n                    class='btn btn-change btn-ok-margin-top palm-m0'>\n                    Change\n                </amp-button>\n            </div>\n            <div class='hr-block-divider'></div>\n        </div>\n    ",
            directives: [amp_button_component_1.AmpButton, amp_error_1.AmpErrorComponent, amp_overlay_component_1.AmpOverlayComponent],
            styles: [require('./amp-form-block.component.scss').toString()]
        })
    ], AmpFormBlockComponent);
    return AmpFormBlockComponent;
}());
exports.AmpFormBlockComponent = AmpFormBlockComponent;
