import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {MdInputComponent} from '../../components/my-md-input/my-md-input.component.ts';

@Component({
    selector: 'input-with-label-group',
    template: `
        <label class="heading heading-contxtual-label" *ngIf="contxtualLabel" >{{contxtualLabel}}</label>
        <span *ngIf="isInSummaryState" class="summary-state">{{parentControl.value}}</span>
        <my-md-input
            *ngIf="!isInSummaryState"
            [id]="id"
            [label]="label"
            [parentControl]="parentControl"
            [isRequired]="isRequired"
            [valPattern]="valPattern"
            [valMaxLength]="valMaxLength">
        </my-md-input>
        `,
    inputs: ['id', 'isInSummaryState', 'label', 'parentControl', 'isRequired', 'valPattern', 'valMaxLength', 'contxtualLabel'],
    directives: [MdInputComponent],
    styles: [require('./input-with-label-group.scss').toString()]
})


export class InputWithLabelGroupComponent {
    private id:string;
    private label:string;
    private parentControl:Control;
    private pattern:string;
    private required:boolean;
    private isInSummaryState:boolean;
}
