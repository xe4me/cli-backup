import {
    ElementRef ,
    OnChanges ,
    Component ,
    Directive ,
    Input ,
    OnInit ,
    ViewEncapsulation ,
    ChangeDetectorRef,
    AfterViewInit,
    EventEmitter,
    Renderer
} from '@angular/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { isPresent } from '@angular/core/src/facade/lang';
@Component(
    {
        selector      : 'my-md-input' ,
        template      : `
            <md-input #myMdInput
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
                [placeholder]='label'>

                  <span *ngIf='currency' md-prefix>{{currency}}&nbsp;</span>

            </md-input>
            <span
                class='summary-text'
                [innerHTML]='myMdInput.value'>
            </span>
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
            'noPadding',
            'currency'
        ] ,
        directives    : [ MD_INPUT_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.None ,
        outputs       : [ 'onEnter' , 'onBlur' , 'onKeyup' ],
        host          : {
                            '[class.md-input-has-value]'    : 'parentControl.value',
                            '[class.summary]'               : 'isInSummaryState',
                            '[class.noPadding]'             : 'noPadding'
                        }
    })
export class MdInputComponent implements AfterViewInit, OnChanges  {
    private inputWidth : number;
    private _id : string;
    private _valMinLength : number;
    private _valMaxLength : number;
    private _required : boolean   = false;
    private label : string;
    private isInSummaryState : boolean = false;
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

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef,
                  private renderer : Renderer ) {
        this.onAdjustWidth = new EventEmitter();
        this.onEnter       = new EventEmitter();
        this.onBlur        = new EventEmitter();
        this.onKeyup       = new EventEmitter();
    }

    ngAfterViewInit () : any {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if ( this.inputWidth === 0 ) {
            this.inputWidth = 300;
        }
        this.tempClassNames               = this.el.nativeElement.className;
        this.renderer.setElementAttribute(this.el.nativeElement, 'class', '');
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.inputWidth + 'px');
        this.updateValitators();
        this._cd.detectChanges();

        // Artifically inject the data-automation-id into the internals of @angular-material md-input
        this.renderer.setElementAttribute(this.el.nativeElement.querySelector( 'input' ), 'data-automation-id', 'text_' + this._id);

        // Artifically inject the placeholder property into the input element of the md-input directive.
        this.renderer.setElementAttribute(this.el.nativeElement.querySelector( 'input' ), 'placeholder', this.placeholder);

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

    private initiateInputWidth () {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.inputWidth + 'px');
    }

    private shrink () {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.el.nativeElement.children[1].offsetWidth + 5  + 'px');
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
