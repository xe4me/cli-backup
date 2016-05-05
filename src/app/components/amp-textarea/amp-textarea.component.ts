import { Component , Directive , Input , OnInit , ViewEncapsulation } from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
import { AmpFitWidthToText } from '../../directives/amp-fit-width-to-text.directive';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { CssAnimationBuilder } from 'angular2/src/animate/css_animation_builder';
import { ElementRef } from 'angular2/src/core/linker/element_ref';
import { EventEmitter } from 'angular2/src/facade/async';
import { OnChanges } from 'angular2/src/core/linker/interfaces';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
// TODO: Work out how to disable mdMaxLength and mdPattern when they are not set
@Component(
    {
        selector      : 'amp-textarea' ,
        template      : `
    <md-input-container 
        [class.md-input-has-value]='parentControl.value' 
        [ngClass]='{"md-input-has-placeholder" : placeholder,"summary" : isInSummaryState}' 
        flex-gt-sm='' >
        <label
         [ngClass]='{"summary" : isInSummaryState}'
        *ngIf='!isInSummaryState' [attr.for]='_id'>{{label}}</label><!--
        --><textarea
            (keydown)='adjustHeight($event.target)'
            (paste)='adjustHeight($event.target)'
            (blur)='adjustHeight($event.target)'
            (keyup)='adjustHeight($event.target)'
            (blur)='trimValue()' 
            [class.summary-state]='isInSummaryState'
            [disabled]='isInSummaryState'
            class='md-input'
            [mdPattern]='valPattern'
            [attr.name]='_id'
            [attr.id]='_id'
            [attr.maxlength]='valMaxLength'
            [mdMaxLength]='valMaxLength'
            [attr.data-automation-id]='"text_" + _id'
            [ngFormControl]='parentControl'
            [attr.placeholder]='placeholder'>
            
            </textarea>
            <span class='summary-text'>{{ parentControl.value }}
            </span>
        <ng-content></ng-content>
  </md-input-container>
  ` ,
        styles        : [ require( './amp-textarea.scss' ).toString() ] ,
        inputs        : [
            'id' ,
            'isInSummaryState' ,
            'label' ,
            'parentControl' ,
            'placeholder' ,
            'visibility' ,
            'valMaxLength' ,
            'valPattern' ,
            'isRequired' ,
            'hostClassesRemove'
        ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES , AmpFitWidthToText ] ,
        encapsulation : ViewEncapsulation.Emulated
    } )
export class AmpTextareaComponent implements AfterViewInit {
    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private _animation : CssAnimationBuilder;
    private onAdjustWidth : EventEmitter<string>;
    private hostClassesRemove;
    private initialHeight : number;

    ngAfterViewInit () : any {
        this.initialHeight = this.el.nativeElement.style.height;
        if ( this.initialHeight === 0 ) {
            this.initialHeight = this.el.nativeElement.scrollHeight;
        }
        return undefined;
    }

    private adjustHeight ( element ) {
        if ( this.parentControl.value && this.parentControl.value.trim() === '' ) {
            element.style.height               = this.initialHeight;
            this.el.nativeElement.style.height = this.initialHeight;
        } else {
            element.style.height               = '1px';
            element.style.height               = (25 + element.scrollHeight) + 'px';
            this.el.nativeElement.style.height = (25 + element.scrollHeight) + 'px';
        }
    }

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

    private  trimValue () {
        return this.parentControl.value ? this.parentControl.updateValue( this.parentControl.value.trim() ) : '';
    }
}
