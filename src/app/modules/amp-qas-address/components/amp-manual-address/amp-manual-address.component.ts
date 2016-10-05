import {
    Component , Input , OnInit , ChangeDetectorRef , ChangeDetectionStrategy , ViewChild ,
    AfterViewInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../../../amp-inputs';
import { AmpStatesComponent } from '../../../amp-dropdown';
@Component( {
    selector        : 'amp-manual-address' ,
    template        : require( './amp-manual-address.component.html' ) ,
    styles          : [ require( './amp-manual-address.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpManualAddressComponent implements OnInit, AfterViewInit {
    public static MANUAL_ARRES_GROUP_NAME = 'manual-address';
    @ViewChild( 'manualAddressCmp' ) manualAddressCmp : AmpInputComponent;
    @ViewChild( 'manualSuburbCmp' ) manualSuburbCmp : AmpInputComponent;
    @ViewChild( 'manualStatesCmp' ) manualStatesCmp : AmpStatesComponent;
    @ViewChild( 'manualPostcodeCmp' ) manualPostcodeCmp : AmpInputComponent;
    @Input() id : string                  = 'default-';
    @Input() index : string               = '';
    @Input() isInSummaryState : boolean   = false;
    @Input() required : boolean           = true;
    @Input() controlGroup : FormGroup;
    @Input() googleAddress                = {
        id          : 'googleAddress' ,
        label       : '' ,
        placeholder : '' ,
        errors      : {
            invalid  : 'Address is invalid.' ,
            required : 'Address is a required field.'
        }
    };
    @Input() address                      = {
        id        : 'address' ,
        label     : 'Address' ,
        regex     : '' ,
        maxLength : 200 ,
        minLength : 3 ,
        errors    : {
            required : 'Address is a required field.'
        }
    };
    @Input() suburb                       = {
        id        : 'suburb' ,
        label     : 'Suburb' ,
        regex     : '' ,
        maxLength : 50 ,
        minLength : 3 ,
        errors    : {
            required : 'Suburb is required.'
        }
    };
    @Input() state                        = {
        id    : 'state' ,
        label : 'State'
    };
    @Input() postCode                     = {
        id        : 'postCode' ,
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
    protected stateCtrl;
    protected addressCtrl;
    protected suburbCtrl;
    protected postCodeCtrl;
    private manualAddressCG : FormGroup   = new FormGroup( {} );

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id + AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME , this.manualAddressCG );
        }
    }

    ngAfterViewInit () : void {
        this.getManualControlsFromManualAddressCG();
    }

    public updateControls ( _formattedAddress : any ) {
        if ( _formattedAddress ) {
            this.addressCtrl.setValue( _formattedAddress.StreetAddress );
            this.suburbCtrl.setValue( _formattedAddress.Suburb );
            this.manualStatesCmp.setSelectValue( _formattedAddress.State.toUpperCase() );
            this.postCodeCtrl.setValue( _formattedAddress.Postcode );
            // this.dpidCtrl.setValue( _formattedAddress.DPID );
            // this.countryCtrl.setValue( _formattedAddress.Country );
        }
        // this.cityCtrl.setValue( _formattedAddress.city );
    }

    public emptyControls () {
        this.manualStatesCmp.setSelectValue( null );
        this.suburbCtrl.setValue( null );
        this.addressCtrl.setValue( null );
        this.postCodeCtrl.setValue( null );
        this.killDelayedValidationForInputs();
    }

    private getJoinedIdWithIndex ( _id ) {
        return _id + '_' + this.index;
    }

    private killDelayedValidationForInputs () {
        // This will run validation but it wont make the control to be touched , so no error will be shown initially
        this.manualAddressCmp.checkErrors( true );
        this.manualSuburbCmp.checkErrors( true );
        this.manualPostcodeCmp.checkErrors( true );
    }

    private getManualControlsFromManualAddressCG () {
        this.stateCtrl    = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.state.id ) );
        this.addressCtrl  = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.address.id ) );
        this.suburbCtrl   = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.suburb.id ) );
        this.postCodeCtrl = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.postCode.id ) );
    }
}
