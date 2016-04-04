import {FormBlock} from "../../formBlock";
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';

import {ThemeIDDirective} from "../../../directives/themeId.directive";

@Component ({
  selector: 'bolr-init-state',
  template: `
    <div class="bolrIS ph2" ampLicenseeThemeID>
      <p>Hi John Smith</p>
      <p class="bolrIS_title">You're about to request to exercise your buyer of last resort facility.</p>
      <p><span>ABC Financial Planning</span><span>Payee ID: ABCDE-F</span></p>
      <p>We just need a few details from you to complete this request, it will only take 3 minutes, let's get started.</p>
      <button class="btn btn--secondary btn--mike">
          OK
      </button>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['id', 'label'],
  styles: [require('./BOLRInitState.scss')],
  directives: [ThemeIDDirective]
})
export class BOLRInitState extends FormBlock {
  static CLASS_NAME = "BOLRInitState";

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
