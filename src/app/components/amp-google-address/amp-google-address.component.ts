import {Component, Directive, Input, OnInit, ViewEncapsulation, NgZone, AfterViewInit, ChangeDetectorRef} from 'angular2/core';
import {Control, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {FormBlock, NamedControl} from '../../blocks/formBlock';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';
import {MdInputComponent} from '../../components/my-md-input/my-md-input.component';

declare var google: any;

@Component({
    selector: 'amp-google-address',
    template: `
    <my-md-input [id]='id' [label]='label' [parentControl]='parentControl' [placeholder]='placeholder'
        isRequired='true'
        valPattern='{{valPattern}}'
        valMaxLength='{{valMaxLength}}'
        (input)='showManualAddrOpt()'>
    </my-md-input>
    `,
    styles: [require('./amp-google-address.component.scss').toString()],
    inputs: ['id', 'label', 'parentControl', 'placeholder', 'visibility', 'valMaxLength', 'valPattern', 'isRequired'],
    directives: [MdInputComponent],
    encapsulation: ViewEncapsulation.Emulated
})

export class AMPGoogleAddressComponent implements AfterViewInit {
    static CLASS_NAME = 'AMPGoogleAddressComponent';

    private id: string;
    private label: string;
    private parentControl: Control;
    private placeholder: string = '';
    private visibility: Action;
    private model: any;
    private autocomplete: any;
    private addrPredictions: any = {};

    constructor (private zone: NgZone, public _cd: ChangeDetectorRef) {}

    ngAfterViewInit () {
      // Binding Google Places Address api to google_places_ac input field
      var input : any = document.getElementById(this.id);
      var options = {
          types: ['address'],
          componentRestrictions: {country: 'au'}
      };

      // TODO: Remove the UI components as we are using the AutocompleteService programmatically.
      this.autocomplete = new google.maps.places.Autocomplete(input, options);

      google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
        this.zone.run(() => {
          var place = this.autocomplete.getPlace();
          this.parentControl.updateValue(place.formatted_address);
        });
      });
    }

    showManualAddrOpt () {
        var service = new google.maps.places.AutocompleteService();
        if (this.parentControl.value) {
            service.getPlacePredictions(
                {
                    input: this.parentControl.value,
                    types: ['address'],
                    componentRestrictions: {country: 'au'}
                },
                (predictions, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK ||
                        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                            this.addrPredictions = predictions;
                            this._cd.detectChanges();
                    }
                });
            }
    }
}
