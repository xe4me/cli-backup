import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { MdInputComponent } from '../../components/my-md-input/my-md-input.component.ts';
import { EventEmitter } from '@angular/core';
@Component( {
    selector   : 'input-with-label-group' ,
    template   : `
        <div class='input-with-label-group'>
            <label class='heading heading-contxtual-label' *ngIf='contxtualLabel' >{{contxtualLabel}}</label><!--
            -->&nbsp;<!--
            --><my-md-input
                (onEnter)='onEnter.emit("enter")'
                (onBlur)='onBlur.emit("blured")'
                (onKeyup)='onKeyup.emit($event)'
                [class]='width'
                [isInSummaryState]='isInSummaryState'
                [tolowerCase]='tolowerCase'
                [toupperCase]='toupperCase'
                [id]='id'
                [label]='label'
                [placeholder]='placeholder'
                [showLabel]='showLabel'
                [parentControl]='parentControl'
                [isRequired]='isRequired'
                [valPattern]='valPattern'
                [valMaxLength]='valMaxLength'
                [valMinLength]='valMinLength'>
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
        'valMinLength' ,
        'contxtualLabel' ,
        'showLabel' ,
        'tolowerCase' ,
        'toupperCase' ,
        'width',
        'placeholder'
    ] ,
    directives : [ MdInputComponent ] ,
    styles     : [ require( './input-with-label-group.scss' ).toString() ] ,
    outputs    : [ 'onEnter' , 'onBlur' , 'onKeyup' ]
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
    private valMinLength : number;
    private width : string        = '1/3';
    private onEnter : EventEmitter<any>;
    private onBlur : EventEmitter<any>;
    private onKeyup : EventEmitter<any>;
    private tolowerCase : boolean = false;
    private toupperCase : boolean = false;

    constructor () {
        this.onEnter = new EventEmitter();
        this.onBlur  = new EventEmitter();
        this.onKeyup = new EventEmitter();
    }
}
