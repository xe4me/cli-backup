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
import { Validators } from "angular2/src/common/forms/validators";
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
                            (click)='onSelect(button.value)' 
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
        'autoSelectOnOne'
    ] ,
    styles     : [ require( './amp-radio-button-group.scss' ).toString() ] ,
    directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
    outputs    : [ 'select' ]
} )
export class AmpRadioButtonGroupComponent {
    private parentControl : Control;
    private select = new EventEmitter<string>();
    private buttons;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private groupName : string;

    constructor ( private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    private onSelect ( value ) {
        this.select.emit( value + '' );
        if ( this.scrollOutUnless && value !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem );
        } else if ( this.scrollOutOn && value === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem );
        }
    }

    // set required ( val : string ) {
    //     console.log( 'required changed' , val );
    //     console.log( 'this.parentControl' , this.parentControl );
    //     if ( val === 'true' && this.parentControl ) {
    //         this.parentControl.validator = Validators.required;
    //     }
    // }
}


