import { FormBlock , NamedControl } from '../../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpTextareaComponent } from '../../../../../components/amp-textarea/amp-textarea.component';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { Control } from 'angular2/src/common/forms/model';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector   : 'sale-reason-block' ,
    template   : `
            <div id='sale-reason-block' *ngIf='saleReasonIsVisible' class='sale-reason-block mt-60'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>                
                <h3 class='heading heading-intro mb-5'>What is the rationale for your sale?</h3>
                <section>
                    <amp-textarea
                        class='1/1'
                        [isInSummaryState]='isInSummaryState'
                        [id]='saleReason.id'
                        [label]='saleReason.label'
                        [isRequired]='isSaleReasonRequired'
                        [parentControl]='salesReasonControl'
                        [valMaxLength]='saleReason.maxLength'>
                    </amp-textarea>
                </section>
                <div class='errors mb-40' *ngIf='(hasClickedOnOkButton || salesReasonControl.touched) 
                &&!salesReasonControl.valid' >
                     <span class='icon icon--close icon-errors'></span>Please enter your reasons.
                </div>
               <amp-button [disabled]='!salesReasonControl.valid' class='btn btn-ok mt-10'
               *ngIf='!isInSummaryState' (click)='ok()'>
                    OK
                </amp-button>
                <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change'>
                    Change
                </amp-button>
                <div class='hr-block-divider mt-80'></div>
            </div>
          ` ,
    styles     : [ require( './sale-reason-block.component.scss' ).toString() ] ,
    directives : [
        AmpOverlayComponent ,
        AmpTextareaComponent ,
        AmpButton
    ] ,
    providers  : [ TemplateRef ]
} )
export class SaleReasonBlockComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME                      = 'SaleReasonBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private saleReasonIsVisible : boolean  = false;
    private isSaleReasonRequired : boolean = false;
    private saleReason                     = {
        id          : 'saleReason' ,
        label       : '' ,
        maxLength   : 500 ,
        controlName : 'saleReason'
    };

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.saleReason.controlName , new Control() )
        ];
        this.formControlGroupName = 'saleReason';
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , SaleReasonBlockComponent.CLASS_NAME );
        } );
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes === this.formControlGroupName ) {
                this.isInSummaryState = false;
            }
        } );
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes.hasOwnProperty( 'saleReasonIsVisible' ) ) {
                this.saleReasonIsVisible = changes[ 'saleReasonIsVisible' ];
                this.resetBlock();
                if ( changes[ 'saleReasonIsVisible' ] === true ) {
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
        if ( this.salesReasonControl.valid ) {
            this.isInSummaryState = true;
            TimerWrapper.setTimeout( () => {
                this.scrollService.scrollToNextUndoneBlock( this.formModel );
            } , 600 );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'saleReasonIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.saleReason.controlName;
    }

    private get salesReasonControl () {
        return this.formControl[ 0 ].control;
    }

    private isCurrentBlockActive () {
        return this.saleReasonIsVisible;
    }

    private markAsRequired () {
        this.isSaleReasonRequired = true;
    }

    private markAsNotRequired () {
        this.isSaleReasonRequired = false;
    }

    private undoneTheBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'saleReasonIsDone' ,
            flagValue : false
        } );
    };

    private resetSalesReasonControl () {
        this.salesReasonControl.updateValue( null );
        this.salesReasonControl._touched  = false;
        this.salesReasonControl._dirty    = false;
        this.salesReasonControl._pristine = true;
        this.salesReasonControl.updateValueAndValidity( { onlySelf : false , emitParent : true } );
    }

    private resetBlock () {
        this.undoneTheBlock();
        this.resetSalesReasonControl();
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
    }
}
