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
import { isPresent } from 'angular2/src/facade/lang';
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
        *ngIf='!isInSummaryState && showLabel!=="false"' [attr.for]='_id'>{{label}}</label><!--
        --><input
            (keyup)='onEnterClick($event)'
            (blur)='trimValue()'
            [class.summary-state]='isInSummaryState'
            [disabled]='isInSummaryState'
            class='md-input'
            [mdPattern]='valPattern'
            [attr.name]='_id'
            [attr.id]='_id'
            [attr.maxlength]='valMaxLength'
            [attr.minlength]='valMinLength'
            [mdMaxLength]='valMaxLength'
            [mdMin]='valMinLength'
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
            'valMinLength' ,
            'valPattern' ,
            'isRequired' ,
            'hostClassesRemove' ,
            'showLabel' ,
            'tolowerCase' ,
            'toupperCase' ,
            'autoFocus'
        ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES , AmpFitWidthToText ] ,
        encapsulation : ViewEncapsulation.Emulated ,
        outputs       : [ 'onEnter' , 'onBlur' ]
    } )
export class MdInputComponent implements OnChanges, AfterViewInit {
    private inputWidth : number;
    private valMinLength : number = - 1;
    private valMaxLength : number = 10000;
    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private showLabel : boolean   = true;
    private tolowerCase : boolean = false;
    private toupperCase : boolean = false;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private _animation : CssAnimationBuilder;
    private onAdjustWidth : EventEmitter<string>;
    private hostClassesRemove;
    private tempClassNames;
    private onEnter : EventEmitter<string>;
    private onBlur : EventEmitter<string>;

    ngAfterViewInit () : any {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if ( this.inputWidth === 0 ) {
            this.inputWidth = 300;
        }
        this.tempClassNames               = this.el.nativeElement.className;
        this.el.nativeElement.className   = '';
        this.el.nativeElement.style.width = this.inputWidth + 'px';
        return undefined;
    }

    ngOnChanges ( changes ) : any {
        if ( changes.hasOwnProperty( 'isInSummaryState' ) ) {
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
        this.onEnter       = new EventEmitter();
        this.onBlur        = new EventEmitter();
    }

    set id ( id : string ) {
        this._id = id;
    }

    set isRequired ( val : string ) {
        if ( ! this.parentControl ) {
            console.error( 'Unable to set the required validator on this component[' + this._id + '] because the parentControl has not been initialised.' );
        } else if ( val === 'true' ) {
            // Note that you can compose an Array of validators via the Validators.compose(validators: Function[]) :
            // Function API
            this.parentControl.validator = Validators.required;
        }
    }

    // set autoFocus ( value : boolean ) {
    //     if ( this.isTrue( value ) && this.el ) {
    //         let input = this.el.nativeElement.querySelector( 'input' );
    //         console.log( "this.el.nativeElement.querySelector('input')[0]" , this.el.nativeElement.querySelector( 'input' ) );
    //         input.focus();
    //     }
    // }
    private onEnterClick ( event ) {
        if ( event.keyCode === 13 ) {
            this.onEnter.emit( 'enter' );
        }
    }

    private shrink () {
        if ( this.parentControl.value && this.parentControl.value.trim() !== '' ) {
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

    private trimValue () {
        let notUsabel;
        if ( this.parentControl.value ) {
            this.parentControl.updateValue( this.parentControl.value.trim() );
            notUsabel = this.tolowerCase ? this.parentControl.updateValue( this.parentControl.value.toLowerCase() ) : '';
            notUsabel = this.toupperCase ? this.parentControl.updateValue( this.parentControl.value.toUpperCase() ) : '';
        }
        this.onBlur.emit( 'blured' );
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
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
        a.onComplete( () => {
            //this.el.nativeElement.className = this.tempClassNames;
        } );
    }
}
