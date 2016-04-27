import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component.ts';
import { FormModelService , ProgressObserver , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AmpSwitchComponent } from '../../../../components/amp-switch/amp-switch.component';
import { ControlArray , ControlGroup } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from 'angular2/src/common/forms/directives';
import { Validators } from 'angular2/src/common/forms/validators';
import { AmpGroupButtonComponent } from '../../../../components/amp-group-button/amp-group-button.component';
import { AmpCollapseDirective } from '../../../../directives/animations/collapse/amp-collapse.directive';
import { AmpSlideDirective } from '../../../../directives/animations/slide/amp-slide.directive';
import { TemplateRef } from "angular2/src/core/linker/template_ref";
@Component( {
    selector   : 'full-or-partial-block' ,
    template   : `
            <div class='full-or-partial-block'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <h3 class='heading heading-intro'>Are you requesting a full or partial sale?</h3>
                <section>
                    <div  class='grid__item mb-60 mt-60'>
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
                <section  [collapse]='formControl[0].control.value!=="full"'>
                    <div class="grid__item mb-20 heading heading-contxtual-label">
                        Please be aware that 
                         
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
                <button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!canGoNext'  
                class='btn btn--secondary 
                btn-ok btn-ok-margin-top'>
                    OK
                </button>
                    <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
                    Change
                </button>
                <div class='hr-block-divider'></div>
            </div>
          ` , // encapsulation: ViewEncapsulation.Emulated
    styles     : [ require( './FullOrPartial.component.scss' ).toString() ] ,
    directives : [ AmpGroupButtonComponent , AmpCollapseDirective ] ,
    providers  : [ TemplateRef ]
} )
export class FullOrPartialComponent extends FormBlock {
    static CLASS_NAME                      = 'FullOrPartialComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private fullOrPartialButtons           = {
        buttons       : [
            {
                id    : 'fullId' ,
                value : 'full' ,
                label : 'Full sale'
            } ,
            {
                id    : 'partialId' ,
                value : 'partial' ,
                label : 'Partial sale'
            }
        ] ,
        fullOrPartial : 'fullOrPartial'
    };

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
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.fullOrPartialButtons.fullOrPartial;
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'equityHolders' ] ) {
            return this.formModel.controls[ 'equityHolders' ].valid && this.formModelService.getFlags().introIsDone;
        }
        return false;
    }

    private onSwitchChanged ( value ) {
        if ( value === 'full' ) {
        }
    }

    constructor ( private progressObserver : ProgressObserver ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl = [
            new NamedControl( this.fullOrPartialButtons.fullOrPartial , new Control() ) ,
        ];
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , FullOrPartialComponent.CLASS_NAME ) );
        this.formControlGroupName = 'fullOrPartial';
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
}
