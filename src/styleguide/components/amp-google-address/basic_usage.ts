import {View, Component, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/common';
import {AMPGoogleAddressComponent} from '../../../app/components/amp-google-address/amp-google-address.component';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';

@Component({selector: 'amp-google-address-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/amp-google-address/basic_usage.html',
  styles: [require('./basic_usage.scss').toString()],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, AMPGoogleAddressComponent, CORE_DIRECTIVES]
})
export default class AMPGoogleAddressComponentBasicUsage implements AfterViewInit {
  addressControl: Control = new Control();

  constructor (private _cd: ChangeDetectorRef) {  }

  ngAfterViewInit() {

    // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
    this._cd.detectChanges();
  }

}
