import { FormBlock , NamedControl , provideParent } from '../../../../formBlock';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone, ViewContainerRef } from '@angular/core';
import { Control } from '@angular/common';
import { MdInputComponent } from '../../../../../components/my-md-input/my-md-input.component.ts';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
import { TimerWrapper } from '@angular/core/src/facade/async';
@Component( {
    selector   : 'partnership-manager-block' ,
    template   : `
    <div id='partnership-manager-block' class='partnership-manager-block mt-60' [class.hidden]='!isCurrentBlockActive()'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>Who is your partnership manager?</h3>

        <div class='grid__item'>
            <!--Partnership Manager name-->
            <label class='heading heading-contxtual-label mb3' >My partnership manager is</label><!--
            -->&nbsp;<my-md-input
                class='1/3'
                (onEnter)='ok()'
                [isInSummaryState]='isInSummaryState'
                [id]='partnershipMgr.firstName.id'
                [label]='partnershipMgr.firstName.label'
                [parentControl]='formControl[0].control'
                isRequired='true'
                [valPattern]='partnershipMgr.firstName.regex'
                valMaxLength='50'>
            </my-md-input><!--
            --><my-md-input
                class='1/3'
                (onEnter)='ok()'
                [isInSummaryState]='isInSummaryState'
                [id]='partnershipMgr.lastName.id'
                [label]='partnershipMgr.lastName.label'
                [parentControl]='formControl[1].control'
                isRequired='true'
                [valPattern]='partnershipMgr.lastName.regex'
                valMaxLength='50'>
            </my-md-input>
        </div>
        <div *ngIf='(formControl[0].control.touched &&  !formControl[0].control.valid)
        ||(formControl[1].control.touched &&  !formControl[1].control.valid) ' class='errors mt mb-15'>
            <div class='error-item' *ngIf='formControl[0].control.touched && !formControl[0].control.valid'>
                <span class='icon icon--close icon-errors'></span>First name is a required field.
            </div>
            <div class='error-item' *ngIf='formControl[1].control.touched && !formControl[1].control.valid'>
                <span class='icon icon--close icon-errors'></span>Last name is a required field.
            </div>
        </div>

        <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]="!canGoNext"  class='btn
        btn-ok btn-ok-margin-top'>
            OK
        </amp-button>
        <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change btn-ok-margin-top'>
            Change
        </amp-button>
        <div class='hr-block-divider mt-80'></div>
    </div>
  ` , // encapsulation: ViewEncapsulation.Emulated
    inputs     : [ 'partnershipMgr' ] ,
    styles     : [ require( './partnership-manager.component.scss' ).toString() ] ,
    directives : [ MdInputComponent , AmpOverlayComponent , AmpButton ] ,
    providers  : [ provideParent( PartnershipManagerBlockComponent ) ]
} )
export class PartnershipManagerBlockComponent extends FormBlock implements FormBlock {
    static CLASS_NAME                      = 'PartnershipManagerBlockComponent';
    private partnershipMgr                 = {
        firstName    : {
            id : 'default_fn' , label : 'First name' , regex : ''
        } , lastName : {
            id : 'default_ln' , label : 'Last name' , regex : ''
        }
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef,
                  public _viewContainerRef: ViewContainerRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.partnershipMgr.firstName.id , new Control() ) ,
            new NamedControl( this.partnershipMgr.lastName.id , new Control() )
        ];
        this.formControlGroupName = 'partnershipManager';
    }

    public postBindControls () : void {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , PartnershipManagerBlockComponent.CLASS_NAME );
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
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
            this.scrollService.scrollToNextUndoneBlock( this.formModel );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'partnershipIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.partnershipMgr.firstName.id;
        this.formControl[ 1 ].name = this.partnershipMgr.lastName.id;
    }

    private isCurrentBlockActive () {
        return this.formModelService.getFlags( 'addressIsDone' );
    }
}
