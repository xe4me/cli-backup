import {
    Component ,
    EventEmitter ,
    Directive ,
    Renderer ,
    ElementRef ,
    forwardRef ,
    Provider ,
    ChangeDetectorRef ,
    AfterViewInit , OnDestroy
} from '@angular/core';
import { Validators , Control , FORM_DIRECTIVES , NG_VALUE_ACCESSOR , ControlValueAccessor } from '@angular/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { isPresent } from '@angular/core/src/facade/lang';
const RADIO_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR , { useExisting : forwardRef( () => RadioControlValueAccessors ) , multi : true } );
@Directive( {
    selector  : 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]' ,
    host      : { '(change)' : 'onChange($event.target.value)' , '(blur)' : 'onTouched()' } ,
    providers : [ RADIO_VALUE_ACCESSOR ]
} )
 class RadioControlValueAccessors implements ControlValueAccessor {
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
        <div  *ngFor='let button of buttons' class='amp-radio-button-group'>
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
                    (click)='onSelect($event , button.value , true)'
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
        '[attr.aria-disabled]' : 'disabled'
    } ,
    styles     : [ require( './amp-radio-button-group.scss' ).toString() ] ,
    directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
    outputs    : [ 'select' ]
} )
export class AmpRadioButtonGroupComponent implements AfterViewInit, OnDestroy {
    private _selected : string     = null;
    private _disabled : boolean    = false;
    private _required : boolean    = false;
    private parentControl : Control;
    private select                 = new EventEmitter<any>();
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
        if ( this.isTrue( select ) && this.parentControl && this.buttons.length === 1 ) {
            this.parentControl.updateValue( this.buttons[ 0 ].value );
        }
    }

    ngOnDestroy () : any {
        this.parentControl.validator = null;
        this.parentControl.updateValueAndValidity( {
            onlySelf  : false ,
            emitEvent : true
        } );
        return undefined;
    }

    ngAfterViewInit () : any {
        this.parentControl.valueChanges.subscribe( ( changes ) => {
            this.onSelect( null , changes , false );
        } );
        this.updateValitators();
        this.changeDetector.detectChanges();
        return undefined;
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

    private onSelect ( $event , value , shouldScroll ) {
        if ( this.disabled === true ) {
            if ( $event !== null ) {
                $event.stopPropagation();
            }
            return;
        }
        if ( this.previousValue !== value ) {
            this.previousValue = value;
            this.select.emit( value + '' );
        }
        if ( !shouldScroll ) {
            return;
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
