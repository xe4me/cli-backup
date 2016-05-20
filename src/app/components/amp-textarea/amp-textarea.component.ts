import { Component , Directive , Input , OnInit , ViewEncapsulation } from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
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
        <!--(paste)='adjustHeight($event.target)'
            (blur)='adjustHeight($event.target)'
            '-->
        <label
         [ngClass]='{"summary" : isInSummaryState}'
        *ngIf='!isInSummaryState' [attr.for]='_id'>{{label}}</label><!--
        --><textarea
            #textarea
            (keyup)='adjustHeight($event.target)'
            (blur)='adjustHeight($event.target)'
            (blur)='trimValue()'
            [class.summary-state]='isInSummaryState'
            [disabled]='isInSummaryState'
            class='md-input'
            [mdPattern]='valPattern'
            [attr.name]='_id'
            [attr.id]='_id'
            [attr.maxlength]='valMaxLength'
            [mdMaxLength]='valMaxLength'
            [attr.data-automation-id]='"textarea_" + _id'
            [ngFormControl]='parentControl'
            [attr.placeholder]='placeholder'>
            
            </textarea>
            <span 
            [class.error]='valMaxLength==textarea.value.length' class='char-left'
             *ngIf='valMaxLength && valMaxLength>0 && !isInSummaryState'>{{textarea.value.length }} / {{ valMaxLength }}</span>
            <span class='summary-text'>{{ parentControl.value }}</span>
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
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
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
    private initialComponentHeight : number;
    private initialTextareaHeight : number;
    private componentHeightOffset : number;

    ngAfterViewInit () : any {
        let componentHeight         = this.el.nativeElement.scrollHeight;
        let textarea                = this.el.nativeElement.querySelector( 'textarea' );
        this.initialTextareaHeight  = textarea.style.height || textarea.scrollHeight;
        this.componentHeightOffset  = componentHeight - (this.initialTextareaHeight + 4);
        this.initialComponentHeight = this.initialTextareaHeight + this.componentHeightOffset;
        this.adjustHeight( textarea );
        return undefined;
    }

    constructor ( private el : ElementRef , private animationBuilder : AnimationBuilder ) {
        this._animation    = animationBuilder.css();
        this.onAdjustWidth = new EventEmitter();
    }

    private adjustHeight ( element ) {
        if ( this.parentControl.value === null || this.parentControl.value.trim() === '' ) {
            element.style.height               = this.initialTextareaHeight + 'px';
            this.el.nativeElement.style.height = this.initialComponentHeight + 'px';
        } else {
            element.style.height               = '1px';
            element.style.height               = (4 + element.scrollHeight) + 'px';
            this.el.nativeElement.style.height = (this.componentHeightOffset + element.scrollHeight) + 'px';
        }
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
