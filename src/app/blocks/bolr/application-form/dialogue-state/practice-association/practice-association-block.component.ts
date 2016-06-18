import { FormBlock , NamedControl , provideParent } from '../../../../formBlock';
import { Component , ElementRef, ViewContainerRef } from '@angular/core';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract ,
    AssociationLengthAbstract ,
    ExerciseDateAbstract
} from 'amp-ddc-ui-core/ui-core';
import { AmpRadioButtonGroupComponent } from '../../../../../components/amp-radio-button-group/amp-radio-button-group.component';
import { AmpTextareaComponent } from '../../../../../components/amp-textarea/amp-textarea.component';
import { TemplateRef, animate, state, style, transition, trigger } from '@angular/core';
import { Control } from '@angular/common';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import { Validators } from '@angular/common';
import { ControlGroup } from '@angular/common';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { ChangeDetectorRef } from '@angular/core';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
@Component( {
    selector   : 'practice-association-block' ,
    template   : `
            <div id='practice-association-block' *ngIf='practiceAssociationIsVisible' class='practice-association-n mt-60'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <section class='mb-30'>
                    <h3 class='heading heading-intro mb-30'>How long has your practice been with {{ licensee }}?</h3>
                    <div [class.mb-40]='!isInSummaryState' class='heading heading-contxtual-label'>
                        At the time of my requested exercise date, my practice will have been with {{ licensee }} for
                        <span *ngIf='isInSummaryState' class='summary-state'>{{
                        getAssociationPracticeLabel(associationLengthControl.value) }}
                        </span>
                    </div>
                     <amp-radio-button-group
                            @openClose='isInSummaryState ? "collapsed" : "expanded"'
                            [required]='isAssociationRequired'
                            scrollOutUnless='null'
                            class='grid__item 1/1'
                            (select)='onAssociationLengthSelect($event)'
                            [buttons]='associationLengthOptions'
                            [parentControl]='associationLengthControl'
                            [groupName]='associationLengthRadiosGroupName'
                            >
                        </amp-radio-button-group>
                </section>

                <div [class.mb-35]='exerciseDateControl.value!=="later_than"' *ngIf='isInSummaryState'
                class='heading heading-contxtual-label'>
                    <h3 class='heading heading-intro  mb-30'>And your requested exercise date?</h3>
                        <span class='summary-state'>{{ getExerciseLengthLabel(exerciseDateControl.value) }}</span>
                </div>
                <div @openClose='(!showExerciseDate || isInSummaryState) ? "collapsed" : "expanded"'>
                    <section class='mb-30' >
                        <h3 class='heading heading-intro  mb-40'>And your requested exercise date?</h3>
                         <amp-radio-button-group
                                autoSelectOnOne='true'
                                [required]='isExerciseDateRequired'
                                scrollOutOn='null'
                                class='grid__item 1/1'
                                (select)='onExerciseDateSelect($event)'
                                [buttons]='exerciseDateOptions'
                                [parentControl]='exerciseDateControl'
                                [groupName]='exerciseDateRadiosGroupName'
                                >
                            </amp-radio-button-group>
                    </section>
                </div>

                <section  @openClose='!showExpCircumstances ? "collapsed" : "expanded"'>
                        <amp-textarea
                            class='1/1'
                            [isRequired]='isExpCircumstancesRequired'
                            [isInSummaryState]='isInSummaryState'
                            [id]='exerciseDateRadiosTextFieldName'
                            label='Exceptional circumstances'
                            [parentControl]='excCirControl'
                            valMaxLength='500'>
                        </amp-textarea>
                </section>

                <div *ngIf='showRequiredError' class='errors mb-40'>
                    <div *ngIf='!excCirControl.valid'>
                        <div>
                            <span class='icon icon--close icon-errors'></span>This is a required field.
                        </div>
                    </div>
                </div>
                <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!controlGroup.valid' class='btn
                btn-ok mt-10'>
                    OK
                </amp-button>
                <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change mt-10'>
                    Change
                </amp-button>
                <div class='hr-block-divider mt-80'></div>
            </div>
          ` ,
    styles     : [ require( './practice-association-block.component.scss' ).toString() ] ,
    directives : [
        AmpButton ,
        AmpOverlayComponent ,
        AmpRadioButtonGroupComponent ,
        AmpTextareaComponent
    ] ,
    providers : [ TemplateRef , provideParent( PracticeAssociationBlockComponent ) ],
    animations: [trigger(
      'openClose',
      [
        state('collapsed, void', style({height: '0px', opacity: '0'})),
        state('expanded', style({height: '*', opacity: '1', overflow: 'hidden'})),
        transition(
            'collapsed <=> expanded', [animate(500, style({height: '250px'})), animate(500)])
      ])]
} )
export class PracticeAssociationBlockComponent extends FormBlock implements FormBlock {
    static CLASS_NAME                              = 'PracticeAssociationBlockComponent';
    private isInSummaryState : boolean             = false;
    private hasClickedOnOkButton : boolean         = false;
    private practiceAssociationIsVisible : boolean = false;
    private isAssociationRequired                  = true;
    private isExerciseDateRequired                 = true;
    private isExpCircumstancesRequired             = true;

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef,
                  public _viewContainerRef: ViewContainerRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.associationLengthRadiosGroupName , new Control( null ) ) ,
            new NamedControl( this.exerciseDateRadiosGroupName , new Control( null ) ) ,
            new NamedControl( this.exerciseDateRadiosTextFieldName , new Control( null ) )
        ];
        this.formControlGroupName = 'practiceAssociation';
    }

    public postBindControls () : void {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , PracticeAssociationBlockComponent.CLASS_NAME );
        } );
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes === this.formControlGroupName ) {
                this.isInSummaryState = false;
            }
        } );
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes.hasOwnProperty( 'practiceAssociationIsVisible' ) ) {
                this.practiceAssociationIsVisible = changes[ 'practiceAssociationIsVisible' ];
                this.resetBlock();
                if ( changes[ 'practiceAssociationIsVisible' ] === true ) {
                    this.markAsRequired();
                } else {
                    this.markAsNotRequired();
                }
                return;
            }
        } );
        return undefined;
    }

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
        this.undoneTheBlock();
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.controlGroup.valid ) {
            this.isInSummaryState = true;
            TimerWrapper.setTimeout( () => {
                this.scrollService.scrollToNextUndoneBlock( this.formModel );
            } , 600 );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'practiceAssociationIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.associationLengthRadiosGroupName;
        this.formControl[ 1 ].name = this.exerciseDateRadiosGroupName;
        this.formControl[ 2 ].name = this.exerciseDateRadiosTextFieldName;
    }

    private get showExerciseDate () {
        return this.associationLengthControl && this.associationLengthControl.value !== null && ! this.onlyHasOneOption();
    }

    private get showRequiredError () {
        return this.associationLengthControl && (this.hasClickedOnOkButton || this.exerciseDateControl.touched) && ! this.exerciseDateControl.valid;
    }

    private preselectedAssociationValues () {
        return [ 'fewer_than_five_years' ];
    }

    private isInArray ( value , array ) {
        return array.indexOf( value.trim() ) > - 1;
    }

    private onlyHasOneOption () {
        if ( this.associationLengthControl && this.associationLengthControl.value !== '' ) {
            return this.isInArray( this.associationLengthControl.value , this.preselectedAssociationValues() );
        }
        return false;
    }

    private get showExpCircumstances () {
        if ( this.exerciseDateControl ) {
            return this.exerciseDateControl.value === 'later_than' || this.associationLengthControl.value === 'fewer_than_five_years';
        }
        return false;
    }

    private getExerciseLengthLabel ( value ) {
        return ExerciseDateAbstract.getLabel( value , this.exerciseDateOptions );
    }

    private getAssociationPracticeLabel ( value ) {
        return AssociationLengthAbstract.getLabel( this.formModelService.licensee , value );
    }

    private get associationLengthOptions () {
        return AssociationLengthAbstract.getOptionsByLicensee( this.formModelService.licensee );
    }

    private get exerciseDateOptions () {
        return ExerciseDateAbstract.getOptionsByLicensee( this.formModelService.licensee , this.associationLengthControl.value );
    }

    private get controlGroup () : ControlGroup {
        return < ControlGroup >this.formModel.controls[ this.formControlGroupName ];
    }

    private get licensee () {
        return LicenseesAbstract.getLicensee( this.formModelService.licensee );
    }

    private get associationLengthRadiosGroupName () {
        return AssociationLengthAbstract.groupName;
    }

    private get exerciseDateRadiosGroupName () {
        return ExerciseDateAbstract.groupName;
    }

    private get exerciseDateRadiosTextFieldName () {
        return ExerciseDateAbstract.textFieldName;
    }

    private get excCirControl () {
        return this.formControl[ 2 ].control;
    }

    private get exerciseDateControl () {
        return this.formControl[ 1 ].control;
    }

    private get associationLengthControl () {
        return this.formControl[ 0 ].control;
    }

    private onAssociationLengthSelect ( value ) {
        this.isExpCircumstancesRequired = false;
        this.exerciseDateControl.updateValue( null );
        this.resetExcCirControl();
        if ( value === 'fewer_than_five_years' ) {
            this.isExpCircumstancesRequired = true;
            this.exerciseDateControl.updateValue( 'later_than' );
        }
        this.changeDetector.detectChanges();
    }

    private onExerciseDateSelect ( value ) {
        this.isExpCircumstancesRequired = false;
        this.resetExcCirControl();
        if ( value === 'later_than' ) {
            this.isExpCircumstancesRequired = true;
        }
        this.changeDetector.detectChanges();
    }

    private isCurrentBlockActive () {
        return this.practiceAssociationIsVisible;
    }

    private markAsNotRequired () {
        this.isAssociationRequired      = false;
        this.isExerciseDateRequired     = false;
        this.isExpCircumstancesRequired = false;
    }

    private markAsRequired () {
        this.isAssociationRequired      = true;
        this.isExerciseDateRequired     = true;
        this.isExpCircumstancesRequired = true;
    }

    private resetBlock () {
        this.undoneTheBlock();
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
        this.exerciseDateControl.updateValue( null );
        this.resetExcCirControl();
        this.associationLengthControl.updateValue( null );
    }

    private resetExcCirControl () {
        this.excCirControl.updateValue( null );
        this.excCirControl._touched  = false;
        this.excCirControl._dirty    = false;
        this.excCirControl._pristine = true;
        this.excCirControl.updateValueAndValidity( { onlySelf : false , emitParent : true } );
    }

    private undoneTheBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'practiceAssociationIsDone' ,
            flagValue : false
        } );
    }

    private check () {
    }
}
