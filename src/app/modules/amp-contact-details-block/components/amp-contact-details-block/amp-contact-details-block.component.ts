import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    Optional,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import {
    CustomerDetailsService,
    ScrollService,
    SaveService,
    SaveAndCloseService
} from '../../../../services';
import { AmpInputComponent } from '../../../amp-inputs';
import { PrepopAmpContactDetailsService } from '../../services/prepop-amp-contact-details.service';
const defaultBlockProps = require('./amp-contact-details-block.config.json');

@Component( {
    selector        : 'amp-contact-details-block',
    template        : require( './amp-contact-details-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpContactDetailsBlockComponent extends FormBlock implements AfterViewInit {

    @ViewChild( 'mobileNumber' ) mobileNumberCmp : AmpInputComponent;

    protected __custom = defaultBlockProps;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  private prepopAmpContactDetailsService : PrepopAmpContactDetailsService,
                  @Optional() private saveCloseService : SaveAndCloseService,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit() {
        super.ngAfterViewInit();
        this.prepopAmpContactDetailsService.registerBlockForPrepop(this);

        // TODO:- TBC
        // Example of how to subscribe to the prepop event but not sure why we need to!
        this.prepopAmpContactDetailsService.prepopCompletedSubject.subscribe((blockFDN) => {
            console.log('Prepop completed for ', blockFDN);
        });
    }

    onNext () {
        if ( this.saveCloseService ) {
            this.saveCloseService.updateMobileNumber( this.mobileNumberCmp.control.value );
        }
        super.onNext();
    }

    get isMobilePhoneInSummaryState() {
        return this.__controlGroup.get(this.__custom.controls[1].id)['__isPrepop'] || this.isInSummaryState;
    }

}
