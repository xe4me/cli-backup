import {
    Component ,
    EventEmitter ,
    ElementRef ,
    ChangeDetectorRef ,
    AfterViewInit , OnDestroy , ChangeDetectionStrategy , OnInit
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { isPresent } from '@angular/core/src/facade/lang';
import { RequiredValidator , isTrue } from '../../modules/amp-utils';
import { ScrollService } from '../../services/scroll/scroll.service';
@Component( {
    selector        : 'amp-radio-button-group' ,
    template        : `
        <div  *ngFor='let button of buttons' class='amp-radio-button-group'>
              <input
                    [disabled]='disabled'
                    [attr.data-automation-id]='"radio_button_" + button.id'
                    type='radio'
                    [attr.id]='button.id'
                    [attr.name]='groupName'
                    [formControl]='control'
                    [value]='button.value'
                    [checked]='control.value===button.value'/>
              <label
                    [class.checked]="control.value===button.value"
                    (click)='onSelect($event , button.value , true)'
                    [attr.for]='button.id' class="root">
                    <div class="container">
                        <div class="off"></div>
                        <div class="on"></div>
                    </div>
                    <div class="label">
                        {{ button.label }}
                    </div>
              </label>
        </div>
                ` ,
    inputs          : [
        'errors' ,
        'required' ,
        'defaultValue' ,
        'scrollOutUnless' ,
        'isInSummaryState' ,
        'scrollOutOn' ,
        'disabled' ,
        'controlGroup' ,
        'buttons' ,
        'groupName' ,
        'autoSelectOnOne' ,
        'selected'
    ] ,
    host            : {
        '[attr.aria-disabled]' : 'disabled'
    } ,
    styles          : [ require( './amp-radio-button-group.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    outputs         : [ 'select' ]
} )
export class AmpRadioButtonGroupComponent implements AfterViewInit, OnDestroy, OnInit {
    public control : FormControl       = new FormControl( null );
    public errors                      = {};
    private _selected : string         = null;
    private _disabled : boolean        = false;
    private _required : boolean        = false;
    private isInSummaryState : boolean = false;
    private defaultValue;
    private select                     = new EventEmitter<any>();
    private buttons;
    private scrollOutUnless : any;
    private scrollOutOn : any;
    private groupName : string;
    private previousValue : string     = null;
    private controlGroup : FormGroup;

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    ngOnInit () : any {
        this.joinToParentGroupAndSetAmpErrors();
        return undefined;
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

    ngOnDestroy () : any {
        this.control.validator = null;
        this.control.updateValueAndValidity( {
            onlySelf  : false ,
            emitEvent : true
        } );
        return undefined;
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

    get disabled () {
        return this._disabled;
    }

    set disabled ( value ) {
        this._disabled = isTrue( value );
    }

    get required () {
        return this._required;
    }

    get id () {
        return this.groupName;
    }

    set required ( value ) {
        this._required = isTrue( value );
        this.updateValidators();
    }

    private onSelect ( $event , value , shouldScroll ) {
        if ( this.disabled === true ) {
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

    private updateValidators () {
        if ( this.control ) {
            this.control.setValidators( RequiredValidator.requiredValidation( this._required ) );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    private joinToParentGroupAndSetAmpErrors () {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i ) => {
            (<any> this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
    }
}
