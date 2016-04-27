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
import { SimpleChange } from "angular2/src/core/change_detection/change_detection_util";
import { AfterViewInit } from "angular2/src/core/linker/interfaces";
import { start } from "repl";
// TODO: Work out how to disable mdMaxLength and mdPattern when they are not set
@Component(
    {
        selector      : 'my-md-input' ,
        template      : `
    <md-input-container 
        [class.md-input-has-value]='parentControl.value' 
        [ngClass]='{"md-input-has-placeholder" : placeholder,"summary" : isInSummaryState}' 
        flex-gt-sm='' >
        <label
         [ngClass]='{"summary" : isInSummaryState}'
        *ngIf='!isInSummaryState' [attr.for]='_id'>{{label}}</label><!--
        --><input
            (blur)='parentControl.updateValue(parentControl.value.trim())' 
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
            [attr.placeholder]='placeholder'/>
            <span class='summary-text'>{{ parentControl.value }}
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
            'isRequired' ,
            'hostClassesRemove'
        ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES , AmpFitWidthToText ] ,
        encapsulation : ViewEncapsulation.Emulated
    } )
export class MdInputComponent implements OnChanges, AfterViewInit {
    private inputWidth : number;
    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private _animation : CssAnimationBuilder;
    private onAdjustWidth : EventEmitter<string>;
    private hostClassesRemove;
    private tempClassNames;

    ngAfterViewInit () : any {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        console.log( 'inputWidth' , this.inputWidth );
        if ( this.inputWidth == 0 ) {
            this.inputWidth = 300;
        }
        this.tempClassNames               = this.el.nativeElement.className;
        this.el.nativeElement.className   = '';
        this.el.nativeElement.style.width = this.inputWidth + 'px';
        return undefined;
    }

    ngOnChanges ( changes ) : any {
        if ( changes.hasOwnProperty( 'isInSummaryState' ) ) {
            console.log( 'initial Onchange' , changes );
            if ( changes.isInSummaryState.currentValue === true ) {
                this.shrink();
            } else {
                this.initiateInputWidth();
            }
        }
        return undefined;
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

    private shrink () {
        if ( this.parentControl.value && this.parentControl.value.trim() != '' ) {
            //this.el.nativeElement.className = '';
            this
                ._animation
                .setFromStyles( {
                    width : this.inputWidth + 'px'
                } )
                .setToStyles( {
                    width : this.el.nativeElement.children[ 0 ].children[ 2 ].offsetWidth + 5 + 'px'
                } )
                .setDelay( 1200 )
                .setDuration( 200 )
                .start( this.el.nativeElement );
        }
    }

    private initiateInputWidth () {
        let a = this
            ._animation
            .setFromStyles( {
                width : this.el.nativeElement.offsetWidth
            } )
            .setToStyles( {
                width : this.inputWidth + 'px'
            } )
            .setDelay( 0 )
            .setDuration( 700 )
            .start( this.el.nativeElement );
        a.onComplete( ()=> {
            //this.el.nativeElement.className = this.tempClassNames;
        } );
    }
}
