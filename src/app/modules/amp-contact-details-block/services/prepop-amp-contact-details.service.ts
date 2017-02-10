import { Injectable } from '@angular/core';
import { PrepopulationService } from '../../../services/prepopulation/prepopulation.service';
import { CustomerDetailsService } from '../../../services/customer-details/customer-details.service';
import { LoginStatusService } from '../../../services/login/login-status.service';

@Injectable()
export class PrepopAmpContactDetailsService extends PrepopulationService {

    constructor ( public customerDetailsService : CustomerDetailsService,
                  public loginStatusService : LoginStatusService ) {
        super(customerDetailsService, loginStatusService);
    }

    /**
     * Rules so far is remove white spaces and replace +61 with 0 according to JIRA
     * https://teamtools.amp.com.au/jira/browse/BET-3979
     *
     * But if we get too smart, do take a look at Google i18n
     * https://github.com/googlei18n/libphonenumber/tree/master/javascript/i18n/phonenumbers
     */
    private parseMobile (mobile : string ) {
        const validMobileRegex = /^04\d{8}$/;
        if (mobile) {
            let parseMobile = mobile.replace(/ /g, '');
            if (parseMobile) {
                parseMobile = parseMobile.replace(/^\+61/, '0');
            }

            if (validMobileRegex.test(parseMobile)) {
                return parseMobile;
            }
        }
        return null;
    }
}
