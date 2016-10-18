import {
    Component ,
    ElementRef ,
    EventEmitter ,
    ChangeDetectionStrategy ,
    AfterViewInit ,
    ChangeDetectorRef
} from '@angular/core';
import { Validators } from '@angular/forms';
import { NumberWrapper , isPresent } from '@angular/core/src/facade/lang';
import { RequiredValidator , isTrue } from '../../../../modules/amp-utils';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { BaseControl } from '../../../../base-control';
@Component(
    {
        selector        : 'amp-checkbox' ,
        template        : require( './amp-checkbox.component.html' ) ,
        host            : {
            '[attr.aria-checked]'  : 'checked' ,
            '[attr.aria-disabled]' : 'disabled' ,
            '[tabindex]'           : 'tabindex' ,
        } ,
        styles          : [ require( './amp-checkbox.scss' ).toString() ] ,
        inputs          : [
            'errors' ,
            'id' ,
            'controlGroup' ,
            'required' ,
            'scrollOutUnless' ,
            'customValidator' ,
            'scrollOutOn' ,
            'disabled' ,
            'checked' ,
            'index' ,
            'tabindex' ,
            'isInSummaryState'
        ] ,
        outputs         : [ 'select' ] ,
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpCheckboxComponent extends BaseControl implements AfterViewInit {
    private _checked : boolean             = false;
    private _tabindex : number;
    private isInSummaryState : boolean     = false;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private checkboxValue : boolean        = false;
    private select : EventEmitter<boolean> = new EventEmitter<boolean>( false );

    constructor ( private _cd : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
        super();
    }

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required , true ) ,
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }

    ngAfterViewInit () : any {
        this.control.valueChanges.subscribe( ( changes ) => {
            this._checked      = isTrue( changes );
            this.checkboxValue = this._checked;
        } );
        this.updateValidators();
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

    get checked () {
        return this._checked;
    }

    set checked ( value ) {
        this._checked      = isTrue( value );
        this.checkboxValue = this._checked;
        this.control.setValue( this._checked );
    }

    private onSelect ( $event ) {
        if ( this.disabled === true || this.isInSummaryState === true ) {
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
}
