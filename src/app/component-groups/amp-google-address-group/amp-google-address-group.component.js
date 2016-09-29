"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/do');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var amp_google_address_component_1 = require('../../components/amp-google-address/amp-google-address.component');
var forms_1 = require('@angular/forms');
var amp_inputs_1 = require('../../modules/amp-inputs');
var amp_error_1 = require('../../modules/amp-error');
var AMPGoogleAddressComponentGroup = (function () {
    function AMPGoogleAddressComponentGroup(_cd) {
        var _this = this;
        this._cd = _cd;
        this.index = '';
        this.googleAddress = {
            id: 'googleAddress',
            label: '',
            placeholder: '',
            errors: {
                invalid: 'Address is invalid.',
                required: 'Address is a required field.'
            }
        };
        this.address = {
            id: 'address',
            label: 'Address',
            regex: '',
            maxLength: 200,
            minLength: 5,
            errors: {
                required: 'Address is a required field.'
            }
        };
        this.suburb = {
            id: 'suburb',
            label: 'Suburb',
            regex: '',
            maxLength: 50,
            minLength: 3,
            errors: {
                required: 'Suburb is required.'
            }
        };
        this.state = {
            id: 'state',
            label: 'State',
            regex: '^(ACT|NSW|NT|QLD|SA|TAS|VIC|WA)$',
            errors: {
                required: 'State is required.',
                pattern: 'State is not valid.'
            }
        };
        this.postcode = {
            id: 'postcode',
            label: 'Postcode',
            maxLength: 10,
            minLength: 4,
            regex: '^[0-9]*$',
            errors: {
                required: 'Post code is required.',
                pattern: 'Post code is not valid.',
                maxLength: 'Post code is not valid.',
                minLength: 'Post code is not valid.'
            }
        };
        this.required = false;
        this.manualEntryRequired = false;
        this.isInSummaryState = false;
        this.showManualAddrEntry = false;
        this.showNoPredictionError = false;
        this.manualInputGridItemClass = 'u-width-auto';
        this.controlGroup = new forms_1.FormGroup({});
        this.manualAddressControlGroup = new forms_1.FormGroup({});
        // Need to binding this validator into a specific context
        this.googleAddressCustomValidator = function () {
            return function (c) {
                if (!c.valid) {
                    return c.errors;
                }
                if (_this.addressComponent && _this.addressComponent.addrPlace) {
                    return null;
                }
                else {
                    return {
                        invalidAddress: {
                            text: 'Address is invalid.'
                        }
                    };
                }
            };
        };
    }
    Object.defineProperty(AMPGoogleAddressComponentGroup.prototype, "googleAddressCtrl", {
        get: function () {
            return this.controlGroup.controls[this.googleAddress.id + '_' + this.index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMPGoogleAddressComponentGroup.prototype, "stateCtrl", {
        get: function () {
            return this.manualAddressControlGroup.controls[this.state.id + '_' + this.index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMPGoogleAddressComponentGroup.prototype, "addressCtrl", {
        get: function () {
            return this.manualAddressControlGroup.controls[this.address.id + '_' + this.index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMPGoogleAddressComponentGroup.prototype, "suburbCtrl", {
        get: function () {
            return this.manualAddressControlGroup.controls[this.suburb.id + '_' + this.index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMPGoogleAddressComponentGroup.prototype, "postcodeCtrl", {
        get: function () {
            return this.manualAddressControlGroup.controls[this.postcode.id + '_' + this.index];
        },
        enumerable: true,
        configurable: true
    });
    AMPGoogleAddressComponentGroup.prototype.ngOnInit = function () {
        if (this.controlGroup) {
            this.controlGroup.addControl('manualEntryAddress', this.manualAddressControlGroup);
        }
        // this.googleAddressCtrl
        //     .valueChanges
        //     .subscribe( () => {
        //     } );
    };
    AMPGoogleAddressComponentGroup.prototype.updateAddressFields = function (googleAddress) {
        this.resetManualEntryControls();
        if (googleAddress && googleAddress.address_components) {
            this.addressCtrl.setValue(amp_google_address_component_1.AMPGoogleAddressComponent.getAddressComponent([
                'street_number',
                'route'
            ], true, googleAddress.address_components));
            this.suburbCtrl.setValue(amp_google_address_component_1.AMPGoogleAddressComponent.getAddressComponent([
                'locality',
                'sublocality'
            ], true, googleAddress.address_components));
            this.stateCtrl.setValue(amp_google_address_component_1.AMPGoogleAddressComponent.getAddressComponent(['administrative_area_level_1'], true, googleAddress.address_components));
            this.postcodeCtrl.setValue(amp_google_address_component_1.AMPGoogleAddressComponent.getAddressComponent(['postal_code'], true, googleAddress.address_components));
        }
    };
    AMPGoogleAddressComponentGroup.prototype.showManualAddrForm = function () {
        this.showManualAddrEntry = true;
        this.resetManualEntryControls();
    };
    AMPGoogleAddressComponentGroup.prototype.onGoogleAddressChanged = function (googleAddress) {
        this.updateAddressFields(googleAddress);
    };
    AMPGoogleAddressComponentGroup.prototype.onGoogleAddressPredictionsChanged = function (predictions) {
        this.showNoPredictionError = (predictions === null ? true : false);
        if (this.showNoPredictionError) {
            this.resetManualEntryControls();
        }
    };
    AMPGoogleAddressComponentGroup.prototype.manualInputGridItemClasses = function () {
        return !this.isInSummaryState ? this.manualInputGridItemClass : 'u-width-auto';
    };
    AMPGoogleAddressComponentGroup.prototype.resetManualEntryControls = function () {
        this.addressCtrl.setValue(null);
        this.addressCtrl.markAsUntouched();
        this.suburbCtrl.setValue(null);
        this.suburbCtrl.markAsUntouched();
        this.stateCtrl.setValue(null);
        this.stateCtrl.markAsUntouched();
        this.postcodeCtrl.setValue(null);
        this.postcodeCtrl.markAsUntouched();
        this.manualState.checkErrors();
    };
    __decorate([
        core_1.ViewChild('ampGoogleAddress')
    ], AMPGoogleAddressComponentGroup.prototype, "addressComponent");
    __decorate([
        core_1.ViewChild('manualState')
    ], AMPGoogleAddressComponentGroup.prototype, "manualState");
    AMPGoogleAddressComponentGroup = __decorate([
        core_1.Component({
            selector: 'amp-google-address-group',
            template: require('./amp-google-address-group.component.html'),
            inputs: [
                'index',
                'controlGroup',
                'googleAddress',
                'address',
                'state',
                'suburb',
                'postcode',
                'isInSummaryState',
                'required',
                'manualInputGridItemClass'
            ],
            styles: [require('./amp-google-address-group.component.scss').toString()],
            directives: [amp_google_address_component_1.AMPGoogleAddressComponent, amp_inputs_1.AmpInputComponent, amp_error_1.AmpErrorComponent]
        })
    ], AMPGoogleAddressComponentGroup);
    return AMPGoogleAddressComponentGroup;
}());
exports.AMPGoogleAddressComponentGroup = AMPGoogleAddressComponentGroup;
