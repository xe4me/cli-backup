import { Control } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from 'angular2/src/common/forms/directives';
import {
    Component ,
    EventEmitter ,
    Directive ,
    Renderer ,
    ElementRef ,
    forwardRef ,
    Provider
} from 'angular2/core';
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
                selector   : 'amp-switch' ,
                template   : `
                <div class='amp-switch'>
                      <input
                            #input1
                            [disabled]='disabled'
                            [required]='required'
                            [attr.data-automation-id]='"radio_" + yesId'
                            type='radio'
                            [attr.id]='yesId'
                            [attr.name]='name'
                            [ngFormControl]='parentControl'
                            value='true'
                            />
                      <label (click)="clicked.emit(input1.value)" [attr.for]='yesId'>{{ yesLabel }}
                      </label>
                      <input
                            #input2
                            [disabled]='disabled'
                            [required]='required'
                            [attr.data-automation-id]='"radio_" + noId'
                            type='radio'
                            [attr.id]='noId'
                            [attr.name]='name'
                            [ngFormControl]='parentControl'
                            value='false'
                            />
                      <label (click)="clicked.emit(input2.value)" [attr.for]='noId'>{{ noLabel }}</label>
                </div>
                ` ,
                inputs     : [
                    'required' ,
                    'disabled' ,
                    'name' ,
                    'yesLabel' ,
                    'yesId' ,
                    'noLabel' ,
                    'noId' ,
                    'parentControl'
                ] ,
                styles     : [ require( './amp-switch.scss' ).toString() ] ,
                directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
                outputs    : [ 'clicked' ]
            } )
export class AmpSwitchComponent {
    private yesId : string;
    private yesLabel : string;
    private name : string;
    private parentControl : Control;
    private noId : string;
    private noLabel : string;
    private clicked = new EventEmitter();

    constructor () {
    }
}


