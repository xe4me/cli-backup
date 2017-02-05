import {
    Injectable
} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
@Injectable()
export class MockSharedFormDataService {

    private newOrExistingCustomerFdn = ['Application' , 'NewOrExistingCustomer', 'NewOrExistingCustomer'];

    constructor () {
    }

    public getNewOrExistingCustomerControl ( form : FormGroup ){
        return <FormControl> form.get( this.newOrExistingCustomerFdn );
    }
}
