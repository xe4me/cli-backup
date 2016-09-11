import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import {
    Component ,
    AfterViewInit ,
    ViewChild
} from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AMPGoogleAddressComponent } from '../../components/amp-google-address/amp-google-address.component';
import { AmpInputComponent } from '../../components/amp-input/amp-input.component';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { RequiredValidator } from "../../util/validations";
@Component( {
    selector   : 'amp-google-address-group' ,
    template   : require( './amp-google-address-group.component.html' ) ,
    inputs     : [
        'index' ,
        'controlGroup' ,
        'googleAddress' ,
        'address' ,
        'state' ,
        'suburb' ,
        'postcode' ,
        'googleAddressCtrl' ,
        'isInSummaryState' ,
        'required' ,
        'labelHidden' ,
        'manualInputGridItemClass'
    ] ,
    styles     : [ require( './amp-google-address-group.component.scss' ).toString() ] ,
    directives : [ AMPGoogleAddressComponent , AmpInputComponent ]
} )
export class AMPGoogleAddressComponentGroup implements AfterViewInit {
    static CLASS_NAME                  = 'AMPGoogleAddressComponentGroup';
    private index                      = '';
    @ViewChild( 'ampGoogleAddress' ) addressComponent : AMPGoogleAddressComponent;
    private googleAddress              = {
        id          : 'googleAddress' ,
        label       : '' ,
        regex       : '' ,
        placeholder : '' ,
        error       : {
            invalid  : 'Address is invalid.' ,
            required : 'Address is a required field.'
        }
    };
    private address                    = {
        id    : 'address' ,
        label : 'Address' ,
        regex : ''
    };
    private suburb                     = {
        id    : 'suburb' ,
        label : 'Suburb' ,
        regex : ''
    };
    private state                      = {
        id    : 'state' ,
        label : 'State' ,
        regex : ''
    };
    private postcode                   = {
        id    : 'postcode' ,
        label : 'Postcode' ,
        regex : ''
    };
    private required : boolean         = false;
    private isInSummaryState : boolean = false;
    private showManualAddrEntry : boolean     = false;
    private labelHidden : boolean             = false;
    private manualInputGridItemClass : string = 'u-width-auto';
    private controlGroup : FormGroup          = new FormGroup( {} );
    // Need to binding this validator into a specific context
    validateGoogleAddress ( c : FormControl ) {
        if ( this.addressComponent && this.addressComponent.addrPlace ) {
            return null;
        } else {
            return {
                validateGoogleAddress : {
                    valid : false
                }
            };
        }
    }

    get googleAddressCtrl () {
        return this.controlGroup.controls[ this.googleAddress.id + "_" + this.index ];
    }

    get stateCtrl () {
        return this.controlGroup.controls[ this.state.id + "_" + this.index ];
    }

    get addressCtrl () {
        return this.controlGroup.controls[ this.address.id + "_" + this.index ];
    }

    get suburbCtrl () {
        return this.controlGroup.controls[ this.suburb.id + "_" + this.index ];
    }

    get postcodeCtrl () {
        return this.controlGroup.controls[ this.postcode.id + "_" + this.index ];
    }

    ngAfterViewInit () {
        this.googleAddressCtrl.setValidators( Validators.compose( [
            RequiredValidator.requiredValidation( true ) ,
            this.validateGoogleAddress.bind( this )
        ] ) );
        this.googleAddressCtrl.valueChanges
            .debounceTime( 400 )
            .distinctUntilChanged()
            .do(
                ( x ) => {
                    this.updateAddressFields( this.addressComponent.addrPlace );
                }
            ).subscribe();
    }

    updateAddressFields ( googleAddress ) {
        // Push the google address into the 4 address fields, also remove validation
        if ( googleAddress && googleAddress.address_components ) {
            // Disable the validators, as google is providing the address
            FormModelService.disableValidators( this.addressCtrl );
            FormModelService.disableValidators( this.suburbCtrl );
            FormModelService.disableValidators( this.stateCtrl );
            FormModelService.disableValidators( this.postcodeCtrl );
            this.addressCtrl.setValue( AMPGoogleAddressComponent.getAddressComponent( [
                'street_number' ,
                'route'
            ] , true , googleAddress.address_components ) );
            this.suburbCtrl.setValue( AMPGoogleAddressComponent.getAddressComponent( [
                'locality' ,
                'sublocality'
            ] , true , googleAddress.address_components ) );
            this.stateCtrl.setValue( AMPGoogleAddressComponent.getAddressComponent( [ 'administrative_area_level_1' ] , true , googleAddress.address_components ) );
            this.postcodeCtrl.setValue( AMPGoogleAddressComponent.getAddressComponent( [ 'postal_code' ] , true , googleAddress.address_components ) );
        } else {
            // Enable the validators, as we are doing manual entry
            FormModelService.enableValidators( this.addressCtrl );
            FormModelService.enableValidators( this.suburbCtrl );
            FormModelService.enableValidators( this.stateCtrl );
            FormModelService.enableValidators( this.postcodeCtrl );
            // clear out the results
            this.addressCtrl.setValue( null );
            this.suburbCtrl.setValue( null );
            this.stateCtrl.setValue( null );
            this.postcodeCtrl.setValue( null );
        }
    }

    showManualAddrForm () {
        this.showManualAddrEntry = true;
        return false;
    }

    private errorEmptyControl ( control ) {
        return control.touched && ! control.value && ! control.valid;
    }

    private errorInvalidControl ( control ) {
        return control.touched && control.value && ! control.valid;
    }

    private manualInputGridItemClasses () {
        return ! this.isInSummaryState ? this.manualInputGridItemClass : 'u-width-auto';
    }
}
