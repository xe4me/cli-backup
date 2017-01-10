import { Injectable } from '@angular/core';
import { FormGroup , FormControl , AbstractControl } from '@angular/forms';
import { FDN } from '../forms/better-form/Application.fdn';
import { Constants } from '../shared';
@Injectable()
export class SharedFormDataService {
    private singleOrJointFdn : Array<string|number> = [ ...FDN.SingleOrJoint , 'SingleOrJoint' ];
    private newOrExistingCustomerFdn : Array<string|number> = [ ...FDN.NewOrExistingCustomer, 'NewOrExistingCustomer'];

    public getSingleOrJointControl ( form : FormGroup ) {
        return <FormControl> form.get( this.singleOrJointFdn );
    }

    public getNewOrExistingCustomerControl ( form : FormGroup ) {
        return <FormControl> form.get( this.newOrExistingCustomerFdn );
    }

    public getReferenceIdControl ( form : FormGroup ) : AbstractControl {
        const formGroup        = <FormGroup> form.controls[ 'Application' ];
        let referenceIdControl = formGroup.controls[ Constants.referenceIdName ];

        if ( !referenceIdControl ) {
            referenceIdControl = new FormControl();
            formGroup.addControl( Constants.referenceIdName , referenceIdControl );
        }
        return referenceIdControl;
    }
}
