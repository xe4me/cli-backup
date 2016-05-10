import { Component , ElementRef , EventEmitter , Directive , Input , OnInit , ViewEncapsulation } from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
@Component(
    {
        selector   : 'amp-checkbox' ,
        template   : `
            <input
                [disabled]='disabled'
                [required]='required'
                [attr.data-automation-id]='"checkbox_" + id'
                type='checkbox'
                [attr.id]='id'
                [attr.name]='id'
                [ngFormControl]='parentControl'
                [value]='value'/>
          <label [attr.for]='id'>
                <div class="container">
                    <div class="off"></div>
                    <div class="on"></div>
                </div>
                <div class="content">
                    <ng-content></ng-content>
                </div>
          </label>             
        ` ,
        host       : {
            'role'                 : 'checkbox' ,
            '[attr.aria-checked]'  : 'checked' ,
            '[attr.aria-disabled]' : 'disabled' ,
            '[tabindex]'           : 'tabindex' ,
            '(keydown)'            : 'onKeydown($event)' ,
            '(click)'              : 'onSelect($event)'
        } ,
        styles     : [ require( './amp-checkbox.scss' ).toString() ] ,
        directives : [ CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        inputs     : [
            'required' ,
            'scrollOutUnless' ,
            'scrollOutOn' ,
            'disabled' ,
            'parentControl' ,
            'buttons' ,
            'id' ,
            'autoSelectOnOne' ,
            'value'
        ] ,
        outputs    : [ 'select' ]
    } )
export class AmpCheckboxComponent {
    private parentControl : Control;
    private select                 = new EventEmitter<string>();
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private id : string;
    private previousValue : string = null;

    constructor ( private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    private onSelect ( $event ) {
        let value = $event.target.value;
        console.log( 'onSelect inside' , value );
        if ( this.previousValue !== value ) {
            this.previousValue = value;
            this.select.emit( value + '' );
        }
        if ( this.scrollOutUnless && value !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && value === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }
}

