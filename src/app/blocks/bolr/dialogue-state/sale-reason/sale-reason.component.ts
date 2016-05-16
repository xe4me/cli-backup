import { FormBlock } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { FormModelService , ProgressObserverService , ScrollService , Licensees } from 'amp-ddc-ui-core/ui-core';
import { AmpTextareaComponent } from '../../../../components/amp-textarea/amp-textarea.component';
import { TemplateRef } from 'angular2/src/core/linker/template_ref';
import { Control } from 'angular2/src/common/forms/model';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { Validators } from 'angular2/src/common/forms/validators';
import { ControlGroup } from 'angular2/src/common/forms/model';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector   : 'sale-reason-block' ,
    template   : `
            <div *ngIf='componentIsVisible' class='sale-reason'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>                
                <h3 class='heading heading-intro mb-5'>What are the reasons for your sale?</h3>
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
                <div *ngIf='(hasClickedOnOkButton || getSaleReasonControl().touched) &&!getSaleReasonControl().valid' class='errors mb-40'>
                     <span class='icon icon--close icon-errors'></span>Please enter your reasons.
                </div>
                
               <button [disabled]='!getSaleReasonControl().valid' class='btn btn-ok btn--secondary mt-10' 
               *ngIf='!isInSummaryState' (click)='ok()'>
                    OK
                </button>
                <button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change btn--secondary mt-10 '>
                    Change
                </button>
                <div class='hr-block-divider'></div>
            </div>
          ` ,
    styles     : [ require( './sale-reason.component.scss' ).toString() ] ,
    directives : [
        AmpOverlayComponent ,
        AmpTextareaComponent
    ] ,
    providers  : [ TemplateRef ]
} )
export class SaleReasonComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME                      = 'SaleReasonComponent';
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
            this.scrollService.amIVisible( this.el , SaleReasonComponent.CLASS_NAME );
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
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
            this.scrollService.scrollMeOut( this.el );
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

