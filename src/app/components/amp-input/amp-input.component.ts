import {
    ElementRef ,
    OnChanges ,
    Component ,
    ViewEncapsulation ,
    ChangeDetectorRef ,
    AfterViewInit ,
    EventEmitter ,
    Renderer , OnInit , ChangeDetectionStrategy
} from '@angular/core';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
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
} from '../../util/validations';
import { FormGroup , FormControl , Validators } from "@angular/forms";
@Component(
    {
        selector        : 'amp-input' ,
        template        : `
            <md-input
                #myMdInput
                (focus)='onFocused($event)'
                (keyup)='onKeyupEvent($event)'
                (blur)='trimValue($event)'
                [disabled]='isInSummaryState || disabled'
                class='md-input'
                [class.label-hidden]='labelHidden'
                [aria-label]='id'
                [name]='id'
                [id]='id'
                [tabIndex]='isActive?tabindex:-1'
                [maxLength]='maxLength'
                [formControl]='control'
                [placeholder]='label'>
                  <span class="currency" *ngIf='currency' md-prefix>{{currency}}&nbsp;</span>
            </md-input>
            <span *ngIf='iconRight && !isInSummaryState' class="icon icon--search icon-right"></span>
            <span
                class='summary-text'
                [innerHTML]='myMdInput.value'>
            </span>
          ` ,
        styles          : [ require( './amp-input.scss' ).toString() ] ,
        inputs          : [
            'id' ,
            'defaultValue' ,
            'errors' ,
            'customValidator' ,
            'disabled' ,
            'isInSummaryState' ,
            'label' ,
            'controlGroup' ,
            'placeholder' ,
            'visibility' ,
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
            'labelHidden'
        ] ,
        directives      : [ MD_INPUT_DIRECTIVES ] ,
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
    public control : FormControl = new FormControl();
    public errors                = {};

    ngOnInit () : any {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i )=> {
            (<any>this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
        return undefined;
    }

    public controlGroup : FormGroup;
    private inputWidth : number;
    private id : string;
    private _minLength : number;
    private _maxLength : number;
    private _maxDate : string;
    private _minDate : string;
    private _maxFloat : number;
    private _minFloat : number;
    private _valDate : boolean;
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
    private pattern : string;
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
        this.renderer.setElementAttribute( this.el.nativeElement.querySelector( 'input' ) , 'data-automation-id' , 'text_' + this.id );
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

    get minDate () {
        return this._minDate;
    }

    set minDate ( value : any ) {
        value         = (value === 'now' ? 0 : value);
        this._minDate = value;
        this.updateValitators();
    }

    get maxDate () {
        return this._maxDate;
    }

    set maxDate ( value : any ) {
        value         = (value === 'now' ? 0 : value);
        this._maxDate = value;
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
        if ( this.control.value ) {
            this.control.setValue( this.control.value.trim() );
            notUsable = this.tolowerCase ? this.control.setValue( this.control.value.toLowerCase() ) : '';
            notUsable = this.toupperCase ? this.control.setValue( this.control.value.toUpperCase() ) : '';
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
            this.control
                .valueChanges
                .debounceTime( this.validationDelay )
                .subscribe( ( changes )=> {
                    if ( changes ) {
                        this.resetIdleTimeOut();
                        this.checkErrors();
                    }
                } );
        } else {
            this.control
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
    }

    private resetIdleTimeOut () {
        this.markControlAsUntouched();
        clearTimeout( this.idleTimeoutId );
        this.idleTimeoutId = setTimeout( ()=> {
            this.control.markAsTouched();
        } , this.idleTimeOut );
    }

    private removeIdleAndMakeInUntouched () {
        clearTimeout( this.idleTimeoutId );
        this.markControlAsUntouched();
        this.control.markAsTouched();
    }

    private markControlAsUntouched () {
        (<any>this.control)._touched = false;
    }

    public checkErrors () {
        this.control.setErrors( this.validate( this.control ) , { emitEvent : true } );
    }

    private setDefaultValue () {
        if ( this.defaultValue && this.control ) {
            this.control.setValue( this.defaultValue );
        }
    }
}
