import {
    ElementRef ,
    OnChanges ,
    Component ,
    ViewEncapsulation ,
    ChangeDetectorRef ,
    AfterViewInit ,
    EventEmitter ,
    Renderer
} from '@angular/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { isPresent } from '@angular/core/src/facade/lang';
import {
    RequiredValidator ,
    MinLengthValidator ,
    MaxLengthValidator ,
    MaxDateValidator ,
    MinDateValidator ,
    PatterValidator ,
    MaxFloatValidator
} from '../../util/validations';
@Component(
    {
        selector      : 'my-md-input' ,
        template      : `
            <md-input
                #myMdInput
                (focus)='onFocused($event)'
                (keyup)='onKeyupEvent($event)'
                (blur)='trimValue($event)'
                [disabled]='isInSummaryState || disabled'
                class='md-input'
                [class.label-hidden]='labelHidden'
                [aria-label]='_id'
                [name]='_id'
                [id]='_id'
                [tabIndex]='isActive?tabindex:-1'
                [maxLength]='valMaxLength'
                [ngFormControl]='parentControl'
                [placeholder]='label'>
                  <span class="currency" *ngIf='currency' md-prefix>{{currency}}&nbsp;</span>
            </md-input>
            <span *ngIf='iconRight && !isInSummaryState' class="icon icon--search icon-right"></span>
            <span
                class='summary-text'
                [innerHTML]='myMdInput.value'>
            </span>
          ` ,
        styles        : [ require( './my-md-input.scss' ).toString() ] ,
        inputs        : [
            'id' ,
            'defaultValue' ,
            'customValidator' ,
            'disabled' ,
            'isInSummaryState' ,
            'label' ,
            'parentControl' ,
            'placeholder' ,
            'visibility' ,
            'valMaxLength' ,
            'valMinLength' ,
            'valPattern' ,
            'valMaxDate' ,
            'valMinDate' ,
            'valMaxFloat' ,
            'valMinFloat' ,
            'tabindex' ,
            'isActive' ,
            'isRequired' ,
            'hostClassesRemove' ,
            'showLabel' ,
            'tolowerCase' ,
            'idleTimeOut' ,
            'validationDelay' ,
            'toupperCase' ,
            'autoFocus' ,
            'noPadding' ,
            'currency' ,
            'iconRight' ,
            'labelHidden'
        ] ,
        directives    : [ MD_INPUT_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.None ,
        outputs       : [ 'onEnter' , 'onBlur' , 'onKeyup' ] ,
        host          : {
            '[class.md-input-has-value]' : 'parentControl.value' ,
            '[class.summary]'            : 'isInSummaryState' ,
            '[class.noPadding]'          : 'noPadding'
        }
    } )
export class MdInputComponent implements AfterViewInit, OnChanges {
    public parentControl : Control;
    private inputWidth : number;
    private _id : string;
    private _valMinLength : number;
    private _valMaxLength : number;
    private _valMaxDate : string;
    private _valMinDate : string;
    private _valMaxFloat : number;
    private _valMinFloat : number;
    private _required : boolean        = false;
    private _disabled : boolean        = false;
    private label : string;
    private isInSummaryState : boolean = false;
    private showLabel : boolean        = true;
    private tolowerCase : boolean      = false;
    private toupperCase : boolean      = false;
    private iconRight : boolean        = false;
    private isActive : boolean         = true;
    private tabindex : any             = null;
    private defaultValue : any         = null;
    private currency : string          = null;
    private customValidator : Function = ()=> {
    };
    private placeholder : string;
    private visibility : Action;
    private onAdjustWidth : EventEmitter<any>;
    private hostClassesRemove;
    private tempClassNames;
    private valPattern : string;
    private onEnter : EventEmitter<any>;
    private onBlur : EventEmitter<any>;
    private onFocus : EventEmitter<any>;
    private onKeyup : EventEmitter<any>;
    private labelHidden : boolean      = false;
    private validate;
    private validationDelay            = 0;
    private idleTimeOut                = 2000;
    private idleTimeoutId;

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef ,
                  private renderer : Renderer ) {
        this.onAdjustWidth = new EventEmitter();
        this.onEnter       = new EventEmitter();
        this.onBlur        = new EventEmitter();
        this.onFocus       = new EventEmitter();
        this.onKeyup       = new EventEmitter();
    }

    ngAfterViewInit () : any {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if ( this.inputWidth === 0 ) {
            this.inputWidth = 300;
        }
        this.tempClassNames = this.el.nativeElement.className;
        this.renderer.setElementAttribute( this.el.nativeElement , 'class' , '' );
        this.renderer.setElementStyle( this.el.nativeElement , 'width' , this.inputWidth + 'px' );
        //this.el.nativeElement.className = this.tempClassNames;
        this.updateValitators();
        this.addDelayedValidation();
        this.setDefaultValue();
        this._cd.detectChanges();
        // Artifically inject the data-automation-id into the internals of @angular-material md-input
        this.renderer.setElementAttribute( this.el.nativeElement.querySelector( 'input' ) , 'data-automation-id' , 'text_' + this._id );
        // Artifically inject the placeholder property into the input element of the md-input directive.
        this.renderer.setElementAttribute( this.el.nativeElement.querySelector( 'input' ) , 'placeholder' , this.placeholder );
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

    get disabled () {
        return this._disabled;
    }

    set disabled ( value : boolean ) {
        this._disabled = this.isTrue( value );
        this.updateValitators();
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

    get valMinDate () {
        return this._valMinDate;
    }

    set valMinDate ( value : any ) {
        value            = (value === 'now' ? 0 : value);
        this._valMinDate = value;
        this.updateValitators();
    }

    get valMaxDate () {
        return this._valMaxDate;
    }

    set valMaxDate ( value : any ) {
        value            = (value === 'now' ? 0 : value);
        this._valMaxDate = value;
        this.updateValitators();
    }

    get valMaxFloat () {
        return this._valMaxFloat;
    }

    set valMaxFloat ( value : any ) {
        this._valMaxFloat = value;
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

    private onFocused ( event ) {
        this.markControlAsUntouched();
        this.checkErrors();
        this.resetIdleTimeOut();
        this.onFocus.emit( event );
    }

    private initiateInputWidth () {
        this.renderer.setElementStyle( this.el.nativeElement , 'width' , this.inputWidth + 'px' );
    }

    private shrink () {
        let offset = 5;
        if ( this.currency ) {
            offset = 25;
        }
        this.renderer.setElementStyle( this.el.nativeElement , 'width' , this.el.nativeElement.children[ 1 ].offsetWidth + offset + 'px' );
    }

    private trimValue ( $event ) {
        this.checkErrors();
        setTimeout( ()=> {
            this.removeIdleAndMakeInUntouched();
        } );
        let notUsable;
        if ( this.parentControl.value ) {
            this.parentControl.updateValue( this.parentControl.value.trim() );
            notUsable = this.tolowerCase ? this.parentControl.updateValue( this.parentControl.value.toLowerCase() ) : '';
            notUsable = this.toupperCase ? this.parentControl.updateValue( this.parentControl.value.toUpperCase() ) : '';
        }
        this.onBlur.emit( $event );
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
    }

    private onKeyupEvent ( $event ) {
        this.onEnterClick( $event );
        this.onKeyup.emit( $event );
    }

    private addDelayedValidation () {
        if ( this.validationDelay > 0 ) {
            this.parentControl
                .valueChanges
                .debounceTime( this.validationDelay )
                .subscribe( ( changes )=> {
                    if ( changes ) {
                        this.resetIdleTimeOut();
                        this.checkErrors();
                    }
                } );
        } else {
            this.parentControl
                .valueChanges
                .subscribe( ( changes )=> {
                    if ( changes ) {
                        this.resetIdleTimeOut();
                        this.checkErrors();
                    }
                } );
        }
        this.checkErrors();
    }

    private updateValitators () {
        let validators = [
            RequiredValidator.requiredValidation( this._required ) ,
            MinLengthValidator.minLengthValidation( this._valMinLength ) ,
            MaxLengthValidator.maxLengthValidation( this._valMaxLength ) ,
            MaxDateValidator.maxDateValidator( this._valMaxDate , this.valPattern ) ,
            MinDateValidator.minDateValidator( this._valMinDate , this.valPattern ) ,
            PatterValidator.patternValidator( this.valPattern ) ,
            MaxFloatValidator.maxFloatValidator( this._valMaxFloat ) ,
            this.customValidator()
        ];
        this.validate  = Validators.compose( validators );
    }

    private resetIdleTimeOut () {
        this.markControlAsUntouched();
        clearTimeout( this.idleTimeoutId );
        this.idleTimeoutId = setTimeout( ()=> {
            this.parentControl.markAsTouched();
        } , this.idleTimeOut );
    }

    private removeIdleAndMakeInUntouched () {
        clearTimeout( this.idleTimeoutId );
        this.markControlAsUntouched();
        this.parentControl.markAsTouched();
    }

    private markControlAsUntouched () {
        (<any>this.parentControl)._touched = false;
    }

    public checkErrors () {
        this.parentControl.setErrors( this.validate( this.parentControl ) , { emitEvent : true } );
    }

    private setDefaultValue () {
        if ( this.defaultValue && this.parentControl ) {
            this.parentControl.updateValue( this.defaultValue );
        }
    }
}