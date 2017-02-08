import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { get } from 'lodash';
import { FormBlock } from '../../form-block';
import { CustomerDetailsService } from '../customer-details/customer-details.service';
import { LoginStatusService } from '../login/login-status.service';

@Injectable()
export class PrepopulationService {
    public prepopCompletedSubject : Subject<string[]>;

    constructor ( public customerDetailsService : CustomerDetailsService,
                  public loginStatusService : LoginStatusService) {
        this.prepopCompletedSubject = new Subject<string[]>();
    }

    /*
     * Unfortunately, we need a method to pass Block's formGroup reference to this generic services.
     * If you can think of a way to do this generically please inform Eric, Milad or Cedric to remove this crap.
     */
    public registerBlockForPrepop (formBlock : FormBlock) {
        if (!formBlock || !formBlock['__controlGroup']) {
            throw new Error('Illegal argument, FormBlock cannot be null and must have __controlGroup reference defined.');
        }

        // Only register for applicant 1.
        // Note: This logic might be better in the actual Components, so that each component have a choice.
        // Currently implemented here because there no are requirement to prepop for second or third appliant(s)
        if ((formBlock['__custom'].applicantIndex && formBlock['__custom'].applicantIndex !== 1) ||
            (formBlock['__repeaterIndex'] && formBlock['__repeaterIndex'] !== 1)) {
            return;     // Do not prepop for applicant 2, 3, 4....
        }

        this.loginStatusService.userHasLoggedIn()
            .subscribe(() => {
                this.customerDetailsService.getCustomerDetails()
                    .then((data) => {
                        this.prepop(data, formBlock);
                    })
                    .catch( (err) => {
                        // Do nothing....TODO: please remove the line below.
                        console.log('WTF, failed to get customer Details ', err);
                    });
            });
    }

    // Prepopulates the block formControls base on the FormDefinition
    public prepop (data, formBlock : FormBlock) {
        if (!data || !formBlock) {
            return;
        }

        const controlGroup = formBlock['__controlGroup'];
        for (const customControl of formBlock['__custom'].controls) {
            // Make sure this custom.control definition is valid (i.e. have both an Id and prepopMapping)
            if (customControl && customControl.id && customControl.prepopMapping) {
                let srcValue = get(data, customControl.prepopMapping);
                // For some special backend data, we might want to massage it first.
                if (customControl.prepopMappingParser) {
                    srcValue = this[customControl.prepopMappingParser].call(this, srcValue, data);
                }
                controlGroup.get(customControl.id).setValue(srcValue);
                // Add a custom isPrepop flag into the FormControl object for UI to manage this special state.
                (<any> controlGroup.get(customControl.id)).__isPrepop = true;
            }
        }

        // Emit an event to signalify prepop is finished for this block
        this.prepopCompletedSubject.next(<string[]> formBlock['__fdn']);
    }

}
