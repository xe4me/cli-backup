import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef} from 'angular2/core';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component.ts';
import { ScrollService } from 'amp-ddc-ui-core/src/app/services/scroll/scroll.service';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AmpSwitchComponent } from '../../../../components/amp-switch/amp-switch.component';
@Component( {
                selector : 'equity-holder-block' ,
                template : `
                    <div class='equity-holder-block'>
                        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                        <h3 class='heading heading-intro'>Are there other equity holders in your practice?</h3>
                        <div class='grid__item'>
                            <amp-switch
                                required='true'
                                [yesId]='switch.yes.id'
                                [radioName]='switch.radioName'
                                [yesLabel]='switch.yes.label'
                                [parentControl]='formControl[0].control'
                                [noId]='switch.no.id'
                                [noLabel]='switch.no.label'
                                >
                            </amp-switch>
                        </div>
                       
                        <button *ngIf='!isInSummaryState' (click)='ok()' class='btn btn--secondary btn-ok btn-ok-margin-top'>
                            OK
                        </button>
                            <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
                            Change
                        </button>
                        <div class='hr-block-divider'></div>
                    </div>
                  ` , // encapsulation: ViewEncapsulation.Emulated
                inputs   : [ 'switch' ] , styles : [
        require( './equity-holder.component.scss' )
            .toString()
    ] , directives       : [ MdInputComponent , AmpOverlayComponent , AmpSwitchComponent ]
            } )
export class EquityHolderBlockComponent extends FormBlock {
    static CLASS_NAME                      = 'EquityHolderBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private switch                         = {
        yes       : {
            id    : 'yesId' ,
            label : 'YES' ,
            value : 'true'
        } ,
        no        : {
            id    : 'noId' ,
            label : 'NO' ,
            value : 'false'
        } ,
        radioName : 'equityHolders'
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
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.switch.radioName;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'partnership' ] ) {
            return this.formModel.controls[ 'partnership' ].valid && this.formModelService.getFlags().introIsDone;
        }
    }

    constructor ( private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl = [ new NamedControl( this.switch.yes.id , new Control() ) ];
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , EquityHolderBlockComponent.CLASS_NAME ) );
        this.formControlGroupName = 'equityHolders';
    }
}
