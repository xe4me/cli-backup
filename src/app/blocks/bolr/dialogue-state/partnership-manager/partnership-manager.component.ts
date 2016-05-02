import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone } from 'angular2/core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component.ts';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector       : 'partnership-manager-block' , template : `
    <div class='partnership-manager-block' [class.hidden]='!isCurrentBlockActive()'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>Who is your partnership manager?</h3>

        <div class='grid__item'>
            <!--Partnership Manager name-->
            <label class='heading heading-contxtual-label mb3' >My partnership manager is</label>&nbsp;<my-md-input
                class='1/3'
                (onEnter)='ok()'
                [isInSummaryState]='isInSummaryState'
                [id]='partnershipMgr.firstName.id'
                [label]='partnershipMgr.firstName.label'
                [parentControl]='formControl[0].control'
                isRequired='true'
                [valPattern]='partnershipMgr.firstName.regex'
                valMaxLength='100'>
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
                valMaxLength='100'>
            </my-md-input>
        </div>
        <div *ngIf='hasClickedOnOkButton && !formModel.controls.partnership.valid' class='errors mt mb-20'>
            <span class='icon icon--close icon-errors'></span>Please answer this question
        </div>

        <button *ngIf='!isInSummaryState' (click)='ok()' [disabled]="!canGoNext"  class='btn btn--secondary 
        btn-ok btn-ok-margin-top'>
            OK
        </button>
        <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
            Change
        </button>
        <div class='hr-block-divider'></div>
    </div>
  ` , // encapsulation: ViewEncapsulation.Emulated
    inputs         : [ 'partnershipMgr' ] , styles : [
        require( './partnership-manager.component.scss' )
            .toString()
    ] , directives : [ MdInputComponent , AmpOverlayComponent ]
} )
export class PartnershipManagerBlockComponent extends FormBlock implements AfterViewInit {
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

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , PartnershipManagerBlockComponent.CLASS_NAME );
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
            this.scrollService.scrollMeOut( this.el );
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
        if ( this.formModel && this.formModel.controls[ 'contactDetails' ] ) {
            return this.formModel.controls[ 'contactDetails' ].valid && this.formModelService.getFlags().contactDetailsIsDone;
        }
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [
            new NamedControl( this.partnershipMgr.firstName.id , new Control() ) ,
            new NamedControl( this.partnershipMgr.lastName.id , new Control() )
        ];
        this.formControlGroupName = 'partnership';
    }
}
