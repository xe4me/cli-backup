import { Component , ViewChild , EventEmitter , ChangeDetectionStrategy , ChangeDetectorRef } from '@angular/core';
import { RequiredValidator } from '../../../../modules/amp-utils';
import { addDashOrNothing , isTrue } from '../../../amp-utils/functions.utils';
import { DeviceService } from '../../../../services/device/device.service';
import { BaseControl } from '../../../../base-control';
import { Validators } from '@angular/forms';
@Component( {
    selector        : 'amp-dropdown' ,
    inputs          : [
        'errors' ,
        'id' ,
        'controlGroup' ,
        'label' ,
        'index' ,
        'fieldItemKey' ,
        'customValidator' ,
        'fieldValueKey' ,
        'options' ,
        'numOptions' ,
        'preselect' ,
        'disabled' ,
        'required' ,
        'isInSummaryState' ,
        'labelHidden' ,
        'limitTo'
    ] ,
    template        : require( './amp-dropdown.component.html' ) ,
    styles          : [ require( './amp-dropdown.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    outputs         : [ 'select' ]
} )
export class AmpDropdownComponent extends BaseControl {
    public static MARK_AS_PRISTINE       = true;
    public static DONT_MARK_AS_PRISTINE  = false;
    public static TRIGGER_CHANGE         = true;
    public static DONT_TRIGGER_CHANGE    = false;
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;
    protected label : string;
    protected options;
    protected numOptions : number        = 4;
    protected optionsShown : boolean     = false;
    protected hasSelection : boolean     = false;
    protected animateSelection : boolean = false;
    protected hasWidth : boolean         = false;
    protected isInSummaryState : boolean = false;
    protected labelHidden : boolean      = false;
    protected fieldItemKey               = 'label';
    protected fieldValueKey              = 'value';
    protected currentOption;
    protected _limitTo : number          = 999;
    protected select                     = new EventEmitter();
    protected selectedOption             = {};
    protected selectElem;
    protected dropdownElem;
    protected optionsElem;

    constructor ( protected _cd : ChangeDetectorRef ) {
        super();
    }

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required ) ,
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    public setSelectValue ( value , triggerChange = true , markAsPristine = false ) {
        this.selectElem.value = value;
        if ( triggerChange ) {
            this.trigger( 'change' , this.selectElem );
        }
        this.hideOptions();
        if ( markAsPristine ) {
            this.control.markAsPristine( {
                onlySelf : false
            } );
        }
    }

    ngOnInit () : any {
        super.ngOnInit();
        this.selectedOption[ this.fieldItemKey ]  = null;
        this.selectedOption[ this.fieldValueKey ] = null;
        return undefined;
    }

    ngAfterViewInit () : any {
        this.updateValidators();
        this.selectElem               = this.selectEl.nativeElement;
        this.dropdownElem             = this.dropDownEl.nativeElement;
        this.optionsElem              = this.optionsEl.nativeElement;
        // Set default value
        this.selectElem.selectedIndex = Math.max( 0 , this.selectElem.selectedIndex );
        setTimeout( () => {
            this.setSelectedOption( 'initial' );
        } );
        this.redraw();
        this.control.registerOnChange( ( value ) => {
            if ( this.selectElem.value !== value ) {
                this.setSelectValue( value );
            }
        } );
        return undefined;
    }

    get limitTo () {
        return this._limitTo;
    }

    set limitTo ( value : any ) {
        this._limitTo = value;
    }

    set preselect ( value : any ) {
        if ( value ) {
            setTimeout( () => {
                this.setSelectValue( value );
            } );
        }
    }

    protected toggleOptions () {
        if ( this.disabled || this.isInSummaryState ) {
            return false;
        }
        if ( this.optionsShown ) {
            this.hideOptionsWithFocus();
        } else {
            this.showOptions( true );
        }
    }

    protected showOptions ( showActive ) {
        let activeOption = this.optionsElem.querySelectorAll( '.amp-dropdown__option--active' )[ 0 ];
        if ( ! this.hasWidth ) {
            let width                     = this.optionsElem.offsetWidth;
            this.dropdownElem.style.width = width + 'px';
            this.hasWidth                 = true;
        }
        this.optionsShown = true;
        if ( showActive && activeOption ) {
            setTimeout( () => {
                activeOption.focus();
            } );
        }
        setTimeout( () => {
            this.selectElem.focus();
        } , 10 );
    }

    protected hideOptions = () : void => {
        this.optionsShown = false;
        setTimeout( () => {
            if ( this.control.touched ) {
                this.control[ 'hasOpened' ] = true;
            }
        } );
    };

    protected hideOptionsWithFocus () {
        this.selectElem.focus();
        this.hideOptions();
    }

    protected onKeypressEvent ( $event ) {
        switch ( $event.keyCode ) {
            // Enter key
            case 13:
                $event.preventDefault();
                this.toggleOptions();
                break;
            // Space key
            case 32:
                $event.preventDefault();
                this.toggleOptions();
                break;
            // Escape key
            case 27:
                this.hideOptions();
                break;
            // Tab key
            case 9:
                this.hideOptions();
                break;
            default:
                this.changeCurrentOption();
                return;
        }
    }

    protected changeCurrentOption () {
        // Fix for firefox select change event not being fired
        // each option change
        if ( navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > - 1 ) {
            setTimeout( () => {
                this.onChangeEvent();
            } );
        }
    }

    protected onChangeEvent () {
        this.setSelectedOption( 'change' );
        if ( this.optionsShown && this.hasSelection ) {
            this.optionsElem.querySelectorAll( '[data-option-val="' + this.selectedOption[ this.fieldValueKey ] + '"]' )[ 0 ].focus();
            this.selectElem.focus();
        }
        setTimeout( () => {
            this.select.emit( this.control.value );
        } , 0 );
    }

    protected onFocusEvent ( $event ) {
        this.showOptions( false );
    }

    protected setSelectedOption ( type ) {
        this.currentOption = this.selectElem.selectedIndex;
        if ( this.currentOption > 0 ) {
            if ( ! this.animateSelection && type === 'change' ) {
                this.animateSelection = true;
            }
            let selected                              = this.selectElem.options[ this.currentOption ];
            this.selectedOption[ this.fieldItemKey ]  = selected.text;
            this.selectedOption[ this.fieldValueKey ] = selected.value;
            this.hasSelection                         = true;
        } else {
            this.selectedOption[ this.fieldItemKey ]  = null;
            this.selectedOption[ this.fieldValueKey ] = null;
            this.hasSelection                         = false;
        }
    }

    protected trigger ( event , el ) {
        let ev = null;
        if ( DeviceService.isIE() ) {
            ev = document.createEvent( 'Event' );
            ev.initEvent( event , true , true );
        } else {
            ev = new Event( event );
        }
        el.dispatchEvent( ev );
        this._cd.detectChanges();
    }

    protected redraw () {
        let forceRedraw                   = function( element ) {
            element.style.display = 'none';
            let trick             = element.offsetHeight;
            element.style.display = '';
        };
        this.optionsElem.style.visibility = 'visible';
        forceRedraw( this.optionsElem.children[ 0 ] );
        this.optionsElem.style.visibility = '';
    }

    protected onResize ( event ) {
        this.dropdownElem.style.width = '';
        this.hasWidth                 = false;
    }
}
