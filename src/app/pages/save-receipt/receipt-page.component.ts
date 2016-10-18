import {
    Component,
    ElementRef,
    ChangeDetectorRef,
    ViewContainerRef,
    EventEmitter,
    OnInit
} from '@angular/core';
import {
    Headers,
    RequestOptions
} from '@angular/http';
import { FormGroup } from '@angular/forms';
import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';

import { AmpButton } from 'amp-ddc-components/src/app/components/amp-button/amp-button.component';
import { AmpEmailComponent } from '../../modules/amp-inputs/components/amp-email/amp-email.component';

@Component(
    {
        selector   : 'receipt-page-block',
        template   : require('./receipt-page.component.html'),
        directives : [ AmpEmailComponent, AmpButton ],
        styles     : [require('./receipt-page.component.scss').toString()],
        inputs     : ['title',
                      'messageForReference',
                      'messageForEmail',
                      'label',
                      'emailUrl'],
        outputs    : ['$sendEmailEvent']
    })

export class SaveReceiptPageComponent implements OnInit {

    public $sendEmailEvent : EventEmitter<any> = new EventEmitter();

    private title = 'Your quote/application has been saved';
    private messageForReference = 'Your quote/application is now saved and your reference is ';
    private messageForEmail = 'Enter your email address so instructions to retrieve the quote/application can be sent to you.';

    private referenceId : string = null;
    private isInSummaryState : boolean = false;
    private controlGroup : FormGroup = new FormGroup({});

    constructor(private _cd : ChangeDetectorRef,
                private el : ElementRef,
                public _viewContainerRef : ViewContainerRef,
                private route : ActivatedRoute) {
    }

    ngOnInit() {
        this.referenceId = this.route.snapshot.params['referenceId'];
    }

    private get buttonDisabled() : boolean {
        return !this.controlGroup.valid;
    }

    private sendEmail() {
        this.$sendEmailEvent.emit(this.controlGroup.value);

        // We set errors so the button gets disabled after click
        // The user can still edit the email address and the button becomes active again
        this.controlGroup.setErrors({ emailSent: true });
    }
}
