import { FormBlock , NamedControl } from '../../formBlock';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone } from 'angular2/core';
import { ThemeIDDirective } from '../../../directives/themeId.directive';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../../components/my-md-input/my-md-input.component.ts';
import { ScrollService } from 'amp-ddc-ui-core/src/app/services/scroll/scroll.service';
import { AmpOverlayComponent } from '../../../components/amp-overlay/amp-overlay.component';
@Component (
    {
        selector   : 'partnership-manager-block' ,
        template   : `
    <div class='partnership-manager-block' [class.hidden]='!isCurrentBlockActive()'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>Who is your partnership manager?</h3>

        <div class="grid__item">
            <!--Partnership Manager name-->
            <label class='heading heading-contxtual-label mb3' >My partnership manager is </label>
    
            <!-- First name -->
            <my-md-input
                class='pr- 1/3'
                [isInSummaryState]='isInSummaryState'
                [id]='partnershipMgr.firstName.id'
                [label]='partnershipMgr.firstName.label'
                [parentControl]='formControl[0].control'
                isRequired='true'
                [valPattern]='partnershipMgr.firstName.regex'
                valMaxLength='100'>
            </my-md-input>
    
            <!-- Last name -->
            <my-md-input
                class='pl-- 1/3'
                [isInSummaryState]='isInSummaryState'
                [id]='partnershipMgr.lastName.id'
                [label]='partnershipMgr.lastName.label'
                [parentControl]='formControl[1].control'
                isRequired='true'
                [valPattern]='partnershipMgr.lastName.regex'
                valMaxLength='100'>
            </my-md-input>
        </div>
        <div *ngIf='hasClickedOnOkButton && !formModel.controls.partnership.valid' class='errors mt'>
            <div *ngIf='!formControl[0].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Firstname should no be empty
                </div>
            </div>
            <div *ngIf='!formControl[1].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Lastname should no be empty
                </div>
            </div>
        </div>

        <button *ngIf='!isInSummaryState' (click)='ok()' class='btn btn--secondary btn-ok'>
            OK
        </button>
            <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change'>
            Change
        </button>
        <div class='hr-block-divider'></div>
    </div>
  ` ,
        // encapsulation: ViewEncapsulation.Emulated
        inputs     : [ 'partnershipMgr' ] ,
        styles     : [ require ( './partnership-manager.component.scss' )
            .toString () ] ,
        directives : [ MdInputComponent , AmpOverlayComponent ]
    } )
export class PartnershipManagerBlockComponent extends FormBlock {
    static CLASS_NAME                      = 'PartnershipManagerBlockComponent';
    private partnershipMgr                 = {
        firstName : {
            id    : 'default_fn' ,
            label : 'First name' ,
            regex : ''
        } ,
        lastName  : {
            id    : 'default_ln' ,
            label : 'Last name' ,
            regex : ''
        }
    };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
            this.scrollService.scrollMeOut ( this.el );
            // SAM - Action present data to Model
            this.formModelService.present (
                {
                    action  : 'next' ,
                    blockId : this._id
                } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.partnershipMgr.firstName.id;
        this.formControl[ 1 ].name = this.partnershipMgr.lastName.id;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'contactDetails' ] ) {
            return this.formModel.controls[ 'contactDetails' ].valid && this.formModelService.getFlags ().introIsDone;
        }
    }

    constructor ( private formModelService : FormModelService ,
        private scrollService : ScrollService ,
        private el : ElementRef ) {
        super ();
        this.formControl = [
            new NamedControl ( this.partnershipMgr.firstName.id , new Control () ) ,
            new NamedControl ( this.partnershipMgr.lastName.id , new Control () )
        ];
        scrollService.$scrolled.subscribe (
            message => scrollService.amIVisible ( el , PartnershipManagerBlockComponent.CLASS_NAME ) );
        this.formControlGroupName = 'partnership';
    }
}
