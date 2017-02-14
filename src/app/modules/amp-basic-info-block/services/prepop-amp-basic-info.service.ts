import { Injectable } from '@angular/core';
import { PrepopulationService } from '../../../services/prepopulation/prepopulation.service';
import { CustomerDetailsService } from '../../../services/customer-details/customer-details.service';
import { LoginStatusService } from '../../../services/login/login-status.service';

@Injectable()
export class PrepopAmpBasicInfoService extends PrepopulationService {

    constructor ( public customerDetailsService : CustomerDetailsService,
                  public loginStatusService : LoginStatusService ) {
        super( customerDetailsService, loginStatusService );
    }

    private parseTitle ( title : string ) {
        if ( title ) {
            const parsedTitle = title.replace( /\./g, '' );
            return {
                Query        : parsedTitle,
                SelectedItem : parsedTitle
            };
        }
        return null;
    }

    private parseBirthDate ( birthDate : string ) {
        if ( birthDate ) {
            return birthDate.substr( 8, 2 ) + '/' +
                birthDate.substr( 5, 2 ) + '/' +
                birthDate.substr( 0, 4 );
        }
        return null;
    }
}
