import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract ,
    AssociationLengthAbstract ,
    ExerciseDateAbstract
} from 'amp-ddc-ui-core/ui-core';
import { AmpRadioButtonGroupComponent } from '../../../../components/amp-radio-button-group/amp-radio-button-group.component';
import { AmpTextareaComponent } from '../../../../components/amp-textarea/amp-textarea.component';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { Control } from 'angular2/src/common/forms/model';
import { AmpCollapseDirective } from '../../../../directives/animations/collapse/amp-collapse.directive';
import { AmpSlideDirective } from '../../../../directives/animations/slide/amp-slide.directive';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { Validators } from 'angular2/src/common/forms/validators';
import { ControlGroup } from 'angular2/src/common/forms/model';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector   : 'practice-association-block' ,
    template   : `
            <div *ngIf='componentIsVisible' class='practice-association'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>                
                <section class='mb-30'>
                    <h3 class='heading heading-intro mb-30'>How long has your practice been with {{ licensee }}?</h3>
                    <div class='heading heading-contxtual-label'>
                        At the time of my requested exercise date, my practice will have been with {{ licensee }} for 
                        <span *ngIf='isInSummaryState' class='summary-state'>{{ 
                        getAssociationPracticeLabel(getControl( associationLengthRadiosGroupName ).value) }}
                        </span>
                    </div>
                     <amp-radio-button-group
                            *ngIf='!isInSummaryState'
                            required='true'
                            scrollOutUnless='null'
                            class='grid__item 1/1 mt-40'
                            (select)='onAssociationLengthSelect($event)'
                            [buttons]='associationLengthOptions'
                            [parentControl]='getControl(associationLengthRadiosGroupName)'
                            [groupName]='associationLengthRadiosGroupName'   
                            >
                        </amp-radio-button-group>
                </section>
                
                <div [class.mb-35]='getControl( exerciseDateRadiosGroupName ).value!=="later_than"' *ngIf='isInSummaryState' 
                class='heading heading-contxtual-label'>
                    <h3 class='heading heading-intro  mb-30'>And your requested exercise date?</h3>
                        <span class='summary-state'>{{ getExerciseLengthLabel(getControl( exerciseDateRadiosGroupName ).value) }}</span>
                </div>
                <div *ngIf='!onlyHasOneOption() && getControl( associationLengthRadiosGroupName ).value!==null'>
                    <section *ngIf='!isInSummaryState' class='mb-30' >
                        <h3 class='heading heading-intro  mb-40'>And your requested exercise date?</h3>
                         <amp-radio-button-group
                                autoSelectOnOne='true'
                                required='true'
                                scrollOutOn='null'
                                class='grid__item 1/1'
                                (select)='onExerciseDateSelect($event)'
                                [buttons]='exerciseDateOptions'
                                [parentControl]='getControl(exerciseDateRadiosGroupName)'
                                [groupName]='exerciseDateRadiosGroupName'   
                                >
                            </amp-radio-button-group>
                    </section>
                </div>
                
                <section  *ngIf='getControl( exerciseDateRadiosGroupName ).value==="later_than" || 
                getControl( associationLengthRadiosGroupName ).value==="fewer_than_five_years" '>
                        <amp-textarea
                            class='1/1'
                            [isInSummaryState]='isInSummaryState'
                            [id]='exerciseDateRadiosTextFieldName'
                            label='Exceptional circumstances'
                            [parentControl]='getControl(exerciseDateRadiosTextFieldName)'
                            valMaxLength='500'>
                        </amp-textarea> 
                </section>
                
                
                <div *ngIf='(hasClickedOnOkButton || getControl(exerciseDateRadiosTextFieldName).touched) && 
                !getControl(exerciseDateRadiosTextFieldName).valid' class='errors mb-40'>
                    <div *ngIf='!getControl(exerciseDateRadiosTextFieldName).valid'>
                        <div>
                            <span class='icon icon--close icon-errors'></span>This is a required field.
                        </div>
                    </div>
                </div>
                <!--<pre>{{ formModel.controls['practiceAssociation'].value | json }}</pre>-->
               <button class='btn btn-ok 
               btn--secondary mt-10' *ngIf='!isInSummaryState' (click)='ok()' 
               [disabled]='!controlGroup.valid'  >
                    OK
                </button>
                <button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change btn--secondary mt-10 '>
                    Change
                </button>
                <div class='hr-block-divider mt-80 mb-60'></div>
            </div>
          ` ,
    styles     : [ require( './practice-association-block.component.scss' ).toString() ] ,
    directives : [
        AmpOverlayComponent ,
        AmpRadioButtonGroupComponent ,
        AmpTextareaComponent ,
        AmpCollapseDirective ,
        AmpSlideDirective
    ] ,
    providers  : [ TemplateRef ]
} )
export class PracticeAssociationBlockComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME                      = 'PracticeAssociationBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private componentIsVisible : boolean   = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [];
        this.formControlGroupName = 'practiceAssociation';
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes.hasOwnProperty( 'practiceAssociationIsVisible' ) ) {
                this.componentIsVisible = changes[ 'practiceAssociationIsVisible' ];
                if ( changes[ 'practiceAssociationIsVisible' ] === true ) {
                    this.createControls();
                } else {
                    this.removeControls();
                }
                return;
            }
            if ( changes.hasOwnProperty( 'fullOrPartialIsDone' ) && (changes[ 'fullOrPartialIsDone' ] === false ) ) {
                this.resetBlock();
            }
        } );
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , PracticeAssociationBlockComponent.CLASS_NAME );
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
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
            this.scrollService.scrollMeOut( this.el );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'practiceAssociationIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
    }

    private createControls () {
        let controlGroup = new ControlGroup( {} );
        controlGroup.addControl( this.associationLengthRadiosGroupName , new Control( null , Validators.required ) );
        controlGroup.addControl( this.exerciseDateRadiosTextFieldName , new Control( null ) );
        controlGroup.addControl( this.exerciseDateRadiosGroupName , new Control( null , Validators.required ) );
        this.formModel.addControl( this.formControlGroupName , controlGroup );
    }

    private getControl ( controlName ) : Control {
        return <Control>this.controlGroup.controls[ controlName ];
    }

    private removeControls () {
        if ( this.formModel.contains( this.formControlGroupName ) ) {
            this.formModel.removeControl( this.formControlGroupName );
        }
    }

    private preselectedAssociationValues () {
        return [ 'fewer_than_five_years' ];
    }

    private isInArray ( value , array ) {
        return array.indexOf( value.trim() ) > - 1;
    }

    private onlyHasOneOption () {
        if ( this.getControl( this.associationLengthRadiosGroupName ).value && this.getControl( this.associationLengthRadiosGroupName ).value !== '' ) {
            return this.isInArray( this.getControl( this.associationLengthRadiosGroupName ).value , this.preselectedAssociationValues() );
        }
        return false;
    }

    private getExerciseLengthLabel ( value ) {
        return ExerciseDateAbstract.getLabel( value , this.exerciseDateOptions );
    }

    private getAssociationPracticeLabel ( value ) {
        return AssociationLengthAbstract.getLabel( this.licensee , value );
    }

    private get associationLengthOptions () {
        return AssociationLengthAbstract.getOptionsByLicensee( this.licensee );
    }

    private get exerciseDateOptions () {
        return ExerciseDateAbstract.getOptionsByLicensee( this.licensee , this.getControl( this.associationLengthRadiosGroupName ).value );
    }

    private get controlGroup () : ControlGroup {
        return < ControlGroup >this.formModel.controls[ this.formControlGroupName ];
    }

    private get licensee () {
        return this.formModelService.context.licensee;
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

    private onAssociationLengthSelect ( value ) {
        this.getControl( this.exerciseDateRadiosGroupName ).updateValue( null );
        this.getControl( this.exerciseDateRadiosTextFieldName ).validator = null;
        this.getControl( this.exerciseDateRadiosTextFieldName ).setErrors( null );
        this.getControl( this.exerciseDateRadiosTextFieldName ).updateValue( null );
        if ( value === 'fewer_than_five_years' ) {
            this.getControl( this.exerciseDateRadiosGroupName ).updateValue( 'later_than' );
            this.getControl( this.exerciseDateRadiosTextFieldName ).validator = Validators.required;
            this.getControl( this.exerciseDateRadiosTextFieldName ).setErrors( { required : true } );
        }
    }

    private onExerciseDateSelect ( value ) {
        if ( value === 'later_than' ) {
            this.getControl( this.exerciseDateRadiosTextFieldName ).validator = Validators.required;
            this.getControl( this.exerciseDateRadiosTextFieldName ).setErrors( { required : true } );
        } else {
            this.getControl( this.exerciseDateRadiosTextFieldName ).validator = null;
            this.getControl( this.exerciseDateRadiosTextFieldName ).setErrors( null );
            this.getControl( this.exerciseDateRadiosTextFieldName ).updateValue( null );
        }
    }

    private isCurrentBlockActive () {
        return this.formModelService.getFlags( 'fullOrPartialIsDone' );
    }

    private resetBlock () {
        this.undoneTheBlock();
        this.removeControls();
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
    }

    private undoneTheBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'practiceAssociationIsDone' ,
            flagValue : false
        } );
    }
}


