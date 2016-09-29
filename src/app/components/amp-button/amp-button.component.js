"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var browser_adapter_1 = require('@angular/platform-browser/src/browser/browser_adapter');
var AmpButton = (function () {
    function AmpButton(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        renderer.setElementAttribute(elementRef.nativeElement, 'class', null);
    }
    AmpButton.prototype.ngAfterContentInit = function () {
        this.domAdatper = new browser_adapter_1.BrowserDomAdapter();
        var contentStr = this.domAdatper.getText(this.elementRef.nativeElement);
        if (!this.dataAutomationId || !this.dataAutomationId.length) {
            this._dataAutomationId = 'btn-' + (contentStr ? contentStr.replace(/\s+/g, '') : '');
            if (this.context) {
                this._dataAutomationId += '_' + this.context.__blockType;
            }
        }
        else {
            this._dataAutomationId = this.dataAutomationId;
        }
    };
    __decorate([
        core_1.Input('chevron')
    ], AmpButton.prototype, "_chevron");
    __decorate([
        core_1.Input('context')
    ], AmpButton.prototype, "context");
    __decorate([
        core_1.Input()
    ], AmpButton.prototype, "click");
    __decorate([
        core_1.Input()
    ], AmpButton.prototype, "disabled");
    __decorate([
        core_1.Input('class')
    ], AmpButton.prototype, "_class");
    __decorate([
        core_1.Input('data-automation-id')
    ], AmpButton.prototype, "dataAutomationId");
    AmpButton = __decorate([
        core_1.Component({
            selector: 'amp-button',
            template: "\n    <button\n        type='button'\n        [attr.chevron]='_chevron'\n        (click)='click'\n        [disabled]='disabled'\n        [class]='_class'\n        [attr.data-automation-id]='_dataAutomationId'>\n        <ng-content></ng-content>\n    </button>",
            styles: [require('./amp-button.component.scss').toString()],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AmpButton);
    return AmpButton;
}());
exports.AmpButton = AmpButton;
