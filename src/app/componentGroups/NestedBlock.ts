import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {FormBlock, NamedControl} from "../blocks/formBlock";
import {MdInputComponent} from '../components/my-md-input/my-md-input.component';
import {PlannerDetailsBlock} from './PlannerDetailsBlock';
import {Action} from '../actions/action';

@Component ({
  selector: 'nested-block',
  template: `
    <div id="id">
      <div data-automation-id="lbl_planner_details"><p>{{label}}</p></div>
      <div><span>ABC Financial Planning</span><span>Payee ID: BCABB-F</span></div>
      <my-md-input [id]="id" [label]="label" [parentControl]="formControl[0].control"
          isRequired="true"
          valPattern="^([A-Za-z ])*$"
          valMaxLength="50">
      </my-md-input>
      <div #nestedBlock></div>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['payee'],
  directives: [MdInputComponent, PlannerDetailsBlock]
})
export class NestedBlock extends FormBlock {
  static CLASS_NAME = "NestedBlock";

  id: 'payeeId';
  label: 'Payee Id';

  constructor () {
    super();
    this.formControl = [new NamedControl(this.id, new Control())];
  }

  public preBindControls(_formBlockDef: any): void {
    this.formControl[0].name = this.id;
  }


  visibilityRule: Action;

}
