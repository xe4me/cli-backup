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
var amp_ddc_components_1 = require('amp-ddc-components');
var Milad = (function () {
    function Milad() {
    }
    Milad = __decorate([
        core_1.Component({
            selector: 'amp-dropdown',
            template: "\n        <div \n            #dropdownEl\n            class='amp-dropdown'\n            [class.amp-dropdown--has-selection]='hasSelection'\n            [class.amp-dropdown--animate]='animateSelection'\n            [clicked-outside]='hideOptions'>\n\n            <label class='sr-only' [attr.for]='id'>\n                {{ label }}\n            </label>\n            <select \n                #selectEl\n                class='sr-only'\n                [attr.id]='id'\n                [ngFormControl]='parentControl'\n                (keydown)='onKeypressEvent($event)'\n                (change)='onChangeEvent()'\n                (focus)='onFocusEvent($event)'\n                [attr.disabled]='disabled ? \"disabled\" : null'>\n\n                <option value='' selected [attr.disabled]='currentOption > 0 ? \"disabled\" : null'></option>\n\n                <option *ngFor='let option of options'\n                    [value]='option.value'>\n                    {{ option.label }}\n                </option>\n                \n            </select>\n\n            <div class='amp-dropdown__select' (click)='toggleOptions()' aria-hidden='true'>\n                <div class='amp-dropdown__label' aria-hidden='true'>{{ label }}</div>\n                <span class='amp-dropdown__icon icon icon--chevron-down' aria-hidden='true'></span>\n\n                <span class='amp-dropdown__select-value' aria-hidden='true'>{{ selectedOption.label }}</span>&nbsp;\n            </div>\n            \n            <div \n                #optionsEl \n                class='amp-dropdown__options amp-dropdown__options--{{ numOptions }}'\n                [class.amp-dropdown__options--hidden]='!optionsShown'\n                aria-hidden='true'>\n                \n                <div \n                    *ngFor='let option of options' \n                    class='amp-dropdown__option' \n                    [class.amp-dropdown__option--active]='option.value == selectedOption.value'\n                    (click)='setSelectValue(option.value)'\n                    aria-hidden='true'\n                    tabindex='-1'\n                    [attr.data-option-val]='option.value'>\n\n                    {{ option.label }}\n\n                </div>\n            </div>\n        </div>\n    ",
            inputs: [
                'id',
                'label',
                'options',
                'parentControl',
                'numOptions',
                'disabled',
                'isRequired'
            ],
            styles: [require('./amp-dropdown.component.scss').toString()],
            directives: [amp_ddc_components_1.ClickedOutsideDirective],
            outputs: ['select']
        })
    ], Milad);
    return Milad;
}());
exports.Milad = Milad;
var AmpDropdownComponent = (function () {
    function AmpDropdownComponent() {
        var _this = this;
        this.id = 'amp-dropdown-' + Math.round(Math.random() * 1e10);
        this.numOptions = 4;
        this.optionsShown = false;
        this.hasSelection = false;
        this.animateSelection = false;
        this.hasWidth = false;
        this._required = false;
        this.selectedOption = {
            label: '',
            value: ''
        };
        this.hideOptions = function () {
            _this.optionsShown = false;
        };
    }
    AmpDropdownComponent.prototype.ngAfterViewInit = function () {
        this.updateValitators();
        this.selectElem = this.selectEl.nativeElement;
        this.dropdownElem = this.dropDownEl.nativeElement;
        this.optionsElem = this.optionsEl.nativeElement;
        // Set default value        
        this.selectElem.selectedIndex = Math.max(0, this.selectElem.selectedIndex);
        this.setSelectedOption('initial');
        return undefined;
    };
    Object.defineProperty(AmpDropdownComponent.prototype, "isRequired", {
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
    AmpDropdownComponent.prototype.toggleOptions = function () {
        if (this.disabled) {
            return false;
        }
        if (this.optionsShown) {
            this.hideOptionsWithFocus();
        }
        else {
            this.showOptions(true);
        }
    };
    AmpDropdownComponent.prototype.showOptions = function (showActive) {
        var _this = this;
        var activeOption = this.optionsElem.querySelectorAll('.amp-dropdown__option--active')[0];
        if (!this.hasWidth) {
            var width = this.optionsElem.offsetWidth;
            this.dropdownElem.style.width = width + 'px';
            this.hasWidth = true;
        }
        this.optionsShown = true;
        if (showActive && activeOption) {
            setTimeout(function () {
                activeOption.focus();
            });
        }
        setTimeout(function () {
            _this.selectElem.focus();
        }, 10);
    };
    AmpDropdownComponent.prototype.hideOptionsWithFocus = function () {
        var _this = this;
        this.selectElem.focus();
        setTimeout(function () {
            _this.hideOptions();
        });
    };
    AmpDropdownComponent.prototype.onKeypressEvent = function ($event) {
        switch ($event.keyCode) {
            // Enter key
            case 13:
                $event.preventDefault();
                this.toggleOptions();
                break;
            // Space key
            case 32:
                $event.preventDefault();
                this.toggleOptions();
                break;
            // Escape key
            case 27:
                this.hideOptions();
                break;
            // Tab key
            case 9:
                this.hideOptions();
                break;
            default:
                this.changeCurrentOption();
                return;
        }
    };
    AmpDropdownComponent.prototype.changeCurrentOption = function () {
        var _this = this;
        // Fix for firefox select change event not being fired 
        // each option change
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            setTimeout(function () {
                _this.onChangeEvent();
            });
        }
    };
    AmpDropdownComponent.prototype.onChangeEvent = function () {
        this.setSelectedOption('change');
        if (this.optionsShown && this.hasSelection) {
            this.optionsElem.querySelectorAll('[data-option-val=' + this.selectedOption.value + ']')[0].focus();
            this.selectElem.focus();
        }
    };
    AmpDropdownComponent.prototype.onFocusEvent = function ($event) {
        this.showOptions(false);
    };
    AmpDropdownComponent.prototype.setSelectValue = function (value) {
        this.selectElem.value = value;
        this.trigger('change', this.selectElem);
        this.hideOptionsWithFocus();
    };
    AmpDropdownComponent.prototype.setSelectedOption = function (type) {
        this.currentOption = this.selectElem.selectedIndex;
        if (this.currentOption > 0) {
            if (!this.animateSelection && type === 'change') {
                this.animateSelection = true;
            }
            var selected = this.selectElem.options[this.currentOption];
            this.selectedOption = {
                label: selected.text,
                value: selected.value
            };
            this.hasSelection = true;
        }
    };
    AmpDropdownComponent.prototype.trigger = function (event, el) {
        var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent(event, true, true);
        el.dispatchEvent(evObj);
    };
    AmpDropdownComponent.prototype.updateValitators = function () {
        if (this.parentControl) {
            this.parentControl.validator = common_1.Validators.compose([
                amp_ddc_components_1.RequiredValidator.requiredValidation(this._required)
            ]);
            this.parentControl.updateValueAndValidity({ emitEvent: true, onlySelf: false });
        }
    };
    AmpDropdownComponent.prototype.isTrue = function (value) {
        return lang_1.isPresent(value) && (value === true || value === 'true' || false);
    };
    __decorate([
        core_1.ViewChild('selectEl')
    ], AmpDropdownComponent.prototype, "selectEl");
    __decorate([
        core_1.ViewChild('optionsEl')
    ], AmpDropdownComponent.prototype, "optionsEl");
    __decorate([
        core_1.ViewChild('dropdownEl')
    ], AmpDropdownComponent.prototype, "dropDownEl");
    return AmpDropdownComponent;
}());
exports.AmpDropdownComponent = AmpDropdownComponent;
