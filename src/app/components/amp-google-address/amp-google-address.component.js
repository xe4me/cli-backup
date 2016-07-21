"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_ddc_components_1 = require('amp-ddc-components');
var AMPGoogleAddressComponent = (function () {
    function AMPGoogleAddressComponent(zone, _cd) {
        this.zone = zone;
        this._cd = _cd;
        this.addrPredictions = {};
        this.addrPlace = {};
        this.placeholder = '';
    }
    AMPGoogleAddressComponent.getAddressComponent = function (types, getShortName, addressComponent) {
        var addr_comp = null;
        if (addressComponent && types) {
            // Concat address components found for each types
            addr_comp = types.reduce(function (type_prev, type_cur, type_index, type_arr) {
                // Concat address components found for each type
                return type_prev + ' ' + addressComponent.reduce(function (addr_prev, addr_cur, addr_index, addr_arr) {
                    if (addr_cur.types.indexOf(type_cur) > -1) {
                        return (addr_prev + ' ' + (getShortName ? addr_cur.short_name : addr_cur.long_name)).trim();
                    }
                    else {
                        return addr_prev;
                    }
                }, '');
            }, '');
        }
        return (addr_comp ? addr_comp.trim() : null);
    };
    AMPGoogleAddressComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Binding Google Places Address api to google_places_ac input field
        var input = document.getElementById(this.id + '-input');
        var options = {
            types: ['address'],
            componentRestrictions: { country: 'au' }
        };
        // TODO: Remove the UI components as we are using the AutocompleteService programmatically.
        this.autocomplete = new google.maps.places.Autocomplete(input, options);
        google.maps.event.addListener(this.autocomplete, 'place_changed', function () {
            _this.zone.run(function () {
                if (!_this.autocomplete.getPlace().formatted_address) {
                    console.log('Google address returned an address without details!', _this.autocomplete.getPlace().name);
                }
                _this.addrPlace = _this.autocomplete.getPlace();
                if (_this.addrPlace) {
                    _this.parentControl.updateValue(_this.addrPlace.formatted_address);
                }
            });
        });
    };
    AMPGoogleAddressComponent.prototype.showManualAddrOpt = function () {
        var _this = this;
        var service = new google.maps.places.AutocompleteService();
        // Clear the addrPlace internal value, if the input do not match the addrPlace
        if (this.addrPlace && this.parentControl.value !== this.addrPlace.formatted_address) {
            this.addrPlace = null;
        }
        if (this.parentControl.value) {
            service.getPlacePredictions({
                input: this.parentControl.value,
                types: ['address'],
                componentRestrictions: { country: 'au' }
            }, function (predictions, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK ||
                    status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    _this.addrPredictions = predictions;
                    _this._cd.detectChanges();
                }
            });
        }
    };
    AMPGoogleAddressComponent.CLASS_NAME = 'AMPGoogleAddressComponent';
    AMPGoogleAddressComponent = __decorate([
        core_1.Component({
            selector: 'amp-google-address',
            template: "\n    <my-md-input\n        class='3/5'\n        [name]='id'\n        [id]='id'\n        [label]='label'\n        [parentControl]='parentControl'\n        [placeholder]='placeholder'\n        [isInSummaryState]='isInSummaryState'\n        valPattern='{{valPattern}}'\n        valMaxLength='{{valMaxLength}}'\n        (input)='showManualAddrOpt()'>\n    </my-md-input>\n    ",
            styles: [require('./amp-google-address.component.scss').toString()],
            inputs: [
                'id',
                'label',
                'parentControl',
                'placeholder',
                'visibility',
                'valMaxLength',
                'valPattern',
                'isRequired',
                'isInSummaryState'
            ],
            directives: [amp_ddc_components_1.MdInputComponent],
            encapsulation: core_1.ViewEncapsulation.Emulated
        })
    ], AMPGoogleAddressComponent);
    return AMPGoogleAddressComponent;
}());
exports.AMPGoogleAddressComponent = AMPGoogleAddressComponent;
