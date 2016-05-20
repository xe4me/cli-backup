import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { Control } from 'angular2/common';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpGroupButtonComponent } from '../../../../components/amp-group-button/amp-group-button.component';
import { AmpCollapseDirective } from '../../../../directives/animations/collapse/amp-collapse.directive';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { TimerWrapper } from 'angular2/src/facade/async';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../components/amp-button/amp-button.component';
@Component( {
    selector   : 'full-or-partial-block' ,
    template   : `
            <div id='full-or-partial-block' class='full-or-partial-block mt-60'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <h3 class='heading heading-intro'>Are you requesting a full or partial sale?</h3>
                <section [collapse]='isInSummaryState===true'>
                    <div  class='grid__item mb-30 mt-45'>
                        <amp-group-button
                            scrollOutOn='null'
                            class='grid__item 4/9'
                            (select)='onSwitchChanged($event)'
                            [buttons]='fullOrPartialButtons.buttons'
                            [parentControl]='formControl[0].control'
                            [groupName]='fullOrPartialButtons.fullOrPartial'
                            >
                        </amp-group-button>

                    </div>
                </section>
                <div [collapse]='isInSummaryState!==true' class='heading heading-contxtual-label mt-30 mb-10'>
                    <span class='summary-state'>{{ formControl[0].control.value }} sale</span>
                </div>
                <section class='mt-10'  [collapse]='formControl[0].control.value!=="Full"'>
                    <div class='grid__item mb-15 heading heading-contxtual-label'>
                        <span *ngFor='#item of formModelService.advisers ; #i = index'>
                            <span *ngIf='formModelService.advisers.length > 1 '>
                                <span *ngIf=' i < ( formModelService.advisers.length - 1 ) && i >0 '> , </span>
                                <span *ngIf=' i === ( formModelService.advisers.length - 1 ) '> and </span>
                            </span>
                            {{ item.adviserName }} ({{ item.adviserId }})
                        </span>
                        will have their clients transferred to AMP.
                    </div>
                </section>

                <section  [collapse]='formControl[0].control.value!=="Partial"'>
                    <div class='grid__item mb-15 heading heading-contxtual-label'>
                        My head of financial planning has approved my partial sale.
                    </div>
                </section>

                <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!canGoNext'
                class='btn btn--secondary
                btn-ok btn-ok-margin-top'>
                    OK
                </amp-button>
                <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
                Change
                </amp-button>
                <div class='hr-block-divider mt-80'></div>
            </div>
          ` , // encapsulation: ViewEncapsulation.Emulated
    styles     : [ require( './full-or-partial-block.component.scss' ).toString() ] ,
    directives : [ AmpOverlayComponent , AmpGroupButtonComponent , AmpCollapseDirective ] ,
    providers  : [ TemplateRef ]
} )
export class FullOrPartialBlockComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME                      = 'FullOrPartialBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
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

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.fullOrPartialButtons.groupName , new Control() ) ,
        ];
        this.formControlGroupName = 'fullOrPartial';
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , FullOrPartialBlockComponent.CLASS_NAME );
        } );
        return undefined;
    }

    ngOnInit () : any {
        this
            .formModelService
            .getAdvisers()
            .subscribe(
                data => {
                    this.formModelService.present(
                        { action : 'setAdvisers' , advisers : data }
                    );
                } ,
                error => {
                    this.formModelService.present(
                        { action : 'error' , errors : [ 'Failed to decode the context' ] }
                    );
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
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    private isCurrentBlockActive () {
        return this.formModelService.getFlags( 'equityHoldersIsDone' );
    }

    private onSwitchChanged ( value ) {
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
    }
}
