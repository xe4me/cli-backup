import {
    Component ,
    EventEmitter ,
    Directive ,
    Renderer ,
    ElementRef ,
    forwardRef ,
    ChangeDetectorRef ,
    Provider , OnInit
} from '@angular/core';
import {
    Validators , FORM_DIRECTIVES , Control , NG_VALUE_ACCESSOR , ControlValueAccessor ,
    ControlGroup
} from '@angular/common';
import { isPresent } from '@angular/core/src/facade/lang';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import {
    RequiredValidator
} from '../../util/validations';
import { FormGroup , FormControl } from "@angular/forms";
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
    selector   : 'amp-group-buttons' ,
    template   : `
                <div class='amp-group-button'>
                    <span *ngFor='let button of buttons'>
                          <input
                                class="sr-only"
                                [disabled]='disabled'
                                [attr.data-automation-id]='"radio_button_" + button.id'
                                type='radio'
                                [attr.id]='button.id + index'
                                [attr.name]='id + index'
                                [formControl]='control'
                                [value]='button.value'
                                [checked]='control.value===button.value'
                                />

                            <label (click)='onSelect(button.value , true)' [attr.for]='button.id + index'>{{ button.label }}
                            </label>

                    </span>
                </div>
                ` ,
    inputs     : [
        'errors' ,
        'defaultValue' ,
        'isInSummaryState' ,
        'keepControlOnDestroy' ,
        'required' ,
        'scrollOutUnless' ,
        'scrollOutOn' ,
        'disabled' ,
        'controlGroup' ,
        'buttons' ,
        'groupName' ,
        'index'
    ] ,
    styles     : [ require( './amp-group-buttons.scss' ).toString() ] ,
    directives : [ FORM_DIRECTIVES , RadioControlValueAccessors ] ,
    outputs    : [ 'select' ]
} )
export class AmpGroupButtonsComponent implements OnInit {
    private controlGroup : FormGroup;
    private _disabled : boolean  = false;
    private _required : boolean  = false;
    private buttons;
    private keepControlOnDestroy = false;
    private scrollOutUnless : string;
    private scrollOutOn : string;
    private groupName : string;
    private defaultValue : string;
    private select               = new EventEmitter<any>();
    private index : string       = '';

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

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

    ngOnDestroy () : any {
        if ( ! this.keepControlOnDestroy ) {
            this.control.validator = null;
            this.control.updateValueAndValidity( {
                onlySelf  : false ,
                emitEvent : true
            } );
        }
        return undefined;
    }

    ngAfterViewInit () : any {
        this.control.valueChanges.subscribe( ( changes ) => {
            if ( changes )
                this.onSelect( changes , false );
        } );
        if ( this.defaultValue ) {
            this.control.updateValue( this.defaultValue );
        }
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

    get id () {
        return this.groupName;
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
        if ( ! shouldScroll ) {
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
        if ( this.control ) {
            this.control.validator = RequiredValidator.requiredValidation( this._required );
            this.control.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }
}
