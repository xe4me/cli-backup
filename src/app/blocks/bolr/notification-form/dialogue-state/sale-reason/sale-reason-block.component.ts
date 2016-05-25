import { FormBlock } from '../../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpTextareaComponent } from '../../../../../components/amp-textarea/amp-textarea.component';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { Control } from 'angular2/src/common/forms/model';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { Validators } from 'angular2/src/common/forms/validators';
import { ControlGroup } from 'angular2/src/common/forms/model';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector   : 'sale-reason-block' ,
    template   : `
            <div id='sale-reason-block' *ngIf='componentIsVisible' class='sale-reason-block mt-60'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>                
                <h3 class='heading heading-intro mb-5'>What is the rationale for your sale?</h3>
                <section>
                    <amp-textarea
                        class='1/1'
                        [isInSummaryState]='isInSummaryState'
                        [id]='saleReason.id'
                        [label]='saleReason.label'
                        [parentControl]='getSaleReasonControl()'
                        [valMaxLength]='saleReason.maxLength'>
                    </amp-textarea>
                </section>
                <div class='errors mb-40' *ngIf='(hasClickedOnOkButton || getSaleReasonControl().touched) 
                &&!getSaleReasonControl().valid' >
                     <span class='icon icon--close icon-errors'></span>Please enter your reasons.
                </div>
               <amp-button [disabled]='!getSaleReasonControl().valid' class='btn btn-ok mt-10'
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
    private componentIsVisible : boolean   = false;
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
        this.formControl          = [];
        this.formControlGroupName = 'saleReason';
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes.hasOwnProperty( 'saleReasonIsVisible' ) ) {
                this.componentIsVisible = changes[ 'saleReasonIsVisible' ];
                if ( changes[ 'saleReasonIsVisible' ] === true ) {
                    this.createControls();
                } else {
                    this.removeControls();
                }
            }
            if ( changes.hasOwnProperty( 'fullOrPartialIsDone' ) && (changes[ 'fullOrPartialIsDone' ] === false ) ) {
                this.resetBlock();
            }
        } );
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
    }

    private undoneTheBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'saleReasonIsDone' ,
            flagValue : false
        } );
    };

    private createControls () {
        if ( ! this.formModel.contains( this.formControlGroupName ) ) {
            let controlGroup = new ControlGroup( {} );
            controlGroup.addControl( this.saleReason.controlName , new Control( null , Validators.required ) );
            this.formModel.addControl( this.formControlGroupName , controlGroup );
        }
    }

    private getControl ( controlName ) : Control {
        return <Control>this.controlGroup.controls[ controlName ];
    }

    private get controlGroup () : ControlGroup {
        return < ControlGroup >this.formModel.controls[ this.formControlGroupName ];
    }

    private removeControls () {
        if ( this.formModel.contains( this.formControlGroupName ) ) {
            this.formModel.removeControl( this.formControlGroupName );
        }
    }

    private getSaleReasonControl () {
        return this.getControl( this.saleReason.controlName );
    }

    private isCurrentBlockActive () {
        return this.formModelService.getFlags( 'fullOrPartialIsDone' );
    }

    private resetBlock () {
        this.removeControls();
        this.createControls();
        this.undoneTheBlock();
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
    }
}
