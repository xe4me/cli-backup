import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';
import { get }from 'lodash';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';

@Component({
    selector        : 'amp-address-multi-block',
    template        : require('./amp-address-multi-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AmpAddressMultiBlockComponent extends FormBlock implements OnInit {

    private sameThanPrimaryApplicant : boolean = true;
    private primaryApplicantModel;

    private defaultValues = [
        [
            {
                attr: 'id',
                defaultVal: 'Address'
            }
        ]
    ];

    constructor( saveService : SaveService ,
                 _cd : ChangeDetectorRef ,
                 scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    ngOnInit() {
        // Set default values if no custom ones from form-def...
        this.defaultValues.forEach((control, index) => {
            control.forEach((prop) => {
                this.setIfNot(this.__custom.controls[index], prop.attr, prop.defaultVal);
            });
        });

        console.log(this.__custom);
        console.log(this.__form);
        console.log(this.__custom.applicantIndex); // undef
        this.primaryApplicantModel = this.extractPrimaryApplicantModel();
    }

    private setIfNot(control, attr, defaultValue) {
        if (control[attr] === undefined) {
            control[attr] = defaultValue;
        }
    }

    get isPrimaryApplicant () {
        return this.primaryApplicantModel === null;
    }

    get isTheAddressRequired () {
        return this.isPrimaryApplicant !== null || !this.sameThanPrimaryApplicant;
    }

    get primaryApplicantName () {
        return this.primaryApplicantModel.title + ' ' + this.primaryApplicantModel.firstName + ' ' + this.primaryApplicantModel.lastName;
    }

    private onSameThanPrimaryApplicantCheckboxSelect ( $event ) {
        this.sameThanPrimaryApplicant = $event.target.checked;
        this._cd.detectChanges();
    }

    private extractPrimaryApplicantModel () {
        // TODO to activate the feature
        if (1 === 1 + 2) {
            return null;
        }
        let rootApplicantFDN = '';
        if (this.__custom.rootApplicantFDN && this.__custom.applicantIndex) {
            rootApplicantFDN = this.__custom.rootApplicantFDN + this.__custom.applicantIndex;
        }
        return {
            title: get( this.__form.value, rootApplicantFDN + this.__custom.titleFDN, '' ),
            firstName: get( this.__form.value, rootApplicantFDN + this.__custom.firstNameFDN, '' ),
            lastName: get( this.__form.value, rootApplicantFDN + this.__custom.lastNameFDN, '' )
        };
    }

}
