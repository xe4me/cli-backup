import {
    Component ,
    EventEmitter ,
    Directive ,
    Renderer ,
    ElementRef ,
    forwardRef ,
    Provider
} from 'angular2/core';
import { Control } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from 'angular2/src/common/forms/directives';
import { NG_VALUE_ACCESSOR , ControlValueAccessor } from 'angular2/common';
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Validators } from 'angular2/src/common/forms/validators';
import { isPresent } from "angular2/src/facade/lang";
import { NumberWrapper } from "angular2/src/facade/lang";
import { AfterViewInit } from "angular2/src/core/linker/interfaces";
import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/constants";
import { OnChanges } from "angular2/src/core/linker/interfaces";
const RADIO_VALUE_ACCESSOR = CONST_EXPR( new Provider(
    NG_VALUE_ACCESSOR , { useExisting : forwardRef( () => RadioControlValueAccessors ) , multi : true } ) );
@Directive( {
    selector : 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]' ,
    host     : { '(change)' : 'onChange($event.target.value)' , '(blur)' : 'onTouched()' } ,
    bindings : [ RADIO_VALUE_ACCESSOR ]
} )
export class RadioControlValueAccessors implements ControlValueAccessor {
    onChange  = ( _ ) => {
    };
    onTouched = () => {
    };

    constructor ( private _renderer : Renderer , private _elementRef : ElementRef ) {
    }

    writeValue ( value : any ) : void {
        this._renderer.setElementProperty( this._elementRef , 'checked' , value === this._elementRef.nativeElement.value );
    }

    registerOnChange ( fn : ( _ : any ) => {} ) : void {
        this.onChange = fn;
    }

    registerOnTouched ( fn : () => {} ) : void {
        this.onTouched = fn;
    }
}
@Component( {
    selector   : 'amp-radio-button-group' ,
    template   : `
        <div  *ngFor='#button of buttons' class='amp-radio-button-group'>
              <input
                    [disabled]='disabled'
                    [attr.data-automation-id]='"radio_button_" + button.id'
                    type='radio'
                    [attr.id]='button.id'
                    [attr.name]='groupName'
                    [ngFormControl]='parentControl'
                    [value]='button.value'
                    [checked]='parentControl.value===button.value'
               />
              <label 
                    [class.checked]="parentControl.value===button.value" 
                    (click)='onSelect($event , button.value)' 
                    [attr.for]='button.id' class="root">
                    <div class="container">
                        <div class="off"></div>
                        <div class="on"></div>
                    </div>
                    <div class="label">
                        {{ button.label }}
                    </div>
              </label>
        </div>
                ` ,
    inputs     : [
        'required' ,
        'scrollOutUnless' ,
        'scrollOutOn' ,
        'disabled' ,
        'parentControl' ,
        'buttons' ,
        'groupName' ,
        'autoSelectOnOne' ,
        'selected'
    ] ,
    host       : {
        '[attr.aria-disabled]' : 'disabled' ,
        '[tabindex]'           : 'tabindex' ,
    } ,
    styles     : [ require( './amp-radio-button-group.scss' ).toString() ] ,
    directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
    outputs    : [ 'select' ]
} )
export class AmpRadioButtonGroupComponent implements AfterViewInit {
    private _selected : string     = null;
    private _disabled : boolean    = false;
    private _required : boolean    = false;
    private _tabindex : number;
    private parentControl : Control;
    private select                 = new EventEmitter<string>();
    private buttons;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private groupName : string;
    private previousValue : string = null;

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    private set selected ( selected : string ) {
        if ( isPresent( selected ) && this.parentControl ) {
            this._selected = selected;
            this.parentControl.updateValue( this._selected );
        }
    }

    private set autoSelectOnOne ( select : boolean ) {
        if ( this.isTrue( select ) && this.parentControl ) {
            this.parentControl.updateValue( this.buttons[ 0 ].value );
        }
    }

    ngAfterViewInit () : any {
        this.updateValitators();
        return undefined;
    }

    parseTabIndexAttribute ( attr : any ) : number {
        return isPresent( attr ) ? NumberWrapper.parseInt( attr , 10 ) : 0;
    }

    set tabindex ( value : number ) {
        this._tabindex = this.parseTabIndexAttribute( value );
    }

    get tabindex () : number {
        return this._tabindex;
    }

    get disabled () {
        return this._disabled;
    }

    set disabled ( value ) {
        this._disabled = this.isTrue( value );
    }

    get required () {
        return this._required;
    }

    set required ( value ) {
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    private onSelect ( $event , value ) {
        if ( this.disabled === true ) {
            $event.stopPropagation();
            return;
        }
        if ( this.previousValue !== value ) {
            this.previousValue = value;
            this.select.emit( value + '' );
        }
        if ( this.scrollOutUnless && value !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && value === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
    }

    private updateValitators () {
        if ( this.parentControl ) {
            this.parentControl.validator = this.isTrue( this.required ) ? Validators.required : null;
            this.parentControl.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }
}


