import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { FormModelService , ProgressObserverService , ScrollService , Licensees } from 'amp-ddc-ui-core/ui-core';
import { AmpRadioButtonComponent } from '../../../../components/amp-radio-button/amp-radio-button.component';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
@Component( {
    selector   : 'practice-association' ,
    template   : `
            <div class='practice-association'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <h3 class='heading heading-intro mb-40'>How long has your practice been with {{ licensee }}?</h3>
                <div class="grid__item mb-40 heading heading-contxtual-label">
                    At the time of my requested exercise date, my practice will have been with {{ licensee }} for
                </div>
                <section>
                    <amp-radio-button>
                    
                    </amp-radio-button>
                </section>
               <button class='btn btn-ok btn--secondary' *ngIf='!isInSummaryState' (click)='ok()' 
               [disabled]="!canGoNext"  >
                    OK
                </button>
                <button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change btn--secondary'>
                    Change
                </button>
                <div class='hr-block-divider'></div>
            </div>
          ` ,
    styles     : [ require( './practice-association.component.scss' ).toString() ] ,
    directives : [ AmpRadioButtonComponent ] ,
    providers  : [ TemplateRef ]
} )
export class PracticeAssociationComponent extends FormBlock {
    static CLASS_NAME                      = 'PracticeAssociationComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;

    private get licensee () {
        return Licensees.getLicensee( this.formModelService.context.licensee );
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
        }
    }

    public preBindControls ( _formBlockDef ) {
        //this.formControl[ 0 ].name = this.fullOrPartialButtons.fullOrPartial;
    }

    private get canGoNext () {
        //return this.formModel.controls[ this.formControlGroupName ].valid;
        return false;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'fullOrPartial' ] ) {
            return this.formModel.controls[ 'fullOrPartial' ].valid && this.formModelService.getFlags().introIsDone;
        }
        return false;
    }

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl = [];
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , PracticeAssociationComponent.CLASS_NAME ) );
        this.formControlGroupName = 'practiceAssociation';
    }
}
