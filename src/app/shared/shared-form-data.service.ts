import { Injectable } from '@angular/core';
import { FormGroup , FormControl , AbstractControl } from '@angular/forms';
import { FDN } from '../forms/better-form/Application.fdn';
import { Constants } from '../shared';
@Injectable()
export class SharedFormDataService {
    private singleOrJointFdn : (string|number)[] = [ ...FDN.SingleOrJoint , 'SingleOrJoint' ];

    public getSingleOrJointControl ( form : FormGroup ) {
        return <FormControl> form.get( this.singleOrJointFdn );
    }

    public getReferenceIdControl ( form : FormGroup ) : AbstractControl {
        const formGroup        = <FormGroup> form.controls[ 'Application' ];
        let referenceIdControl = formGroup.controls[ Constants.referenceIdName ];
        if ( ! referenceIdControl ) {
            referenceIdControl = new FormControl();
            formGroup.addControl( Constants.referenceIdName , referenceIdControl );
        }
        return referenceIdControl;
    }
}
