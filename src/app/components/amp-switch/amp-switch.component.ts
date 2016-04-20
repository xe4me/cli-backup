import { Component } from 'angular2/core';
import { Control } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from "angular2/src/common/forms/directives";
import { Directive , Renderer , ElementRef , Self , forwardRef , Provider } from 'angular2/core';
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
        console.log( 'this._elementRef.nativeElement.value' , this._elementRef.nativeElement.value );
    }

    writeValue ( value : any ) : void {
        this._renderer.setElementProperty( this._elementRef , 'checked' , value == this._elementRef.nativeElement.value );
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
                [disabled]='disabled'
                [required]='required'
                [attr.data-automation-id]='"radio_" + yesId'
                type='radio'
                [attr.id]='yesId'
                [attr.name]='radioName'
                [ngFormControl]='parentControl'
                value="true"
                />
          <label [attr.for]='yesId'>{{ yesLabel }}</label>
          <input
                [disabled]='disabled'
                [required]='required'
                [attr.data-automation-id]='"radio_" + noId'
                type='radio'
                [attr.id]='noId'
                [attr.name]='radioName'
                [ngFormControl]='parentControl'
                value="false"
                />
          <label [attr.for]='noId'>{{ noLabel }}</label>
    </div>
                ` ,
                inputs     : [
                    'required' ,
                    'disabled' ,
                    'radioName' ,
                    'yesLabel' ,
                    'yesId' ,
                    'noLabel' ,
                    'noId' ,
                    'parentControl'
                ] ,
                styles     : [ require( './amp-switch.scss' ).toString() ] ,
                directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ]
            } )
export class AmpSwitchComponent {
    private yesId : string;
    private yesLabel : string;
    private radioName : string;
    private parentControl : Control;
    private noId : string;
    private noLabel : string;

    constructor () {
    }
}


