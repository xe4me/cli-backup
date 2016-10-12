import { Injectable } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { FormService } from 'amp-ddc-components';
import { FDN } from '../forms/better-form/Application.fdn';

@Injectable()
export class SharedFormDataService {
    private singleOrJointFdn : String[] = [...FDN.SingleOrJoint, 'SingleOrJoint'];
    constructor(private formService : FormService) {

    }

    public getSingleOrJointControl ( form : FormGroup ) {
        return this.formService.getControlFromGroup(this.singleOrJointFdn, form);
    }
}
