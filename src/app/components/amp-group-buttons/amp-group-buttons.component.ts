import {
    Component ,
    EventEmitter ,
    ElementRef ,
    ChangeDetectorRef ,
    OnInit ,
    ChangeDetectionStrategy
} from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { RequiredValidator } from '../../util/validations';
import { FormGroup , FormControl } from "@angular/forms";
@Component( {
    selector        : 'amp-group-buttons' ,
    template        : `
                <div class='amp-group-button'>

                      <span *ngFor='let button of buttons'>
                          <input
                                class="sr-only"
                                [disabled]='disabled'
                                [attr.data-automation-id]='"radio_button_" + button.id'
                                type='radio'
                                [attr.id]='button.id + index'
                                [attr.name]='id + index'
                                [formControl]='control'
                                [value]='button.value'
                                [checked]='control.value===button.value'
                                />
                         <label (click)='scroll(button.value)' [attr.for]='button.id + index'>{{ button.label }}</label>

                      </span>

                </div>
                ` ,
    inputs          : [
        'errors' ,
        'defaultValue' ,
        'isInSummaryState' ,
        'keepControlOnDestroy' ,
        'required' ,
        'scrollOutUnless' ,
        'scrollOutOn' ,
        'disabled' ,
        'controlGroup' ,
        'buttons' ,
        'groupName' ,
        'index'
    ] ,
    styles          : [ require( './amp-group-buttons.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    outputs         : [ 'select' ]
} )
export class AmpGroupButtonsComponent implements OnInit {
    private controlGroup : FormGroup;
    private _disabled : boolean  = false;
    private _required : boolean  = false;
    private buttons;
    private keepControlOnDestroy = false;
    private scrollOutUnless : string;
    private scrollOutOn : string;
    private groupName : string;
    private defaultValue : string;
    private select               = new EventEmitter<any>();
    private index : string       = '';

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }

    public control : FormControl = new FormControl(null);
    public errors                = {};

    ngOnInit () : any {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i )=> {
            (<any>this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
        return undefined;
    }

    ngAfterViewInit () : any {
        this.control
            .valueChanges
            .distinctUntilChanged()
            .subscribe( ( changes ) => {
                if ( changes ) {
                    this.select.emit( changes + '' );
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
        this._disabled = this.isTrue( value );
    }

    get required () {
        return this._required;
    }

    get id () {
        return this.groupName;
    }

    set required ( value ) {
        setTimeout( () => {
            this._required = this.isTrue( value );
            this.updateValidators();
            this.changeDetector.detectChanges();
        } , 0 );
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
    }

    private updateValidators () {
        if ( this.control ) {
            this.control.setValidators(RequiredValidator.requiredValidation( this._required ));
            this.control.updateValueAndValidity( { emitEvent : false} );
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
