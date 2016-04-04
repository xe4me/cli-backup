import {FormBlock} from "../formBlock";
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';

@Component ({
  selector: 'bolr-init-state',
  template: `
    <div class="bolrIS">
      <span class="logo">TODO</span>
      <p>Hi John Smith</p>
      <h4>You're about to request to exercise your buyer of last resort facility.</h4>
      <p><span>ABC Financial Planning</span><span>Payee ID: ABCDE-F</span></p>
      <p>We just need a few details from you to complete this request, it will only take 3 minutes, let's get started.</p>
      <button class="btn btn--tertiary btn--foxtrot">
          OK
      </button>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['id', 'label'],
})
export class BOLRInitState extends FormBlock {
  static CLASS_NAME = "BOLRInitState";

  id:string = "DefaultContentId";
  label: string = "Default content label";

  public preBindControls(_formBlockDef) {}
}
