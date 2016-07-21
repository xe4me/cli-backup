"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
// import * as browser from '@angular/platform-browser';
var browser_adapter_1 = require('@angular/platform-browser/src/browser/browser_adapter');
var AmpButton = (function () {
    function AmpButton(elementRef, renderer, parent) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.parent = parent;
        renderer.setElementAttribute(elementRef.nativeElement, 'class', null);
    }
    AmpButton.prototype.ngAfterContentInit = function () {
        this.domAdatper = new browser_adapter_1.BrowserDomAdapter();
        var contentStr = this.domAdatper.getText(this.elementRef.nativeElement);
        this.dataAutomationId = 'btn-' + (contentStr ? contentStr.replace(/\s+/g, '') : '');
        if (this.parent) {
            this.dataAutomationId += '_' + this.parent.blockType;
        }
    };
    __decorate([
        core_1.Input()
    ], AmpButton.prototype, "click");
    __decorate([
        core_1.Input()
    ], AmpButton.prototype, "disabled");
    __decorate([
        core_1.Input('class')
    ], AmpButton.prototype, "_class");
    AmpButton = __decorate([
        core_1.Component({
            selector: 'amp-button',
            template: "\n    <button\n        type='button'\n        (click)='click'\n        [disabled]='disabled'\n        [class]='_class'\n        [attr.data-automation-id]='dataAutomationId'>\n        <ng-content></ng-content>\n    </button>",
            styles: [require('./amp-button.component.scss').toString()],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(2, core_1.SkipSelf()),
        __param(2, core_1.Optional())
    ], AmpButton);
    return AmpButton;
}());
exports.AmpButton = AmpButton;
