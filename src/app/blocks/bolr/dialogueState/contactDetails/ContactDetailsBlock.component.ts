import {Component, OnInit, ElementRef} from 'angular2/core';
import {Control} from 'angular2/common';
import {FormBlock, NamedControl} from '../../../formBlock';
import {AmpOverlayComponent} from '../../../../components/amp-overlay/amp-overlay.component';
import {InputWithLabelGroupComponent} from '../../../../componentGroups/input-with-label-group/input-with-label-group.component';
import {ScrollService} from 'amp-ddc-ui-core/src/app/services/scroll/scroll.service';
import {FormModelService} from "amp-ddc-ui-core/ui-core";


@Component({
    selector: 'contact-details-block',
    template: `
    <div id="contact-details-block" class="contact-details-block">
        <amp-overlay [active]="!isCurrentBlockActive()"></amp-overlay>
        <h3 class="heading heading-intro">First name, please confirm your details are correct.
If not, simply update them below.</h3>

        <!--Contact Number-->
        <input-with-label-group
            [isInSummaryState]="isInSummaryState"
            [contxtualLabel]="contactDetails.phone.contxtualLabel"
            [id]="contactDetails.phone.id"
            [label]="contactDetails.phone.label"
            [parentControl]="formControl[0].control"
            isRequired="true"
            valMaxLength="15"
            [valPattern]="contactDetails.phone.regex">
        </input-with-label-group>

        <!--Email-->
         <input-with-label-group
            [isInSummaryState]="isInSummaryState"
            [contxtualLabel]="contactDetails.email.contxtualLabel"
            [id]="contactDetails.email.id"
            [label]="contactDetails.email.label"
            [parentControl]="formControl[1].control"
            isRequired="true"
            valMaxLength="15"
            [valPattern]="contactDetails.email.regex"
         >
        </input-with-label-group>

        <!--<div class="alert alert-danger">-->
          <!--Message-->
        <!--</div>-->
        <button (click)="ok()" class="btn btn--secondary btn-ok">
            OK
        </button>

    </div>
  `,
    directives: [AmpOverlayComponent, InputWithLabelGroupComponent],
    styles: [require('./ContactDetailsBlock.component.scss').toString()],
    providers: [ScrollService],
    inputs: ['contactDetails']
})
export class ContactDetailsBlockComponent extends FormBlock implements OnInit {

    static CLASS_NAME:string = 'ContactDetailsBlockComponent';

    private contactDetails = {
        phone: {
            id: 'contactId',
            label: 'Default Phone Label',
            contxtualLabel: 'Default Phone Contextual Label',
            regex: '^([0-9])*$',
            data: this.formModelService.getModel().contactDetails.phone
        },
        email: {
            id: 'emailId',
            label: 'Default Email Label',
            data: this.formModelService.getModel().contactDetails.email,
            contxtualLabel: 'Default Email Contextual Label',
            regex: '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)'
        }
    }

    private isInSummaryState:boolean = false;


    public ok() {

        // this.isInSummaryState = true;
        // // SAM - Action present data to Model
        // this.formModelService.present({
        //     action: 'next',
        //     blockId: this._id
        // });
    }


    constructor(el:ElementRef, public formModelService:FormModelService, scrollService:ScrollService) {
        super();
        scrollService.$scrolled.subscribe(function (message) {
            scrollService.amIVisible(el, ContactDetailsBlockComponent.CLASS_NAME);
        });
        this.formControl = [
            new NamedControl(this.contactDetails.phone.id, new Control()),
            new NamedControl(this.contactDetails.email.id, new Control())
        ];
    }

    public isCurrentBlockActive() {
        return this.formModel.controls['introIsPassed'].valid;
    }


    public preBindControls(_formBlockDef) {
        this.formControl[0].name = this.contactDetails.phone.id;
        this.formControl[1].name = this.contactDetails.email.id;
        //this.formControl[0].control.updateValue(this.contactDetails.phone.data);
        //this.formControl[1].control.updateValue(this.contactDetails.email.data);
    }


    ngOnInit():any {
        this
            .formModelService
            .getContactDetails()
            .subscribe(
                data => {

                    this.formModelService.present(
                        {action: 'setContactDetails', contactDetails: data}
                    );
                    this.formControl[0].control.updateValue(this.formModelService.getModel().contactDetails.phone);
                    this.formControl[1].control.updateValue(this.formModelService.getModel().contactDetails.email);
                },
                error => {
                    this.formModelService.present(
                        {action: 'errors', errors: ['Failed to decode the context']}
                    );
                });
        return undefined;
    }
}


/**
 * Created by xe4me on 7/04/2016.
 */
