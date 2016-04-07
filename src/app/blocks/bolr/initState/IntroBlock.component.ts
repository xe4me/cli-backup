import {FormBlock} from "../../formBlock";
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';

import {ThemeIDDirective} from "../../../directives/themeId.directive";

@Component ({
  selector: 'bolr-intro-block',
  template: `
    <div class="bolr-intro">
      <div class="bolr-intro-logo" ampLicenseeThemeID></div>
      <div class="bolr-intro-main">
        <div class="bolr-intro-main__title practice-title">ABC Financial Planning   Payee ID: ABCDE-F  Practice principle: John Smith</div>
        <p class="bolr-intro-main__body">
          Hi John,<br/>
          You're about to request to exercise your buyer of last resort facility.
        </p>
        <p class="bolr-intro-main__notes">We just need a few details from you to complete this request, it will only take 3 minutes, let's get started.</p>
        <br />
        <button class="btn btn--secondary btn--kilo">
            OK
        </button>
      </div>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['id', 'label'],
  styles: [require('./IntroBlock.component.scss').toString()],
  directives: [ThemeIDDirective]
})
export class IntroBlockComponent extends FormBlock {
  static CLASS_NAME = "IntroBlockComponent";

  id:string = "DefaultContentId";
  label: string = "Default content label";

  public preBindControls(_formBlockDef) {}

  /**
   * Theme implementation options
   * 1, Directive that's add to the highest level component html element for styles to reference and model to test against
   * 2, Conditional require SCSS files
   *
   */
}
