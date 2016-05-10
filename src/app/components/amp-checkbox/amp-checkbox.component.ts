import { Component , EventEmitter , Directive , Input , OnInit , ViewEncapsulation } from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
import { KeyCodes } from "ng2-material/core/key_codes";
import { isPresent } from "angular2/src/facade/lang";
import { Output } from "angular2/src/core/metadata";
import { parseTabIndexAttribute } from "ng2-material/core/util/util";
@Component(
    {
        selector      : 'amp-checkbox' ,
        template      : `
                        <div class="amp-checkbox">
                            <div class="amp-checkbox-container">
                              <div class="amp-checkbox-icon"></div>
                            </div>
                            <div class="amp-checkbox-label"><ng-content></ng-content></div>
                        </div>
                    ` ,
        host          : {
            'role'                 : 'checkbox' ,
            '[attr.aria-checked]'  : 'checked' ,
            '[attr.aria-disabled]' : 'disabled' ,
            '[tabindex]'           : 'tabindex' ,
            '(keydown)'            : 'onKeydown($event)' ,
            '(click)'              : 'toggle($event)'
        } ,
        styles        : [ require( './amp-checkbox.scss' ).toString() ] ,
        directives    : [ MATERIAL_DIRECTIVES , CORE_DIRECTIVES , FORM_DIRECTIVES ] ,
        encapsulation : ViewEncapsulation.Emulated ,
        inputs        : [
            'checked' , 'disabled' , 'id' ,
            'isInSummaryState' ,
            'label' ,
            'parentControl' ,
            'placeholder' ,
            'visibility' ,
            'valMaxLength' ,
            'valPattern' ,
            'isRequired' ,
            'hostClassesRemove' ,
            'checked' ,
            'disabled' ,
            'tabindex'
        ] ,
        outputs       : [ 'checkedChange' ]
    } )
export class AmpCheckboxComponent {
    private _id : string;
    private label : string;
    private isInSummaryState : boolean;
    private parentControl : Control;
    private placeholder : string;
    private visibility : Action;
    private checkedChange : EventEmitter<boolean> = new EventEmitter<boolean>( false );
    private _tabindex : number;
    private checked : boolean                     = false;
    private disabled_ : boolean                   = false;

    set tabindex ( value : number ) {
        this._tabindex = parseTabIndexAttribute( value );
    }

    get tabindex () : number {
        return this._tabindex;
    }

    get disabled () {
        return this.disabled_;
    }

    set disabled ( value ) {
        this.disabled_ = isPresent( value ) && value !== false;
    }

    onKeydown ( event : KeyboardEvent ) {
        if ( event.keyCode === KeyCodes.SPACE ) {
            event.preventDefault();
            this.toggle( event );
        }
    }

    toggle ( event ) {
        if ( this.disabled ) {
            event.stopPropagation();
            return;
        }
        this.checked = ! this.checked;
        this.checkedChange.emit( this.checked );
    }
}

