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
import { RequiredValidator } from '../../../../modules/amp-utils';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { BaseControl } from '../../../../base-control';
@Component( {
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
        'keepControl' ,
        'isInSummaryState'
    ] ,
    outputs         : [ 'select' ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpCheckboxComponent extends BaseControl implements AfterViewInit {
    public keepControl : boolean       = false;
    private _checked : boolean         = false;
    private _tabindex : number;
    private isInSummaryState : boolean = false;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    /*
     * @Deprecated :
     * Select should be removed in the next version of component , it doesn't do anything
     * Why ?
     * Component propagates the change event anyway, so we don't need to create our own!!!
     * */
    private select : EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor ( private _cd : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
        super();
    }

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required , false , true ) ,
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { onlySelf : false } );
        }
    }

    ngAfterViewInit () : any {
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
        // if the model are retrieved , the checked would still return the default false valur
        // so the view wont tick the checkbox , bellow check is for this reason
        if ( this.control.value !== undefined ) {
            return this.control.value;
        } else {
            return this._checked;
        }
    }

    set checked ( value ) {
        this._checked = value;
        this.control.setValue( this._checked );
    }

    /*
     * @Deprecated :
     * this.select.emit should be removed in the next version of component , it doesn't do anything
     * */
    private onChange ( $event ) {
        let change = $event.target.checked;
        if ( this.disabled === true || this.isInSummaryState === true ) {
            $event.stopPropagation();
            return;
        }
        this.select.emit( change );
        this.onScroll( change );
    }

    private onScroll ( change ) {
        if ( this.scrollOutUnless && change !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && change === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }
}
