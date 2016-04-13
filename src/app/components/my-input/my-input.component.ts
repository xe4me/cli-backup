import {Component, Input, OnInit} from 'angular2/core';
import {Control, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';

@Component({
  selector: 'my-input',
  template: `
  <span class='form-group' *ngIf='!visibility || visibility.invoke()'>
    <input type='text'
          class='nl-input'
          required
          [attr.name]='_label' [attr.id]='_label' [attr.data-automation-id]='_label'
          [ngFormControl]='parentControl'
          [attr.placeholder]='placeholder'>
    <div [hidden]='parentControl.valid || parentControl.pristine' class='alert alert-danger'>
      {{_labelStr}} is required
    </div>
  </span>
  `,
  styles: [require('./my-input.scss').toString()],
  inputs: ['label', 'parentControl', 'placeholder', 'visibility']
})
export class MyInputComponent {
  private _label: string;
  private _labelStr: string;
  private parentControl: Control;
  private placeholder: string;
  private visibility: Action;

  set label(label) {
    this._labelStr = label;
    this._label = label.replace(/\s/g, '');
  }
}
