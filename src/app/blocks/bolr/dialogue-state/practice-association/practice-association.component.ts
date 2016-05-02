import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { FormModelService , ProgressObserverService , ScrollService , Licensees } from 'amp-ddc-ui-core/ui-core';
import { AmpRadioButtonGroupComponent } from '../../../../components/amp-radio-button-group/amp-radio-button-group.component';
import { AmpTextareaComponent } from '../../../../components/amp-textarea/amp-textarea.component';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { Control } from 'angular2/src/common/forms/model';
import { AmpCollapseDirective } from '../../../../directives/animations/collapse/amp-collapse.directive';
import { AmpSlideDirective } from '../../../../directives/animations/slide/amp-slide.directive';
import { AmpOverlayComponent } from "../../../../components/amp-overlay/amp-overlay.component";
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { Validators } from "angular2/src/common/forms/validators";
@Component( {
    selector   : 'practice-association' ,
    template   : `
            <div *ngIf='formModel.value.fullOrPartial.fullOrPartial==="Full"' class='practice-association'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>                
                <section class='mb-30'>
                    <h3 class='heading heading-intro mb-30'>How long has your practice been with {{ licensee }}?</h3>
                    <div class='heading heading-contxtual-label'>
                        At the time of my requested exercise date, my practice will have been with {{ licensee }} for 
                        <span *ngIf='isInSummaryState' class='summary-state'>{{ 
                        getAssociationPracticeLabel(formControl[0].control.value) }}
                        </span>
                    </div>
                     <amp-radio-button-group
                            *ngIf='!isInSummaryState'
                            required='true'
                            scrollOutUnless='null'
                            class='grid__item 1/1 mt-40'
                            (select)='onAssociationLengthSelect($event)'
                            [buttons]='getLicenseeOptions()'
                            [parentControl]='formControl[0].control'
                            [groupName]='associationLengthRadios.groupName'   
                            >
                        </amp-radio-button-group>
                </section>
                
                <div [class.mb-35]='formControl[1].control.value!=="later_than"' *ngIf='isInSummaryState' 
                class='heading heading-contxtual-label'>
                    <h3 class='heading heading-intro  mb-30'>And your requested exercise date?</h3>
                        <span class='summary-state'>{{ getExerciseLengthLabel(formControl[1].control.value) }}</span>
                </div>
                <div *ngIf='!onlyHasOneOption() && formControl[0].control.value!==null'>
                    <section *ngIf='!isInSummaryState' class='mb-30' >
                        <h3 class='heading heading-intro  mb-40'>And your requested exercise date?</h3>
                         <amp-radio-button-group
                                autoSelectOnOne='true'
                                required='true'
                                scrollOutOn='null'
                                class='grid__item 1/1'
                                (select)='onExerciseDateSelect($event)'
                                [buttons]='getExerciseDateOptions()'
                                [parentControl]='formControl[1].control'
                                [groupName]='exerciseDateRadios.groupName'   
                                >
                            </amp-radio-button-group>
                    </section>
                </div>
                
                <section  [collapse]='formControl[1].control.value!=="later_than"'>
                        <amp-textarea
                            (onEnter)='ok()'
                            class='1/1'
                            [isInSummaryState]='isInSummaryState'
                            [id]='exerciseDateRadios.textFieldName'
                            label='Exceptional circumstances'
                            [parentControl]='formControl[2].control'
                            valMaxLength='400'
                            >
                        </amp-textarea> 
                </section>
                
                
                <div *ngIf='hasClickedOnOkButton && !formModel.controls.practiceAssociation.valid' class='errors 
                mt'>
                    <div *ngIf='!formControl[0].control.valid'>
                        <div>
                            <span class='icon icon--close icon-errors'></span>Please answer this question.
                        </div>
                    </div>
                </div>
                <!--<pre>{{ formModel.controls['practiceAssociation'].value | json }}</pre>-->
               <button [class.mt-60]='formControl[1].control.value==="later_than"' class='btn btn-ok 
               btn--secondary mt-10' 
               *ngIf='!isInSummaryState' (click)='ok()' 
               [disabled]='!canGoNext'  >
                    OK
                </button>
                <button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change btn--secondary mt-10'>
                    Change
                </button>
                <div class='hr-block-divider'></div>
            </div>
          ` ,
    styles     : [ require( './practice-association.component.scss' ).toString() ] ,
    directives : [
        AmpOverlayComponent ,
        AmpRadioButtonGroupComponent ,
        AmpTextareaComponent ,
        AmpCollapseDirective ,
        AmpSlideDirective
    ] ,
    providers  : [ TemplateRef ]
} )
export class PracticeAssociationComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME                      = 'PracticeAssociationComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private associationLengthRadios        = {
        buttons   : {
            LIC_AMPFP    : [
                {
                    id    : 'at_least_fifteen' ,
                    value : 'at_least_fifteen' ,
                    label : 'At least 15 years'
                } ,
                {
                    id    : 'at_least_four_years_but_fewer_than_15_years' ,
                    value : 'at_least_four_years_but_fewer_than_15_years' ,
                    label : 'At least four years but fewer than 15 years.'
                } ,
                {
                    id    : 'fewer_than_four_years' ,
                    value : 'fewer_than_four_years' ,
                    label : 'Fewer than four years.'
                }
            ] ,
            LIC_HILLROSS : [
                {
                    id    : 'at_least_five_years' ,
                    value : 'at_least_five_years' ,
                    label : 'At least five years.'
                } ,
                {
                    id    : 'fewer_than_five_years' ,
                    value : 'fewer_than_five_years' ,
                    label : 'Fewer than five years (subject to exceptional circumstances)'
                }
            ] ,
            LIC_CHARTER  : [
                {
                    id    : 'at_least_five_years' ,
                    value : 'at_least_five_years' ,
                    label : 'At least five years.'
                } ,
                {
                    id    : 'fewer_than_five_years' ,
                    value : 'fewer_than_five_years' ,
                    label : 'Fewer than five years (subject to exceptional circumstances)'
                }
            ]
        }
        ,
        groupName : 'associationLength'
    };
    private exerciseDateRadios             = {
        buttons       : {
            LIC_AMPFP    : {
                at_least_fifteen                            : [
                    {
                        id    : 'six_months' ,
                        value : 'six_months' ,
                        label : 'At least six months from today’s date.'
                    } ,
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ] ,
                at_least_four_years_but_fewer_than_15_years : [
                    {
                        id    : 'twelve_months' ,
                        value : 'twelve_months' ,
                        label : 'At least 12 months from today’s date.'
                    } ,
                    {
                        id    : 'six_months' ,
                        value : 'six_months' ,
                        label : 'At least six months from today’s date and I am willing to receive a discounted' +
                        ' Buyer of last resort payment.'
                    } ,
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ] ,
                fewer_than_four_years                       : [
                    {
                        id    : 'ninety_months' ,
                        value : 'ninety_months' ,
                        label : 'At least 90 days from today’s date. Buyer of last resort will only apply to' +
                        ' policies originally acquired through a practice start-up offer (PSO).'
                    } ,
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ]
            } ,
            LIC_HILLROSS : {
                at_least_five_years   : [
                    {
                        id    : 'eighteen_month' ,
                        value : 'eighteen_month' ,
                        label : 'At least 18 months from today’s date.'
                    } ,
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ] ,
                fewer_than_five_years : [
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ]
            } ,
            LIC_CHARTER  : {
                at_least_five_years   : [
                    {
                        id    : 'six_month' ,
                        value : 'six_month' ,
                        label : 'At least six months from today’s date.'
                    } ,
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ] ,
                fewer_than_five_years : [
                    {
                        id    : 'later_than' ,
                        value : 'later_than' ,
                        label : 'Subject to exceptional circumstances.'
                    }
                ]
            }
        } ,
        groupName     : 'exerciseDate' ,
        textFieldName : 'exceptionalCircumstances'
    };

    private preselectedAssociationValues () {
        return [ 'fewer_than_five_years' ];
    }

    private isInArray ( value , array ) {
        return array.indexOf( value.trim() ) > - 1;
    }

    private onlyHasOneOption () {
        if ( this.formControl[ 0 ].control.value && this.formControl[ 0 ].control.value !== '' ) {
            return this.isInArray( this.formControl[ 0 ].control.value , this.preselectedAssociationValues() );
        }
        return false;
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , PracticeAssociationComponent.CLASS_NAME );
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
            this.isInSummaryState = true;
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
        this.formControl[ 0 ].name = this.associationLengthRadios.groupName;
        this.formControl[ 1 ].name = this.exerciseDateRadios.groupName;
        this.formControl[ 2 ].name = this.exerciseDateRadios.textFieldName;
    }

    private getLicenseeOptions () {
        if ( this.associationLengthRadios.buttons.hasOwnProperty( this.formModelService.context.licensee ) ) {
            return this.associationLengthRadios.buttons[ this.formModelService.context.licensee ];
        }
        return [];
    }

    private getExerciseLengthLabel ( value ) {
        let options = this.getExerciseDateOptions();
        for ( let i = 0 ; i < options.length ; i ++ ) {
            let item = options[ i ];
            if ( item.value === value ) {
                return item.label;
            }
        }
        return '';
    }

    private getAssociationPracticeLabel ( value ) {
        let options = this.getLicenseeOptions();
        for ( let i = 0 ; i < options.length ; i ++ ) {
            let item = options[ i ];
            if ( item.value === value ) {
                return item.label.toLowerCase();
            }
        }
        return '';
    }

    private getExerciseDateOptions () {
        if ( this.exerciseDateRadios.buttons.hasOwnProperty( this.formModelService.context.licensee ) ) {
            if ( this.exerciseDateRadios.buttons[ this.formModelService.context.licensee ].hasOwnProperty( this.formControl[ 0 ].control.value ) ) {
                return this.exerciseDateRadios.buttons[ this.formModelService.context.licensee ][ this.formControl[ 0 ].control.value ];
            }
        }
        return [];
    }

    private get licensee () {
        return Licensees.getLicensee( this.formModelService.context.licensee );
    }

    private onAssociationLengthSelect ( value ) {
        this.formControl[ 1 ].control.updateValue( null );
        this.formControl[ 2 ].control.updateValue( null );
        this.formControl[ 2 ].control.setErrors( null );
        if ( value === 'fewer_than_five_years' ) {
            this.formControl[ 1 ].control.updateValue( 'later_than' );
            this.formControl[ 2 ].control.setErrors( 'required' );
            this.formControl[ 2 ].control.validator = Validators.required;
        }
    }

    private onExerciseDateSelect ( value ) {
        if ( value === 'later_than' ) {
            this.formControl[ 2 ].control.setErrors( 'required' );
            this.formControl[ 2 ].control.validator = Validators.required;
        } else {
            this.formControl[ 2 ].control.setErrors( null );
        }
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'fullOrPartial' ] ) {
            return this.formModel.controls[ 'fullOrPartial' ].valid && this.formModelService.getFlags().fullOrPartialIsDone;
        }
        return false;
    }

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.associationLengthRadios.groupName , new Control( null , Validators.required ) ) ,
            new NamedControl( this.exerciseDateRadios.groupName , new Control( null , Validators.required ) ) ,
            new NamedControl( this.exerciseDateRadios.textFieldName , new Control( null , Validators.required ) )
        ];
        this.formControlGroupName = 'practiceAssociation';
    }
}

