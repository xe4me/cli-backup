import {
    EventEmitter ,
    ElementRef ,
    AfterViewInit ,
    OnDestroy ,
    Component ,
    ViewEncapsulation ,
    ChangeDetectorRef
} from '@angular/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MD_INPUT_DIRECTIVES , } from '@angular2-material/input';
import {
    RequiredValidator ,
    MinLengthValidator ,
    MaxLengthValidator ,
    MaxDateValidator ,
    MinDateValidator ,
    PatterValidator
} from '../../util/validations';
import { isPresent } from '@angular/core/src/facade/lang';
@Component(
    {
        selector      : 'amp-textarea' ,
        template      : `
    <md-input-container
        [class.md-input-has-value]='parentControl.value'
        [class.md-input-focused]='hasFocus'
        [ngClass]='{"md-input-has-placeholder" : placeholder,"summary" : isInSummaryState}'
        flex-gt-sm='' >
        <!--(paste)='adjustHeight($event.target)'
            (blur)='adjustHeight($event.target)'
            '-->
        <label
         [ngClass]='{"summary" : isInSummaryState}'
        *ngIf='!isInSummaryState' [attr.for]='_id'>{{label}}</label><!--
        --><textarea
                #textarea
                (keyup)='adjustHeight($event.target)'
                (blur)='adjustHeight($event.target)'
                (blur)='trimValue()'
                (blur)='setHasFocus(false)'
                (focus)='setHasFocus(true)'
                [class.summary-state]='isInSummaryState'
                [disabled]='isInSummaryState'
                class='md-input'
                [attr.name]='_id'
                [attr.id]='_id'
                [attr.maxlength]='valMaxLength'
                [attr.data-automation-id]='"textarea_" + _id'
                [ngFormControl]='parentControl'
                [attr.placeholder]='placeholder'>
            </textarea>
            <span
            [class.error]='valMaxLength==textarea.value.length' class='char-left'
             *ngIf='valMaxLength && valMaxLength>0 && !isInSummaryState'>{{textarea.value.length }} / {{ valMaxLength }}</span>
            <span class='summary-text'>{{ parentControl.value }}</span>
        <ng-content></ng-content>
  </md-input-container>
  ` ,
        styles        : [ require( './amp-textarea.scss' ).toString() ] ,
        inputs        : [
            'id' ,
            'isInSummaryState' ,
            'label' ,
            'parentControl' ,
            'placeholder' ,
            'visibility' ,
            'valMaxLength' ,
            'valMinLength' ,
            'isRequired' ,
            'hostClassesRemove'
        ] ,
        directives    : [ MD_INPUT_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.Emulated
    } )
export class AmpTextareaComponent implements AfterViewInit, OnDestroy {
    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private onAdjustWidth : EventEmitter<any>;
    private hostClassesRemove;
    private initialComponentHeight : number;
    private initialTextareaHeight : number;
    private componentHeightOffset : number;
    private _valMinLength : number;
    private _valMaxLength : number;
    private _required : boolean = false;
    private hasFocus : boolean  = false;

    ngOnDestroy () : any {
        this.parentControl.validator = null;
        this.parentControl.updateValueAndValidity( {
            onlySelf  : false ,
            emitEvent : true
        } );
        return undefined;
    }

    ngAfterViewInit () : any {
        let componentHeight         = this.el.nativeElement.scrollHeight;
        let textarea                = this.el.nativeElement.querySelector( 'textarea' );
        this.initialTextareaHeight  = textarea.style.height || textarea.scrollHeight;
        this.componentHeightOffset  = componentHeight - (this.initialTextareaHeight + 4);
        this.initialComponentHeight = this.initialTextareaHeight + this.componentHeightOffset;
        this.adjustHeight( textarea );
        this.updateValitators();
        this._cd.detectChanges();
        return undefined;
    }

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef ) {
        this.onAdjustWidth = new EventEmitter();
    }

    private adjustHeight ( element ) {
        if ( this.parentControl.value === null || this.parentControl.value.trim() === '' ) {
            element.style.height               = this.initialTextareaHeight + 'px';
            this.el.nativeElement.style.height = this.initialComponentHeight + 'px';
        } else {
            element.style.height               = '1px';
            element.style.height               = (4 + element.scrollHeight) + 'px';
            this.el.nativeElement.style.height = (this.componentHeightOffset + element.scrollHeight) + 'px';
        }
    }

    set id ( id : string ) {
        this._id = id;
    }

    get isRequired () {
        return this._required;
    }

    set isRequired ( value : boolean ) {
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    get valMinLength () {
        return this._valMinLength;
    }

    set valMinLength ( value : number ) {
        this._valMinLength = value;
        this.updateValitators();
    }

    get valMaxLength () {
        return this._valMaxLength;
    }

    set valMaxLength ( value : number ) {
        this._valMaxLength = value;
        this.updateValitators();
    }

    private  trimValue () {
        return this.parentControl.value ? this.parentControl.updateValue( this.parentControl.value.trim() ) : '';
    }

    private updateValitators () {
        if ( this.parentControl ) {
            this.parentControl.validator = Validators.compose( [
                RequiredValidator.requiredValidation( this._required ) ,
                MinLengthValidator.minLengthValidation( this._valMinLength ) ,
                MaxLengthValidator.maxLengthValidation( this._valMaxLength )
            ] );
            this.parentControl.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
    }

    private setHasFocus ( value ) {
        this.hasFocus = value;
    }
}