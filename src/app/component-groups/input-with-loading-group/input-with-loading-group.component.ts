import { Component , Input } from '@angular/core';
import { Control } from '@angular/common';
import { MdInputComponent } from '../../components/my-md-input/my-md-input.component.ts';
import { AmpLoadingComponent } from '../../components/amp-loading/amp-loading.component';
import { EventEmitter } from '@angular/core';
@Component( {
    selector   : 'input-with-label-group' ,
    template   : `
        <div class='input-with-label-group'>
           <my-md-input
                style="width:100% !important;"
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
                [tabindex]='tabindex'
                [isActive]='isActive'
                [valPattern]='valPattern'
                [valMaxLength]='valMaxLength'
                [valMinLength]='valMinLength'
                [valMinDate]='valMinDate'
                [valMaxDate]='valMaxDate'>
            </my-md-input>
            <amp-loading [mode]="mode" size="small" [value]="value" [showLoading]="showLoading">

            </amp-loading>
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
        'valMaxDate' ,
        'valMinDate' ,
        'isActive' ,
        'tabindex' ,
        'valMinLength' ,
        'contxtualLabel' ,
        'showLabel' ,
        'tolowerCase' ,
        'toupperCase' ,
        'width' ,
        'placeholder'
    ] ,
    directives : [ AmpLoadingComponent , MdInputComponent ] ,
    styles     : [ require( './input-with-loading-group.scss' ).toString() ] ,
    outputs    : [ 'onEnter' , 'onBlur' , 'onKeyup' ]
} )
export class InputWithLoadingGroupComponent {
    @Input() mode        = 'indeterminate';
    @Input() value       = 10;
    private _showLoading = false;
    @Input() set showLoading ( _showLoading ) {
        this._showLoading = _showLoading;
    }

    get showLoading () {
        return this._showLoading;
    }

    private id : string;
    private label : string;
    private parentControl : Control;
    private pattern : string;
    private required : boolean;
    private isInSummaryState : boolean;
    private showLabel : boolean;
    private valMaxLength : number;
    private valMinLength : number;
    private valMaxDate : string   = '1000000';
    private valMinDate : string   = '-1000000';
    private isActive : boolean    = true;
    private tabindex : any        = null;
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
