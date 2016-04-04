import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {FormBlock, NamedControl} from "../blocks/formBlock";
import {MdInputComponent} from '../components/my-md-input/my-md-input.component';
import {Action} from '../actions/action';

@Component ({
  selector: 'multi-block',
  template: `
    <div id="id">
      <div data-automation-id="lbl_planner_details"><p>{{practice.label}}</p></div>
      <my-md-input [id]="practice.id" [label]="practice.label" [parentControl]="formControl[1].control"
          isRequired="true"
          valPattern="^([A-Za-z ])*$"
          valMaxLength="50">

      </my-md-input>
      <my-md-input [id]="payee.id" [label]="payee.label" [parentControl]="formControl[0].control"
          isRequired="true"
          valPattern="^([A-Za-z ])*$"
          valMaxLength="50">

      </my-md-input>, Payee ID:
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['id', 'label'],
  directives: [MdInputComponent]
})
export class MultipleComponentsBlock extends FormBlock {
  static CLASS_NAME = "MultipleComponentsBlock";

  // TODO: All variables should eventually be driven from FormDefinition
  practice = {
    id: 'MultiPayeeId',
    label: 'Multi Payee Id'
  }
  payee = {
    id: 'MultiPlannerId',
    label: 'Multi Planner Id'
  }

  // Couldn't use ngOnInit as dcl cycle confuses me when it actually gets called
  constructor () {
    super();
    this.formControl = [new NamedControl(this.payee.id, new Control()), new NamedControl(this.practice.id, new Control())];
  }

  public preBindControls() {
    this.formControl[0].name = this.payee.id;
    this.formControl[1].name = this.practice.id;
  }

  // visibilityRule: Action;

}
