import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewChecked,
    ViewChild
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { FormBlock } from '../../../../form-block';
import { FormModelService } from '../../../../services/form-model/form-model.service';
import { ScrollService, SaveService } from '../../../../services';
import { AmpCheckboxComponent } from '../../../amp-checkbox/components/amp-checkbox/amp-checkbox.component';

@Component( {
    selector: 'amp-address-multi-block',
    template: require( './amp-address-multi-block.component.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AmpAddressMultiBlockComponent extends FormBlock implements OnInit, AfterViewChecked {

    @ViewChild('sameThanPrimaryApplicantCmp') private sameThanPrimaryApplicantCmp : AmpCheckboxComponent;

    private _sameThanPrimaryApplicant : boolean;
    private primaryApplicantModel;

    private primaryApplicationBasicInfoControlGroup;
    private primaryApplicationAddressControlGroup;

    private defaultValues = [
        [
            {
                attr: 'id',
                defaultVal: 'Address'
            }
        ]
    ];

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    ngOnInit () {
        this.defaultValues.forEach( ( control, index ) => {
            control.forEach( ( prop ) => {
                this.setIfNot( this.__custom.controls[ index ], prop.attr, prop.defaultVal );
            } );
        } );
    }

    beforeOnNext () {
        super.beforeOnNext();
        if (this.sameThanPrimaryApplicant === true && this.__repeaterIndex > 0) {
            let model = cloneDeep( this.primaryApplicationAddressControlGroup.value );
            model[ this.__custom.controls[ 1 ].id ] = true; // 'sameThanPrimary'
            this.__controlGroup.setValue( model );
            this._cd.markForCheck();
        }
    }

    ngAfterViewInit () {
        super.ngAfterViewInit();

        if (!this.__fdn) {
            return;
        }

        this.primaryApplicationBasicInfoControlGroup = this.extractOtherApplicantControlGroup( 0, this.__custom.targetPrimaryApplicantBasicInfoId ); // 'basicInfo'
        this.primaryApplicationAddressControlGroup = this.extractOtherApplicantControlGroup( 0, this.__name );  // 'address'

        if (this.__repeaterIndex > 0) {
            this.primaryApplicationBasicInfoControlGroup.valueChanges.debounceTime( 500 ).subscribe( ( query ) => {
                this.primaryApplicantModel = {
                    title: query.title ? query.title.SelectedItem : '',
                    firstName: query.firstName ? query.firstName : '',
                    surName: query.surName ? query.surName : ''
                };
                this._cd.markForCheck();
            } );
        }
    }

    ngAfterViewChecked () {
        if (this.sameThanPrimaryApplicantCmp && this.sameThanPrimaryApplicantCmp.control) {
            this.sameThanPrimaryApplicant = this.sameThanPrimaryApplicantCmp.control.value;
        }
    }

    private extractOtherApplicantControlGroup ( applicantNumber, fieldName ) {
        let extractApplicationIndexInFdn = ( key ) => {
            let keyIndex = this.__fdn.lastIndexOf( key );
            if (keyIndex < 0) {
                this.logError( 'Cannot find applicationIndexInFdn, key: ' + key );
                return -1;
            }
            return keyIndex;
        };
        let recreateCustomFdn = ( applicationIndexInFdn ) => {
            let primaryApplicantFdn = this.__fdn;
            primaryApplicantFdn[ applicationIndexInFdn + 1 ] = applicantNumber;
            primaryApplicantFdn[ primaryApplicantFdn.length - 1 ] = fieldName;
            return primaryApplicantFdn;
        };

        let applicationIndexInFdn = extractApplicationIndexInFdn( this.__custom.targetApplicantRepeaterId ); // 'applicants'
        let primaryApplicantFdn = recreateCustomFdn( applicationIndexInFdn );
        let primaryApplicantControlGroup = this.__form.get( primaryApplicantFdn );
        if (!primaryApplicantControlGroup) {
            this.logError( 'Cannot extract extractOtherApplicantControlGroup, applicantNumber: ' + applicantNumber + ', fieldName: ' + fieldName + ', applicationIndexInFdn: ' + applicationIndexInFdn + ', primaryApplicantFdn: ' + primaryApplicantFdn + ', this.__custom.targetApplicantRepeaterId:' + this.__custom.targetApplicantRepeaterId );
        }
        return primaryApplicantControlGroup;
    }

    private setIfNot ( control, attr, defaultValue ) {
        if (control[ attr ] === undefined) {
            control[ attr ] = defaultValue;
        }
    }

    private logError ( messsage ) {
        console.log( '[ERROR][' + this.__fdn + '] ' + messsage );
        console.log( this.__form.value );
    }

    get isPrimaryApplicant () {
        return this.__repeaterIndex === 0;
    }

    get sameThanPrimaryApplicant () {
        if (this.isPrimaryApplicant) {
            return undefined;
        }
        return this._sameThanPrimaryApplicant === undefined ? true : this._sameThanPrimaryApplicant;
    }

    set sameThanPrimaryApplicant ( value ) {
        if (this._sameThanPrimaryApplicant !== value) {
            this._sameThanPrimaryApplicant = value;
        }
    }

    get primaryApplicantName () {
        if (!this.primaryApplicantModel) {
            return '';
        }
        return this.primaryApplicantModel.title + ' ' + this.primaryApplicantModel.firstName + ' ' + this.primaryApplicantModel.surName;
    }

    get isTheAddressRequired () {
        return this.isPrimaryApplicant || this.sameThanPrimaryApplicant !== true;
    }

    private onSameThanPrimaryApplicantCheckboxBlured ( $event ) {
        this._cd.detectChanges();
    }

    private onSameThanPrimaryApplicantCheckboxSelect ( $event ) {
        this.sameThanPrimaryApplicant = $event.target.checked;
        this._cd.detectChanges(); // not working -> onBlur
    }

}
