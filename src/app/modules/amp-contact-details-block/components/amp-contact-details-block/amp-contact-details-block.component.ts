import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    Optional,
    ViewChild,
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import {
    ScrollService,
    SaveService,
    SaveAndCloseService
} from '../../../../services';
import { AmpInputComponent } from '../../../amp-inputs';

@Component( {
    selector        : 'amp-contact-details-block',
    template        : require( './amp-contact-details-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpContactDetailsBlockComponent extends FormBlock {

    @ViewChild( 'mobileNumber' ) mobileNumberCmp : AmpInputComponent;

    protected __custom = {
        blockTitle : 'And your contact details...',
        controls   : [
            {
                id             : 'emailAddress',
                label          : 'Email',
                required       : true,
                tooltipMessage : 'Confirmation of your application will be sent to this email address.'
            },
            {
                id             : 'mobileNumber',
                label          : 'Mobile number',
                required       : true,
                tooltipMessage : 'A mobile phone number is required to allow AMP Bank to securely protect your account.',
                errors         : {
                    required : 'Mobile number is a required field.',
                    pattern  : 'Mobile number must be in the format 04nnnnnnnn.'
                }
            },
            {
                id       : 'homeNumber',
                label    : 'Home number',
                required : false
            }
        ]
    };

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  @Optional() private saveCloseService : SaveAndCloseService,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    onNext () {
        if ( this.saveCloseService ) {
            this.saveCloseService.updateMobileNumber( this.mobileNumberCmp.control.value );
        }
        super.onNext();
    }

}
