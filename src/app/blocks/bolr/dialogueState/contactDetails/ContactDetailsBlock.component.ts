import {Component, OnInit} from 'angular2/core';
import {Control} from 'angular2/common';
import {FormBlock, NamedControl} from '../../../formBlock';
import {AmpOverlayComponent} from '../../../../components/amp-overlay/amp-overlay.component';
import {InputWithLabelGroupComponent} from '../../../../componentGroups/input-with-label-group/input-with-label-group.component';
import {FormModelService} from '../../../../../../node_modules/amp-ddc-ui-core/src/app/services/formModel.service';


@Component({
    selector: 'contact-details-block',
    template: `
    <div  id="contact-details-block" class="contact-details-block">
        <amp-overlay [active]="!isCurrentBlockActive()"></amp-overlay>
        <h3 class="heading heading-intro">First name, please confirm your details are correct.
If not, simply update them below.</h3>

        <!--Contact Number-->
        <input-with-label-group
            [isInSummaryState]="isInSummaryState"
            [contxtualLabel]="contact.contxtualLabel"
            [id]="contact.id"
            [label]="contact.label"
            [parentControl]="formControl[0].control"
            isRequired="true"
            valMaxLength="15"
            [valPattern]="contact.regex">
        </input-with-label-group>

        <!--Email-->
         <input-with-label-group
            [isInSummaryState]="isInSummaryState"
            [contxtualLabel]="email.contxtualLabel"
            [id]="email.id"
            [label]="email.label"
            [parentControl]="formControl[1].control"
            isRequired="true"
            valMaxLength="15"
            [valPattern]="email.regex"
         >
        </input-with-label-group>

        <!--<div class="alert alert-danger">-->
          <!--Message-->
        <!--</div>-->
        <button (click)="go()" class="btn btn--secondary btn-ok">
            OK
        </button>

    </div>
  `,
    directives: [AmpOverlayComponent, InputWithLabelGroupComponent],
    styles: [require('./ContactDetailsBlock.component.scss').toString()],
})
export class ContactDetailsBlockComponent extends FormBlock implements OnInit {

    static CLASS_NAME = 'ContactDetailsBlockComponent';

    public contact = {id: '', label: '', contxtualLabel: '', regex: '', data: ''};
    public email = {id: '', label: '', contxtualLabel: '', regex: '', data: ''};
    private isInSummaryState: boolean = false;

    public ok() {
        this.isInSummaryState = true;
        // SAM - Action present data to Model
        this.formModelService.present({
            action: 'next',
            blockId: this._id
        });
    }

    constructor(public formModelService: FormModelService) {
        super ();

        this.contact = {
            id: 'contactId',
            label: 'Contact numbers',
            contxtualLabel: 'Contxtual numbers',
            regex: '^([0-9])*$',
            data: this.formModelService.getModel().contactDetails.phone
        };
        this.email = {
            id: 'emailId',
            label: 'Email',
            data: this.formModelService.getModel().contactDetails.email,
            contxtualLabel: 'Contxtual help',
            regex: '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)'
        };
        this.formControl = [new NamedControl(this.contact.id, new Control()), new NamedControl(this.email.id, new Control())];
    }

    public isCurrentBlockActive() {
        if (this._id) {
            return this.formModelService.getModel().currentBlockID.index === this._id.index ||
                this.formModelService.getModel().currentBlockID.index < this._id.index;
        }

        return true;
    }


    public preBindControls() {
        this.formControl[0].name = this.contact.id;
        this.formControl[1].name = this.email.id;

        this.formControl[0].control.updateValue(this.contact.data);
        this.formControl[1].control.updateValue(this.email.data);


    }


    ngOnInit(): any {
        // console.log("ngOnInit: Calling getContactDetails");
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
