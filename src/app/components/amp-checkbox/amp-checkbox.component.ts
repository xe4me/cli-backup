import {
    Component ,
    ElementRef ,
    EventEmitter ,
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { NumberWrapper } from '@angular/core/src/facade/lang';
import { isPresent } from '@angular/core/src/facade/lang';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { RequiredValidator } from '../../util/validations';
import { isTrue } from '../../util/functions.utils';
import { ScrollService } from '../../services/scroll/scroll.service';
@Component(
    {
        selector : 'amp-checkbox' ,
        template : `
            <input
                [disabled]='disabled'
                [checked]='checked'
                type='checkbox'
                [attr.data-automation-id]='"checkbox_" + id'
                [attr.id]='id'
                [attr.name]='id'
                [formControl]='control'/>
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
        host     : {
            '[attr.aria-checked]'  : 'checked' ,
            '[attr.aria-disabled]' : 'disabled' ,
            '[tabindex]'           : 'tabindex' ,
        } ,
        styles   : [ require( './amp-checkbox.scss' ).toString() ] ,
        inputs   : [
            'required' ,
            'errors' ,
            'scrollOutUnless' ,
            'scrollOutOn' ,
            'disabled' ,
            'controlGroup' ,
            'checked' ,
            'id' ,
            'tabindex' ,
            'isInSummaryState'
        ] ,
        outputs  : [ 'select' ]
    } )
export class AmpCheckboxComponent implements AfterViewInit {
    public control : FormControl           = new FormControl();
    public errors                          = {};
    private _disabled : boolean            = false;
    private _checked : boolean             = false;
    private _required : boolean            = false;
    private _tabindex : number;
    private isInSummaryState : boolean     = false;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private controlGroup : FormGroup;
    private id : string;
    private checkboxValue : boolean        = false;
    private select : EventEmitter<boolean> = new EventEmitter<boolean>( false );

    constructor ( private _cd : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    ngOnInit () : any {
        this.joinToParentGroupAndSetAmpErrors();
        return undefined;
    }

    ngAfterViewInit () : any {
        this.control.valueChanges.subscribe( ( changes ) => {
            this._checked      = isTrue( changes );
            this.checkboxValue = this._checked;
        } );
        this.updateValitators();
        this._cd.detectChanges();
        return undefined;
    }

    parseTabIndexAttribute ( attr : any ) : number {
        return isPresent( attr ) ? NumberWrapper.parseInt( attr , 10 ) : 0;
    }

    set tabindex ( value : number ) {
        this._tabindex = this.parseTabIndexAttribute( value );
    }

    get tabindex () : number {
        return this._tabindex;
    }

    get disabled () {
        return this._disabled;
    }

    set disabled ( value ) {
        this._disabled = isTrue( value );
    }

    get required () {
        return this._required;
    }

    set required ( value ) {
        this._required = isTrue( value );
        this.updateValitators();
    }

    get checked () {
        return this._checked;
    }

    set checked ( value ) {
        this._checked      = isTrue( value );
        this.checkboxValue = this._checked;
        this.control.setValue( this._checked );
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

    private updateValitators () {
        if ( this.control ) {
            this.control.setValidators( RequiredValidator.requiredValidation( this.required ) );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    private joinToParentGroupAndSetAmpErrors () {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i ) => {
            (<any>this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
    }
}
