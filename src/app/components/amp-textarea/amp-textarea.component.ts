import {
    EventEmitter ,
    ElementRef ,
    AfterViewInit ,
    OnDestroy ,
    Component ,
    ChangeDetectorRef , ChangeDetectionStrategy , OnInit
} from '@angular/core';
import { FormControl , Validators , FormGroup } from '@angular/forms';
import {
    RequiredValidator ,
    MinLengthValidator ,
    MaxLengthValidator
} from '../../util/validations';
import { isTrue } from "../../util/functions.utils";
@Component(
    {
        selector        : 'amp-textarea' ,
        template        : `
    <md-input-container
        [class.md-input-has-value]='control.value'
        [class.md-input-focused]='hasFocus'
        [ngClass]='{"md-input-has-placeholder" : placeholder,"summary" : isInSummaryState}'
        flex-gt-sm='' >
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
                [attr.maxlength]='maxLength'
                [attr.data-automation-id]='"textarea_" + _id'
                [formControl]='control'
                [attr.placeholder]='placeholder'>
            </textarea>
            <span
            [class.error]='maxLength==textarea.value.length' class='char-left'
             *ngIf='maxLength && maxLength>0 && !isInSummaryState'>{{textarea.value.length }} / {{ maxLength }}</span>
            <span class='summary-text'>{{ control.value }}</span>
        <ng-content></ng-content>
  </md-input-container>
  ` ,
        styles          : [ require( './amp-textarea.scss' ).toString() ] ,
        inputs          : [
            'id' ,
            'isInSummaryState' ,
            'label' ,
            'controlGroup' ,
            'placeholder' ,
            'maxLength' ,
            'minLength' ,
            'required' ,
            'hostClassesRemove'
        ] ,
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpTextareaComponent implements AfterViewInit, OnDestroy, OnInit {
    private id : string;
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
    private _required : boolean  = false;
    private hasFocus : boolean   = false;
    private controlGroup : FormGroup;
    public control : FormControl = new FormControl();
    public errors                = {};

    ngOnInit () : any {
        this.joinToParentGroupAndSetAmpErrors();
        return undefined;
    }

    ngOnDestroy () : any {
        this.control.validator = null;
        this.control.updateValueAndValidity( {
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
        if ( this.control.value === null || this.control.value.trim() === '' ) {
            element.style.height               = this.initialTextareaHeight + 'px';
            this.el.nativeElement.style.height = this.initialComponentHeight + 'px';
        } else {
            element.style.height               = '1px';
            element.style.height               = (4 + element.scrollHeight) + 'px';
            this.el.nativeElement.style.height = (this.componentHeightOffset + element.scrollHeight) + 'px';
        }
    }

    get required () {
        return this._required;
    }

    set required ( value : boolean ) {
        this._required = isTrue( value );
        this.updateValitators();
    }

    get minLength () {
        return this._minLength;
    }

    set minLength ( value : number ) {
        this._minLength = value;
        this.updateValitators();
    }

    get maxLength () {
        return this._maxLength;
    }

    set maxLength ( value : number ) {
        this._maxLength = value;
        this.updateValitators();
    }

    private trimValue () {
        return this.control.value ? this.control.setValue( this.control.value.trim() ) : '';
    }

    private updateValitators () {
        if ( this.control ) {
            this.control.validator = Validators.compose( [
                RequiredValidator.requiredValidation( this._required ) ,
                MinLengthValidator.minLengthValidation( this._minLength ) ,
                MaxLengthValidator.maxLengthValidation( this._maxLength )
            ] );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    private setHasFocus ( value ) {
        this.hasFocus = value;
    }

    private joinToParentGroupAndSetAmpErrors () {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i )=> {
            (<any>this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
    }
}
