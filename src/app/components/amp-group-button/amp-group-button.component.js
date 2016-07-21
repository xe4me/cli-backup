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
var RADIO_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return RadioControlValueAccessors; }), multi: true });
var RadioControlValueAccessors = (function () {
    function RadioControlValueAccessors(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
    }
    RadioControlValueAccessors.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef, 'checked', value === this._elementRef.nativeElement.value);
    };
    RadioControlValueAccessors.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    RadioControlValueAccessors.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    RadioControlValueAccessors = __decorate([
        core_1.Directive({
            selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
            host: {
                '(change)': 'onChange($event.target.value)',
                '(blur)': 'onTouched()'
            },
            providers: [RADIO_VALUE_ACCESSOR]
        })
    ], RadioControlValueAccessors);
    return RadioControlValueAccessors;
}());
var AmpGroupButtonComponent = (function () {
    function AmpGroupButtonComponent(changeDetector, elem, scrollService) {
        this.changeDetector = changeDetector;
        this.elem = elem;
        this.scrollService = scrollService;
        this._disabled = false;
        this._required = false;
        this.select = new core_1.EventEmitter();
    }
    AmpGroupButtonComponent.prototype.ngOnDestroy = function () {
        this.parentControl.validator = null;
        this.parentControl.updateValueAndValidity({
            onlySelf: false,
            emitEvent: true
        });
        return undefined;
    };
    AmpGroupButtonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.parentControl.valueChanges.subscribe(function (changes) {
            _this.onSelect(changes, false);
        });
        this.updateValidators();
        this.changeDetector.detectChanges();
        return undefined;
    };
    Object.defineProperty(AmpGroupButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = this.isTrue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpGroupButtonComponent.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            var _this = this;
            setTimeout(function () {
                _this._required = _this.isTrue(value);
                _this.updateValidators();
                _this.changeDetector.detectChanges();
            }, 0);
        },
        enumerable: true,
        configurable: true
    });
    AmpGroupButtonComponent.prototype.onSelect = function (value, shouldScroll) {
        this.select.emit(value + '');
        if (!shouldScroll) {
            return;
        }
        if (this.scrollOutUnless && value !== this.scrollOutUnless) {
            this.scrollService.scrollMeOut(this.elem, 'easeInQuad', 60);
        }
        else if (this.scrollOutOn && value === this.scrollOutOn) {
            this.scrollService.scrollMeOut(this.elem, 'easeInQuad', 60);
        }
    };
    AmpGroupButtonComponent.prototype.isTrue = function (value) {
        return lang_1.isPresent(value) && (value === true || value === 'true' || false);
    };
    AmpGroupButtonComponent.prototype.updateValidators = function () {
        if (this.parentControl) {
            this.parentControl.validator = this.isTrue(this.required) ? common_1.Validators.required : null;
            this.parentControl.updateValueAndValidity({ emitEvent: true, onlySelf: false });
        }
    };
    AmpGroupButtonComponent = __decorate([
        core_1.Component({
            selector: 'amp-group-button',
            template: "\n                <div class='amp-group-button'>\n                    <span *ngFor='let button of buttons'>\n                          <input\n                                [disabled]='disabled'\n                                [attr.data-automation-id]='\"radio_button_\" + button.id'\n                                type='radio'\n                                [attr.id]='button.id'\n                                [attr.name]='groupName'\n                                [ngFormControl]='parentControl'\n                                [value]='button.value'\n                                [checked]='parentControl.value===button.value'\n                                />\n\n                            <label (click)='onSelect(button.value , true)' [attr.for]='button.id'>{{ button.label }}\n                            </label>\n\n                    </span>\n                </div>\n                ",
            inputs: [
                'required',
                'scrollOutUnless',
                'scrollOutOn',
                'disabled',
                'parentControl',
                'buttons',
                'groupName'
            ],
            styles: [require('./amp-group-button.scss').toString()],
            directives: [common_1.FORM_DIRECTIVES, RadioControlValueAccessors],
            outputs: ['select']
        })
    ], AmpGroupButtonComponent);
    return AmpGroupButtonComponent;
}());
exports.AmpGroupButtonComponent = AmpGroupButtonComponent;
