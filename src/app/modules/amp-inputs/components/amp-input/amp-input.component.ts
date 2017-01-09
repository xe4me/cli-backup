import {
    ElementRef,
    Component,
    ChangeDetectorRef,
    AfterViewInit,
    EventEmitter,
    Renderer,
    ChangeDetectionStrategy,
    ViewChild
} from '@angular/core';
import {
    RequiredValidator,
    MinLengthValidator,
    MaxLengthValidator,
    DateValidator,
    MaxDateValidator,
    MinDateValidator,
    MinAgeValidator,
    MaxAgeValidator,
    PatterValidator,
    MaxFloatValidator
} from '../../../amp-utils';
import { Validators } from '@angular/forms';
import { BaseControl } from '../../../../base-control';
@Component(
    {
        selector        : 'amp-input',
        template        : require( './amp-input.component.html' ),
        styles          : [ require( './amp-input.component.scss' ) ],
        queries         : {
            inputCmp : new ViewChild( 'input' ),
        },
        inputs          : [
            'errors',
            'id',
            'controlGroup',
            'type',
            'defaultValue',
            'index',
            'customValidator',
            'isInSummaryState',
            'showErrorComponent',
            'disabled',
            'label',
            'placeholder',
            'maxLength',
            'minLength',
            'pattern',
            'maxDate',
            'minDate',
            'minAge',
            'maxAge',
            'maxFloat',
            'valDate',
            'minFloat',
            'tabindex',
            'isActive',
            'required',
            'tolowerCase',
            'idleTimeOut',
            'toupperCase',
            'currency',
            'iconRight',
            'labelHidden',
            'keepControl',
            'showIconRight',
            'iconRightClickHandler',
            'autoComplete',
            'showOptional'
        ],
        outputs         : [ 'onBlur', 'onFocus' ],
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpInputComponent extends BaseControl implements AfterViewInit {
    public inputCmp : ElementRef;
    public doOnBlurDirty              = true;
    protected type : string           = 'text';
    protected _minLength : number;
    protected _maxLength : number;
    protected _maxDate : string;
    protected _minDate : string;
    protected _minAge : number;
    protected _maxAge : number;
    protected _maxFloat : number;
    protected _minFloat : number;
    protected _valDate : boolean;
    protected _pattern : string;
    protected label : string          = '';
    protected tolowerCase : boolean   = false;
    protected toupperCase : boolean   = false;
    protected iconRight : boolean     = false;
    protected isActive : boolean      = true;
    protected showIconRight : boolean = true;
    protected tabindex : any          = null;
    protected defaultValue : any      = null;
    protected currency : string       = null;
    protected placeholder : string;
    protected onBlur : EventEmitter<any>;
    protected onFocus : EventEmitter<any>;
    protected labelHidden : boolean   = false;
    protected idleTimeOut             = 4500;
    protected idleTimeoutId;
    protected autoComplete : string   = 'off';
    protected iconRightClickHandler;
    protected showOptional            = true;

    constructor ( private _cd : ChangeDetectorRef,
                  protected el : ElementRef,
                  protected renderer : Renderer ) {
        super();
        this.onBlur  = new EventEmitter();
        this.onFocus = new EventEmitter();
    }

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this._required ),
                MinLengthValidator.minLengthValidation( this._minLength ),
                MaxLengthValidator.maxLengthValidation( this._maxLength ),
                MaxDateValidator.maxDateValidator( this._maxDate, this.pattern ),
                MinDateValidator.minDateValidator( this._minDate, this.pattern ),
                MinAgeValidator.minAgeValidator( this._minAge, this.pattern ),
                MaxAgeValidator.maxAgeValidator( this._maxAge, this.pattern ),
                PatterValidator.patternValidator( this.pattern ),
                MaxFloatValidator.maxFloatValidator( this._maxFloat ),
                DateValidator.dateValidator( this._valDate, this.pattern ),
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { onlySelf : false } );
        }
    }

    handleIconRightClick () {
        if ( this.iconRightClickHandler ) {
            this.doOnBlurDirty = false;
            this.iconRightClickHandler( this.inputCmp, this.control );
        }
    }

    ngAfterViewInit () : any {
        this.updateValidators();
        this.addDelayedValidation();
        this.setDefaultValue();
        this._cd.detectChanges();
        this._cd.markForCheck();
        return undefined;
    }

    public checkErrors ( killTimer = false ) {
        if ( this.control ) {
            this.control.updateValueAndValidity( {
                emitEvent : false,
                onlySelf  : false
            } );
            if ( killTimer ) {
                clearTimeout( this.idleTimeoutId );
            }
        }
    }

    public markControlAsDirty () {
        this.control.markAsDirty( {
            onlySelf : false
        } );
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
                value = -1;
                break;
            case 'now':
                value = 0;
                break;
            case 'today':
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

    get minAge () {
        return this._minAge;
    }

    set minAge ( value : any ) {
        this._minAge = parseInt( value, 10 );
        this.updateValidators();
    }

    get maxAge () {
        return this._maxAge;
    }

    set maxAge ( value : any ) {
        this._maxAge = parseInt( value, 10 );
        this.updateValidators();
    }

    get maxFloat () {
        return this._maxFloat;
    }

    set maxFloat ( value : any ) {
        this._maxFloat = value;
        this.updateValidators();
    }

    get isItDisabled () {
        return ( this.disabled || this.isInSummaryState ) ? true : null;
    }

    protected onFocused ( event ) {
        this.resetIdleTimeOut();
        this.doOnBlurDirty = true;
        this.onFocus.emit( event );
    }

    protected onInput ( event ) {
        let value = event.target.value;
        if ( value && this.maxLength > 0 && value.length === this.maxLength ) {
            this.markControlAsDirty();
        }
    }

    protected onBlured ( $event ) {
        clearTimeout( this.idleTimeoutId );
        setTimeout( () => {
            if ( this.doOnBlurDirty ) {
                this.markControlAsDirty();
                this._cd.markForCheck();
            }
        }, 100 );
        let notUsable;
        if ( this.control.value && isNaN( this.control.value ) ) {
            this.inputCmp.nativeElement.value = this.control.value.trim();
            notUsable           = this.tolowerCase ? this.control.setValue( this.control.value.toLowerCase() ) : '';
            notUsable           = this.toupperCase ? this.control.setValue( this.control.value.toUpperCase() ) : '';
        }
        this.onBlur.emit( $event );

    }

    protected addDelayedValidation () {
        this.control
            .valueChanges
            .subscribe( ( changes ) => {
                this.resetIdleTimeOut();
            } );
    }

    protected resetIdleTimeOut () {
        this.markControlAsUndirty();
        clearTimeout( this.idleTimeoutId );
        this.idleTimeoutId = setTimeout( () => {
            if ( this.control.value ) {
                this.markControlAsDirty();
                this._cd.markForCheck();
            }
        }, this.idleTimeOut );
    }

    protected markControlAsUndirty () {
        this.control.markAsPristine( {
            onlySelf : false
        } );
    }

    protected setDefaultValue () {
        if ( this.defaultValue && this.control ) {
            this.control.setValue( this.defaultValue );
        }
    }

    protected controlIsEmpty () {
        return !this.control.value && this.control.value !== 'false' && this.control.value !== 0;
    }

    protected markAsTouched () {
        this.control.markAsTouched();
    }
}
