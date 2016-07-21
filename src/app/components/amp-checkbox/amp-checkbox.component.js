"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var lang_1 = require('@angular/core/src/facade/lang');
var lang_2 = require('@angular/core/src/facade/lang');
var KeyCodes = (function () {
    function KeyCodes() {
    }
    return KeyCodes;
}());
exports.KeyCodes = KeyCodes;
var AmpCheckboxComponent = (function () {
    function AmpCheckboxComponent(_cd, elem, scrollService) {
        this._cd = _cd;
        this.elem = elem;
        this.scrollService = scrollService;
        this._disabled = false;
        this._checked = false;
        this._required = false;
        this.isInSummaryState = false;
        this.checkboxValue = false;
        this.select = new core_1.EventEmitter(false);
    }
    AmpCheckboxComponent.prototype.ngAfterViewInit = function () {
        this.updateValitators();
        this._cd.detectChanges();
        return undefined;
    };
    AmpCheckboxComponent.prototype.parseTabIndexAttribute = function (attr) {
        return lang_2.isPresent(attr) ? lang_1.NumberWrapper.parseInt(attr, 10) : 0;
    };
    Object.defineProperty(AmpCheckboxComponent.prototype, "tabindex", {
        get: function () {
            return this._tabindex;
        },
        set: function (value) {
            this._tabindex = this.parseTabIndexAttribute(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpCheckboxComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = this.isTrue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpCheckboxComponent.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = this.isTrue(value);
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpCheckboxComponent.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            this._checked = this.isTrue(value);
            this.checkboxValue = this._checked;
            this.parentControl.updateValue(this._checked);
        },
        enumerable: true,
        configurable: true
    });
    AmpCheckboxComponent.prototype.onSelect = function ($event) {
        if (this.disabled === true) {
            $event.stopPropagation();
            return;
        }
        this.checkboxValue = !this.checkboxValue;
        this.select.emit(this.checkboxValue);
        if (this.scrollOutUnless && this.checkboxValue !== this.scrollOutUnless) {
            this.scrollService.scrollMeOut(this.elem, 'easeInQuad', 60);
        }
        else if (this.scrollOutOn && this.checkboxValue === this.scrollOutOn) {
            this.scrollService.scrollMeOut(this.elem, 'easeInQuad', 60);
        }
    };
    AmpCheckboxComponent.prototype.requiredValidation = function (c) {
        return c.value === true ? null : {
            checkboxrequired: true
        };
    };
    AmpCheckboxComponent.prototype.isTrue = function (value) {
        return lang_2.isPresent(value) && (value === true || value === 'true' || false);
    };
    AmpCheckboxComponent.prototype.updateValitators = function () {
        if (this.parentControl) {
            this.parentControl.validator = this.isTrue(this.required) ? this.requiredValidation : null;
            this.parentControl.updateValueAndValidity({ emitEvent: true, onlySelf: false });
        }
    };
    AmpCheckboxComponent = __decorate([
        core_1.Component({
            selector: 'amp-checkbox',
            template: "\n            <input\n                [disabled]='disabled'\n                [checked]='checked'\n                type='checkbox'\n                [attr.data-automation-id]='\"checkbox_\" + id'\n                [attr.id]='id'\n                [attr.name]='id'\n                [ngFormControl]='parentControl'/>\n            <label (click)='onSelect($event)' [attr.for]='id'>\n                <div [class.hidden]='isInSummaryState' class=\"container\">\n                    <div class=\"off\"></div>\n                    <div class=\"on\"></div>\n                </div>\n                <div [class.summary-state]='isInSummaryState' class=\"content\">\n                    <ng-content></ng-content>\n                </div>\n            </label>\n        ",
            host: {
                '[attr.aria-checked]': 'checked',
                '[attr.aria-disabled]': 'disabled',
                '[tabindex]': 'tabindex'
            },
            styles: [require('./amp-checkbox.scss').toString()],
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            inputs: [
                'required',
                'scrollOutUnless',
                'scrollOutOn',
                'disabled',
                'parentControl',
                'checked',
                'id',
                'tabindex',
                'isInSummaryState'
            ],
            outputs: ['select']
        })
    ], AmpCheckboxComponent);
    return AmpCheckboxComponent;
}());
exports.AmpCheckboxComponent = AmpCheckboxComponent;
