import { Component , OnInit , ElementRef , ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Control , ControlGroup } from '@angular/common';
import { FormBlock , NamedControl, provideParent } from '../../../../formBlock';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
import { MdInputComponent } from '../../../../../components/my-md-input/my-md-input.component.ts';
import { InputWithLabelGroupComponent } from '../../../../../component-groups/input-with-label-group/input-with-label-group.component';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { animate, state, style, transition, trigger } from '@angular/core';
import { TimerWrapper } from '@angular/core/src/facade/async';
@Component(
    {
        selector   : 'contact-details-block' ,
        template   : `
    <div id='contact-details-block' class='contact-details-block'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro' *ngIf="!showPracticeNameInputs">{{ formModelService.getModel().context.practicePrincipalFirstName }}, please
        confirm your details are correct. <br> If not, simply update them below.</h3>

        <h3 class='heading heading-intro' *ngIf="showPracticeNameInputs">Please
        confirm your details are correct. <br> If not, simply update them below.</h3>


        <!--Practice principal START-->
        <div @openClose='!showPracticeNameInputs ? "collapsed" : "expanded"' class='grid__item'>
            <!--Partnership Manager name-->
            <label class='heading heading-contxtual-label mb3' >Name</label><!--
            -->&nbsp;<my-md-input
                class='1/3'
                (onEnter)='ok()'
                [isInSummaryState]='isInSummaryState'
                [id]='contactDetails.firstName.id'
                [label]='contactDetails.firstName.label'
                [parentControl]='firstNameControl'
                [isRequired]='showPracticeNameInputs'
                [valPattern]='contactDetails.firstName.regex'
                [valMaxLength]='contactDetails.firstName.maxLength'>
            </my-md-input><!--
            --><my-md-input
                class='1/3'
                (onEnter)='ok()'
                [isInSummaryState]='isInSummaryState'
                [id]='contactDetails.lastName.id'
                [label]='contactDetails.lastName.label'
                [parentControl]='lastNameControl'
                [isRequired]='showPracticeNameInputs'
                [valPattern]='contactDetails.lastName.regex'
                [valMaxLength]='contactDetails.firstName.maxLength'>
            </my-md-input>
        </div>
        <!--Practice principal END-->
        <!--Contact Number-->
        <input-with-label-group
            (onEnter)='ok()'
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.phone.contxtualLabel'
            [id]='contactDetails.phone.id'
            [label]='contactDetails.phone.label'
            [parentControl]='phoneControl'
            isRequired='true'
            [valMaxLength]='contactDetails.phone.maxLength'
            [valMinLength]='contactDetails.phone.minLength'
            showLabel='false'
            [valPattern]='contactDetails.phone.regex'>
        </input-with-label-group>

        <!--Email-->
         <input-with-label-group
            [width]='"1/2"'
            [tolowerCase]='contactDetails.email.toLowerCase'
            (onEnter)='ok()'
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='contactDetails.email.contxtualLabel'
            [id]='contactDetails.email.id'
            [label]='contactDetails.email.label'
            [parentControl]='emailControl'
            isRequired='true'
            [valMaxLength]='contactDetails.email.maxLength'
            [valMinLength]='contactDetails.email.minLength'
            showLabel='false'
            [valPattern]='contactDetails.email.regex'
         >
        </input-with-label-group>

        <div *ngIf='(phoneControl.touched ||
        emailControl.touched) && !formModel.controls.contactDetails.valid' class='errors mt-20 mb-15'>

           <div class='error-item' *ngIf='firstNameControl.touched && !firstNameControl.valid'>
               <span class='icon icon--close icon-errors'></span>{{ contactDetails.firstName.error }}
           </div>
           <div class='error-item' *ngIf='lastNameControl.touched && !lastNameControl.valid'>
               <span class='icon icon--close icon-errors'></span>{{ contactDetails.lastName.error }}
           </div>




            <div class='error-item' *ngIf='!phoneControl.valid && phoneControl.touched'>
                <div *ngIf='phoneControl.errors.required' >
                    <span class='icon icon--close icon-errors'></span>{{ contactDetails.phone.requiredError }}
                </div>
                <div *ngIf='phoneControl.errors.mdMaxLength ||
                phoneControl.errors.mdMinLength || phoneControl.errors.mdPattern'>
                    <span class='icon icon--close icon-errors'></span>{{ contactDetails.phone.invalidError }}
                </div>
            </div>

            <div  *ngIf='!emailControl.valid && emailControl.touched'>
                <div *ngIf='emailControl.errors.mdPattern || emailControl.errors.mdMaxLength'
                class='error-item'>
                    <span class='icon icon--close icon-errors'></span>{{ contactDetails.email.invalidError }}
                </div>
                <div *ngIf='emailControl.errors.required'
                 class='error-item'>
                    <span class='icon icon--close icon-errors'></span>{{ contactDetails.email.requiredError }}
                </div>
            </div>
        </div>
        <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!canGoNext' class='btn
         btn-ok btn-ok-margin-top'>
            OK
        </amp-button>
        <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn  btn-change btn-ok-margin-top'>
            Change
        </amp-button>
        <div class='hr-block-divider mt-80 '></div>
    </div>
  ` ,
        directives : [
            MdInputComponent ,
            AmpOverlayComponent ,
            InputWithLabelGroupComponent ,
            AmpButton
        ] ,
        styles     : [ require( './contact-details-block.component.scss' ).toString() ],
        providers  : [ provideParent( ContactDetailsBlockComponent ) ],
        animations: [trigger(
          'openClose',
          [
            state('collapsed, void', style({height: '0px', opacity: '0', display: 'none'})),
            state('expanded', style({height: '*', opacity: '1', overflow: 'hidden', display: 'block'})),
            transition(
                'collapsed <=> expanded', [animate(200)])
          ])]
    } )
