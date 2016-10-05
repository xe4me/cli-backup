import {
    Component , Input , OnInit , ChangeDetectorRef , ChangeDetectionStrategy , ViewChild ,
    AfterViewInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../../../amp-inputs';
import { AmpStatesComponent } from '../../../amp-dropdown';
import { AmpCountryComponent } from '../../../amp-dropdown/components/amp-country/amp-country.component';
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
    @ViewChild( 'manualCountryCmp' ) manualCountryCmp : AmpCountryComponent;
    @ViewChild( 'manualCityCmp' ) manualCityCmp : AmpInputComponent;
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
        label     : 'Street address' ,
        maxLength : 200 ,
        minLength : 3 ,
        errors    : {
            required  : 'Street address is a required field.' ,
            minLength : 'Street address must be at least 3 characters long.'
        }
    };
    @Input() city                         = {
        id        : 'city' ,
        label     : 'City' ,
        maxLength : 100 ,
        minLength : 3 ,
        errors    : {
            required  : 'City is a required field.' ,
            minLength : 'City must be at least 3 characters long.'
        }
    };
    @Input() suburb                       = {
        id        : 'suburb' ,
        label     : 'Suburb' ,
        regex     : '' ,
        maxLength : 50 ,
        minLength : 3 ,
        errors    : {
            required  : 'Suburb is required.' ,
            minLength : 'Suburb must be at least 3 characters long.'
        }
    };
    @Input() state                        = {
        id : 'state'
    };
    @Input() country                      = {
        id : 'country'
    };
    @Input() postCode                     = {
        id        : 'postCode' ,
        label     : 'Postcode' ,
        maxLength : 4 ,
        minLength : 4 ,
        regex     : '^[0-9]*$' ,
        errors    : {
            required  : 'Postcode is a required field.' ,
            pattern   : 'Postcode must be 4 numbers.' ,
            maxLength : 'Postcode must be 4 numbers.' ,
            minLength : 'Postcode must be 4 numbers.'
        }
    };
    protected stateCtrl;
    protected countryCtrl;
    protected addressCtrl;
    protected suburbCtrl;
    protected postCodeCtrl;
    protected cityCtrl;
    private manualAddressCG : FormGroup   = new FormGroup( {} );
    private DEFAULT_SELECTED_COUNTRY      = 'AUS';
    private COUNTRY_NZ                    = 'NZL';
    private selectedCountry               = this.DEFAULT_SELECTED_COUNTRY;

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id + AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME , this.manualAddressCG );
        }
    }

    ngAfterViewInit () : void {
        this.getManualControlsFromManualAddressCG();
        this.manualCountryCmp.setSelectValue( this.DEFAULT_SELECTED_COUNTRY );
    }

    public updateControls ( _formattedAddress : any ) {
        if ( _formattedAddress ) {
            this.addressCtrl.setValue( _formattedAddress.StreetAddress );
            this.suburbCtrl.setValue( _formattedAddress.Suburb );
            this.manualStatesCmp.setSelectValue( _formattedAddress.State.toUpperCase() );
            // this.manualCountryCmp.setSelectValue( _formattedAddress.Country );
            this.manualCountryCmp.setSelectValue( this.DEFAULT_SELECTED_COUNTRY );
            this.postCodeCtrl.setValue( _formattedAddress.Postcode );
            // this.dpidCtrl.setValue( _formattedAddress.DPID );
        }
        // this.cityCtrl.setValue( _formattedAddress.city );
    }

    public emptyControls () {
        this.manualStatesCmp.setSelectValue( null );
        this.manualCountryCmp.setSelectValue( this.DEFAULT_SELECTED_COUNTRY );
        this.suburbCtrl.setValue( null );
        this.addressCtrl.setValue( null );
        this.postCodeCtrl.setValue( null );
        this.cityCtrl.setValue( null );
        this.killDelayedValidationForInputs();
    }

    private onCountrySelect ( _countryCode ) {
        if ( this.selectedCountry !== _countryCode ) {
            this.manualStatesCmp.setSelectValue( null );
            this.cityCtrl.setValue( null );
            this.suburbCtrl.setValue( null );
            this.selectedCountry = _countryCode;
            this.killDelayedValidationForInputs();
            this._cd.markForCheck();
        }
    }

    private getJoinedIdWithIndex ( _id ) {
        return _id + '_' + this.index;
    }

    private killDelayedValidationForInputs () {
        // This will run validation but it wont make the control to be touched , so no error will be shown initially
        this.manualAddressCmp.checkErrors( true );
        this.manualSuburbCmp.checkErrors( true );
        this.manualCityCmp.checkErrors( true );
        this.manualPostcodeCmp.checkErrors( true );
    }

    private getManualControlsFromManualAddressCG () {
        this.stateCtrl    = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.state.id ) );
        this.countryCtrl  = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.country.id ) );
        this.addressCtrl  = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.address.id ) );
        this.suburbCtrl   = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.suburb.id ) );
        this.postCodeCtrl = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.postCode.id ) );
        this.cityCtrl     = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.city.id ) );
    }

    private get isCountryAUS () : boolean {
        return this.selectedCountry === this.DEFAULT_SELECTED_COUNTRY;
    }

    private get isCountryNZ () : boolean {
        return this.selectedCountry === this.COUNTRY_NZ;
    }

    private getCityLabel () : string {
        return this.isCountryNZ ? 'City' : 'Suburb or City';
    }

    private getPostcodeRegex () : string {
        return this.isCountryNZ || this.isCountryAUS ? this.postCode.regex : '';
    }

    private getPostcodeMaxLength () : string {
        return this.isCountryNZ || this.isCountryAUS ? this.postCode.maxLength : 20;
    }

    private getPostcodeMinLength () : string {
        return this.isCountryNZ || this.isCountryAUS ? this.postCode.minLength : - 1;
    }
}
