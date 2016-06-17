import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from '@angular/core';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/common';
import {FormBlock, NamedControl} from '../blocks/formBlock';
import {MdInputComponent} from '../components/my-md-input/my-md-input.component';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';


@Component ({
  selector: 'planner-details-block',
  template: `
    <div id='id'>
      <div data-automation-id='lbl_planner_details'><p>{{label}}</p></div>
      <div><span>ABC Financial Planning</span><span>Payee ID: BCABB-F</span></div>
      <my-md-input [id]='id' [label]='label' [parentControl]='formControl[0].control'
          isRequired='true'
          valPattern='^([A-Za-z ])*$'
          valMaxLength='50'>

      </my-md-input>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Emulated
  inputs: ['payee', 'formModel'],
  directives: [MdInputComponent]
})
export class PlannerDetailsBlock extends FormBlock {
  static CLASS_NAME = 'PlannerDetailsBlock';

  id: 'defaultPayeeId';
  label: 'Default Payee Id';

  constructor () {
    super();
    this.formControl = [new NamedControl(this.id, new Control())];
  }

  public preBindControls () {
    this.formControl[0].name = this.id;
  }

  // visibilityRule: Action;

}
