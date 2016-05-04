import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone, ViewChild } from 'angular2/core';
import { Control } from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AMPGoogleAddressComponent } from '../../components/amp-google-address/amp-google-address.component.ts';
import { MdInputComponent } from '../../components/my-md-input/my-md-input.component';


@Component( {
    selector : 'amp-google-address-group' ,
    template : `
        <div class='google-address' [ngClass]='{hide: showManualAddrEntry}'>
            <div class='grid__item'>
                <!--Practice address-->
                <label class='heading heading-contxtual-label mb3' >Address</label>&nbsp;
                <amp-google-address #ampGoogleAddress
                    class='1/1'
                    [isInSummaryState]='isInSummaryState'
                    [id]='googleAddress.id'
                    [label]='googleAddress.label'
                    [parentControl]='googleAddressCtrl'
                    [placeholder]='googleAddress.placeholder'
                    [valPattern]='googleAddress.regex'
                    [valMaxLength]='googleAddress.max'>
                </amp-google-address>
            </div>

            <div class='errors mt' *ngIf='!ampGoogleAddress.addrPredictions'>
                <span class='icon icon--close icon-errors'></span>We are unable to find your address. Try again or tell us your address line by line <a href='' (click)='showManualAddrForm()'>here</a> instead.
            </div>
        </div>
        <div class='manual-address' [ngClass]='{hide: !showManualAddrEntry}'>
            <my-md-input
                class='1/1'
                [isInSummaryState]='isInSummaryState'
                [id]='address.id'
                [label]='address.label'
                [parentControl]='addressCtrl'
                isRequired='true'
                [valPattern]='address.regex'
                [valMaxLength]='address.max'>
            </my-md-input>
            <my-md-input
                class='1/1'
                [isInSummaryState]='isInSummaryState'
                [id]='suburb.id'
                [label]='suburb.label'
                [parentControl]='suburbCtrl'
                isRequired='true'
                [valPattern]='suburb.regex'
                [valMaxLength]='suburb.max'>
            </my-md-input>
            <my-md-input
                class='1/1'
                [isInSummaryState]='isInSummaryState'
                [id]='state.id'
                [label]='state.label'
                [parentControl]='stateCtrl'
                isRequired='true'
                [valPattern]='state.regex'
                [valMaxLength]='state.max'>
            </my-md-input>
            <my-md-input
                class='1/1'
                [isInSummaryState]='isInSummaryState'
                [id]='postcode.id'
                [label]='postcode.label'
                [parentControl]='postcodeCtrl'
                isRequired='true'
                [valPattern]='postcode.regex'
                [valMaxLength]='postcode.max'>
            </my-md-input>

        </div>
    ` , // encapsulation: ViewEncapsulation.Emulated
    inputs : [ 'googleAddress', 'address', 'state', 'suburb', 'postcode', 'googleAddressCtrl', 'addressCtrl', 'suburbCtrl', 'stateCtrl', 'postcodeCtrl', 'isInSummaryState' ] ,
    styles : [ require( './amp-google-address-group.component.scss' ).toString() ] ,
    directives : [ AMPGoogleAddressComponent , MdInputComponent ]
} )
export class AMPGoogleAddressComponentGroup implements AfterViewInit {
    static CLASS_NAME                      = 'AMPGoogleAddressComponentGroup';

    @ViewChild('ampGoogleAddress') addressComponent: AMPGoogleAddressComponent;

    private googleAddress = {
                id : 'googleAddress' ,
                label : '' ,
                regex : '' ,
                placeholder: '',
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

    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private showManualAddrEntry: boolean   = false;
    private googleAddressCtrl: Control;
    private addressCtrl: Control;
    private suburbCtrl: Control;
    private stateCtrl: Control;
    private postcodeCtrl: Control;

    ngAfterViewInit() {
        var _self = this;
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
    }

    updateAddressFields(googleAddress, _self) {
        if (googleAddress && googleAddress.address_components) {
            _self.addressCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['street_number', 'route'], true, googleAddress.address_components));
            _self.suburbCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['locality', 'sublocality'], true, googleAddress.address_components));
            _self.stateCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['administrative_area_level_1'], true, googleAddress.address_components));
            _self.postcodeCtrl.updateValue(AMPGoogleAddressComponent.getAddressComponent(['postal_code'], true, googleAddress.address_components));
        } else {
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

}
