import {
    Component ,
    EventEmitter ,
    ElementRef ,
    ChangeDetectorRef ,
    AfterViewInit ,
    ChangeDetectionStrategy
} from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
import { RequiredValidator , isTrue } from '../../../../modules/amp-utils';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { BaseControl } from '../../../../base-control';
import { Validators } from '@angular/forms';
@Component( {
    selector        : 'amp-radio-button-group' ,
    template        : require( './amp-radio-button-group.component.html' ) ,
    inputs          : [
        'errors' ,
        'groupName' ,
        'controlGroup' ,
        'customValidator' ,
        'defaultValue' ,
        'scrollOutUnless' ,
        'isInSummaryState' ,
        'scrollOutOn' ,
        'required' ,
        'disabled' ,
        'buttons' ,
        'autoSelectOnOne' ,
        'keepControl' ,
        'selected'
    ] ,
    host            : {
        '[attr.aria-disabled]' : 'disabled'
    } ,
    styles          : [ require( './amp-radio-button-group.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    outputs         : [ 'select' ]
} )
export class AmpRadioButtonGroupComponent extends BaseControl implements AfterViewInit {
    public keepControl : boolean       = false;
    private _selected : string         = null;
    private defaultValue;
    private select                     = new EventEmitter<any>();
    private buttons;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private previousValue : string     = null;

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
        super();
    }

    private set groupName ( _id ) {
        this._id = _id;
    }

    private get groupName () {
        return this._id;
    }

    private set selected ( selected : string ) {
        if ( isPresent( selected ) && this.control ) {
            this._selected = selected;
            this.control.setValue( this._selected );
        }
    }

    private set autoSelectOnOne ( select : boolean ) {
        if ( isTrue( select ) && this.control && this.buttons.length === 1 ) {
            this.control.setValue( this.buttons[ 0 ].value );
        }
    }

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required ) ,
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { emitEvent : true } );
            this.changeDetector.markForCheck();
        }
    }

    ngAfterViewInit () : any {
        this.control
            .valueChanges
            .distinctUntilChanged()
            .subscribe( ( changes ) => {
                if ( changes ) {
                    this.onSelect( null , changes , false );
                }
            } );
        if ( this.defaultValue ) {
            this.control.setValue( this.defaultValue , { emitEvent : true } );
        }
        this.updateValidators();
        this.changeDetector.detectChanges();
        return undefined;
    }

    private onSelect ( $event , value , shouldScroll ) {
        if ( this.control.disabled === true ) {
            if ( $event !== null ) {
                $event.stopPropagation();
            }
            return;
        }
        if ( this.previousValue !== value ) {
            this.previousValue = value;
            this.select.emit( value + '' );
        }
        if ( shouldScroll ) {
            this.scroll( value );
        }
    }

    private scroll ( value ) {
        if ( this.scrollOutUnless && value !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && value === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }
}
