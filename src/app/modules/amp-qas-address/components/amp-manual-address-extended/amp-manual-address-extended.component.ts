import {
    Component ,
    Input ,
    OnInit ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy ,
    ViewChild ,
    AfterViewInit ,
    OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../../../amp-inputs';
import { AmpStatesComponent } from '../../../amp-dropdown';
import { addDashOrNothing , isTrue } from '../../../amp-utils/functions.utils';
import { BasicUtils } from '../../../amp-utils/basic-utils';
import { AmpDropdownComponent } from '../../../amp-dropdown/components/amp-dropdown/amp-dropdown.component';
@Component( {
    selector        : 'amp-manual-address-extended' ,
    template        : require( './amp-manual-address-extended.component.html' ) ,
    styles          : [ require( './amp-manual-address-extended.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpManualAddressExtendedComponent implements OnInit, AfterViewInit, OnDestroy {
    public static MANUAL_ARRES_GROUP_NAME = 'manualAddress';
    @ViewChild( 'manualSuburbCmp' ) manualSuburbCmp : AmpInputComponent;
    @ViewChild( 'manualStatesCmp' ) manualStatesCmp : AmpStatesComponent;
    @ViewChild( 'manualPostcodeCmp' ) manualPostcodeCmp : AmpInputComponent;
    @ViewChild( 'manualBuildingNameCmp' ) manualBuildingNameCmp : AmpInputComponent;
    @ViewChild( 'manualUnitNumberCmp' ) manualUnitNumberCmp : AmpInputComponent;
    @ViewChild( 'manualStreetNumberCmp' ) manualStreetNumberCmp : AmpInputComponent;
    @ViewChild( 'manualPoBox' ) manualPoBox : AmpInputComponent;
    @ViewChild( 'manualStreetNameCmp' ) manualStreetNameCmp : AmpInputComponent;
    @ViewChild( 'manualStreetTypeCmp' ) manualStreetTypeCmp : AmpDropdownComponent;
    @Input() id : string                  = 'default-';
    @Input() index;
    @Input() isInSummaryState : boolean   = false;
    @Input() keepControl : boolean        = false;
    @Input() required : boolean           = true;
    @Input() controlGroup : FormGroup;
    @Input() suburb                       = {
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
    @Input() state                        = {
        id : 'state'
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
    @Input() buildingName                 = {
        id        : 'buildingName' ,
        label     : 'Building name' ,
        maxLength : 100 ,
        required  : false ,
        errors    : {
            maxLength : 'Building name must be less than 100 characters.'
        }
    };
    @Input() unitNumber                   = {
        id        : 'unitNumber' ,
        label     : 'Unit number' ,
        maxLength : 100 ,
        required  : false ,
        errors    : {
            maxLength : 'Unit number must be less than 100 characters.'
        }
    };
    @Input() streetNumber                 = {
        id        : 'streetNumber' ,
        label     : 'Street number' ,
        maxLength : 100 ,
        required  : false ,
        errors    : {
            maxLength : 'Street number must be less than 100 characters.'
        }
    };
    @Input() streetName                   = {
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
    @Input() streetType                   = {
        id       : 'streetType' ,
        label    : 'Street type' ,
        required : true
    };
    @Input() poBox                        = {
        id        : 'poBox' ,
        label     : 'PO Box' ,
        maxLength : 100 ,
        errors    : {
            required  : 'PO Box is a required field.' ,
            maxLength : 'PO Box must be 100 numbers.' ,
        }
    };
    protected isItPoBox                   = null;
    protected stateCtrl;
    protected suburbCtrl;
    protected postCodeCtrl;
    protected buildingNameCtrl;
    protected unitNumberCtrl;
    protected streetNumberCtrl;
    protected streetNameCtrl;
    protected streetTypeCtrl;
    protected poBoxCtrl;
    private manualAddressCG : FormGroup   = new FormGroup( {} );
    private addDashOrNothing              = addDashOrNothing;
    private isItPoBoxButtons              = {
        buttons   : [
            {
                id    : 'isItPoBoxYes' ,
                value : 'true' ,
                label : 'Yes'
            } ,
            {
                id    : 'isItPoBoNo' ,
                value : 'false' ,
                label : 'No'
            }
        ] ,
        groupName : 'isItPoBox'
    };

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME + addDashOrNothing( this.index ) , this.manualAddressCG );
        }
    }

    ngAfterViewInit () : void {
        this.getManualControlsFromManualAddressCG();
    }

    ngOnDestroy () : void {
        if ( ! this.keepControl ) {
            if ( this.controlGroup.contains( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME ) ) {
                this.controlGroup.removeControl( AmpManualAddressExtendedComponent.MANUAL_ARRES_GROUP_NAME );
            }
        }
    }

    public updateControls ( _formattedAddress : any ) {
        if ( _formattedAddress ) {
            this.suburbCtrl.setValue( _formattedAddress.Suburb );
            this.manualStatesCmp.setSelectValue( _formattedAddress.State.toUpperCase() );
            this.postCodeCtrl.setValue( _formattedAddress.Postcode );
        }
    }

    public emptyControls () {
        this.emptyAndResetStateAndStreetTypeControl();
        this.suburbCtrl.setValue( null );
        this.postCodeCtrl.setValue( null );
        this.buildingNameCtrl.setValue( null );
        this.unitNumberCtrl.setValue( null );
        this.streetNumberCtrl.setValue( null );
        this.streetNameCtrl.setValue( null );
        this.poBoxCtrl.setValue( null );
        this.killDelayedValidationForInputs();
    }

    public emptyAndResetStateAndStreetTypeControl () {
        this.manualStatesCmp.setSelectValue( null , AmpDropdownComponent.TRIGGER_CHANGE , AmpDropdownComponent.MARK_AS_PRISTINE );
        this.manualStreetTypeCmp.setSelectValue( null , AmpDropdownComponent.TRIGGER_CHANGE , AmpDropdownComponent.MARK_AS_PRISTINE );
    }

    private getJoinedIdWithIndex ( _id ) {
        return _id + addDashOrNothing( this.index );
    }

    private killDelayedValidationForInputs () {
        this.manualSuburbCmp.checkErrors( true );
        this.manualPostcodeCmp.checkErrors( true );
        this.manualSuburbCmp.checkErrors( true );
        this.manualPostcodeCmp.checkErrors( true );
        this.manualBuildingNameCmp.checkErrors( true );
        this.manualUnitNumberCmp.checkErrors( true );
        this.manualStreetNumberCmp.checkErrors( true );
        this.manualPoBox.checkErrors( true );
        this.manualStreetNameCmp.checkErrors( true );
    }

    private emptyPoBoxDependantFields () {
        this.buildingNameCtrl.setValue( null );
        this.unitNumberCtrl.setValue( null );
        this.streetNumberCtrl.setValue( null );
        this.streetNameCtrl.setValue( null );
        this.poBoxCtrl.setValue( null );
        this.manualStreetTypeCmp.setSelectValue( null , AmpDropdownComponent.TRIGGER_CHANGE , AmpDropdownComponent.MARK_AS_PRISTINE );
    }

    private getManualControlsFromManualAddressCG () {
        this.stateCtrl        = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.state.id ) );
        this.suburbCtrl       = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.suburb.id ) );
        this.postCodeCtrl     = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.postCode.id ) );
        this.buildingNameCtrl = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.buildingName.id ) );
        this.unitNumberCtrl   = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.unitNumber.id ) );
        this.streetNumberCtrl = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.streetNumber.id ) );
        this.streetNameCtrl   = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.streetName.id ) );
        this.streetTypeCtrl   = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.streetType.id ) );
        this.poBoxCtrl        = this.manualAddressCG.get( this.getJoinedIdWithIndex( this.poBox.id ) );
    }

    private get summaryAddress () {
        return BasicUtils.formatAddress( this.manualAddressCG.value );
    }

    public onPoBoxButtonsChange ( $event ) {
        if ( $event !== null ) {
            this.isItPoBox = isTrue( $event );
            this.emptyPoBoxDependantFields();
        }
    }
}
