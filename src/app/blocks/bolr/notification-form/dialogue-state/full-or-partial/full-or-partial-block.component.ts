import { FormBlock , NamedControl, provideParent } from '../../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { Control } from 'angular2/common';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpGroupButtonComponent } from '../../../../../components/amp-group-button/amp-group-button.component';
import { AmpCollapseDirective } from '../../../../../directives/animations/collapse/amp-collapse.directive';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { TimerWrapper } from 'angular2/src/facade/async';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
import { AmpTextareaComponent } from '../../../../../components/amp-textarea/amp-textarea.component';
@Component( {
    selector   : 'full-or-partial-block' ,
    template   : `
            <div id='full-or-partial-block' class='full-or-partial-block mt-60'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <h3 class='heading heading-intro'>Are you requesting a full or partial sale?</h3>
                <section [collapse]='isInSummaryState'>
                    <div  class='grid__item mb-30 mt-45'>
                        <amp-group-button
                            scrollOutOn='null'
                            class='grid__item 4/9'
                            [required]='isFullOrPartialControlRequired'
                            (select)='onSwitchChanged($event)'
                            [buttons]='fullOrPartialButtons.buttons'
                            [parentControl]='fullOrPartialControl'
                            [groupName]='fullOrPartialButtons.groupName'
                            >
                        </amp-group-button>
                    </div>
                </section>
                <div [collapse]='!isInSummaryState' class='heading heading-contxtual-label mt-30 mb-10'>
                    <span class='summary-state'>{{ fullOrPartialControl.value }} sale</span>
                </div>
                <section class='mt-10'  [collapse]='!isFullSelected'>
                    <div class='grid__item mb-15 heading heading-contxtual-label'>
                        <span *ngFor='#item of advisers ; #i = index'><!--
                         --><span *ngIf='advisers.length > 1 '><!--
                           --><span *ngIf=' i < ( advisers.length - 1 ) && i >0 '>, </span>
                                <span *ngIf=' i === ( advisers.length - 1 ) '> and </span>
                             </span>
                            {{ item.firstName }} {{ item.lastName }} ({{ item.ownernum }})<!--
                        --></span>
                        will be impacted by this decision.
                    </div>

                    <div class='grid__item mb-15 mt-15 heading heading-intro'>
                        Please specify if there are any advisers in your practice that should be added or removed from the above list.
                    </div>
                    <amp-textarea
                        *ngIf='!collapseImpactedAdvisersControl'
                        class='1/1'
                        [isInSummaryState]='isInSummaryState'
                        [id]='impactedAdvisersDetails.id'
                        [parentControl]='impactedAdvisersControl'
                        [isRequired]='isImpactedAdvisersRequired'
                        [valMaxLength]='impactedAdvisersDetails.maxLength'>
                    </amp-textarea>
                </section>
                <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]="!canGoNext"  class='btn btn-ok
                btn-ok-margin-top'>
                    OK
                </amp-button>
                <amp-button *ngIf='isInSummaryState'
                (click)='change()' class='btn btn-change btn-ok-margin-top'>
                    Change
                </amp-button>
                <div class='hr-block-divider mt-80'></div>
            </div>
          ` , // encapsulation: ViewEncapsulation.Emulated
    styles     : [ require( './full-or-partial-block.component.scss' ).toString() ] ,
    directives : [
        AmpButton ,
        AmpOverlayComponent ,
        AmpGroupButtonComponent ,
        AmpCollapseDirective ,
        AmpTextareaComponent
    ],
    providers     : [ provideParent( FullOrPartialBlockComponent ) ]
} )
export class FullOrPartialBlockComponent extends FormBlock implements AfterViewInit, FormBlock {
    static CLASS_NAME                      = 'FullOrPartialBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private isFullOrPartialControlRequired = true;
    private fullOrPartialButtons           = {
        buttons   : [
            {
                id    : 'fullId' ,
                value : 'Full' ,
                label : 'Full sale'
            } ,
            {
                id    : 'partialId' ,
                value : 'Partial' ,
                label : 'Partial sale'
            }
        ] ,
        groupName : 'fullOrPartial'
    };
    private impactedAdvisersDetails        = {
        id        : 'impactedAdvisersDetails' ,
        maxLength : 500
    };
    private isImpactedAdvisersRequired     = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.fullOrPartialButtons.groupName , new Control() ) ,
            new NamedControl( this.impactedAdvisersDetails.id , new Control() ) ,
        ];
        this.formControlGroupName = 'fullOrPartial';
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , FullOrPartialBlockComponent.CLASS_NAME );
        } );
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes === this.formControlGroupName ) {
                this.isInSummaryState = false;
            }
        } );
        return undefined;
    }

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'fullOrPartialIsDone' ,
            flagValue : false
        } );
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
            TimerWrapper.setTimeout( () => {
                this.scrollService.scrollToNextUndoneBlock( this.formModel );
            } , 600 );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'fullOrPartialIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.fullOrPartialButtons.groupName;
        this.formControl[ 1 ].name = this.impactedAdvisersDetails.id;
    }

    private get collapseImpactedAdvisersControl () {
        return this.hasClickedOnOkButton && ! this.impactedAdvisersControl.value;
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    private get isFullSelected () {
        return this.fullOrPartialControl.value === this.fullOrPartialButtons.buttons[ 0 ].value;
    }

    private get advisers () {
        return this.formModelService.advisers;
    }

    private get isPartialSelected () {
        return this.fullOrPartialControl.value === this.fullOrPartialButtons.buttons[ 1 ].value;
    }

    private isCurrentBlockActive () {
        return this.formModelService.getFlags( 'equityHoldersIsDone' );
    }

    private get fullOrPartialControl () {
        return this.formControl[ 0 ].control;
    }

    private get impactedAdvisersControl () {
        return this.formControl[ 1 ].control;
    }

    private onSwitchChanged ( value ) {
        this.hasClickedOnOkButton = false;
        if ( value === 'Partial' ) {
            this.impactedAdvisersControl.updateValue( null );
        }
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'practiceAssociationIsVisible' ,
            flagValue : value === 'Full'
        } );
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'saleReasonIsVisible' ,
            flagValue : value === 'Partial'
        } );
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'fullOrPartialIsDone' ,
            flagValue : false
        } );
    }
}
