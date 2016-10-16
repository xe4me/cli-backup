import {
    ElementRef ,
    OnChanges ,
    Component ,
    ViewEncapsulation ,
    ChangeDetectorRef ,
    AfterViewInit ,
    EventEmitter ,
    Renderer , OnInit , ChangeDetectionStrategy , ViewChild
} from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
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
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { addDashOrNothing } from '../../../amp-utils/functions.utils';
@Component(
    {
        selector        : 'amp-input' ,
        template        : require( './amp-input.component.html' ) ,
        styles          : [ require( './amp-input.component.scss' ).toString() ] ,
        inputs          : [
            'id' ,
            'type' ,
            'defaultValue' ,
            'errors' ,
            'customValidator' ,
            'disabled' ,
            'isInSummaryState' ,
            'label' ,
            'controlGroup' ,
            'placeholder' ,
            'maxLength' ,
            'minLength' ,
            'pattern' ,
            'index' ,
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
            'labelHidden'
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
export class AmpInputComponent implements AfterViewInit, OnChanges, OnInit {
    @ViewChild( 'input' ) inputCmp;
    public control : FormControl         = new FormControl();
    public errors                        = {};
    public controlGroup : FormGroup;
    protected inputWidth : number;
    protected _id : string               = 'default';
    protected type : string              = 'text';
    protected _minLength : number;
    protected _maxLength : number;
    protected _maxDate : string;
    protected _minDate : string;
    protected _maxFloat : number;
    protected _minFloat : number;
    protected _valDate : boolean;
    protected _required : boolean        = false;
    protected _disabled : boolean        = false;
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
    protected index;

    constructor ( private _cd : ChangeDetectorRef ,
                  protected el : ElementRef ,
                  protected renderer : Renderer ) {
        this.onAdjustWidth = new EventEmitter();
        this.onEnter       = new EventEmitter();
        this.onBlur        = new EventEmitter();
        this.onFocus       = new EventEmitter();
        this.onKeyup       = new EventEmitter();
    }

    ngOnInit () : any {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i ) => {
            (<any> this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
        return undefined;
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
        this.updateValitators();
        this.addDelayedValidation();
        this.setDefaultValue();
        // Artificially inject the data-automation-id into the internals of @angular-material md-input
        this.renderer.setElementAttribute( this.el.nativeElement.querySelector( 'input' ) , 'data-automation-id' , 'text_' + this.id );
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
        this.control.setErrors( this.validate( this.control ) , { emitEvent : true } );
        if ( killTimer ) {
            clearTimeout( this.idleTimeoutId );
        }
        this._cd.markForCheck();
    }

    set customValidator ( customValidator : Function ) {
        this._customValidator = customValidator;
        this.updateValitators();
    }

    get customValidator () {
        return this._customValidator;
    }

    get disabled () {
        return this._disabled;
    }

    set disabled ( value : boolean ) {
        this._disabled = this.isTrue( value );
        this.updateValitators();
    }

    get pattern () {
        return this._pattern;
    }

    set pattern ( value : string ) {
        this._pattern = value;
        this.updateValitators();
    }

    get required () {
        return this._required;
    }

    set required ( value : boolean ) {
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    get minLength () {
        return this._minLength;
    }

    set minLength ( value : number ) {
        this._minLength = value;
        this.updateValitators();
    }

    set valDate ( value : boolean ) {
        this._valDate = value;
        this.updateValitators();
    }

    get maxLength () {
        return this._maxLength;
    }

    set maxLength ( value : number ) {
        this._maxLength = value;
        this.updateValitators();
    }

    set id ( value ) {
        this._id = value;
    }

    get id () {
        return this._id + addDashOrNothing( this.index );
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
        this.updateValitators();
    }

    get maxDate () {
        return this._maxDate;
    }

    set maxDate ( value : any ) {
        this._maxDate = this.humanDate( value );
        this.updateValitators();
    }

    get maxFloat () {
        return this._maxFloat;
    }

    set maxFloat ( value : any ) {
        this._maxFloat = value;
        this.updateValitators();
    }

    // set autoFocus ( value : boolean ) {
    //     if ( this.isTrue( value ) && this.el ) {
    //         let input = this.el.nativeElement.querySelector( 'input' );
    //         input.focus();
    //     }
    // }
    protected _customValidator : Function = () => {
    };

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

    protected isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
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

    protected updateValitators () {
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
