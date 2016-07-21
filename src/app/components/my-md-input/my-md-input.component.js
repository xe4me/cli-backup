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
var lang_1 = require('@angular/core/src/facade/lang');
var form_utils_1 = require('amp-ddc-components/src/app/util/form-utils');
var MdInputComponent = (function () {
    function MdInputComponent(_cd, el, renderer) {
        this._cd = _cd;
        this.el = el;
        this.renderer = renderer;
        this._required = false;
        this.isInSummaryState = false;
        this.showLabel = true;
        this.tolowerCase = false;
        this.toupperCase = false;
        this.onAdjustWidth = new core_1.EventEmitter();
        this.onEnter = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onKeyup = new core_1.EventEmitter();
    }
    MdInputComponent.prototype.ngAfterViewInit = function () {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if (this.inputWidth === 0) {
            this.inputWidth = 300;
        }
        this.tempClassNames = this.el.nativeElement.className;
        this.renderer.setElementAttribute(this.el.nativeElement, 'class', '');
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.inputWidth + 'px');
        //this.el.nativeElement.className = this.tempClassNames;
        this.updateValitators();
        this._cd.detectChanges();
        // Artifically inject the data-automation-id into the internals of @angular-material md-input
        this.renderer.setElementAttribute(this.el.nativeElement.querySelector('input'), 'data-automation-id', 'text_' + this._id);
        // Artifically inject the placeholder property into the input element of the md-input directive.
        this.renderer.setElementAttribute(this.el.nativeElement.querySelector('input'), 'placeholder', this.placeholder);
        return undefined;
    };
    MdInputComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('isInSummaryState')) {
            if (changes.isInSummaryState.currentValue === true) {
                this.shrink();
            }
            else {
                this.initiateInputWidth();
            }
        }
        return undefined;
    };
    Object.defineProperty(MdInputComponent.prototype, "isRequired", {
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
    Object.defineProperty(MdInputComponent.prototype, "valMinLength", {
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
    Object.defineProperty(MdInputComponent.prototype, "valMaxLength", {
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
    Object.defineProperty(MdInputComponent.prototype, "valMinDate", {
        get: function () {
            return this._valMinDate;
        },
        set: function (value) {
            value = (value === 'now' ? 0 : value);
            this._valMinDate = value;
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputComponent.prototype, "valMaxDate", {
        get: function () {
            return this._valMaxDate;
        },
        set: function (value) {
            value = (value === 'now' ? 0 : value);
            this._valMaxDate = value;
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputComponent.prototype, "id", {
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    // set autoFocus ( value : boolean ) {
    //     if ( this.isTrue( value ) && this.el ) {
    //         let input = this.el.nativeElement.querySelector( 'input' );
    //         input.focus();
    //     }
    // }
    MdInputComponent.prototype.onEnterClick = function (event) {
        if (event.keyCode === 13) {
            this.onEnter.emit('enter');
        }
    };
    MdInputComponent.prototype.initiateInputWidth = function () {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.inputWidth + 'px');
    };
    MdInputComponent.prototype.shrink = function () {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.el.nativeElement.children[1].offsetWidth + 5 + 'px');
    };
    MdInputComponent.prototype.trimValue = function () {
        var notUsabel;
        if (this.parentControl.value) {
            this.parentControl.updateValue(this.parentControl.value.trim());
            notUsabel = this.tolowerCase ? this.parentControl.updateValue(this.parentControl.value.toLowerCase()) : '';
            notUsabel = this.toupperCase ? this.parentControl.updateValue(this.parentControl.value.toUpperCase()) : '';
        }
        this.onBlur.emit('blured');
    };
    MdInputComponent.prototype.isTrue = function (value) {
        return lang_1.isPresent(value) && (value === true || value === 'true' || false);
    };
    MdInputComponent.prototype.onKeyupEvent = function ($event) {
        this.onEnterClick($event);
        this.onKeyup.emit($event);
    };
    MdInputComponent.prototype.updateValitators = function () {
        if (this.parentControl) {
            this.parentControl.validator = common_1.Validators.compose([
                RequiredValidator.requiredValidation(this._required),
                MinLengthValidator.minLengthValidation(this._valMinLength),
                MaxLengthValidator.maxLengthValidation(this._valMaxLength),
                MaxDateValidator.maxDateValidator(this._valMaxDate, this.valPattern),
                MinDateValidator.minDateValidator(this._valMinDate, this.valPattern),
                PatterValidator.patternValidator(this.valPattern)
            ]);
            this.parentControl.updateValueAndValidity({ emitEvent: true, onlySelf: false });
        }
    };
    MdInputComponent = __decorate([
        core_1.Component({
            selector: 'my-md-input',
            template: "\n            <md-input \n                #myMdInput\n                (keyup)='onKeyupEvent($event)'\n                (blur)='trimValue()'\n                [disabled]='isInSummaryState'\n                class='md-input'\n                [aria-label]='_id'\n                [name]='_id'\n                [id]='_id'\n                [minLength]='_valMinLength'\n                [ngFormControl]='parentControl'\n                [maxLength]='_valMaxLength'\n                [placeholder]='label'>\n\n                  <span *ngIf='currency' md-prefix>{{currency}}&nbsp;</span>\n\n            </md-input>\n            <span\n                class='summary-text'\n                [innerHTML]='myMdInput.value'>\n            </span>\n          ",
            styles: [require('./my-md-input.scss').toString()],
            inputs: [
                'id',
                'isInSummaryState',
                'label',
                'parentControl',
                'placeholder',
                'visibility',
                'valMaxLength',
                'valMinLength',
                'valPattern',
                'valMaxDate',
                'valMinDate',
                'isRequired',
                'hostClassesRemove',
                'showLabel',
                'tolowerCase',
                'toupperCase',
                'autoFocus',
                'noPadding',
                'currency'
            ],
            directives: [input_1.MD_INPUT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None,
            outputs: ['onEnter', 'onBlur', 'onKeyup'],
            host: {
                '[class.md-input-has-value]': 'parentControl.value',
                '[class.summary]': 'isInSummaryState',
                '[class.noPadding]': 'noPadding'
            }
        })
    ], MdInputComponent);
    return MdInputComponent;
}());
exports.MdInputComponent = MdInputComponent;
var RequiredValidator = (function () {
    function RequiredValidator() {
    }
    RequiredValidator.requiredValidation = function (isRequired) {
        return function (c) {
            if (isRequired) {
                if (!c.value || c.value.length === 0) {
                    return {
                        required: true
                    };
                }
            }
            return null;
        };
    };
    return RequiredValidator;
}());
exports.RequiredValidator = RequiredValidator;
var MaxLengthValidator = (function () {
    function MaxLengthValidator() {
    }
    MaxLengthValidator.maxLengthValidation = function (valMaxLength) {
        return function (c) {
            if (valMaxLength) {
                if (!c.value || c.value.length <= valMaxLength) {
                    return null;
                }
                return {
                    mdMaxLength: true
                };
            }
            return null;
        };
    };
    return MaxLengthValidator;
}());
exports.MaxLengthValidator = MaxLengthValidator;
var MinLengthValidator = (function () {
    function MinLengthValidator() {
    }
    MinLengthValidator.minLengthValidation = function (valMinLength) {
        return function (c) {
            if (valMinLength) {
                if (!c.value || c.value.length >= valMinLength) {
                    return null;
                }
                return {
                    mdMinLength: true
                };
            }
            return null;
        };
    };
    return MinLengthValidator;
}());
exports.MinLengthValidator = MinLengthValidator;
var PatterValidator = (function () {
    function PatterValidator() {
    }
    PatterValidator.patternValidator = function (pattern) {
        return function (c) {
            if (pattern) {
                if (!c.value || new RegExp(pattern).test(c.value)) {
                    return null;
                }
                return {
                    mdPattern: true
                };
            }
            return null;
        };
    };
    return PatterValidator;
}());
exports.PatterValidator = PatterValidator;
var MaxDateValidator = (function () {
    function MaxDateValidator() {
    }
    MaxDateValidator.maxDateValidator = function (pattern, datePattern) {
        return function (c) {
            if (pattern !== undefined) {
                var diff = form_utils_1.FormUtils.getAgeDays(c.value);
                if (!c.value || !new RegExp(datePattern).test(c.value) || !diff || diff <= pattern) {
                    return null;
                }
                return {
                    mdMaxDate: true
                };
            }
            return null;
        };
    };
    return MaxDateValidator;
}());
exports.MaxDateValidator = MaxDateValidator;
var MinDateValidator = (function () {
    function MinDateValidator() {
    }
    MinDateValidator.minDateValidator = function (pattern, datePattern) {
        return function (c) {
            if (pattern !== undefined) {
                var diff = form_utils_1.FormUtils.getAgeDays(c.value);
                if (!c.value || !new RegExp(datePattern).test(c.value) || !diff || diff >= pattern) {
                    return null;
                }
                return {
                    mdMinDate: true
                };
            }
            return null;
        };
    };
    return MinDateValidator;
}());
exports.MinDateValidator = MinDateValidator;
