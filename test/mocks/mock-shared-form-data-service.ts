import {
    Injectable
} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
@Injectable()
export class MockSharedFormDataService {

    private existingCustomerControl : FormControl;

    constructor () {
    }

    public getNewOrExistingCustomerControl ( form : FormGroup ){
        return this.existingCustomerControl;
    }

    public setNewCustomerControl () {
        this.existingCustomerControl = new FormControl('NewCustomer');
    }

    public setExistingCustomerControl () {
        this.existingCustomerControl = new FormControl('ExistingCustomer');
    }
}
