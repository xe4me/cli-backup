import {
    EventEmitter,
    ElementRef,
    AfterViewInit,
    ViewChild,
    Component,
    ChangeDetectorRef,
    Renderer,
    ChangeDetectionStrategy
} from '@angular/core';
import { Validators } from '@angular/forms';
import {
    RequiredValidator,
    MinLengthValidator,
    MaxLengthValidator
} from '../../../../modules/amp-utils';
import { BaseControl } from '../../../../base-control';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Component(
    {
        selector : 'amp-textarea',
        template : require( './amp-textarea.component.html' ),
        styles : [ require( './amp-textarea.scss' ).toString() ],
        inputs : [
            'errors',
            'id',
            'controlGroup',
            'isInSummaryState',
            'showErrorComponent',
            'customValidator',
            'index',
            'label',
            'placeholder',
            'maxLength',
            'minLength',
            'required',
            'hostClassesRemove',
            'keepControl',
            'spellCheck'
        ],
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpTextareaComponent extends BaseControl implements AfterViewInit {
    @ViewChild( 'hiddenDiv' ) hiddenDiv;
    @ViewChild( 'textarea' ) textarea;
    public showErrorComponent : boolean = true;
    public keepControl : boolean = false;
    private label : string;
    private placeholder : string;
    private onAdjustWidth : EventEmitter<any>;
    private hostClassesRemove;
    private initialComponentHeight : number;
    private initialTextareaHeight : number;
    private componentHeightOffset : number;
    private _minLength : number;
    private _maxLength : number;
    private hasFocus : boolean = false;
    private spellCheck : boolean = false;
    private domAdapter : BrowserDomAdapter;
    private hiddenDivText = 'Some dummy text';

    constructor ( private _cd : ChangeDetectorRef,
                  private _renderer : Renderer,
                  private el : ElementRef ) {
        super();
        this.domAdapter = new BrowserDomAdapter();
        this.onAdjustWidth = new EventEmitter();
    }

    updateValidators () {
        if ( this.control ) {
            this.control.validator = Validators.compose( [
                RequiredValidator.requiredValidation( this._required ),
                MinLengthValidator.minLengthValidation( this._minLength ),
                MaxLengthValidator.maxLengthValidation( this._maxLength ),
                this.customValidator()
            ] );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    ngAfterViewInit () : any {
        setTimeout( () => {
            this.setHiddenDivPadding();
        } );
        this.updateValidators();
        this._cd.detectChanges();
        return undefined;
    }

    public markControlAsDirty () {
        this.control.markAsDirty( {
            onlySelf : false
        } );
    }

    public markControlAsNotDirty () {
        this.control.markAsPristine( {
            onlySelf : false
        } );
    }

    public getElHeightPx ( dom, _el ) {
        return dom.getComputedStyle( _el ).height;
    }

    public getElHeightDecimal ( dom, _el : any ) {
        return this.getElHeightPx( dom, _el ).replace( 'px', '' ) * 1;
    }

    get hiddenDivElem () {
        return this.hiddenDiv.nativeElement;
    }

    get textAreaElem () {
        return this.textarea.nativeElement;
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

    private onBlur ( $event ) {
        this.trimValue();
        this.adjustHeight( $event.target );
        this.setHasFocus( false );
        this.markControlAsDirty();
    }

    private onFocus ( $event ) {
        this.setHasFocus( true );
        this.markControlAsNotDirty();
    }

    private setHasFocus ( value ) {
        this.hasFocus = value;
    }

    private adjustHeight ( $event ) {
        let fontFamily = this.domAdapter.getStyle( this.textAreaElem, 'font-family' );
        let fontSize = this.domAdapter.getStyle( this.textAreaElem, 'font-size' );
        let lineHeight = this.domAdapter.getStyle( this.textAreaElem, 'line-height' );
        if ( fontSize ) {
            this._renderer.setElementStyle( this.hiddenDivElem, 'font-size', fontSize );
        }
        if ( fontFamily ) {
            this._renderer.setElementStyle( this.hiddenDivElem, 'font-family', fontFamily );
        }
        if ( lineHeight ) {
            this._renderer.setElementStyle( this.hiddenDivElem, 'line-height', lineHeight );
        }
        if ( this.domAdapter.getAttribute( this.textAreaElem, 'wrap' ) === 'off' ) {
            this._renderer.setElementStyle( this.hiddenDivElem, 'overflow-wrap', 'normal' );
            this._renderer.setElementStyle( this.hiddenDivElem, 'white-space', 'pre' );
        }
        this.hiddenDivText = this.control.value + '\n';
        this.adjustWithHiddenDiv( this.hiddenDivText );
    }

    private adjustWithHiddenDiv ( _hiddenDivText ) {
        this.hiddenDivText = _hiddenDivText.replace( /\n/g, '<br>' );
        let height = this.getElHeightPx( this.domAdapter, this.hiddenDiv.nativeElement );
        this._renderer.setElementStyle( this.textarea.nativeElement, 'height', height );
    }

    private setHiddenDivPadding () {
        let textAreaHeight = this.getElHeightDecimal( this.domAdapter, this.textAreaElem );
        let hiddenDivHeight = this.getElHeightDecimal( this.domAdapter, this.hiddenDivElem );
        let diff = textAreaHeight - hiddenDivHeight;
        this._renderer.setElementStyle( this.hiddenDivElem, 'padding-top', diff + 'px' );
    }
}
