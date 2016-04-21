import {Component, Directive, Input, OnInit, ViewEncapsulation, NgZone, AfterViewInit} from 'angular2/core';
import {Control, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

declare var google: any;

@Component({
    selector: 'amp-google-address',
    template: `
    <md-input-container [class.md-input-has-value]="parentControl.value" [ngClass]="{'md-input-has-placeholder' : placeholder}" flex-gt-sm="" *ngIf="!visibility || visibility.invoke()">
        <label *ngIf="label && !parentControl.value" [attr.for]="_id">{{label}}</label>
        <input
            class="md-input"
            md-input
            mdMaxLength="{{valMaxLength}}"
            mdPattern="{{valPattern}}"
            [attr.name]="_id"
            [attr.id]="_id"
            [attr.data-automation-id]="'text_' + _id"
            [ngFormControl]="parentControl"
            [attr.placeholder]="placeholder"/>
        <ng-content></ng-content>
    </md-input-container>
    `,
    styles: [require('./amp-google-address.component.scss').toString()],
    inputs: ['id', 'label', 'parentControl', 'placeholder', 'visibility', 'valMaxLength', 'valPattern', 'isRequired'],
    directives: [MATERIAL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.Emulated
})

export class AMPGoogleAddressComponent implements AfterViewInit {
    static CLASS_NAME = 'AMPGoogleAddressComponent';

    private _id: string;
    private label: string;
    private parentControl: Control;
    private placeholder: string = '';
    private visibility: Action;
    private model: any;

    constructor (private zone: NgZone) {}

    set id(id: string) {
        this._id = id;
    }

    set isRequired(val: string) {

        if (val === 'true') {
            // Note that you can compose an Array of validators via the Validators.compose(validators: Function[]) : Function API
            this.parentControl.validator = Validators.required;
        }
    }

    ngAfterViewInit () {
      // Binding Google Places Address api to google_places_ac input field
      var input : any = document.getElementById('PracticeAddress');
      var options = {
        //   types: [],
          componentRestrictions: {country: 'au'}
      };
      var autocomplete = new google.maps.places.Autocomplete(input, options);

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.zone.run(() => {
          var place = autocomplete.getPlace();
          this.model[3].parentControl.updateValue(place.formatted_address);
          // console.log('place change');
        });
      });
    }
}
