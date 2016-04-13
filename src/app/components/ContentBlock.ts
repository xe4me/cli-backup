import {FormBlock} from '../blocks/formBlock';
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';

@Component ({
  selector: 'content-block',
  template: `
    <p id='id'>{{label}}</p>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['id', 'label'],
})
export class ContentBlock extends FormBlock {
  static CLASS_NAME = 'ContentBlock';

  id: string = 'DefaultContentId';
  label: string = 'Default content label';

  public preBindControls(_formBlockDef) {}
}
