import {
    EventEmitter ,
    ElementRef ,
    AfterViewInit ,
    Component ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy
} from '@angular/core';
import { Validators } from '@angular/forms';
import { RequiredValidator , MinLengthValidator , MaxLengthValidator } from '../../../../modules/amp-utils';
import { BaseControl } from '../../../../base-control';
@Component(
    {
        selector        : 'amp-textarea' ,
        template        : require( './amp-textarea.component.html' ) ,
        styles          : [ require( './amp-textarea.scss' ).toString() ] ,
        inputs          : [
            'errors' ,
            'id' ,
            'controlGroup' ,
            'isInSummaryState' ,
            'showErrorComponent' ,
            'customValidator' ,
            'index' ,
            'label' ,
            'placeholder' ,
            'maxLength' ,
            'minLength' ,
            'required' ,
            'hostClassesRemove' ,
            'keepControl' ,
            'spellCheck'
        ] ,
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpTextareaComponent extends BaseControl implements AfterViewInit {
    public showErrorComponent : boolean = true;
    public keepControl : boolean = false;
    private label : string;
    private isInSummaryState : boolean;
    private placeholder : string;
    private onAdjustWidth : EventEmitter<any>;
    private hostClassesRemove;
    private initialComponentHeight : number;
    private initialTextareaHeight : number;
    private componentHeightOffset : number;
    private _minLength : number;
    private _maxLength : number;
    private hasFocus : boolean   = false;
    private spellCheck : boolean = false;

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef ) {
        super();
        this.onAdjustWidth = new EventEmitter();
    }

    updateValidators () {
        if ( this.control ) {
            this.control.validator = Validators.compose( [
                RequiredValidator.requiredValidation( this._required ) ,
                MinLengthValidator.minLengthValidation( this._minLength ) ,
                MaxLengthValidator.maxLengthValidation( this._maxLength ) ,
                this.customValidator()
            ] );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    ngAfterViewInit () : any {
        let componentHeight         = this.el.nativeElement.scrollHeight;
        let textarea                = this.el.nativeElement.querySelector( 'textarea' );
        this.initialTextareaHeight  = textarea.style.height || textarea.scrollHeight;
        this.componentHeightOffset  = componentHeight - (this.initialTextareaHeight + 4);
        this.initialComponentHeight = this.initialTextareaHeight + this.componentHeightOffset;
        this.adjustHeight( textarea );
        this.updateValidators();
        this._cd.detectChanges();
        return undefined;
    }

    private adjustHeight ( element ) {
        if ( this.control.value === null || this.control.value.trim() === '' ) {
            element.style.height               = this.initialTextareaHeight + 'px';
            this.el.nativeElement.querySelector('.amp-textarea').style.height = this.initialComponentHeight + 'px';
        } else {
            element.style.height               = '1px';
            element.style.height               = (4 + element.scrollHeight) + 'px';
            this.el.nativeElement.querySelector('.amp-textarea').style.height = (this.componentHeightOffset + element.scrollHeight) + 'px';
        }
    }

    get minLength () {
        return this._minLength;
    }

    set minLength ( value : number ) {
        this._minLength = value;
        this.updateValidators();
    }

    get maxLength () {
        return this._maxLength;
    }

    set maxLength ( value : number ) {
        this._maxLength = value;
        this.updateValidators();
    }

    private trimValue () {
        return this.control.value ? this.control.setValue( this.control.value.trim() ) : '';
    }

    private setHasFocus ( value ) {
        this.hasFocus = value;
    }
}