export class ContactDetailsBlockComponent extends FormBlock implements OnInit, FormBlock {
    static CLASS_NAME : string             = 'ContactDetailsBlockComponent';
    private contactDetails                 = {
        firstName : {
            id        : 'practicePrincipalFirstName' ,
            label     : 'First name' ,
            regex     : '' ,
            maxLength : 50 ,
            error     : 'First name is a required field.'
        } ,
        lastName  : {
            id        : 'practicePrincipalLastName' ,
            label     : 'Last name' ,
            regex     : '' ,
            maxLength : 50 ,
            error     : 'Last name is a required field.'
        } ,
        phone     : {
            id             : 'phoneId' ,
            label          : 'Default Phone Label' ,
            contxtualLabel : 'Contact number' ,
            regex          : '^([\\s()+-]*\\d){6,}$' ,
            value          : '00000000' ,
            maxLength      : 20 ,
            minLength      : 8 ,
            requiredError  : 'Contact number is a required field.' ,
            invalidError   : 'The contact number must contain a minimum of 8 characters. Only numeric and area code' +
            ' characters are allowed.'
        } ,
        email     : {
            id             : 'emailId' ,
            label          : 'Default Email Label' ,
            contxtualLabel : 'Email' ,
            regex          : '^[_a-zA-Z0-9-+=\'#$]+(\.[_a-zA-Z0-9-+=\'#$]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$' ,
            value          : 'smiladhi@gmail.com' ,
            maxLength      : 50 ,
            minLength      : 0 ,
            toLowerCase    : 'true' ,
            invalidError   : 'The email is not valid.' ,
            requiredError  : 'Email is a required field.'
        }
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private showPracticeNameInputs         = false;

    ngOnInit () : any {
        this.formModelService
            .getContactDetails()    // Get Profile for the Practice using the ActingAsUser
            .subscribe(
                contactData => {
                    // Check for the specified officer and Get Profile
                    this.formModelService
                        .getAdvisers()
                        .subscribe(
                            adviserList => {
                                this.formModelService.present(
                                    { action : 'setAdvisers' , advisers : adviserList }
                                );

                                this.formModelService.present(
                                    { action : 'setContactDetails' , contactDetails : contactData }
                                );

                                this.formControl[ Controls.PHONE ].control.updateValue( this.formModelService.getModel().contactDetails.workPhoneNumber );
                                this.formControl[ Controls.EMAIL ].control.updateValue( this.formModelService.getModel().contactDetails.emailAddress );
                            } ,
                            error => {
                                this.formModelService.present(
                                    { action : 'error' , errors : [ 'Failed to decode the context' ] }
                                );
                            } );

                } ,
                error => {
                    this.formModelService.present(
                        { action : 'error' , errors : [ 'Failed to decode the context' ] }
                    );
                } );

        this.showPracticeNameInputs = (!this.formModelService.model.context.practicePrincipalFirstName || !this.formModelService.model.context.practicePrincipalLastName);
        return undefined;
    }

    public postBindControls () : void {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , ContactDetailsBlockComponent.CLASS_NAME );
        } );
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes === this.formControlGroupName ) {
                this.isInSummaryState = false;
            }
        } );
        return;
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
            this.scrollService.scrollToNextUndoneBlock( this.formModel );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : this.doneFlag ,
                flagValue : true
            } );
        }
    }

    constructor ( private _cd : ChangeDetectorRef ,
                  private progressObserver : ProgressObserverService ,
                  private el : ElementRef ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService,
                  public _viewContainerRef: ViewContainerRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.contactDetails.firstName.id , new Control() ) ,
            new NamedControl( this.contactDetails.lastName.id , new Control() ) ,
            new NamedControl( this.contactDetails.phone.id , new Control() ) ,
            new NamedControl( this.contactDetails.email.id , new Control() )
        ];
        this.formControlGroupName = 'contactDetails';
    }

    public isCurrentBlockActive () {
        return this.formModelService.getFlags( 'introIsDone' );
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ Controls.FIRSTNAME ].name = this.contactDetails.firstName.id;
        this.formControl[ Controls.LASTTNAME ].name = this.contactDetails.lastName.id;
        this.formControl[ Controls.PHONE ].name     = this.contactDetails.phone.id;
        this.formControl[ Controls.EMAIL ].name     = this.contactDetails.email.id;
        this.formControl[ Controls.PHONE ].control.updateValue( this.contactDetails.phone.value );
        this.formControl[ Controls.EMAIL ].control.updateValue( this.contactDetails.email.value );
    }

    private changeit () {
        this.showPracticeNameInputs = ! this.showPracticeNameInputs;
        this._cd.detectChanges();
    }

    private get firstNameControl () {
        return this.formControl[ Controls.FIRSTNAME ].control;
    }

    private get lastNameControl () {
        return this.formControl[ Controls.LASTTNAME ].control;
    }

    private get emailControl () {
        return this.formControl[ Controls.EMAIL ].control;
    }

    private get phoneControl () {
        return this.formControl[ Controls.PHONE ].control;
    }

    private get doneFlag () {
        return this.formControlGroupName + 'IsDone';
    }
}
export abstract class Controls {
    static FIRSTNAME = 0;
    static LASTTNAME = 1;
    static PHONE     = 2;
    static EMAIL     = 3;
}
