import {
    Component ,
    AfterViewInit ,
    ViewChild , OnInit , ChangeDetectorRef
} from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AMPGoogleAddressComponent } from '../../components/amp-google-address/amp-google-address.component';
import { FormControl , FormGroup , Validators } from '@angular/forms';
import { AmpInputComponent } from '../../modules/amp-inputs';
import { AmpErrorComponent } from '../../modules/amp-error';
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
        'isInSummaryState' ,
        'required' ,
        'manualInputGridItemClass'
    ] ,
    styles     : [ require( './amp-google-address-group.component.scss' ).toString() ] ,
    directives : [ AMPGoogleAddressComponent , AmpInputComponent , AmpErrorComponent ]
} )
export class AMPGoogleAddressComponentGroup implements OnInit {
    @ViewChild( 'ampGoogleAddress' ) addressComponent : AMPGoogleAddressComponent;
    @ViewChild( 'manualState' ) manualState : AmpInputComponent;
    private index                                 = '';
    private googleAddress                         = {
        id          : 'googleAddress' ,
        label       : '' ,
        placeholder : '' ,
        errors      : {
            invalid  : 'Address is invalid.' ,
            required : 'Address is a required field.'
        }
    };
    private address                               = {
        id        : 'address' ,
        label     : 'Address' ,
        regex     : '' ,
        maxLength : 200 ,
        minLength : 5 ,
        errors    : {
            required : 'Address is a required field.'
        }
    };
    private suburb                                = {
        id        : 'suburb' ,
        label     : 'Suburb' ,
        regex     : '' ,
        maxLength : 50 ,
        minLength : 3 ,
        errors    : {
            required : 'Suburb is required.'
        }
    };
    private state                                 = {
        id     : 'state' ,
        label  : 'State' ,
        regex  : '^(ACT|NSW|NT|QLD|SA|TAS|VIC|WA)$' ,
        errors : {
            required : 'State is required.' ,
            pattern  : 'State is not valid.'
        }
    };
    private postcode                              = {
        id        : 'postcode' ,
        label     : 'Postcode' ,
        maxLength : 10 ,
        minLength : 4 ,
        regex     : '^[0-9]*$' ,
        errors    : {
            required  : 'Post code is required.' ,
            pattern   : 'Post code is not valid.' ,
            maxLength : 'Post code is not valid.' ,
            minLength : 'Post code is not valid.'
        }
    };
    private required : boolean                    = false;
    private manualEntryRequired : boolean         = false;
    private isInSummaryState : boolean            = false;
    private showManualAddrEntry : boolean         = false;
    private showNoPredictionError : boolean       = false;
    private manualInputGridItemClass : string     = 'u-width-auto';
    private controlGroup : FormGroup              = new FormGroup( {} );
    private manualAddressControlGroup : FormGroup = new FormGroup( {} );

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    get googleAddressCtrl () {
        return this.controlGroup.controls[ this.googleAddress.id + '_' + this.index ];
    }

    get stateCtrl () {
        return this.manualAddressControlGroup.controls[ this.state.id + '_' + this.index ];
    }

    get addressCtrl () {
        return this.manualAddressControlGroup.controls[ this.address.id + '_' + this.index ];
    }

    get suburbCtrl () {
        return this.manualAddressControlGroup.controls[ this.suburb.id + '_' + this.index ];
    }

    get postcodeCtrl () {
        return this.manualAddressControlGroup.controls[ this.postcode.id + '_' + this.index ];
    }

    ngOnInit () {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( 'manualEntryAddress' , this.manualAddressControlGroup );
        }
        // this.googleAddressCtrl
        //     .valueChanges
        //     .subscribe( () => {
        //     } );
    }

    updateAddressFields ( googleAddress ) {
        this.resetManualEntryControls();
        if ( googleAddress && googleAddress.address_components ) {
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
        }
    }

    showManualAddrForm () {
        this.showManualAddrEntry = true;
        this.resetManualEntryControls();
    }

    // Need to binding this validator into a specific context
    private googleAddressCustomValidator = () : any => {
        return ( c ) => {
            if ( ! c.valid ) {
                return c.errors;
            }
            if ( this.addressComponent && this.addressComponent.addrPlace ) {
                return null;
            } else {
                return {
                    invalidAddress : {
                        text : 'Address is invalid.'
                    }
                };
            }
        };
    };

    private onGoogleAddressChanged ( googleAddress ) {
        this.updateAddressFields( googleAddress );
    }

    private onGoogleAddressPredictionsChanged ( predictions ) {
        this.showNoPredictionError = (predictions === null ? true : false);
        if ( this.showNoPredictionError ) {
            this.resetManualEntryControls();
        }
    }

    private manualInputGridItemClasses () {
        return ! this.isInSummaryState ? this.manualInputGridItemClass : 'u-width-auto';
    }

    private resetManualEntryControls () {
        this.addressCtrl.setValue( null );
        this.addressCtrl.markAsUntouched();
        this.suburbCtrl.setValue( null );
        this.suburbCtrl.markAsUntouched();
        this.stateCtrl.setValue( null );
        this.stateCtrl.markAsUntouched();
        this.postcodeCtrl.setValue( null );
        this.postcodeCtrl.markAsUntouched();
        this.manualState.checkErrors();
    }
}
