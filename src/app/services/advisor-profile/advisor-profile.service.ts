import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../error/error.service';
import {
    ProfileService,
    Profile
} from '../profile/profile.service';
import {
    AdvisorsService,
    Advisor
} from '../advisors/advisors.service';

@Injectable()
export class AdvisorProfileService {
    constructor ( private advisorsService : AdvisorsService, private profileService : ProfileService ) {
    }

    public getAdvisorForProfile ( overrideUrls : { profileUrl?, advisorsUrl? } = {} ) : Observable<Advisor> {
        let saveAndSubmitReplay =
                this.profileService.getProfile( overrideUrls.profileUrl )
                    .flatMap(
                        ( profile : Profile ) => this.advisorsService.getAdvisors( overrideUrls.advisorsUrl ),
                        ( profile : Profile, advisors : Advisor[] ) => this.findAdvisor( profile, advisors )
                    )
                    .catch( ErrorService.handleError )
                    .publishReplay();
        saveAndSubmitReplay.connect();
        return saveAndSubmitReplay;
    }

    public findAdvisor ( profile : Profile, advisors : Advisor[] ) : Advisor {
        if ( profile.specifiedOfficer && advisors && advisors.length ) {
            return advisors.find( ( adviser ) => {
                return (adviser.ownernum === profile.specifiedOfficer);
            } );
        }
        return null;
    }
}
