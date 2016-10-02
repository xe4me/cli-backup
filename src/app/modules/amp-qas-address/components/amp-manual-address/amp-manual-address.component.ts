import { Component , Input , OnInit , ChangeDetectorRef , ChangeDetectionStrategy , ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../../../amp-inputs';
import { AddressFormats } from '../../services/amp-qas-address.service';
import { AmpStatesComponent } from '../../../amp-dropdown';
@Component( {
    selector        : 'amp-manual-address' ,
    template        : require( './amp-manual-address.component.html' ) ,
    styles          : [ require( './amp-manual-address.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpManualAddressComponent implements OnInit {
    public static MANUAL_ARRES_GROUP_NAME = 'manual-address';
    @ViewChild( 'manualAddress' ) manualAddress : AmpInputComponent;
    @ViewChild( 'statesCmp' ) statesCmp : AmpStatesComponent;
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
        minLength : 5 ,
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
    private manualAddressCG : FormGroup   = new FormGroup( {} );

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id + AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME , this.manualAddressCG );
        }
    }

    get stateCtrl () {
        return this.manualAddressCG.controls[ this.state.id + '_' + this.index ];
    }

    get addressCtrl () {
        return this.manualAddressCG.controls[ this.address.id + '_' + this.index ];
    }

    get suburbCtrl () {
        return this.manualAddressCG.controls[ this.suburb.id + '_' + this.index ];
    }

    get postCodeCtrl () {
        return this.manualAddressCG.controls[ this.postCode.id + '_' + this.index ];
    }

    public updateControls ( _formattedAddress : AddressFormats.Bank ) {
        if ( _formattedAddress ) {
            this.addressCtrl.setValue( _formattedAddress.StreetName );
            this.suburbCtrl.setValue( _formattedAddress.Locality );
            this.statesCmp.setSelectValue( _formattedAddress.StateCode.toUpperCase() );
            this.postCodeCtrl.setValue( _formattedAddress.Postcode );
            //this.countryCtrl.setValue( _formattedAddress.Country );
        }
        // this.cityCtrl.setValue( _formattedAddress.city );
    }

    public emptyControls () {
        this.statesCmp.setSelectValue( null );
        this.suburbCtrl.setValue( null , { emitEvent : false } );
        this.addressCtrl.setValue( null , { emitEvent : false } );
        this.postCodeCtrl.setValue( null , { emitEvent : false } );
        this.markAllAsUnToched();
    }

    private markAllAsUnToched () {
        // this.manualAddressCG.markAsUntouched();
        this.addressCtrl.markAsUntouched();
        this.suburbCtrl.markAsUntouched();
        this.stateCtrl.markAsUntouched();
        this.postCodeCtrl.markAsUntouched();
        //this.manualAddress.checkErrors( true );
    }
}

