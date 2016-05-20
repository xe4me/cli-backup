import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component.ts';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract
} from 'amp-ddc-ui-core/ui-core';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../components/amp-button/amp-button.component';
import { ControlArray , ControlGroup } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from 'angular2/src/common/forms/directives';
import { Validators } from 'angular2/src/common/forms/validators';
import { AmpGroupButtonComponent } from '../../../../components/amp-group-button/amp-group-button.component';
import { AmpCollapseDirective } from '../../../../directives/animations/collapse/amp-collapse.directive';
import { AmpSlideDirective } from '../../../../directives/animations/slide/amp-slide.directive';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector   : 'equity-holder-block' ,
    template   : `
            <div id='equity-holder-block'   class='equity-holder-block mt-60'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <h3 [ngClass]='{"mb-20":isInSummaryState}' class='heading heading-intro'>Does the practice have additional equity
                holders?</h3>
                <div *ngIf='isInSummaryState' class='heading heading-contxtual-label mt-30 mb-20'>
                    <span class='summary-state'>{{ formControl[0].control.value }}</span>
                </div>
                <div [collapse]='isInSummaryState' class='heading heading-micro-intro mt-35'>
                    For a practice to access the {{ licenseeBuybackFacility }} facility, all equity holders in that practice must exercise {{ licenseeBuybackFacility }}.
                </div>

                <section [collapse]='isInSummaryState'>

                    <div  class='grid__item mb-25 mt-50'>
                        <amp-group-button
                            scrollOutOn='Yes'
                            class='grid__item 4/9'
                            (select)='onSwitchChanged($event)'
                            [buttons]='hasHoldersButtons.buttons'
                            [parentControl]='formControl[0].control'
                            [groupName]='hasHoldersButtons.groupName'
                            >
                        </amp-group-button>

                    </div>
                </section>

                <section [collapse]='formControl[0].control.value!=="Yes" || isInSummaryState'>
                    <h3 class='heading heading-intro mt-15'>How many?</h3>
                    <div class='grid__item mb-15 mt-45'>
                        <amp-group-button
                            scrollOutUnless='null'
                            (select)='onHoldersCountGroupButtonSelect($event)'
                            [buttons]='holdersCountButtons.buttons'
                            [parentControl]='formControl[1].control'
                            [groupName]='holdersCountButtons.groupName'
                            >
                        </amp-group-button>
                    </div>
                </section>
                <section class='mb-15' [collapse]='!isInSummaryState || formControl[0].control.value==="No"'>
                    <h3 class='heading heading-intro mt-10 mb-30'>How many?</h3>
                    <div>
                        <span class='summary-state'>{{ dynamicControlGroup.controls.length }}</span>
                    </div>
                </section>


                <section  [collapse]='formControl[0].control.value !== "Yes" ||
                formControl[1].control.value < 1'>
                    <h3 *ngIf='dynamicControlGroup.controls.length>1'
                    class='heading heading-intro mt-15 mb-15'>What are their names?</h3>
                    <h3 *ngIf='dynamicControlGroup.controls.length===1'
                    class='heading heading-intro mt-15 mb-15'>What is their name?</h3>
                    <div class='grid__item 1/1'>
                        <div class='grid__item' *ngFor='#item of dynamicControlGroup.controls ; #i = index'><!--
                            --><label *ngIf=' i === 0 && dynamicControlGroup.controls.length>1' class='1/6 heading
                                    heading-contxtual-label'>Their names are&nbsp;</label><!--
                            --><label *ngIf=' i === 0 && dynamicControlGroup.controls.length===1' class='1/6 heading
                                    heading-contxtual-label'>Their name is&nbsp;</label><!--
                            --><my-md-input
                                (onEnter)='ok()'
                                [isInSummaryState]='isInSummaryState'
                                id='firstname_{{ i }}'
                                isRequired='true'
                                valMaxLength='50'
                                class='1/3 '
                                label='First name'
                                [parentControl]='item.controls.firstName'>
                                </my-md-input><!--
                             --><my-md-input
                                    (onEnter)='ok()'
                                    [isInSummaryState]='isInSummaryState'
                                    id='lastname_{{ i }}'
                                    isRequired='true'
                                    valMaxLength='50'
                                    class='1/3'
                                    label='Last name'
                                    [parentControl]='item.controls.lastName' >
                                </my-md-input><!--
                            --><span class='1/6 heading heading-contxtual-label' *ngIf='
                                    dynamicControlGroup.controls.length > 2 '>
                                    <span *ngIf=' i < ( dynamicControlGroup.controls.length - 2 ) '>,</span>
                                </span><!--
                                --><span class='1/6 heading heading-contxtual-label' *ngIf='
                                    dynamicControlGroup.controls.length > 1 '> 
                                    <span *ngIf=' i === ( dynamicControlGroup.controls.length - 2 ) '>and</span>
                                </span><!--
                            --><span  *ngIf=' i === ( dynamicControlGroup.controls.length - 1 ) ' class='1/6 heading 
                            heading-contxtual-label input-dot'>.</span><!--
                        --></div>

                    </div>
                </section>

                <section>
                    <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!canGoNext'
                        class='btn btn-ok btn-ok-margin-top'>
                        OK
                    </amp-button>
                        <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change btn-ok-margin-top'>
                        Change
                    </amp-button>
                </section>
                <div class='hr-block-divider mt-80'></div>
            </div>
          ` , // encapsulation: ViewEncapsulation.Emulated
    styles     : [ require( './equity-holder-block.component.scss' ).toString() ] ,
    directives : [
        MdInputComponent ,
        AmpOverlayComponent ,
        FORM_DIRECTIVES ,
        AmpGroupButtonComponent ,
        AmpCollapseDirective ,
        AmpSlideDirective ,
        AmpButton
    ] ,
    providers  : [ TemplateRef ]
} )
export class EquityHolderBlockComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME                      = 'EquityHolderBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private dynamicControlGroup : ControlArray;
    private hasHoldersButtons              = {
        buttons   : [
            {
                id    : 'yesId' ,
                value : 'Yes' ,
                label : 'Yes'
            } ,
            {
                id    : 'noId' ,
                value : 'No' ,
                label : 'No'
            }
        ] ,
        groupName : 'hasHolders'
    };
    private holdersCountButtons            = {
        buttons   : [
            {
                id    : '1' ,
                value : '1' ,
                label : '1'
            } , {
                id    : '2' ,
                value : '2' ,
                label : '2'
            } , {
                id    : '3' ,
                value : '3' ,
                label : '3'
            } , {
                id    : '4' ,
                value : '4' ,
                label : '4'
            } , {
                id    : '5' ,
                value : '5' ,
                label : '5'
            } ,
        ] ,
        groupName : 'holdersCount'
    };

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.dynamicControlGroup  = new ControlArray( [] );
        this.formControl          = [
            new NamedControl( this.hasHoldersButtons.groupName , new Control() ) ,
            new NamedControl( this.holdersCountButtons.groupName , new Control( null , Validators.required ) ) ,
            new NamedControl( 'holders' , this.dynamicControlGroup )
        ];
        this.formControlGroupName = 'equityHolder';
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , EquityHolderBlockComponent.CLASS_NAME );
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
            TimerWrapper.setTimeout( () => {
                this.scrollService.scrollToNextUndoneBlock( this.formModel );
            } , 700 );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'equityHoldersIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.hasHoldersButtons.groupName;
        this.formControl[ 1 ].name = this.holdersCountButtons.groupName;
        this.formControl[ 2 ].name = 'holders';
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }

    private onHoldersCountGroupButtonSelect ( value ) {
        const current = this.dynamicControlGroup.length;
        if ( value > current ) {
            value = value - current;
            this.addInput( value );
        } else if ( value < current ) {
            this.refreshInput( value );
        }
    }

    private onSwitchChanged ( value ) {
        if ( value === 'No' ) {
            this.clearHoldersControlArray();
            this.formControl[ 1 ].control.updateValue( '0' );
        } else {
            if ( this.dynamicControlGroup.length === 0 ) {
                this.formControl[ 1 ].control.updateValue( '' );
            }
        }
    }

    private clearHoldersControlArray () {
        while ( this.dynamicControlGroup.length ) {
            this.dynamicControlGroup.removeAt( 0 );
        }
    }

    private addInput ( count ) {
        for ( let i = 0 ; i < count ; i ++ ) {
            const item = new ControlGroup( {
                firstName : new Control( '' , Validators.required ) ,
                lastName  : new Control( '' , Validators.required ) ,
            } );
            this.dynamicControlGroup.push( item );
        }
    }

    private refreshInput ( count ) {
        this.clearHoldersControlArray();
        this.addInput( count );
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    private isCurrentBlockActive () {
        return this.formModelService.getFlags( 'partnershipIsDone' );
    }
}
