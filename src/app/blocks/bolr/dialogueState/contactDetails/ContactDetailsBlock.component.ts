import { Component , OnInit , ElementRef , ChangeDetectorRef } from 'angular2/core';
import { Control , ControlGroup } from 'angular2/common';
import { FormBlock , NamedControl } from '../../../formBlock';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { InputWithLabelGroupComponent } from '../../../../componentGroups/input-with-label-group/input-with-label-group.component';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
@Component(
    {
        selector   : 'contact-details-block' ,
        template   : `
    <div id='contact-details-block' class='contact-details-block'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>First name, please confirm your details are correct.
If not, simply update them below.</h3>
        <!--Contact Number-->
        <input-with-label-group
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.phone.contxtualLabel'
            [id]='contactDetails.phone.id'
            [label]='contactDetails.phone.label'
            [parentControl]='formControl[0].control'
            isRequired='true'
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
            [valPattern]='contactDetails.email.regex'
         >
        </input-with-label-group>
      
        
        <div *ngIf='hasClickedOnOkButton && !formModel.controls.contactDetails.valid' class='errors mt'>
            <div *ngIf='!formControl[0].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Phone should no be empty
                </div>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please enter a valid phone
                </div>
            </div>
            <div *ngIf='!formControl[1].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Email should no be empty
                </div>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please enter a valid email
                </div>
            </div>
        </div>
        <button *ngIf='!isInSummaryState' (click)='ok()' class='btn btn--secondary btn-ok'>
            OK
        </button>
        <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change'>
            Change
        </button>
        <div class='hr-block-divider'></div>
    </div>
  ` ,
        directives : [ AmpOverlayComponent , InputWithLabelGroupComponent ] ,
        styles     : [ require( './ContactDetailsBlock.component.scss' ).toString() ]
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
            contxtualLabel : 'Default Email Contextual Label' ,
            regex          : '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)' ,
            value          : 'smiladhi@gmail.com'
        }
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;

    public change() {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok() {
        this.hasClickedOnOkButton = true;
        console.log( 'controller' , this.formModel.controls[ this.formControlGroupName ] );
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
            this.scrollService.scrollMeOut( this.el );
        }
        // this.isInSummaryState = true;
        // // SAM - Action present data to Model
        // this.formModelService.present({
        //     action: 'next',
        //     blockId: this._id
        // });
    }

    constructor( private el : ElementRef , private formModelService : FormModelService , private scrollService : ScrollService ) {
        super();
        scrollService.$scrolled.subscribe( message => scrollService.amIVisible( el , ContactDetailsBlockComponent.CLASS_NAME ) );
        this.formControl          = [ new NamedControl( this.contactDetails.phone.id , new Control() ) , new NamedControl( this.contactDetails.email.id , new Control() ) ];
        this.formControlGroupName = 'contactDetails';
    }

    public isCurrentBlockActive() {
        return this.formModelService.getFlags().introIsDone;
    }

    public preBindControls( _formBlockDef ) {
        this.formControl[ 0 ].name = this.contactDetails.phone.id;
        this.formControl[ 1 ].name = this.contactDetails.email.id;
        this.formControl[ 0 ].control.updateValue( this.contactDetails.phone.value );
        this.formControl[ 1 ].control.updateValue( this.contactDetails.email.value );
    }

    ngOnInit() : any {
        this
            .formModelService
            .getContactDetails()
            .subscribe(
                data => {
                    this.formModelService.present(
                        { action : 'setContactDetails' , contactDetails : data }
                    );
                    //this.formControl[0].control.updateValue('0402095291');
                    //this.formControl[1].control.updateValue('smilad@gmail.com');
                    this.formControl[ 0 ].control.updateValue( this.formModelService.getModel().contactDetails.phone );
                    this.formControl[ 1 ].control.updateValue( this.formModelService.getModel().contactDetails.email );
                } ,
                error => {
                    this.formControl[ 0 ].control.updateValue( '0402095291' );
                    this.formControl[ 1 ].control.updateValue( 'smilad@gmail.com' );
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
