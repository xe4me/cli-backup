import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {FormBlock, NamedControl} from '../../../formBlock';
import {AmpOverlayComponent} from '../../../../components/amp-overlay/amp-overlay.component';
import {InputWithLabelGroupComponent} from '../../../../componentGroups/input-with-label-group/input-with-label-group.component';



@Component({
    selector: 'contact-details-block',
    template: `
    <div id="contact-details-block" class="contact-details-block">
        <amp-overlay [active]="isComponentBlocked"></amp-overlay>
        <h3 class="heading heading-intro">First name, please confirm your details are correct.
If not, simply update them below.</h3>
        
        <!--Contact Number-->
        <input-with-label-group
            [contxtualLabel]="contact.contxtualLabel"
            [id]="contact.id"
            [label]="contact.label"
            [(model)]="contact.data"
            [parentControl]="formControl[0].control"
            isRequired="true"
            valMaxLength="15"
            [valPattern]="contact.regex">    
        </input-with-label-group>
            
        <!--Email-->
         <input-with-label-group
            [contxtualLabel]="email.contxtualLabel"
            [id]="email.id"
            [label]="email.label"
            [parentControl]="formControl[1].control"
            isRequired="true"
            valMaxLength="15"
            [valPattern]="email.regex"
         >
        </input-with-label-group>
      
        <div class="alert alert-danger">
          Message
        </div>
        <button (click)="goNext()" class="btn btn--secondary btn-ok">
            OK
        </button>
        
    </div>
  `,
    directives: [AmpOverlayComponent, InputWithLabelGroupComponent],
    styles: [require('./ContactDetailsBlock.component.scss').toString()],
})
export class ContactDetailsBlockComponent extends FormBlock {
    static CLASS_NAME = 'ContactDetailsBlockComponent';

    public contact = {id: '', label: '', contxtualLabel: '', regex: '' , data:''};
    public email = {id: '', label: '', contxtualLabel: '', regex: ''};


    isComponentBlocked:boolean = false;

    goNext() {
        alert('Going Next');
    }

    constructor() {
        super();
        this.contact = {
            id: 'contactId',
            label: 'Contact numbers',
            contxtualLabel: 'Contxtual numbers',
            regex: '^([0-9])*$',
            data:'5345345435'
        };
        this.email = {
            id: 'emailId',
            label: 'Email',
            contxtualLabel: 'Contxtual help',
            regex: "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)"
        };
        this.formControl = [new NamedControl(this.contact.id, new Control()), new NamedControl(this.email.id, new Control())];
    }

    public preBindControls() {
        this.formControl[0].name = this.contact.id;



        this.formControl[1].name = this.email.id;
    }


}


/**
 * Created by xe4me on 7/04/2016.
 */
