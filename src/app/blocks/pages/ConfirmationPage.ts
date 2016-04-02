import {FormPage} from "./formPage";
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';

@Component ({
  selector: 'confirmation-page',
  template: `
    <h3 id="content.id">{{content.label}}</h3>
    <button>OK</button>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['content'],
})
export class ConfirmationPage extends FormPage {
  static CLASS_NAME = "ConfirmationPage";

  public content = {
    id: "DefaultContentId",
    label: "Default content label"
  }

}
