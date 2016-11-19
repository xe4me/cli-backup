import {
    Component ,
    Input ,
    OnInit ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy ,
    ViewChild ,
    AfterViewInit ,
    OnDestroy ,
    Output ,
    EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../../../amp-inputs';
import { AmpStatesComponent } from '../../../amp-dropdown';
import { AmpCountryComponent } from '../../../amp-dropdown/components/amp-country/amp-country.component';
import { addDashOrNothing } from '../../../amp-utils/functions.utils';
import { BasicUtils } from '../../../amp-utils/basic-utils';
import { AmpFormGroup } from '../../../../base-control';
@Component( {
    selector        : 'amp-manual-address' ,
    template        : require( './amp-manual-address.component.html' ) ,
    styles          : [ require( './amp-manual-address.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpManualAddressComponent implements OnInit, AfterViewInit, OnDestroy {
    public static MANUAL_ARRES_GROUP_NAME     = 'manualAddress';
    public static DEFAULT_SELECTED_COUNTRY    = 'Australia';
    public static COUNTRY_NZ                  = 'New Zealand';
    @ViewChild( 'manualAddressCmp' ) manualAddressCmp : AmpInputComponent;
    @ViewChild( 'manualSuburbCmp' ) manualSuburbCmp : AmpInputComponent;
    @ViewChild( 'manualStatesCmp' ) manualStatesCmp : AmpStatesComponent;
    @ViewChild( 'manualPostcodeCmp' ) manualPostcodeCmp : AmpInputComponent;
    @ViewChild( 'manualCountryCmp' ) manualCountryCmp : AmpCountryComponent;
    @ViewChild( 'manualCityCmp' ) manualCityCmp : AmpInputComponent;
    @Output() onGoBack : EventEmitter<string> = new EventEmitter < string >();
    @Input() id : string                      = 'manualAddress';
    @Input() index;
    @Input() keepControl                      = false;
    @Input() isInSummaryState : boolean       = false;
    @Input() required : boolean               = true;
    @Input() controlGroup : AmpFormGroup;
    @Input() address                          = {
        id        : 'address' ,
        label     : 'Street address' ,
        maxLength : 200 ,
        minLength : 3 ,
        errors    : {
            required  : 'Street address is a required field.' ,
            minLength : 'Street address must be at least 3 characters long.'
        }
    };
    @Input() city                             = {
        id        : 'city' ,
        label     : 'City' ,
        maxLength : 100 ,
        minLength : 3 ,
        errors    : {
            required  : 'City is a required field.' ,
            minLength : 'City must be at least 3 characters long.'
        }
    };
    @Input() suburb                           = {
        id        : 'suburb' ,
        label     : 'Suburb' ,
        regex     : '' ,
        maxLength : 50 ,
        minLength : 3 ,
        errors    : {
            required  : 'Suburb is a required field.' ,
            minLength : 'Suburb must be at least 3 characters long.'
        }
    };
    @Input() state                            = {
        id     : 'state' ,
        errors : {
            required : 'State is a required field.'
        }
    };
    @Input() country                          = {
        id : 'country'
    };
    @Input() postCode                         = {
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
    public selectedCountry                    = 'Australia';
    protected stateCtrl;
    protected countryCtrl;
    protected addressCtrl;
    protected suburbCtrl;
    protected postCodeCtrl;
    protected cityCtrl;
    private manualAddressCG : any;
    private addDashOrNothing                  = addDashOrNothing;

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () : void {
        if ( this.controlGroup ) {
            if ( this.controlGroup.contains( AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) ) ) {
                this.manualAddressCG = this.controlGroup.get( AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) );
            } else {
                this.manualAddressCG = new FormGroup( {} );
                this.controlGroup.addControl( AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) , this.manualAddressCG );
            }
        } else {
            this.manualAddressCG = new FormGroup( {} );
        }
        this.manualAddressCG.__fdn = this.controlGroup && this.controlGroup.__fdn ? [ ...this.controlGroup.__fdn , this.id ] : [
            'default-fdn-for-' + this.id
        ];
    }

    ngAfterViewInit () : void {
        this.getManualControlsFromManualAddressCG();
        this.countryCtrl.setValue( AmpManualAddressComponent.DEFAULT_SELECTED_COUNTRY );
    }

    ngOnDestroy () : void {
        if ( ! this.keepControl ) {
            if ( this.controlGroup.contains( AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME ) ) {
                this.controlGroup.removeControl( AmpManualAddressComponent.MANUAL_ARRES_GROUP_NAME );
            }
        }
    }

    public goBack () {
        this.onGoBack.emit();
    }

    public updateControls ( _formattedAddress : any ) {
        if ( _formattedAddress ) {
            this.addressCtrl.setValue( _formattedAddress.StreetType + _formattedAddress.StreetName );
            this.suburbCtrl.setValue( _formattedAddress.Locality );
            this.stateCtrl.setValue( _formattedAddress.StateCode.toUpperCase() );
            this.countryCtrl.setValue( _formattedAddress.Country );
            this.postCodeCtrl.setValue( _formattedAddress.Postcode );
        }
    }

    public emptyControls () {
        this.emptyAndResetStateControl();
        this.countryCtrl.setValue( AmpManualAddressComponent.DEFAULT_SELECTED_COUNTRY );
        this.suburbCtrl.reset( null );
        this.addressCtrl.reset( null );
        this.postCodeCtrl.reset( null );
        this.cityCtrl.reset( null );
        this.killDelayedValidationForInputs();
    }

    public emptyAndResetStateControl () {
        this.stateCtrl.setValue( null );
        this.stateCtrl.markAsPristine();
    }

    private onCountrySelect ( _countryCode ) {
        if ( this.selectedCountry !== _countryCode.country ) {
            // this.emptyAndResetStateControl();
            // this.cityCtrl.reset( null );
            // this.suburbCtrl.reset( null );
            this.selectedCountry = _countryCode.country;
            // this.killDelayedValidationForInputs();
            this._cd.detectChanges();
        }
    }

    private getJoinedIdWithIndex ( _id ) {
        return _id + addDashOrNothing( this.index );
    }

    private killDelayedValidationForInputs () {
        // This will run validation but it wont make the control to be touched , so no error will be shown initially
        this.manualAddressCmp.checkErrors( true );
        this.manualSuburbCmp.checkErrors( true );
        this.manualCityCmp.checkErrors( true );
        this.manualPostcodeCmp.checkErrors( true );
    }

    private getManualControlsFromManualAddressCG () {
        this.stateCtrl    = this.manualStatesCmp.control;
        this.countryCtrl  = this.manualCountryCmp.control;
        this.addressCtrl  = this.manualAddressCmp.control;
        this.suburbCtrl   = this.manualSuburbCmp.control;
        this.postCodeCtrl = this.manualPostcodeCmp.control;
        this.cityCtrl     = this.manualCityCmp.control;
    }

    private get isCountryAUS () : boolean {
        return this.selectedCountry === AmpManualAddressComponent.DEFAULT_SELECTED_COUNTRY;
    }

    private get isCountryNZ () : boolean {
        return this.selectedCountry === AmpManualAddressComponent.COUNTRY_NZ;
    }

    private getCityLabel () : string {
        return this.isCountryNZ ? 'City' : 'Suburb or City';
    }

    private getPostcodeRegex () : string {
        return this.isCountryNZ || this.isCountryAUS ? this.postCode.regex : '';
    }

    private getPostcodeMaxLength () : number {
        return this.isCountryNZ || this.isCountryAUS ? this.postCode.maxLength : 20;
    }

    private getPostcodeMinLength () : number {
        return this.isCountryNZ || this.isCountryAUS ? this.postCode.minLength : - 1;
    }

    private get summaryAddress () {
        return BasicUtils.formatAddress( this.manualAddressCG.value );
    }
}
