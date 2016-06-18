import {
    ElementRef ,
    OnChanges ,
    Component ,
    Directive ,
    Input ,
    OnInit ,
    ViewEncapsulation ,
    ChangeDetectorRef
} from '@angular/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { EventEmitter } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
@Component(
    {
        selector      : 'my-md-input' ,
        template      : `
            <md-input
                (keyup)='onKeyupEvent($event)'
                (blur)='trimValue()'
                [disabled]='isInSummaryState'
                class='md-input'
                [aria-label]='_id'
                [name]='_id'
                [id]='_id'
                [minLength]='_valMinLength'
                [ngFormControl]='parentControl'
                [maxLength]='_valMaxLength'
                [placeholder]='placeholder'>
            </md-input>
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
        directives    : [ MD_INPUT_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.None ,
        outputs       : [ 'onEnter' , 'onBlur' , 'onKeyup' ],
        host          : {
                        '[class.md-input-has-value]'    : 'parentControl.value',
                        '[class.summary]'               : 'isInSummaryState',
                        '[class.noPadding]'             : 'noPadding',
        }
    } )
export class MdInputComponent implements AfterViewInit {
    private inputWidth : number;
    private _id : string;
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
    private onAdjustWidth : EventEmitter<any>;
    private hostClassesRemove;
    private tempClassNames;
    private valPattern : string;
    private onEnter : EventEmitter<any>;
    private onBlur : EventEmitter<any>;
    private onKeyup : EventEmitter<any>;

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

        // TODO: Hack the data-automation-id into the final input dom element
        console.log("data-automation-id is ", "text_" + this._id);
        return undefined;
    }

    // ngOnChanges ( changes ) : any {
    //     if ( changes.hasOwnProperty( 'isInSummaryState' ) ) {
    //         if ( changes.isInSummaryState.currentValue === true ) {
    //             this.shrink();
    //         } else {
    //             this.initiateInputWidth();
    //         }
    //     }
    //     return undefined;
    // }

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef ) {
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

    // private shrink () {
    //     if ( this.parentControl.value && this.parentControl.value.trim() !== '' ) {
    //         //this.el.nativeElement.className = '';
    //         this
    //             ._animation
    //             .setFromStyles( {
    //                 width : this.inputWidth + 'px'
    //             } )
    //             .setToStyles( {
    //                 width : this.el.nativeElement.children[ 0 ].children[ 2 ].offsetWidth + 5 + 'px'
    //             } )
    //             .setDelay( 1200 )
    //             .setDuration( 200 )
    //             .start( this.el.nativeElement );
    //     }
    // }

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

    // private initiateInputWidth () {
    //     let a = this
    //         ._animation
    //         .setFromStyles( {
    //             width : this.el.nativeElement.offsetWidth
    //         } )
    //         .setToStyles( {
    //             width : this.inputWidth + 'px'
    //         } )
    //         .setDelay( 0 )
    //         .setDuration( 700 )
    //         .start( this.el.nativeElement );
    //     a.onComplete( () => {
    //         //this.el.nativeElement.className = this.tempClassNames;
    //     } );
    // }

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
