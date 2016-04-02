import {Control} from 'angular2/common';
import {Action} from './action';

export abstract class FormComponent {
  // TODO: Break this into hierarchy structure to consolidate common attributes vs component specific ones
  constructor(
    public type: string,
    public id: string,
    public label: string,
    public parentControl: Control,
    public placeholder?: string,
    public errorMessage?: string,
    public options?: Array<string>,
    public visibility?: Action,
    public validation?: Action) {
  }
}
