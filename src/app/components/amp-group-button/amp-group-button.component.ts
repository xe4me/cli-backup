import {
    Component ,
    EventEmitter ,
    Directive ,
    Renderer ,
    ElementRef ,
    forwardRef ,
    ChangeDetectorRef ,
    Provider
} from '@angular/core';
import { Validators , FORM_DIRECTIVES , Control , NG_VALUE_ACCESSOR , ControlValueAccessor } from '@angular/common';
import { isPresent } from '@angular/core/src/facade/lang';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
const RADIO_VALUE_ACCESSOR = new Provider( NG_VALUE_ACCESSOR ,
    { useExisting : forwardRef( () => RadioControlValueAccessors ) , multi : true } );
@Directive( {
    selector  : 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]' ,
    host      : {
        '(change)' : 'onChange($event.target.value)' ,
        '(blur)'   : 'onTouched()'
    } ,
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
    selector   : 'amp-group-button' ,
    template   : `
                <div class='amp-group-button'>
                    <span *ngFor='let button of buttons'>
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

                            <label (click)='onSelect(button.value , true)' [attr.for]='button.id'>{{ button.label }}
                            </label>

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
    private _disabled : boolean = false;
    private _required : boolean = false;
    private buttons;
    private scrollOutUnless : string;
    private scrollOutOn : string;
    private groupName : string;
    private select              = new EventEmitter<any>();

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
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
            this.onSelect( changes , false );
        } );
        this.updateValidators();
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
        setTimeout( () => {
            this._required = this.isTrue( value );
            this.updateValidators();
            this.changeDetector.detectChanges();
        } , 0 );
    }

    private onSelect ( value , shouldScroll ) {
        this.select.emit( value + '' );
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

    private updateValidators () {
        if ( this.parentControl ) {
            this.parentControl.validator = this.isTrue( this.required ) ? Validators.required : null;
            this.parentControl.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }
}
