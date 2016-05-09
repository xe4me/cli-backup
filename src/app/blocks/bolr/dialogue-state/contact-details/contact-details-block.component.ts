import { Component , OnInit , ElementRef , ChangeDetectorRef } from 'angular2/core';
import { Control , ControlGroup } from 'angular2/common';
import { FormBlock , NamedControl } from '../../../formBlock';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { InputWithLabelGroupComponent } from '../../../../component-groups/input-with-label-group/input-with-label-group.component';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component(
    {
        selector   : 'contact-details-block' ,
        template   : `
    <div id='contact-details-block' class='contact-details-block'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>{{ formModelService.getModel().context.practicePrincipalFirstName }}, please 
        confirm your details are correct.If not, simply update them below.</h3>
        <!--Contact Number-->
        <input-with-label-group
            (onEnter)='ok()'
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.phone.contxtualLabel'
            [id]='contactDetails.phone.id'
            [label]='contactDetails.phone.label'
            [parentControl]='formControl[0].control'
            isRequired='true'
            [valMaxLength]='contactDetails.phone.maxLength'
            [valMinLength]='contactDetails.phone.minLength'
            showLabel='false'
            [valPattern]='contactDetails.phone.regex'>
        </input-with-label-group>

        <!--Email-->
         <input-with-label-group
            [tolowerCase]='contactDetails.email.toLowerCase'
            (onEnter)='ok()'
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.email.contxtualLabel'
            [id]='contactDetails.email.id'
            [label]='contactDetails.email.label'
            [parentControl]='formControl[1].control'
            isRequired='true'
            [valMaxLength]='contactDetails.email.maxLength'
            [valMinLength]='contactDetails.email.minLength'
            showLabel='false'
            [valPattern]='contactDetails.email.regex'
         >
        </input-with-label-group>
        
        <div *ngIf='(formControl[0].control.touched || 
        formControl[1].control.touched) && !formModel.controls.contactDetails.valid' class='errors mt-20 mb-15'>
            <div class='error-item' *ngIf='!formControl[0].control.valid && formControl[0].control.touched'>
                <div *ngIf='formControl[ 0 ].control.errors.required' >
                    <span class='icon icon--close icon-errors'></span>Contact number is a required field.
                </div>
                <div *ngIf='formControl[ 0 ].control.errors.mdMaxLength || 
                formControl[ 0 ].control.errors.mdMinLength || formControl[ 0 ].control.errors.mdPattern'>
                    <span class='icon icon--close icon-errors'></span>The contact number must contain a minimum of 8 
                    characters. Only numeric and area code characters are allowed.
                </div>
            </div>
            
            <div  *ngIf='!formControl[1].control.valid && formControl[1].control.touched'>
                <div *ngIf='formControl[ 1 ].control.errors.mdPattern || formControl[ 1 ].control.errors.mdMaxLength' 
                class='error-item'>
                    <span class='icon icon--close icon-errors'></span>The email is not valid.
                </div>
                <div *ngIf='formControl[ 1 ].control.errors.required'
                 class='error-item'>
                    <span class='icon icon--close icon-errors'></span>Email is a required field.
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
export class ContactDetailsBlockComponent extends FormBlock implements OnInit, AfterViewInit {
    static CLASS_NAME : string             = 'ContactDetailsBlockComponent';
    private contactDetails                 = {
        phone : {
            id             : 'phoneId' ,
            label          : 'Default Phone Label' ,
            contxtualLabel : 'Contact number' ,
            regex          : '^([\s()+-]*\d){6,}$' ,
            value          : '00000000' ,
            maxLength      : 20 ,
            minLength      : 8
        } ,
        email : {
            id             : 'emailId' ,
            label          : 'Default Email Label' ,
            contxtualLabel : 'Email' ,
            regex          : '^[_a-zA-Z0-9-+=\'#$]+(\.[_a-zA-Z0-9-+=\'#$]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$' ,
            value          : 'smiladhi@gmail.com' ,
            maxLength      : 50 ,
            minLength      : 0 ,
            toLowerCase    : 'true'
        }
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;

    public isCurrentBlockActive () {
        return this.formModelService.getFlags( 'introIsDone' );
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

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , ContactDetailsBlockComponent.CLASS_NAME );
        } );
        return undefined;
    }

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
            this.scrollService.scrollMeOut( this.el );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'contactDetailsIsDone' ,
                flagValue : true
            } );
        }
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
        this.formControl          = [
            new NamedControl( this.contactDetails.phone.id , new Control() ) ,
            new NamedControl( this.contactDetails.email.id , new Control() )
        ];
        this.formControlGroupName = 'contactDetails';
    }
}
/**
 * Created by xe4me on 7/04/2016.
 */
