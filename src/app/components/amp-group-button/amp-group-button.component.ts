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
import { ChangeDetectionStrategy } from 'angular2/src/core/change_detection/constants';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { OnChanges , AfterViewInit } from 'angular2/src/core/linker/interfaces';
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
                                [attr.data-automation-id]='"radio_button_" + button.id'
                                type='radio'
                                [attr.id]='button.id'
                                [attr.name]='groupName'
                                [ngFormControl]='parentControl'
                                [value]='button.value'
                                [checked]='parentControl.value===button.value'
                                />
                          
                            <label (click)='onSelect(button.value)' [attr.for]='button.id'>{{ button.label }}</label>
                          
                    </span>
                </div>
                ` ,
    inputs     : [
        'required' ,
        'scrollOutUnless' ,
        'scrollOutOn' ,
        'disabled' ,
        'parentControl' ,
        'buttons' ,
        'groupName'
    ] ,
    styles     : [ require( './amp-group-button.scss' ).toString() ] ,
    directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
    outputs    : [ 'select' ]
} )
export class AmpGroupButtonComponent {
    private parentControl : Control;
    private buttons;
    private scrollOutUnless : string;
    private scrollOutOn : string;
    private groupName : string;
    private select = new EventEmitter<string>();

    constructor ( private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    private onSelect ( value ) {
        this.select.emit( value + '' );
        if ( this.scrollOutUnless && value !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && value === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }
}


