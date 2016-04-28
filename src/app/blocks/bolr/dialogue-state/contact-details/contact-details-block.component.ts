import { Component , OnInit , ElementRef , ChangeDetectorRef } from 'angular2/core';
import { Control , ControlGroup } from 'angular2/common';
import { FormBlock , NamedControl } from '../../../formBlock';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { InputWithLabelGroupComponent } from '../../../../component-groups/input-with-label-group/input-with-label-group.component';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';


@Component(
    {
        selector   : 'contact-details-block' ,
        template   : `
    <div id='contact-details-block' class='contact-details-block'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>{{ formModelService.getModel().context.practicePrincipal_firstName }}, please 
        confirm your details are correct.
If not, simply update them below.</h3>
        <!--Contact Number-->
        <input-with-label-group
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.phone.contxtualLabel'
            [id]='contactDetails.phone.id'
            [label]='contactDetails.phone.label'
            [parentControl]='formControl[0].control'
            isRequired='true'
            valMaxLength='15'
            [valPattern]='contactDetails.phone.regex'>
        </input-with-label-group>

        <!--Email-->
         <input-with-label-group
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.email.contxtualLabel'
            [id]='contactDetails.email.id'
            [label]='contactDetails.email.label'
            [parentControl]='formControl[1].control'
            isRequired='true'
            valMaxLength='50'
            [valPattern]='contactDetails.email.regex'
         >
        </input-with-label-group>
      
        
        <div *ngIf='hasClickedOnOkButton && !formModel.controls.contactDetails.valid' class='errors mt'>
            <div *ngIf='!formControl[0].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please enter work phone number.
                </div>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please enter a valid phone
                </div>
            </div>
            <div *ngIf='!formControl[1].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please enter email address.
                </div>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please enter a valid email
                </div>
            </div>
        </div>
        <button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='! canGoNext' class='btn 
        btn--secondary btn-ok btn-ok-margin-top'>
            OK
        </button>
        <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
            Change
        </button>
        <div class='hr-block-divider'></div>
    </div>
  ` ,
        directives : [ AmpOverlayComponent , InputWithLabelGroupComponent ] ,
        styles     : [ require( './contact-details-block.component.scss' ).toString() ]
    } )
export class ContactDetailsBlockComponent extends FormBlock implements OnInit {
    static CLASS_NAME : string             = 'ContactDetailsBlockComponent';
    private contactDetails                 = {
        phone : {
            id             : 'phoneId' ,
            label          : 'Default Phone Label' ,
            contxtualLabel : 'Contact number' ,
            regex          : '^([0-9 ])*$' ,
            value          : '00000000'
        } ,
        email : {
            id             : 'emailId' ,
            label          : 'Default Email Label' ,
            contxtualLabel : 'Email' ,
            regex          : '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)' ,
            value          : 'smiladhi@gmail.com'
        }
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
            this.scrollService.scrollMeOut( this.el );
            this.progressObserver.onProgress();
        }
        // this.isInSummaryState = true;
        // // SAM - Action present data to Model
        // this.formModelService.present({
        //     action: 'next',
        //     blockId: this._id
        // });
    }

    private get canGoNext () {
        if ( this.formModel ) {
            return this.formModel.controls[ this.formControlGroupName ].valid;
        }
        return false;
    }

    constructor ( private progressObserver : ProgressObserverService ,
                  private el : ElementRef ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ) {
        super();
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , ContactDetailsBlockComponent.CLASS_NAME ) );
        this.formControl          = [
            new NamedControl( this.contactDetails.phone.id , new Control() ) ,
            new NamedControl( this.contactDetails.email.id , new Control() )
        ];
        this.formControlGroupName = 'contactDetails';
    }

    public isCurrentBlockActive () {
        return this.formModelService.getFlags().introIsDone;
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.contactDetails.phone.id;
        this.formControl[ 1 ].name = this.contactDetails.email.id;
        this.formControl[ 0 ].control.updateValue( this.contactDetails.phone.value );
        this.formControl[ 1 ].control.updateValue( this.contactDetails.email.value );
    }

    ngOnInit () : any {
        this
            .formModelService
            .getContactDetails()
            .subscribe(
                data => {
                    this.formModelService.present(
                        { action : 'setContactDetails' , contactDetails : data }
                    );
                    this.formControl[ 0 ].control.updateValue( this.formModelService.getModel().contactDetails.workPhoneNumber );
                    this.formControl[ 1 ].control.updateValue( this.formModelService.getModel().contactDetails.emailAddress );
                } ,
                error => {
                    this.formModelService.present(
                        { action : 'error' , errors : [ 'Failed to decode the context' ] }
                    );
                } );
        return undefined;
    }
}
/**
 * Created by xe4me on 7/04/2016.
 */
