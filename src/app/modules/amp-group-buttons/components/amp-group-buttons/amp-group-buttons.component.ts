import { Component , EventEmitter , ElementRef , ChangeDetectorRef , ChangeDetectionStrategy } from '@angular/core';
import { RequiredValidator } from '../../../../modules/amp-utils';
import { Validators } from '@angular/forms';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { RadioControlRegistry } from '@angular/forms/src/directives/radio_control_value_accessor';
import { BaseControl } from '../../../../base-control';
@Component( {
    selector        : 'amp-group-buttons' ,
    template        : require( './amp-group-buttons.component.html' ) ,
    inputs          : [
        'errors' ,
        'groupName' ,
        'controlGroup' ,
        'customValidator' ,
        'defaultValue' ,
        'isInSummaryState' ,
        'keepControlOnDestroy' ,
        'required' ,
        'scrollOutUnless' ,
        'scrollOutOn' ,
        'disabled' ,
        'keepControl' ,
        'buttons' ,
        'index'
    ] ,
    styles          : [ require( './amp-group-buttons.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    providers       : [ RadioControlRegistry ] ,
    outputs         : [ 'select' ]
} )
export class AmpGroupButtonsComponent extends BaseControl {
    public keepControl : boolean      = false;
    private buttons;
    private keepControlOnDestroy      = false;
    private scrollOutUnless : string;
    private scrollOutOn : string;
    private defaultValue : string;
    private hasBooleanValue : boolean = false;
    private select                    = new EventEmitter<any>();

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

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required , this.hasBooleanValue ) ,
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { emitEvent : true } );
            this.changeDetector.markForCheck();
        }
    }

    ngAfterViewInit () : any {
        this.checkIfHasBooleanValue();
        this.control
            .valueChanges
            .distinctUntilChanged()
            .subscribe( ( changes ) => {
                if ( changes !== undefined && changes !== null ) {
                    this.select.emit( changes );
                }
            } );
        if ( this.defaultValue ) {
            this.control.setValue( this.defaultValue , { emitEvent : true } );
        }
        this.updateValidators();
        this.changeDetector.detectChanges();
        return undefined;
    }

    private scroll ( value ) {
        if ( this.scrollOutUnless && value !== this.scrollOutUnless ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        } else if ( this.scrollOutOn && value === this.scrollOutOn ) {
            this.scrollService.scrollMeOut( this.elem , 'easeInQuad' , 60 );
        }
    }

    private checkIfHasBooleanValue () {
        if ( this.buttons ) {
            for ( let i = 0 ; i < this.buttons.length ; i ++ ) {
                this.hasBooleanValue = typeof this.buttons[ i ].value === 'boolean';
            }
        }
    }
}
