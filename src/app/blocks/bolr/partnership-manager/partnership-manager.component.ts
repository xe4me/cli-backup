import {FormBlock, NamedControl} from '../../formBlock';
import {Component, ElementRef, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {ThemeIDDirective} from '../../../directives/themeId.directive';
import {FormModelService} from "amp-ddc-ui-core/ui-core";
import {Control} from 'angular2/common';
import {MdInputComponent} from '../../../components/my-md-input/my-md-input.component.ts';
import {ScrollService} from 'amp-ddc-ui-core/src/app/services/scroll/scroll.service';
import {AmpOverlayComponent} from '../../../components/amp-overlay/amp-overlay.component';

@Component({
    selector: 'partnership-manager-block',
    template: `
    <div class="partnership-manager-block" [class.hidden]='!isCurrentBlockActive()'>
        <amp-overlay [active]="!isCurrentBlockActive()"></amp-overlay>
        <h3 class="heading heading-intro">Who is your partnership manager?</h3>

        <!--Partnership Manager name-->
        <label class="heading heading-contxtual-label mb3" >My partnership manager is </label>

        <!-- First name -->
        <my-md-input
            [isInSummaryState]='isInSummaryState'
            [id]="partnershipMgr.firstName.id"
            [label]="partnershipMgr.firstName.label"
            [parentControl]="formControl[0].control"
            isRequired="true"
            [valPattern]="partnershipMgr.firstName.regex"
            valMaxLength="100">
        </my-md-input>

        <!-- Last name -->
        <my-md-input
            [isInSummaryState]='isInSummaryState'
            [id]="partnershipMgr.lastName.id"
            [label]="partnershipMgr.lastName.label"
            [parentControl]="formControl[1].control"
            isRequired="true"
            [valPattern]="partnershipMgr.lastName.regex"
            valMaxLength="100">
        </my-md-input>

        <div class="alert alert-danger">
          Message
        </div>
        <button class='btn btn--secondary btn-ok' (click)='ok()' data-automation-id="btn_partnership-manager-block">
            OK
        </button>
        <div class='hr-block-divider'></div>
    </div>
  `,
    // encapsulation: ViewEncapsulation.Emulated
    inputs: ['partnershipMgr'],
    styles: [require('./partnership-manager.component.scss').toString()],
    directives: [MdInputComponent, AmpOverlayComponent]
})
export class PartnershipManagerBlockComponent extends FormBlock {
    static CLASS_NAME = 'PartnershipManagerBlockComponent';
    private isInSummaryState = false;
    partnershipMgr = {
        firstName: {
            id: 'default_fn',
            label: 'First name',
            regex: ''
        },
        lastName: {
            id: 'default_ln',
            label: 'Last name',
            regex: ''
        }
    };

    constructor(public formModelService:FormModelService, private scrollService:ScrollService, private el:ElementRef) {
        super();

        this.formControl = [
            new NamedControl(this.partnershipMgr.firstName.id, new Control()),
            new NamedControl(this.partnershipMgr.lastName.id, new Control())
        ];
        scrollService.$scrolled.subscribe(message =>scrollService.amIVisible(el, PartnershipManagerBlockComponent.CLASS_NAME));
        this.formControlGroupName = 'partnership';
    }

    // SAM - State representation of Model
    private isCurrentBlockActive() {
        if (this.formModel && this.formModel.controls['contactDetails']) {
            return this.formModel.controls['contactDetails'].valid && this.formModelService.getFlags().introIsDone;
        }
    }

    // TODO: Move this to the parent FormBlock class, as this should be common to all FormBlock components
    public ok() {
        if (this.formModel.controls[this.formControlGroupName].valid) {
            this.isInSummaryState = true;
            this.scrollService.scrollMeOut(this.el);
            // SAM - Action present data to Model
            this.formModelService.present({
                action: 'next',
                blockId: this._id
            });
        }
    }

    public preBindControls(_formBlockDef) {
        this.formControl[0].name = this.partnershipMgr.firstName.id;
        this.formControl[1].name = this.partnershipMgr.lastName.id;
    }

}
