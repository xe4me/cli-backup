import {Component, Input, OnInit} from 'angular2/core';
import {Control, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';

@Component({
  selector: 'my-select',
  template: `
    <div class='form-group'  *ngIf='!visibility || visibility.invoke()'>
        <label [attr.for]='_label'>{{_labelStr}}</label>
        <select
          class='form-control'
          required
          [ngFormControl]='parentControl'
          [attr.name]='_label' [attr.id]='_label' [attr.data-automation-id]='_label'>
            <option *ngFor='#p of options' [value]='p'>{{p}}</option>
        </select>
        <div [hidden]='parentControl.valid || parentControl.pristine' class='alert alert-danger'>
          {{errorMessage}}
        </div>
      </div>
  `,
  inputs: ['label', 'errorMessage', 'parentControl', 'options', 'visibility']
})
export class MySelectComponent {
    @Input() parentControl;
    @Input() visibility: Action;

    private FULL_OR_PARTIAL = ['Full', 'Partial'];

    private _label: string;
    private _labelStr: string;
    private errorMessage: string;

    set label(label) {
        this._labelStr = label;
        this._label = label.replace(/\s/g, '');
    }

}
