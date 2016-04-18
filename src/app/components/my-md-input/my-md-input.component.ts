import { Component , Directive , Input , OnInit , ViewEncapsulation } from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
// TODO: Work out how to disable mdMaxLength and mdPattern when they are not set
@Component (
    {
        selector      : 'my-md-input' ,
        template      : `
    <span *ngIf="isInSummaryState" class="summary-state">{{parentControl.value}}</span>
    <md-input-container
        [class.gone]='isInSummaryState'
        [class.md-input-has-value]="parentControl.value" 
        [ngClass]="{'md-input-has-placeholder' : placeholder}" 
        flex-gt-sm="" >
        <label *ngIf="label && !parentControl.value" [attr.for]="_id">{{label}}</label>
        <input
            class="md-input"
            [mdPattern]="valPattern"
            [attr.name]="_id"
            [attr.id]="_id"
            [attr.data-automation-id]="'text_' + _id"
            [ngFormControl]="parentControl"
            [attr.placeholder]="placeholder"/>
        <ng-content></ng-content>
  </md-input-container>
  ` ,
        styles        : [ require ( './my-md-input.scss' ).toString () ] ,
        inputs        : [ 'id' , 'isInSummaryState' , 'label' , 'parentControl' , 'placeholder' , 'visibility' , 'valMaxLength' , 'valPattern' , 'isRequired' ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.Emulated
    } )
export class MdInputComponent {
    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private model : any;

    set id ( id : string ) {
        this._id = id;
    }

    set isRequired ( val : string ) {
        if ( val === 'true' ) {
            // Note that you can compose an Array of validators via the Validators.compose(validators: Function[]) :
            // Function API
            this.parentControl.validator = Validators.required;
        }
    }
}
