"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var input_1 = require('@angular2-material/input');
var amp_ddc_components_1 = require('amp-ddc-components');
var lang_1 = require('@angular/core/src/facade/lang');
var AmpTextareaComponent = (function () {
    function AmpTextareaComponent(_cd, el) {
        this._cd = _cd;
        this.el = el;
        this._required = false;
        this.hasFocus = false;
        this.onAdjustWidth = new core_1.EventEmitter();
    }
    AmpTextareaComponent.prototype.ngOnDestroy = function () {
        this.parentControl.validator = null;
        this.parentControl.updateValueAndValidity({
            onlySelf: false,
            emitEvent: true
        });
        return undefined;
    };
    AmpTextareaComponent.prototype.ngAfterViewInit = function () {
        var componentHeight = this.el.nativeElement.scrollHeight;
        var textarea = this.el.nativeElement.querySelector('textarea');
        this.initialTextareaHeight = textarea.style.height || textarea.scrollHeight;
        this.componentHeightOffset = componentHeight - (this.initialTextareaHeight + 4);
        this.initialComponentHeight = this.initialTextareaHeight + this.componentHeightOffset;
        this.adjustHeight(textarea);
        this.updateValitators();
        this._cd.detectChanges();
        return undefined;
    };
    AmpTextareaComponent.prototype.adjustHeight = function (element) {
        if (this.parentControl.value === null || this.parentControl.value.trim() === '') {
            element.style.height = this.initialTextareaHeight + 'px';
            this.el.nativeElement.style.height = this.initialComponentHeight + 'px';
        }
        else {
            element.style.height = '1px';
            element.style.height = (4 + element.scrollHeight) + 'px';
            this.el.nativeElement.style.height = (this.componentHeightOffset + element.scrollHeight) + 'px';
        }
    };
    Object.defineProperty(AmpTextareaComponent.prototype, "id", {
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpTextareaComponent.prototype, "isRequired", {
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
    Object.defineProperty(AmpTextareaComponent.prototype, "valMinLength", {
        get: function () {
            return this._valMinLength;
        },
        set: function (value) {
            this._valMinLength = value;
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpTextareaComponent.prototype, "valMaxLength", {
        get: function () {
            return this._valMaxLength;
        },
        set: function (value) {
            this._valMaxLength = value;
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    AmpTextareaComponent.prototype.trimValue = function () {
        return this.parentControl.value ? this.parentControl.updateValue(this.parentControl.value.trim()) : '';
    };
    AmpTextareaComponent.prototype.updateValitators = function () {
        if (this.parentControl) {
            this.parentControl.validator = common_1.Validators.compose([
                amp_ddc_components_1.RequiredValidator.requiredValidation(this._required),
                amp_ddc_components_1.MinLengthValidator.minLengthValidation(this._valMinLength),
                amp_ddc_components_1.MaxLengthValidator.maxLengthValidation(this._valMaxLength)
            ]);
            this.parentControl.updateValueAndValidity({ emitEvent: true, onlySelf: false });
        }
    };
    AmpTextareaComponent.prototype.isTrue = function (value) {
        return lang_1.isPresent(value) && (value === true || value === 'true' || false);
    };
    AmpTextareaComponent.prototype.setHasFocus = function (value) {
        this.hasFocus = value;
    };
    AmpTextareaComponent = __decorate([
        core_1.Component({
            selector: 'amp-textarea',
            template: "\n    <md-input-container\n        [class.md-input-has-value]='parentControl.value'\n        [class.md-input-focused]='hasFocus'\n        [ngClass]='{\"md-input-has-placeholder\" : placeholder,\"summary\" : isInSummaryState}'\n        flex-gt-sm='' >\n        <!--(paste)='adjustHeight($event.target)'\n            (blur)='adjustHeight($event.target)'\n            '-->\n        <label\n         [ngClass]='{\"summary\" : isInSummaryState}'\n        *ngIf='!isInSummaryState' [attr.for]='_id'>{{label}}</label><!--\n        --><textarea\n                #textarea\n                (keyup)='adjustHeight($event.target)'\n                (blur)='adjustHeight($event.target)'\n                (blur)='trimValue()'\n                (blur)='setHasFocus(false)'\n                (focus)='setHasFocus(true)'\n                [class.summary-state]='isInSummaryState'\n                [disabled]='isInSummaryState'\n                class='md-input'\n                [attr.name]='_id'\n                [attr.id]='_id'\n                [attr.maxlength]='valMaxLength'\n                [attr.data-automation-id]='\"textarea_\" + _id'\n                [ngFormControl]='parentControl'\n                [attr.placeholder]='placeholder'>\n            </textarea>\n            <span\n            [class.error]='valMaxLength==textarea.value.length' class='char-left'\n             *ngIf='valMaxLength && valMaxLength>0 && !isInSummaryState'>{{textarea.value.length }} / {{ valMaxLength }}</span>\n            <span class='summary-text'>{{ parentControl.value }}</span>\n        <ng-content></ng-content>\n  </md-input-container>\n  ",
            styles: [require('./amp-textarea.scss').toString()],
            inputs: [
                'id',
                'isInSummaryState',
                'label',
                'parentControl',
                'placeholder',
                'visibility',
                'valMaxLength',
                'valMinLength',
                'isRequired',
                'hostClassesRemove'
            ],
            directives: [input_1.MD_INPUT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.Emulated
        })
    ], AmpTextareaComponent);
    return AmpTextareaComponent;
}());
exports.AmpTextareaComponent = AmpTextareaComponent;
