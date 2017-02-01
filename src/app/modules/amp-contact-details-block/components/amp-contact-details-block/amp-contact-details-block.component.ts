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
const defaultBlockProps = require('./amp-contact-details-block.config.json');

@Component( {
    selector        : 'amp-contact-details-block',
    template        : require( './amp-contact-details-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpContactDetailsBlockComponent extends FormBlock {

    @ViewChild( 'mobileNumber' ) mobileNumberCmp : AmpInputComponent;

    protected __custom = defaultBlockProps;

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
