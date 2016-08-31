import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone, ViewChild } from '@angular/core';
import { Control, Validators } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AMPGoogleAddressComponent } from '../../components/amp-google-address/amp-google-address.component';
import { MdInputComponent } from '../../components/my-md-input/my-md-input.component';


@Component( {
    selector   : 'amp-google-address-group' ,
    template   :  require('./amp-google-address-group.component.html') ,
    inputs     : [
        'index',
        'googleAddress',
        'address',
        'state',
        'suburb',
        'postcode',
        'googleAddressCtrl',
        'addressCtrl',
        'suburbCtrl',
        'stateCtrl',
        'postcodeCtrl',
        'isInSummaryState',
        'isRequired',
        'labelHidden',
        'manualInputGridItemClass'
    ] ,
    styles     : [ require( './amp-google-address-group.component.scss' ).toString() ] ,
    directives : [ AMPGoogleAddressComponent , MdInputComponent ]
} )
export class AMPGoogleAddressComponentGroup implements AfterViewInit {
    static CLASS_NAME                      = 'AMPGoogleAddressComponentGroup';
    private index = '';
    @ViewChild('ampGoogleAddress') addressComponent: AMPGoogleAddressComponent;

    private googleAddress = {
        id : 'googleAddress' ,
        label : '' ,
        regex : '' ,
        placeholder: '',
        error : {
            invalid: 'Address is invalid.',
            required: 'Address is a required field.'
        }
    };

    private address = {
        id : 'address',
        label: 'Address',
        regex: ''
    };
    private suburb = {
        id : 'suburb',
        label: 'Suburb',
        regex: ''
    };
    private state = {
        id : 'state',
        label: 'State',
        regex: ''
    };
    private postcode = {
        id : 'postcode',
        label: 'Postcode',
        regex: ''
    };

    private isRequired : boolean           = false;
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private showManualAddrEntry: boolean   = false;
    private labelHidden: boolean           = false;
    private manualInputGridItemClass: string = 'u-width-auto';
    private googleAddressCtrl: Control;
    private addressCtrl: Control;
    private suburbCtrl: Control;
    private stateCtrl: Control;
    private postcodeCtrl: Control;

    // Need to binding this validator into a specific context
    validateGoogleAddress(c: Control) {
        if (this.addressComponent && this.addressComponent.addrPlace) {
            return null;
        } else {
            return {
                validateGoogleAddress: {
                    valid: false
                }
            };
        }
    }

    ngAfterViewInit() {
        var _self = this;
        this.googleAddressCtrl.validator = Validators.compose([Validators.required, this.validateGoogleAddress.bind(this)]);
        this.googleAddressCtrl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .do(
                function (x)   {
                    _self.updateAddressFields(_self.addressComponent.addrPlace, _self);
                },
                function (err) {  },
                function ()    {  }
            ).subscribe();

        this.stateCtrl.valueChanges
            .distinctUntilChanged()
            .subscribe( function (value) {
                if (value) {
                    _self.stateCtrl.updateValue((<string>value).toUpperCase());
                }
            });
    }

    updateAddressFields(googleAddress, _self) {
        // Push the google address into the 4 address fields, also remove validation
        if (googleAddress && googleAddress.address_components) {
            // Disable the validators, as google is providing the address
            FormModelService.disableValidators(_self.addressCtrl);
            FormModelService.disableValidators(_self.suburbCtrl);
            FormModelService.disableValidators(_self.stateCtrl);
            FormModelService.disableValidators(_self.postcodeCtrl);

            _self.addressCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['street_number', 'route'], true, googleAddress.address_components));
            _self.suburbCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['locality', 'sublocality'], true, googleAddress.address_components));
            _self.stateCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['administrative_area_level_1'], true, googleAddress.address_components));
            _self.postcodeCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['postal_code'], true, googleAddress.address_components));
        } else {
            // Enable the validators, as we are doing manual entry
            FormModelService.enableValidators(_self.addressCtrl);
            FormModelService.enableValidators(_self.suburbCtrl);
            FormModelService.enableValidators(_self.stateCtrl);
            FormModelService.enableValidators(_self.postcodeCtrl);

            // clear out the results
            _self.addressCtrl.updateValue(null);
            _self.suburbCtrl.updateValue(null);
            _self.stateCtrl.updateValue(null);
            _self.postcodeCtrl.updateValue(null);
        }
    }

    showManualAddrForm () {
        this.showManualAddrEntry = true;

        return false;
    }

    private errorEmptyControl (control) {
        return control.touched && !control.value && !control.valid;
    }

    private errorInvalidControl (control) {
        return control.touched && control.value && !control.valid;
    }

    private manualInputGridItemClasses () {
        return !this.isInSummaryState ? this.manualInputGridItemClass : 'u-width-auto';
    }
}
