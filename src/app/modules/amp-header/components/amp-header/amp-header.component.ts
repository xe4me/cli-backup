import {
    Component ,
    ChangeDetectionStrategy
} from '@angular/core';

import { DeviceService } from '../../../../services/device/device.service';
import { FormUtils } from '../../../amp-utils/form-utils';

@Component( {
    selector        : 'amp-header' ,
    template        : require( './amp-header.component.html' ) ,
    styles          : [ require( './amp-header.component.scss' ).toString() ],
    inputs          : [
        'phoneNumber',
        'unavailableHeading',
        'unavailableMessage',
        'availability',
        'contactUsText',
        'officeHoursStart',
        'officeHoursEnd',
        'experienceTitle'
    ]
} )

export class AmpHeaderComponent {

    private isMobile : boolean;
    private popDownId : string = 'contactUsPopDown';

    private phoneNumber : string        = '1300 366 019';
    private unavailableHeading : string = 'Sorry, currently our lines are closed';
    private unavailableMessage : string = 'Please call back on Monday to Friday between 8:30am - 7:00pm (AEST)';
    private availability : string       = 'Monday to Friday, 8:30am - 7:00pm (AEST)';
    private contactUsText : string      = 'Contact us';
    private officeHoursStart : string   = '08:30';
    private officeHoursEnd : string     = '19:00';
    private experienceTitle : string    = '';
    private isOfficeHours : boolean     = false;

    constructor ( private deviceService : DeviceService ) {
        this.isMobile = this.deviceService.isMobile();
        this.isOfficeHours = FormUtils.isWithinTimes(this.officeHoursStart, this.officeHoursEnd);
    }

    private onCall (event) {
        event.preventDefault();
        window.location.href = 'tel:' + this.phoneNumber;
    }
}
