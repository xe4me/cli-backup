import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService,
    CustomerDetailsService
} from 'amp-ddc-components';
import { Constants } from '../../shared';

@Component( {
    selector        : 'contact-details-block',
    templateUrl     : './contact-details.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class ContactDetailsBlock extends FormBlock {

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private customerDetailsService : CustomerDetailsService,
                  saveService : SaveService ) {
        super( saveService, _cd, scrollService );
    }

    get isMobileInSummaryState () {
        // Disable the input if mobile is prepopulated.
        return ( this.customerDetailsService.isMobilePrepop
            && this.__fdn[ 1 ] === Constants.applicant1Section ) || this.isInSummaryState;
    }
}
