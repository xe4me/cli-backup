import {
    ElementRef ,
    OnChanges ,
    Component ,
    ViewEncapsulation ,
    ChangeDetectorRef ,
    AfterViewInit ,
    EventEmitter ,
    Renderer ,
    ChangeDetectionStrategy ,
    ViewChild
} from '@angular/core';
import {
    RequiredValidator ,
    MinLengthValidator ,
    MaxLengthValidator ,
    DateValidator ,
    MaxDateValidator ,
    MinDateValidator ,
    PatterValidator ,
    MaxFloatValidator
} from '../../../amp-utils';
import { Validators } from '@angular/forms';
import { BaseControl } from '../../../../base-control';
@Component(
    {
        selector        : 'amp-input' ,
        template        : require( './amp-input.component.html' ) ,
        styles          : [ require( './amp-input.component.scss' ).toString() ] ,
        inputs          : [
            'errors' ,
            'id' ,
            'controlGroup' ,
            'type' ,
            'defaultValue' ,
            'index' ,
            'customValidator' ,
            'isInSummaryState' ,
            'disabled' ,
            'label' ,
            'placeholder' ,
            'maxLength' ,
            'minLength' ,
            'pattern' ,
            'maxDate' ,
            'minDate' ,
            'maxFloat' ,
            'valDate' ,
            'minFloat' ,
            'tabindex' ,
            'isActive' ,
            'required' ,
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
            'labelHidden' ,
            'keepControl' ,
            'autoComplete'
        ] ,
        encapsulation   : ViewEncapsulation.None ,
        outputs         : [ 'onEnter' , 'onBlur' , 'onKeyup' ] ,
        host            : {
            '[class.md-input-has-value]' : 'control.value' ,
            '[class.summary]'            : 'isInSummaryState' ,
            '[class.noPadding]'          : 'noPadding'
        } ,
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpInputComponent extends BaseControl implements AfterViewInit, OnChanges {
    @ViewChild( 'input' ) inputCmp;
    protected inputWidth : number;
    protected type : string              = 'text';
    protected _minLength : number;
    protected _maxLength : number;
    protected _maxDate : string;
    protected _minDate : string;
    protected _maxFloat : number;
    protected _minFloat : number;
    protected _valDate : boolean;
    protected _pattern : string;
    protected label : string;
    protected isInSummaryState : boolean = false;
    protected showLabel : boolean        = true;
    protected tolowerCase : boolean      = false;
    protected toupperCase : boolean      = false;
    protected iconRight : boolean        = false;
    protected isActive : boolean         = true;
    protected tabindex : any             = null;
    protected defaultValue : any         = null;
    protected currency : string          = null;
    protected placeholder : string;
    protected onAdjustWidth : EventEmitter<any>;
    protected hostClassesRemove;
    protected tempClassNames;
    protected onEnter : EventEmitter<any>;
    protected onBlur : EventEmitter<any>;
    protected onFocus : EventEmitter<any>;
    protected onKeyup : EventEmitter<any>;
    protected labelHidden : boolean      = false;
    protected validate;
    protected validationDelay            = 0;
    protected idleTimeOut                = 4500;
    protected idleTimeoutId;
    protected autoComplete : string      = 'off';

    constructor ( private _cd : ChangeDetectorRef ,
                  protected el : ElementRef ,
                  protected renderer : Renderer ) {
        super();
        this.onAdjustWidth = new EventEmitter();
        this.onEnter       = new EventEmitter();
        this.onBlur        = new EventEmitter();
        this.onFocus       = new EventEmitter();
        this.onKeyup       = new EventEmitter();
    }

    updateValidators () {
        let validators = [
            RequiredValidator.requiredValidation( this._required ) ,
            MinLengthValidator.minLengthValidation( this._minLength ) ,
            MaxLengthValidator.maxLengthValidation( this._maxLength ) ,
            MaxDateValidator.maxDateValidator( this._maxDate , this.pattern ) ,
            MinDateValidator.minDateValidator( this._minDate , this.pattern ) ,
            PatterValidator.patternValidator( this.pattern ) ,
            MaxFloatValidator.maxFloatValidator( this._maxFloat ) ,
            DateValidator.dateValidator( this._valDate , this.pattern ) ,
            this.customValidator()
        ];
        this.validate  = Validators.compose( validators );
        this.checkErrors( true );
    }

    ngAfterViewInit () : any {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if ( this.inputWidth === 0 ) {
            this.inputWidth = 300;
        }
        this.tempClassNames = this.el.nativeElement.className;
        // this.renderer.setElementAttribute( this.el.nativeElement , 'class' , '' );
        // this.renderer.setElementStyle( this.el.nativeElement , 'width' , this.inputWidth + 'px' );
        // this.el.nativeElement.className = this.tempClassNames;
        this.updateValidators();
        this.addDelayedValidation();
        this.setDefaultValue();
        // Artificially inject the data-automation-id into the internals of @angular-material md-input
        this.renderer.setElementAttribute( this.el.nativeElement.querySelector( 'input' ) , 'data-automation-id' , 'text_' + this.randomizedId );
        // Artificially inject the placeholder property into the input element of the md-input directive.
        this.renderer.setElementAttribute( this.el.nativeElement.querySelector( 'input' ) , 'placeholder' , this.placeholder );
        this._cd.detectChanges();
        this._cd.markForCheck();
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

    public checkErrors ( killTimer = false ) {
        if ( this.control ) {
            this.control.setErrors( this.validate( this.control ) , { emitEvent : true } );
            if ( killTimer ) {
                clearTimeout( this.idleTimeoutId );
            }
            this._cd.markForCheck();
        }
    }

    get pattern () {
        return this._pattern;
    }

    set pattern ( value : string ) {
        this._pattern = value;
        this.updateValidators();
    }

    get minLength () {
        return this._minLength;
    }

    set minLength ( value : number ) {
        this._minLength = value;
        this.updateValidators();
    }

    set valDate ( value : boolean ) {
        this._valDate = value;
        this.updateValidators();
    }

    get maxLength () {
        return this._maxLength;
    }

    set maxLength ( value : number ) {
        this._maxLength = value;
        this.updateValidators();
    }

    protected humanDate ( value : any ) {
        switch ( value ) {
            case 'yesterday':
                value = - 1;
                break;
            case 'now':
                value = 0;
                break;
            case 'tomorrow':
                value = 1;
                break;
            default:
                value = value;
        }
        return value;
    }

    get minDate () {
        return this._minDate;
    }

    set minDate ( value : any ) {
        this._minDate = this.humanDate( value );
        this.updateValidators();
    }

    get maxDate () {
        return this._maxDate;
    }

    set maxDate ( value : any ) {
        this._maxDate = this.humanDate( value );
        this.updateValidators();
    }

    get maxFloat () {
        return this._maxFloat;
    }

    set maxFloat ( value : any ) {
        this._maxFloat = value;
        this.updateValidators();
    }

    protected onEnterClick ( event ) {
        if ( event.keyCode === 13 ) {
            this.onEnter.emit( 'enter' );
        }
    }

    protected onFocused ( event ) {
        this.resetIdleTimeOut();
        this.onFocus.emit( event );
    }

    protected initiateInputWidth () {
        this.renderer.setElementStyle( this.el.nativeElement , 'width' , this.inputWidth + 'px' );
    }

    protected shrink () {
        let offset = 5;
        if ( this.currency ) {
            offset = 25;
        }
        this.renderer.setElementStyle( this.el.nativeElement , 'width' , this.el.nativeElement.children[ 1 ].offsetWidth + offset + 'px' );
    }

    protected onBlured ( $event ) {
        this.checkErrors();
        setTimeout( () => {
            this.removeIdleAndMarkAsTouched();
            this._cd.markForCheck();
        } );
        let notUsable;
        if ( this.control.value && isNaN( this.control.value ) ) {
            this.inputCmp.value = this.control.value.trim();
            notUsable           = this.tolowerCase ? this.control.setValue( this.control.value.toLowerCase() ) : '';
            notUsable           = this.toupperCase ? this.control.setValue( this.control.value.toUpperCase() ) : '';
        }
        this.onBlur.emit( $event );
    }

    protected onKeyupEvent ( $event ) {
        this.onEnterClick( $event );
        this.onKeyup.emit( $event );
    }

    protected addDelayedValidation () {
        this.control
            .valueChanges
            .subscribe( ( changes ) => {
                this.resetIdleTimeOut();
            } );
        this.checkErrors();
    }

    protected resetIdleTimeOut () {
        this.checkErrors();
        this.markControlAsUntouched();
        clearTimeout( this.idleTimeoutId );
        this.idleTimeoutId = setTimeout( () => {
            this.markControlAsTouched();
            this._cd.markForCheck();
        } , this.idleTimeOut );
    }

    protected removeIdleAndMarkAsTouched () {
        clearTimeout( this.idleTimeoutId );
        this.markControlAsTouched();
    }

    protected markControlAsUntouched () {
        this.control.markAsUntouched( {
            onlySelf : false
        } );
    }

    protected markControlAsTouched () {
        this.control.markAsTouched( {
            onlySelf : false
        } );
    }

    protected setDefaultValue () {
        if ( this.defaultValue && this.control ) {
            this.control.setValue( this.defaultValue );
        }
    }
}
