import {
    Component ,
    Input ,
    OnInit ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy ,
    ViewChild ,
    OnDestroy ,
    EventEmitter ,
    Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../../../amp-inputs';
import { AmpStatesComponent } from '../../../amp-dropdown';
import { addDashOrNothing } from '../../../amp-utils/functions.utils';
import { BasicUtils } from '../../../amp-utils/basic-utils';
import { AmpDropdownComponent } from '../../../amp-dropdown/components/amp-dropdown/amp-dropdown.component';
import { AddressFormatTypes } from '../../services/amp-qas-address.service';
import { AmpStreetTypesComponent } from '../../../amp-dropdown/components/amp-street-types/amp-street-types.component';
import { AmpGroupButtonsComponent } from '../../../amp-group-buttons/components/amp-group-buttons/amp-group-buttons.component';
import { AmpFormGroup } from '../../../../base-control';
@Component( {
    selector        : 'amp-manual-address-extended' ,
    template        : require( './amp-manual-address-extended.component.html' ) ,
    styles          : [ require( './amp-manual-address-extended.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpManualAddressExtendedComponent implements OnInit, OnDestroy {
    public static MANUAL_ARRES_GROUP_NAME                  = 'manualAddress';
    @ViewChild( 'manualSuburbCmp' ) manualSuburbCmp : AmpInputComponent;
    @ViewChild( 'manualStatesCmp' ) manualStatesCmp : AmpStatesComponent;
    @ViewChild( 'manualPostcodeCmp' ) manualPostcodeCmp : AmpInputComponent;
    @ViewChild( 'manualBuildingNameCmp' ) manualBuildingNameCmp : AmpInputComponent;
    @ViewChild( 'manualUnitNumberCmp' ) manualUnitNumberCmp : AmpInputComponent;
    @ViewChild( 'manualStreetNumberCmp' ) manualStreetNumberCmp : AmpInputComponent;
    @ViewChild( 'manualPoBoxCmp' ) manualPoBoxCmp : AmpInputComponent;
    @ViewChild( 'manualStreetNameCmp' ) manualStreetNameCmp : AmpInputComponent;
    @ViewChild( 'manualStreetTypeCmp' ) manualStreetTypeCmp : AmpStreetTypesComponent;
    @ViewChild( 'isItPoBoxCmp' ) isItPoBoxCmp : AmpGroupButtonsComponent;
    @Output( 'onGoBack' ) $onGoBack : EventEmitter<string> = new EventEmitter < string >();
    @Input() id : string                                   = 'default-';
    @Input() index;
    @Input() isInSummaryState : boolean                    = false;
    @Input() keepControl : boolean                         = false;
    @Input() required : boolean                            = true;
    @Input() controlGroup : AmpFormGroup;
    @Input() suburb                                        = {
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
    @Input() state                                         = {
        id : 'state'
    };
    @Input() postCode                                      = {
        id        : 'postCode' ,
        label     : 'Postcode' ,
        maxLength : 4 ,
        regex     : '^[0-9]{4}$' ,
        errors    : {
            required : 'Postcode is a required field.' ,
            pattern  : 'Postcode must be 4 numbers.'
        }
    };
    @Input() buildingName                                  = {
        id        : 'buildingName' ,
        label     : 'Building name' ,
        maxLength : 100 ,
        required  : false ,
        errors    : {
            maxLength : 'Building name must be less than 100 characters.'
        }
    };
    @Input() unitNumber                                    = {
        id        : 'unitNumber' ,
        label     : 'Unit number' ,
        maxLength : 100 ,
        required  : false ,
        errors    : {
            maxLength : 'Unit number must be less than 100 characters.'
        }
    };
    @Input() streetNumber                                  = {
        id        : 'streetNumber' ,
        label     : 'Street number' ,
        maxLength : 100 ,
        required  : false ,
        errors    : {
            maxLength : 'Street number must be less than 100 characters.'
        }
    };
    @Input() streetName                                    = {
        id        : 'streetName' ,
        label     : 'Street name' ,
        minLength : 5 ,
        maxLength : 200 ,
        required  : true ,
        errors    : {
            required  : 'Street name is a required field.' ,
            maxLength : 'Street name must be less than 200 characters.' ,
            minLength : 'Street name must be at least 5 characters long.'
        }
    };
    @Input() streetType                                    = {
        id       : 'streetType' ,
        label    : 'Street type' ,
        required : false
    };
    @Input() poBox                                         = {
        id        : 'poBox' ,
        label     : 'PO Box' ,
        maxLength : 100 ,
        errors    : {
            required  : 'PO Box is a required field.' ,
            maxLength : 'PO Box must be 100 numbers.' ,
        }
    };
    @Input() addressType : string                          = 'residential';
    protected isItPoBox                                    = null;
    private manualAddressCG : any;
    private addDashOrNothing                               = addDashOrNothing;
    private isItPoBoxButtons                               = {
        buttons   : [
            {
                id    : 'isItPoBoxYes' ,
                value : true ,
                label : 'Yes'
            } ,
            {
                id    : 'isItPoBoNo' ,
                value : false ,
                label : 'No'
            }
        ] ,
        groupName : 'isItPoBox'
    };

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        if ( this.controlGroup ) {
            if ( this.controlGroup.contains( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) ) ) {
                this.manualAddressCG = this.controlGroup.get( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) );
            } else {
                this.manualAddressCG = new FormGroup( {} );
                this.controlGroup.addControl( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) , this.manualAddressCG );
            }
        } else {
            this.manualAddressCG = new FormGroup( {} );
        }
        this.manualAddressCG.__fdn = this.controlGroup && this.controlGroup.__fdn ? [ ...this.controlGroup.__fdn , this.id ] : [
            'default-fdn-for-' + this.id
        ];
    }

    ngOnDestroy () : void {
        if ( ! this.keepControl ) {
            if ( this.controlGroup && this.controlGroup.contains( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME ) ) {
                this.controlGroup.removeControl( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME );
            }
        }
    }

    public goBack () {
        this.$onGoBack.emit();
    }

    public updateControls ( _formattedAddress : any ) {
        if ( _formattedAddress ) {
            if ( ! this.isResidentialAddress ) {
                this.isItPoBoxCmp.control.setValue( _formattedAddress.Bank.AllPostalDeliveryTypes.length > 0 );
                this.manualPoBoxCmp.control.setValue( _formattedAddress.Bank.AllPostalDeliveryTypes );
            } else {
                this.isItPoBoxCmp.control.setValue( false );
            }
            this.manualStreetTypeCmp.control.setValue( _formattedAddress.Bank.StreetType.toUpperCase() );
            this.manualStreetNameCmp.control.setValue( _formattedAddress.Bank.StreetName );
            this.manualStreetNumberCmp.control.setValue( _formattedAddress.Bank.BuildingNumber );
            this.manualBuildingNameCmp.control.setValue( _formattedAddress.Bank.BuildingName );
            this.manualUnitNumberCmp.control.setValue( _formattedAddress.Bank.FlatUnit );
            this.manualSuburbCmp.control.setValue( _formattedAddress.CRM.Suburb );
            this.manualPostcodeCmp.control.setValue( _formattedAddress.CRM.Postcode );
            this.manualStatesCmp.control.setValue( _formattedAddress.CRM.State.toUpperCase() );
            this._cd.detectChanges();
        }
    }

    public onPoBoxButtonsChange ( $event ) {
        if ( $event !== null && ! this.isResidentialAddress ) {
            this.isItPoBox = $event;
            this.emptyPoBoxDependantFields();
        }
    }

    public emptyControls () {
        this.manualAddressCG.reset();
        this.manualStatesCmp.control.setValue( null );
        this.manualStreetTypeCmp.control.setValue( null );
        if ( this.isResidentialAddress ) {
            this.isItPoBoxCmp.control.setValue( false );
        }
    }

    private getJoinedIdWithIndex ( _id ) {
        return _id + addDashOrNothing( this.index );
    }

    private emptyPoBoxDependantFields () {
        this.manualBuildingNameCmp.control.reset( null );
        this.manualUnitNumberCmp.control.reset( null );
        this.manualStreetNumberCmp.control.reset( null );
        this.manualStreetNameCmp.control.reset( null );
        this.manualPoBoxCmp.control.reset( null );
        this.manualStreetTypeCmp.control.setValue( null );
    }

    private get summaryAddress () {
        return BasicUtils.formatAddress( this.manualAddressCG.value , AddressFormatTypes.BANK );
    }

    private get isResidentialAddress () {
        return this.addressType === 'residential';
    }
}
