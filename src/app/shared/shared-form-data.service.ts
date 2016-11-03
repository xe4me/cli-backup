import { Injectable } from '@angular/core';
import { FormGroup , FormControl, AbstractControl } from '@angular/forms';
import { FormService } from 'amp-ddc-components';
import { FDN } from '../forms/better-form/Application.fdn';
import { Constants } from '../shared';

@Injectable()
export class SharedFormDataService {
    private singleOrJointFdn : String[] = [...FDN.SingleOrJoint, 'SingleOrJoint'];

    constructor(private formService : FormService) {

    }

    public getSingleOrJointControl ( form : FormGroup ) {
        return this.formService.getControlFromGroup(this.singleOrJointFdn, form);
    }

    public getReferenceIdControl(form : FormGroup) : AbstractControl {
        const formGroup = <FormGroup> form.controls['Application'];
        let referenceIdControl = formGroup.controls[Constants.referenceIdName];
        if (!referenceIdControl) {
            referenceIdControl = new FormControl();
            formGroup.addControl(Constants.referenceIdName, referenceIdControl);
        }
        return referenceIdControl;
    }
}
