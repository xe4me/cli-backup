import {FormBlock} from '../../formBlock';
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {ThemeIDDirective} from '../../../directives/themeId.directive';
import {FormModelService} from '../../../../../node_modules/amp-ddc-ui-core/src/app/services/formModel.service';
@Component({
    selector: 'bolr-intro-block',
    template: `
    <div class='ng-animate bolr-intro' [class.hidden]='!isCurrentBlockActive()'>
      <div class='bolr-intro-logo mb4' ampLicenseeThemeID></div>
      <div class='bolr-intro-main'>
        <div class='bolr-intro-main__title practice-title mb3'>
            <span class='mr'>{{formModelService.getModel().context.practiceName}}</span>
            <span class='mr'>Payee ID: {{formModelService.getModel().context.payeeId}}</span>
            <span>Practice principal: {{formModelService.getModel().context.practicePrincipal_firstName + ' ' + formModelService.getModel().context.practicePrincipal_lastName }}</span>
        </div>
        <p class='bolr-intro-main__body mb3'>
          Hi {{formModelService.getModel().context.practicePrincipal_firstName}},<br/>
          You're about to request to exercise your buyer of last resort facility.
        </p>
        <p class='bolr-intro-main__notes mb3'>We just need a few details from you to complete this request, it will only take 3 minutes, let's get started.</p>
        <button class='btn btn--secondary btn--kilo' (click)='ok()' data-automation-id="btn_bolr-intro-block">
            OK
        </button>
      </div>
    </div>
  `,
    // encapsulation: ViewEncapsulation.Emulated
    inputs: ['id', 'label'],
    styles: [require('./IntroBlock.component.scss').toString()],
    directives: [ThemeIDDirective],
})
export class IntroBlockComponent extends FormBlock {
    static CLASS_NAME = 'IntroBlockComponent';

    id:string = 'DefaultContentId';
    label:string = 'Default content label';

    constructor(public formModelService:FormModelService) {
        super();
    }

    // SAM - State representation of Model
    public isCurrentBlockActive() {
        if (this._id) {
            return this.formModelService.getModel().currentBlockID.index === this._id.index ||
                this.formModelService.getModel().currentBlockID.index < this._id.index;
        }
        return true;
    }

    // TODO: Move this to the parent FormBlock class, as this should be common to all FormBlock components
    public ok() {
        // SAM - Action present data to Model
        this.formModelService.present({
            action: 'next',
            blockId: this._id
        });
    }

    public preBindControls(_formBlockDef) {
    }

}
