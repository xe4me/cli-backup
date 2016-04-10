import {FormBlock} from "../../formBlock";
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone } from 'angular2/core';
import {ThemeIDDirective} from "../../../directives/themeId.directive";
import {FormModelService} from "amp-ddc-ui-core/src/app/services/formModel.service";
console.log("invoked IntroBlockComponent");
@Component ({
  selector: 'bolr-intro-block',
  template: `
    <div class="ng-animate bolr-intro" [class.hidden]="!isCurrentBlockActive()">
      <div class="bolr-intro-logo" ampLicenseeThemeID></div>
      <div class="bolr-intro-main">
        <div class="bolr-intro-main__title practice-title">ABC Financial Planning   Payee ID: ABCDE-F  Practice principle: John Smith</div>
        <p class="bolr-intro-main__body">
          Hi John,<br/>
          You're about to request to exercise your buyer of last resort facility.
        </p>
        <p class="bolr-intro-main__notes">We just need a few details from you to complete this request, it will only take 3 minutes, let's get started.</p>
        <br />
        <button class="btn btn--secondary btn--kilo" (click)="ok()">
            OK
        </button>
      </div>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['id', 'label'],
  styles: [require('./IntroBlock.component.scss').toString()],
  directives: [ThemeIDDirective ],
})
export class IntroBlockComponent extends FormBlock {
  static CLASS_NAME = "IntroBlockComponent";

  id:string = "DefaultContentId";
  label: string = "Default content label";

  constructor(public formModelService: FormModelService) {
      super();
  }

  // SAM - State representation of Model
  public isCurrentBlockActive() {
      return this.formModelService.getModel().currentBlock === IntroBlockComponent.CLASS_NAME;
  }

  // TODO: Move this to the parent FormBlock class, as this should be common to all FormBlock components
  public ok() {
      // SAM - Action present data to Model
      this.formModelService.present({
         action: "next"
      });
  }

  public preBindControls(_formBlockDef) {}

}
