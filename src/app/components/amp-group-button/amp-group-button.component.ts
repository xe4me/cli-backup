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
                selector   : 'amp-group-button' ,
                template   : `
                <div class='amp-group-button'>
                    <span *ngFor='#button of buttons'>
                          <input
                                [disabled]='disabled'
                                [required]='required'
                                [attr.data-automation-id]='"radio_button_" + button'
                                type='radio'
                                [attr.id]='button'
                                [attr.name]='groupName'
                                [ngFormControl]='parentControl'
                                [value]='button'
                                />
                          <label (click)='onSelect(button)' [attr.for]='button'>{{ button }}
                          </label>
                    </span>
                </div>
                ` ,
                inputs     : [
                    'required' ,
                    'disabled' ,
                    'parentControl' ,
                    'buttons' ,
                    'groupName'
                ] ,
                styles     : [ require( './amp-group-button.scss' ).toString() ] ,
                directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
                outputs    : [ 'select' ]
            } )
export class AmpDropdownComponent {
    private parentControl : Control;
    private select = new EventEmitter<string>();
    private buttons;
    private groupName : string;

    private onSelect ( value ) {
        this.select.emit( value + '' );
    }
}


