import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';

@Component( {
    selector: 'amp-address-multi-block',
    template: require( './amp-address-multi-block.component.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AmpAddressMultiBlockComponent extends FormBlock implements OnInit {

    private sameThanPrimaryApplicant : boolean = true;

    private currentApplicantIndex = 0;
    private primaryApplicantModel;

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

    ngAfterViewInit () {
        super.ngAfterViewInit();

        if (!this.__fdn) {
            return;
        }

        let applicationIndexInFdn = this.extractApplicationIndexInFdn( this.__custom.targetApplicantRepeaterId ); // 'applicants'
        this.currentApplicantIndex = this.extractApplicantIndex( applicationIndexInFdn );
        if (this.currentApplicantIndex > 0) {
            let primaryApplicantControlGroup = this.extractPrimaryApplicantControlGroup( applicationIndexInFdn );
            primaryApplicantControlGroup.valueChanges.debounceTime( 500 ).subscribe( ( query ) => {
                this.primaryApplicantModel = {
                    title: query.title ? query.title.SelectedItem : '',
                    firstName: query.firstName ? query.firstName : '',
                    surName: query.surName ? query.surName : ''
                };
            } );
        }
    }

    private extractPrimaryApplicantControlGroup ( applicationIndexInFdn ) {
        let primaryApplicantFdn = this.__fdn;
        primaryApplicantFdn[ applicationIndexInFdn + 1 ] = 0;
        primaryApplicantFdn[ primaryApplicantFdn.length - 1 ] = this.__custom.targetPrimaryApplicantBasicInfoId; // 'basicInfo'
        let primaryApplicantControlGroup = this.__form.get( primaryApplicantFdn );
        if (!primaryApplicantControlGroup) {
            this.logError( 'Cannot extract primaryApplicantControlGroup, applicationIndexInFdn: ' + applicationIndexInFdn );
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

    private extractApplicationIndexInFdn ( key ) {
        let keyIndex = this.__fdn.lastIndexOf( key );
        if (keyIndex < 0) {
            this.logError( 'Cannot find applicationIndexInFdn, key: ' + key );
            return -1;
        }
        return keyIndex;
    }

    private extractApplicantIndex ( keyIndex ) {
        let currentApplicantIndexStr = this.__fdn[ keyIndex + 1 ];
        let currentApplicantIndex = Number( currentApplicantIndexStr );
        if (!(currentApplicantIndex >= 0)) {
            this.logError( 'CurrentApplicantIndex is invalid, expected a number, got: ' + currentApplicantIndexStr + ', keyIndex was: ' + keyIndex );
            return -1;
        }
        return currentApplicantIndex;
    }

    get isPrimaryApplicant () {
        return this.currentApplicantIndex === 0;
    }

    get primaryApplicantName () {
        if (!this.primaryApplicantModel) {
            return '';
        }
        return this.primaryApplicantModel.title + ' ' + this.primaryApplicantModel.firstName + ' ' + this.primaryApplicantModel.surName;
    }

    get isTheAddressRequired () {
        return this.isPrimaryApplicant || !this.sameThanPrimaryApplicant;
    }

    private onSameThanPrimaryApplicantCheckboxSelect ( $event ) {
        this.sameThanPrimaryApplicant = $event.target.checked;
        this._cd.detectChanges();
    }

}
