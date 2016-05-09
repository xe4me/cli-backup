import { Component , OnInit , ElementRef , ChangeDetectorRef } from 'angular2/core';
import { Control , ControlGroup } from 'angular2/common';
import { FormBlock , NamedControl } from '../../../formBlock';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { InputWithLabelGroupComponent } from '../../../../component-groups/input-with-label-group/input-with-label-group.component';
import { FormModelService , ProgressObserverService , ScrollService , AmpDateService } from 'amp-ddc-ui-core/ui-core';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component(
    {
        selector   : 'exercise-date-block' ,
        template   : `
    <div id='exercise-date-block' class='exercise-date-block'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>Please select an exercise date {{ timeFrame }} today's date.</h3>
        
        
       <div class='heading heading-contxtual-label mt-30'>
            This is a requested date only. AMP will provide a confirmed exercise date once this form has been submitted and reviewed. Adjustments to the requested date may be required, subject to practice tenure and/or processing blackout periods.
        </div>
        <input-with-label-group
            (onBlur)='validateDate()'
            (onEnter)='ok()'
            [isInSummaryState]='isInSummaryState'
            [contxtualLabel]='requestDate.contxtualLabel'
            [id]='requestDate.id'
            [label]='requestDate.label'
            [parentControl]='formControl[0].control'
            isRequired='true'
            [valMaxLength]='requestDate.maxLength'
            [valMinLength]='requestDate.minLength'
            showLabel='false'
            [valPattern]='requestDate.regex'>
        </input-with-label-group>
        
        <div *ngIf='formControl[0].control.touched && !formModel.controls.exerciseDate.valid' class='errors mt-20 mb-15'>
            <div class='error-item'>
                <div *ngIf='formControl[ 0 ].control.errors.required' >
                    <span class='icon icon--close icon-errors'></span>Date is a required field.
                </div>
                <div *ngIf='formControl[ 0 ].control.errors.mdPattern'>
                    <span class='icon icon--close icon-errors'></span>The date should be in the format DD/MM/YYYY.
                </div>
            </div>
        </div>
        <div *ngIf='dateErrorMessage!==null' class='errors mt-20 mb-15'>
            <div class='error-item'>
                  <span class='icon icon--close icon-errors'></span>{{ dateErrorMessage }}
            </div>
        </div>
        
        <button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!canGoNext || dateErrorMessage!==null' class='btn 
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
        styles     : [ require( './exercise-date-block.component.scss' ).toString() ]
    } )
export class ExerciseDateBlockComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME : string             = 'ExerciseDateBlockComponent';
    private requestDate                    = {
        id             : 'requestDateId' ,
        label          : 'My requested date is' ,
        contxtualLabel : 'My requested date is' ,
        regex          : '^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\\d\\d$' ,
        value          : '' ,
        maxLength      : 10 ,
        minLength      : 10
    };
    private TIMEFRAMES                     = {
        six_months     : 'six months from' ,
        later_than     : 'later than' ,
        twelve_months  : '12 months from' ,
        ninety_days    : '90 days from' ,
        three_month    : 'three months from' ,
        eighteen_month : '18 months from'
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private dateErrorMessage               = null;
    private dateFormat                     = 'dd/MM/yyyy';
    private ampDateService : AmpDateService;
    private defaultExerciseDateOption      = 'three_month';

    public isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'practiceAssociation' ] ) {
            return this.formModelService.getFlags( 'fullOrPartialIsDone' ) &&
                this.formModelService.getFlags( 'practiceAssociationIsDone' );
        }
        if ( this.formModel && this.formModel.controls[ 'saleReason' ] ) {
            return this.formModelService.getFlags( 'fullOrPartialIsDone' ) &&
                this.formModelService.getFlags( 'saleReasonIsDone' );
        } else {
            return this.formModelService.getFlags( 'fullOrPartialIsDone' );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.requestDate.id;
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , ExerciseDateBlockComponent.CLASS_NAME );
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
                flag      : 'exerciseDateIsDone' ,
                flagValue : true
            } );
        }
    }

    private controlGroup ( name ) : ControlGroup {
        return < ControlGroup >this.formModel.controls[ name ];
    }

    private get associtationExerciseDateValue () {
        return this.controlGroup( 'practiceAssociation' ).controls[ 'exerciseDate' ].value;
    };

    private get timeFrame () {
        if ( this.formModel && this.formModel.controls[ 'practiceAssociation' ] ) {
            if ( this.controlGroup( 'practiceAssociation' ).controls[ 'exerciseDate' ].value != null ) {
                return this.TIMEFRAMES[ this.associtationExerciseDateValue ];
            } else {
                return this.TIMEFRAMES[ this.defaultExerciseDateOption ];
            }
        } else {
            return this.TIMEFRAMES[ this.defaultExerciseDateOption ];
        }
    }

    private validateDateField ( datesDiff , condition ) {
        this.hideError();
        switch ( condition ) {
            case 'six_months':
                if ( datesDiff < 183 ) {
                    this.showError( 'The date must be at least six months from today\'s date.' );
                }
                break;
            case 'later_than':
                if ( datesDiff < 1 ) {
                    this.showError( 'The date must be later than today\'s date.' );
                }
                break;
            case 'twelve_months':
                if ( datesDiff < 365 ) {
                    this.showError( 'The date must be at least 12 months from today\'s date.' );
                }
                break;
            case 'ninety_days':
                if ( datesDiff < 90 ) {
                    this.showError( 'The date must be at least 90 days from today\'s date.' );
                }
                break;
            case 'three_month':
                if ( datesDiff < 90 ) {
                    this.showError( 'The date must be at least 90 days from today\'s date.' );
                }
                break;
            case 'eighteen_month':
                if ( datesDiff < 548 ) {
                    this.showError( 'The date must be at least 18 months from today\'s date' );
                }
                break;
            case 'eighteen_month':
                if ( datesDiff < 548 ) {
                    this.showError( 'The date must be at least 18 months from today\'s date' );
                }
                break;
        }
    }

    private showError ( errorMessage ) {
        this.dateErrorMessage = errorMessage;
    }

    private hideError () {
        this.dateErrorMessage = null;
    }

    private validateDate () {
        let enteredDate = this.formControl[ 0 ].control.value;
        let datesDiff   = this.ampDateService.getDatesDiff( this.ampDateService.today , enteredDate );
        if ( this.controlGroup( 'fullOrPartial' ).controls[ 'fullOrPartial' ].value === 'Full' ) {
            this.validateDateField( datesDiff , this.associtationExerciseDateValue );
        } else {
            this.validateDateField( datesDiff , 'three_month' );
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
        this.formControl               = [
            new NamedControl( this.requestDate.id , new Control() )
        ];
        this.formControlGroupName      = 'exerciseDate';
        this.ampDateService            = new AmpDateService();
        this.ampDateService.dateFormat = this.dateFormat;
    }
}
/**
 * Created by xe4me on 7/04/2016.
 */

