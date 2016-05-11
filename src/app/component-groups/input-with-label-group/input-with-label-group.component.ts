import { Component } from 'angular2/core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../components/my-md-input/my-md-input.component.ts';
import { EventEmitter } from 'angular2/src/facade/async';
@Component( {
    selector   : 'input-with-label-group' ,
    template   : `
        <div class='input-with-label-group'>
            <label class='heading heading-contxtual-label' *ngIf='contxtualLabel' >{{contxtualLabel}}</label><!--
            -->&nbsp;<!--
            --><my-md-input
                (onEnter)='onEnter.emit("enter")'
                (onBlur)='onBlur.emit("blured")'
                class='1/3'
                [isInSummaryState]='isInSummaryState'
                [tolowerCase]='tolowerCase'
                [toupperCase]='toupperCase'
                [id]='id'
                [label]='label'
                [showLabel]='showLabel'
                [parentControl]='parentControl'
                [isRequired]='isRequired'
                [valPattern]='valPattern'
                [valMaxLength]='valMaxLength'>
            </my-md-input>
        </div>
        ` ,
    inputs     : [
        'id' ,
        'isInSummaryState' ,
        'label' ,
        'parentControl' ,
        'isRequired' ,
        'valPattern' ,
        'valMaxLength' ,
        'contxtualLabel' ,
        'showLabel' ,
        'tolowerCase' ,
        'toupperCase'
    ] ,
    directives : [ MdInputComponent ] ,
    styles     : [ require( './input-with-label-group.scss' ).toString() ] ,
    outputs    : [ 'onEnter' , 'onBlur' ]
} )
export class InputWithLabelGroupComponent {
    private id : string;
    private label : string;
    private parentControl : Control;
    private pattern : string;
    private required : boolean;
    private isInSummaryState : boolean;
    private showLabel : boolean;
    private valMaxLength : number;
    private onEnter : EventEmitter < string >;
    private onBlur : EventEmitter < string >;
    private tolowerCase : boolean = false;
    private toupperCase : boolean = false;

    constructor () {
        this.onEnter = new EventEmitter();
        this.onBlur  = new EventEmitter();
    }
}
