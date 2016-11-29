import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    OnInit,
    AfterViewInit
} from '@angular/core';

import { ActivatedRoute,
         Router
} from '@angular/router';
import { FormControl , FormGroup } from '@angular/forms';
import {
    SaveReceiptPageComponent,
    AmpButton,
    AmpHttpService
} from 'amp-ddc-components';
import { Constants } from '../../shared/constants';

@Component( {
    selector    : 'request-ref-via-sms-page' ,
    templateUrl: './request-ref-via-sms-page.html',
    styles: [ require( './request-ref-via-sms-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class RequestRefViaSMSPage implements AfterViewInit {
    private mobileNumberCtrlId : string = 'mobileNumber';
    private acceptPrivacyCtrlId : string = 'acceptPrivacy';
    private referenceId : string;
    private controlGroup : FormGroup = new FormGroup( {} );
    constructor (private http : AmpHttpService,
                 private _cd : ChangeDetectorRef,
                 private route : ActivatedRoute,
                 private router : Router) {
    }

    public ngAfterViewInit() {
        // prepopulate mobile number
        this.controlGroup.controls[this.mobileNumberCtrlId].setValue(this.route.snapshot.params['mobileNumber']);
        // get the referenceId
        this.referenceId = this.route.snapshot.params['referenceId'];
    }

    private back() {
        // call the form save and retrieve to navigate back to the first incomplete block
        this.router.navigate(['']);
    }

    private sendSMS() {
        if (this.controlGroup.valid) {
            const mobileNumber = this.controlGroup.value[this.mobileNumberCtrlId];
            this.router.navigate(['saveConfirmation', this.referenceId]);
        }
    }
}
