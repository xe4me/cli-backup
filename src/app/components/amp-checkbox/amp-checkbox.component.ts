import {
    Component ,
    ElementRef ,
    EventEmitter ,
} from 'angular2/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { NumberWrapper } from 'angular2/src/facade/lang';
import { isPresent } from 'angular2/src/facade/lang';
import { AfterViewInit } from 'angular2/src/core/linker/interfaces';
export class KeyCodes {
    static ESCAPE : number;
    static SPACE : number;
    static UP : number;
    static DOWN : number;
}
@Component(
    {
        selector   : 'amp-checkbox' ,
        template   : `
            <input
                [disabled]='disabled'
                [checked]='checked'
                type='checkbox'
                [attr.data-automation-id]='"checkbox_" + id'
                [attr.id]='id'
                [attr.name]='id'
                [ngFormControl]='parentControl'/>
          <label (click)='onSelect($event)' [attr.for]='id'>
                <div [class.hidden]='isInSummaryState' class="container">
                    <div class="off"></div>
                    <div class="on"></div>
                </div>
                <div [class.summary-state]='isInSummaryState' class="content">
                    <ng-content></ng-content>
                </div>
          </label>             
        ` ,
        host       : {
            '[attr.aria-checked]'  : 'checked' ,
            '[attr.aria-disabled]' : 'disabled' ,
            '[tabindex]'           : 'tabindex' ,
        } ,
        styles     : [ require( './amp-checkbox.scss' ).toString() ] ,
        directives : [ CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        inputs     : [
            'required' ,
            'scrollOutUnless' ,
            'scrollOutOn' ,
            'disabled' ,
            'parentControl' ,
            'checked' ,
            'id' ,
            'tabindex' ,
            'isInSummaryState'
        ] ,
        outputs    : [ 'select' ]
    } )
export class AmpCheckboxComponent implements AfterViewInit {
    private _disabled : boolean            = false;
    private _checked : boolean             = false;
    private _required : boolean            = false;
    private isInSummaryState : boolean     = false;
    private _tabindex : number;
    private parentControl : Control;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private id : string;
    private select : EventEmitter<boolean> = new EventEmitter<boolean>( false );
    private checkboxValue : boolean        = false;

    constructor ( private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    ngAfterViewInit () : any {
        this.updateValitators();
        return undefined;
    }

    set tabindex ( value : number ) {
        this._tabindex = this.parseTabIndexAttribute( value );
    }

    parseTabIndexAttribute ( attr : any ) : number {
        return isPresent( attr ) ? NumberWrapper.parseInt( attr , 10 ) : 0;
    }

    get tabindex () : number {
        return this._tabindex;
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
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    get checked () {
        return this._checked;
    }

    set checked ( value ) {
        this._checked      = this.isTrue( value );
        this.checkboxValue = this._checked;
        this.parentControl.updateValue( this._checked );
    }

    private onSelect ( $event ) {
        if ( this.disabled === true ) {
            $event.stopPropagation();
            return;
        }
        this.checkboxValue = ! this.checkboxValue;
        this.select.emit( this.checkboxValue );
        if ( this.scrollOutUnless && this.checkboxValue !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && this.checkboxValue === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }

    private requiredValidation ( c : Control ) {
        return c.value === true ? null : {
            checkboxrequired : true
        };
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === "true" || false);
    }

    private updateValitators () {
        if ( this.parentControl ) {
            this.parentControl.validator = this.isTrue( this.required ) ? this.requiredValidation : null;
            this.parentControl.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }
}
