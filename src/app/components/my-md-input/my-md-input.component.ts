import {
    ElementRef ,
    OnChanges ,
    Component ,
    Directive ,
    Input ,
    OnInit ,
    ViewEncapsulation ,
    ChangeDetectorRef
} from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { CssAnimationBuilder } from 'angular2/src/animate/css_animation_builder';
import { EventEmitter } from 'angular2/src/facade/async';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
import { isPresent } from 'angular2/src/facade/lang';
@Component(
    {
        selector      : 'my-md-input' ,
        template      : `
    <md-input-container
        [class.md-input-has-value]='parentControl.value'
        [ngClass]='{"md-input-has-placeholder" : placeholder,"summary" : isInSummaryState , "noPadding": noPadding }'
        flex-gt-sm='' >
        <label
         [ngClass]='{"summary" : isInSummaryState, "noPadding": noPadding} '
        *ngIf='!isInSummaryState && showLabel!=="false"' [attr.for]='_id'>{{label}}</label><!--
        --><input
            (keyup)='onKeyupEvent($event)'
            (blur)='trimValue()'
            [class.summary-state]='isInSummaryState'
            [disabled]='isInSummaryState'
            class='md-input'
            [attr.name]='_id'
            [attr.id]='_id'
            [attr.maxlength]='_valMaxLength'
            [attr.minlength]='_valMinLength'
            [attr.data-automation-id]='"text_" + _id'
            [ngFormControl]='parentControl'
            [attr.placeholder]='placeholder'/>
            <span class='summary-text'>{{ parentControl.value }}</span>
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
            'autoFocus' ,
            'noPadding'
        ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.Emulated ,
        outputs       : [ 'onEnter' , 'onBlur' , 'onKeyup' ]
    } )
export class MdInputComponent implements OnChanges, AfterViewInit {
    private inputWidth : number;
    private _id : string;
    private _animation : CssAnimationBuilder;
    private _valMinLength : number;
    private _valMaxLength : number;
    private _required : boolean   = false;
    private label : string;
    private isInSummaryState : boolean;
    private showLabel : boolean   = true;
    private tolowerCase : boolean = false;
    private toupperCase : boolean = false;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private onAdjustWidth : EventEmitter<string>;
    private hostClassesRemove;
    private tempClassNames;
    private valPattern : string;
    private onEnter : EventEmitter<string>;
    private onBlur : EventEmitter<string>;
    private onKeyup : EventEmitter<Event>;

    ngAfterViewInit () : any {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if ( this.inputWidth === 0 ) {
            this.inputWidth = 300;
        }
        this.tempClassNames               = this.el.nativeElement.className;
        this.el.nativeElement.className   = '';
        this.el.nativeElement.style.width = this.inputWidth + 'px';
        this.updateValitators();
        this._cd.detectChanges();
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

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef ,
                  private animationBuilder : AnimationBuilder ) {
        this._animation    = animationBuilder.css();
        this.onAdjustWidth = new EventEmitter();
        this.onEnter       = new EventEmitter();
        this.onBlur        = new EventEmitter();
        this.onKeyup       = new EventEmitter();
    }

    get isRequired () {
        return this._required;
    }

    set isRequired ( value : boolean ) {
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    get valMinLength () {
        return this._valMinLength;
    }

    set valMinLength ( value : number ) {
        this._valMinLength = value;
        this.updateValitators();
    }

    get valMaxLength () {
        return this._valMaxLength;
    }

    set valMaxLength ( value : number ) {
        this._valMaxLength = value;
        this.updateValitators();
    }

    set id ( id : string ) {
        this._id = id;
    }

    // set autoFocus ( value : boolean ) {
    //     if ( this.isTrue( value ) && this.el ) {
    //         let input = this.el.nativeElement.querySelector( 'input' );
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

    private onKeyupEvent ( $event ) {
        this.onEnterClick( $event );
        this.onKeyup.emit( $event );
    }

    private updateValitators () {
        if ( this.parentControl ) {
            this.parentControl.validator = Validators.compose( [
                RequiredValidator.requiredValidation( this._required ) ,
                MinLengthValidator.minLengthValidation( this._valMinLength ) ,
                MaxLengthValidator.maxLengthValidation( this._valMaxLength ) ,
                PatterValidator.patternValidator( this.valPattern )
            ] );
            this.parentControl.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }
}
export class RequiredValidator {
    public static requiredValidation ( isRequired ) {
        return ( c ) => {
            if ( isRequired ) {
                if ( ! c.value || c.value.length === 0 ) {
                    return {
                        required : true
                    };
                }
            }
            return null;
        };
    }
}
export class MaxLengthValidator {
    public static maxLengthValidation ( valMaxLength ) {
        return ( c ) => {
            if ( valMaxLength ) {
                if ( ! c.value || c.value.length <= valMaxLength ) {
                    return null;
                }
                return {
                    mdMaxLength : true
                };
            }
            return null;
        };
    }
}
export class MinLengthValidator {
    public static minLengthValidation ( valMinLength ) {
        return ( c ) => {
            if ( valMinLength ) {
                if ( ! c.value || c.value.length >= valMinLength ) {
                    return null;
                }
                return {
                    mdMinLength : true
                };
            }
            return null;
        };
    }
}
export class PatterValidator {
    public static patternValidator ( pattern ) {
        return ( c ) => {
            if ( pattern ) {
                if ( ! c.value || new RegExp( pattern ).test( c.value ) ) {
                    return null;
                }
                return {
                    mdPattern : true
                };
            }
            return null;
        };
    }
}
