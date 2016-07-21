"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ui_core_1 = require('amp-ddc-ui-core/ui-core');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
require('rxjs/add/operator/do');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var amp_google_address_component_ts_1 = require('../../components/amp-google-address/amp-google-address.component.ts');
var my_md_input_component_1 = require('../../components/my-md-input/my-md-input.component');
var AMPGoogleAddressComponentGroup = (function () {
    function AMPGoogleAddressComponentGroup() {
        this.googleAddress = {
            id: 'googleAddress',
            label: '',
            regex: '',
            placeholder: ''
        };
        this.address = {
            id: 'address',
            label: 'Address',
            regex: ''
        };
        this.suburb = {
            id: 'suburb',
            label: 'Suburb',
            regex: ''
        };
        this.state = {
            id: 'state',
            label: 'State',
            regex: ''
        };
        this.postcode = {
            id: 'postcode',
            label: 'Postcode',
            regex: ''
        };
        this.isInSummaryState = false;
        this.hasClickedOnOkButton = false;
        this.showManualAddrEntry = false;
    }
    // Need to binding this validator into a specific context
    AMPGoogleAddressComponentGroup.prototype.validateGoogleAddress = function (c) {
        if (this.addressComponent && this.addressComponent.addrPlace) {
            return null;
        }
        else {
            return {
                validateGoogleAddress: {
                    valid: false
                }
            };
        }
    };
    AMPGoogleAddressComponentGroup.prototype.ngAfterViewInit = function () {
        var _self = this;
        this.googleAddressCtrl.validator = common_1.Validators.compose([common_1.Validators.required, this.validateGoogleAddress.bind(this)]);
        this.googleAddressCtrl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .do(function (x) {
            _self.updateAddressFields(_self.addressComponent.addrPlace, _self);
        }, function (err) { }, function () { }).subscribe();
        this.stateCtrl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (value) {
            if (value) {
                _self.stateCtrl.updateValue(value.toUpperCase());
            }
        });
    };
    AMPGoogleAddressComponentGroup.prototype.updateAddressFields = function (googleAddress, _self) {
        // Push the google address into the 4 address fields, also remove validation
        if (googleAddress && googleAddress.address_components) {
            // Disable the validators, as google is providing the address
            ui_core_1.FormModelService.disableValidators(_self.addressCtrl);
            ui_core_1.FormModelService.disableValidators(_self.suburbCtrl);
            ui_core_1.FormModelService.disableValidators(_self.stateCtrl);
            ui_core_1.FormModelService.disableValidators(_self.postcodeCtrl);
            _self.addressCtrl.updateValue(amp_google_address_component_ts_1.AMPGoogleAddressComponent.getAddressComponent(['street_number', 'route'], true, googleAddress.address_components));
            _self.suburbCtrl.updateValue(amp_google_address_component_ts_1.AMPGoogleAddressComponent.getAddressComponent(['locality', 'sublocality'], true, googleAddress.address_components));
            _self.stateCtrl.updateValue(amp_google_address_component_ts_1.AMPGoogleAddressComponent.getAddressComponent(['administrative_area_level_1'], true, googleAddress.address_components));
            _self.postcodeCtrl.updateValue(amp_google_address_component_ts_1.AMPGoogleAddressComponent.getAddressComponent(['postal_code'], true, googleAddress.address_components));
        }
        else {
            // Enable the validators, as we are doing manual entry
            ui_core_1.FormModelService.enableValidators(_self.addressCtrl);
            ui_core_1.FormModelService.enableValidators(_self.suburbCtrl);
            ui_core_1.FormModelService.enableValidators(_self.stateCtrl);
            ui_core_1.FormModelService.enableValidators(_self.postcodeCtrl);
            // clear out the results
            _self.addressCtrl.updateValue(null);
            _self.suburbCtrl.updateValue(null);
            _self.stateCtrl.updateValue(null);
            _self.postcodeCtrl.updateValue(null);
        }
    };
    AMPGoogleAddressComponentGroup.prototype.showManualAddrForm = function () {
        this.showManualAddrEntry = true;
        return false;
    };
    AMPGoogleAddressComponentGroup.CLASS_NAME = 'AMPGoogleAddressComponentGroup';
    __decorate([
        core_1.ViewChild('ampGoogleAddress')
    ], AMPGoogleAddressComponentGroup.prototype, "addressComponent");
    AMPGoogleAddressComponentGroup = __decorate([
        core_1.Component({
            selector: 'amp-google-address-group',
            template: "\n        <div class='google-address' [ngClass]='{hide: showManualAddrEntry}'>\n            <div class='grid__item'>\n                <!--Practice address-->\n                <label class='heading heading-contxtual-label mb3' >Address</label><!--\n             --><amp-google-address #ampGoogleAddress\n                    class='1/1'\n                    [isInSummaryState]='isInSummaryState'\n                    [id]='googleAddress.id'\n                    [label]='googleAddress.label'\n                    [parentControl]='googleAddressCtrl'\n                    [placeholder]='googleAddress.placeholder'\n                    [valPattern]='googleAddress.regex'\n                    [valMaxLength]='googleAddress.max'>\n                </amp-google-address>\n            </div>\n\n            <div class='errors mt-25 mb-15' *ngIf='!ampGoogleAddress.addrPredictions'>\n                <span class='icon icon--close icon-errors'></span>We are unable to find your address. Try again or tell us your address line by line <a href='' (click)='showManualAddrForm()'>here</a> instead.\n            </div>\n        </div>\n        <div class='manual-address' [ngClass]='{hide: !showManualAddrEntry}'><!--\n            --><my-md-input\n                class='1/1'\n                noPadding='true'\n                [isInSummaryState]='isInSummaryState'\n                [id]='address.id'\n                [label]='address.label'\n                [parentControl]='addressCtrl'\n                isRequired='true'\n                [valPattern]='address.regex'\n                [valMaxLength]='address.max'>\n            </my-md-input><!--\n            --><span class='comma-summary-state' *ngIf='isInSummaryState'>, </span><!--\n            --><my-md-input\n                class='1/1'\n                [isInSummaryState]='isInSummaryState'\n                [id]='suburb.id'\n                [label]='suburb.label'\n                [parentControl]='suburbCtrl'\n                isRequired='true'\n                [valPattern]='suburb.regex'\n                [valMaxLength]='suburb.max'>\n            </my-md-input><!--\n            --><span class='comma-summary-state' *ngIf='isInSummaryState'>, </span><!--\n            --><my-md-input\n                noPadding='true'\n                class='1/1'\n                [isInSummaryState]='isInSummaryState'\n                [id]='state.id'\n                [label]='state.label'\n                [parentControl]='stateCtrl'\n                isRequired='true'\n                [valPattern]='state.regex'\n                [valMaxLength]='state.max'>\n            </my-md-input><!--\n            --><span class='comma-summary-state' *ngIf='isInSummaryState'>, </span><!--\n            --><my-md-input\n                noPadding='true'\n                class='1/1'\n                [isInSummaryState]='isInSummaryState'\n                [id]='postcode.id'\n                [label]='postcode.label'\n                [parentControl]='postcodeCtrl'\n                isRequired='true'\n                [valPattern]='postcode.regex'\n                [valMaxLength]='postcode.max'>\n            </my-md-input><!--\n            --><span class='comma-summary-state' *ngIf='isInSummaryState'>.</span>\n\n        </div>\n    ",
            inputs: ['googleAddress', 'address', 'state', 'suburb', 'postcode', 'googleAddressCtrl', 'addressCtrl', 'suburbCtrl', 'stateCtrl', 'postcodeCtrl', 'isInSummaryState'],
            styles: [require('./amp-google-address-group.component.scss').toString()],
            directives: [amp_google_address_component_ts_1.AMPGoogleAddressComponent, my_md_input_component_1.MdInputComponent]
        })
    ], AMPGoogleAddressComponentGroup);
    return AMPGoogleAddressComponentGroup;
}());
exports.AMPGoogleAddressComponentGroup = AMPGoogleAddressComponentGroup;
