import { Component , Directive , Input , OnInit , ViewEncapsulation } from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
import { AmpFitWidthToText } from '../../directives/amp-fit-width-to-text.directive';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { CssAnimationBuilder } from 'angular2/src/animate/css_animation_builder';
import { ElementRef } from 'angular2/src/core/linker/element_ref';
import { EventEmitter } from "angular2/src/facade/async";
import { OnChanges } from "angular2/src/core/linker/interfaces";
import { SimpleChange } from "experience/node_modules/angular2/src/core/change_detection/change_detection_util";
import { AfterViewInit } from "experience/node_modules/angular2/src/core/linker/interfaces";
// TODO: Work out how to disable mdMaxLength and mdPattern when they are not set
@Component(
    {
        selector      : 'my-md-input' ,
        template      : `
    <md-input-container
        [class.md-input-has-value]='parentControl.value' 
        [ngClass]='{"md-input-has-placeholder" : placeholder}' 
        flex-gt-sm='' >
        <label *ngIf='!isInSummaryState' [attr.for]='_id'>{{label}}</label>
        <input
            [class.summary-state]='isInSummaryState'
            [disabled]='isInSummaryState'
            class='md-input'
            [mdPattern]='valPattern'
            [attr.name]='_id'
            [attr.id]='_id'
            [attr.data-automation-id]='"text_" + _id'
            [ngFormControl]='parentControl'
            [attr.placeholder]='placeholder'/>
            <span class='summary-text' style="visibility: hidden">{{ parentControl.value }}
            </span>
        <ng-content></ng-content>
  </md-input-container>
  ` ,
        styles        : [ require( './my-md-input.scss' ).toString() ] ,
        inputs        : [
            'id' ,
            'isInSummaryState' ,
            'label' ,
            'parentControl' ,
            'placeholder' ,
            'visibility' ,
            'valMaxLength' ,
            'valPattern' ,
            'isRequired'
        ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES , AmpFitWidthToText ] ,
        encapsulation : ViewEncapsulation.Emulated
    } )
export class MdInputComponent implements OnChanges, AfterViewInit {
    private inputWidth : number;

    ngAfterViewInit () : any {
        this.inputWidth                   = this.el.nativeElement.offsetWidth;
        this.el.nativeElement.style.width = this.inputWidth + 'px';
        this.el.nativeElement.className   = '';
        return undefined;
    }

    ngOnChanges ( changes : {isInSummaryState : SimpleChange} ) : any {
        if ( changes.hasOwnProperty( 'isInSummaryState' ) ) {
            if ( changes.isInSummaryState.currentValue === true ) {
                this.adjustInputWidth();
            } else {
                this.initiateInputWidth();
            }
        }
        return undefined;
    }

    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private _animation : CssAnimationBuilder;
    private model : any;
    private onAdjustWidth : EventEmitter<string>;

    constructor ( private el : ElementRef , private animationBuilder : AnimationBuilder ) {
        this._animation    = animationBuilder.css();
        this.onAdjustWidth = new EventEmitter();
    }

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

    private adjustInputWidth () {
        if ( this.parentControl.value && this.parentControl.value.trim() != '' ) {
            this.el.nativeElement.style.width = this.el.nativeElement.children[ 0 ].children[ 2 ].offsetWidth + 'px';
        }
    }

    private initiateInputWidth () {
        this.el.nativeElement.style.width = this.inputWidth + 'px';
    }
}
