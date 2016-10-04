import {
    Component ,
    ViewChild ,
    EventEmitter ,
    ChangeDetectionStrategy , ChangeDetectorRef
} from '@angular/core';
import {
    FormControl ,
    FormGroup
} from '@angular/forms';
import { isPresent } from '@angular/core/src/facade/lang';
import { RequiredValidator } from '../../../../modules/amp-utils';
@Component( {
    selector        : 'amp-dropdown' ,
    inputs          : [
        'id' ,
        'label' ,
        'options' ,
        'errors' ,
        'controlGroup' ,
        'numOptions' ,
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
export class AmpDropdownComponent {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;
    public control : FormControl         = new FormControl();
    public errors                        = {};
    protected controlGroup : FormGroup;
    protected id : string                = 'amp-dropdown-' + Math.round( Math.random() * 1e10 );
    protected label : string;
    protected disabled : string;
    protected options;
    protected numOptions : number        = 4;
    protected optionsShown : boolean     = false;
    protected hasSelection : boolean     = false;
    protected animateSelection : boolean = false;
    protected hasWidth : boolean         = false;
    protected _required : boolean        = false;
    protected isInSummaryState : boolean = false;
    protected labelHidden : boolean      = false;
    protected currentOption;
    protected _limitTo : number          = 999;
    protected select                     = new EventEmitter();
    protected selectedOption             = {
        label : '' ,
        value : ''
    };
    protected selectElem;
    protected dropdownElem;
    protected optionsElem;

    public setSelectValue ( value ) {
        this.selectElem.value = value;
        this.trigger( 'change' , this.selectElem );
        this.hideOptionsWithFocus();
    }

    ngOnInit () : any {
        this.joinToParentGroupAndSetAmpErrors();
        return undefined;
    }

    ngAfterViewInit () : any {
        this.updateValitators();
        this.selectElem               = this.selectEl.nativeElement;
        this.dropdownElem             = this.dropDownEl.nativeElement;
        this.optionsElem              = this.optionsEl.nativeElement;
        // Set default value
        this.selectElem.selectedIndex = Math.max( 0 , this.selectElem.selectedIndex );
        setTimeout( () => {
            this.setSelectedOption( 'initial' );
        } );
        let forceRedraw                   = function( element ) {
            element.style.display = 'none';
            let trick             = element.offsetHeight;
            element.style.display = '';
        };
        // Redraw options to set correct width
        this.optionsElem.style.visibility = 'visible';
        forceRedraw( this.optionsElem.children[ 0 ] );
        this.optionsElem.style.visibility = '';
        this.control.registerOnChange( ( value ) => {
            if ( this.selectElem.value !== value ) {
                this.setSelectValue( value );
            }
        } );
        return undefined;
    }

    get required () {
        return this._required;
    }

    set required ( value : boolean ) {
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    get limitTo () {
        return this._limitTo;
    }

    set limitTo ( value : any ) {
        this._limitTo = value;
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
            this.optionsElem.querySelectorAll( '[data-option-val="' + this.selectedOption.value + '"]' )[ 0 ].focus();
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
            let selected        = this.selectElem.options[ this.currentOption ];
            this.selectedOption = {
                label : selected.text ,
                value : selected.value
            };
            this.hasSelection   = true;
        } else {
            this.selectedOption = {
                label : null ,
                value : null
            };
            this.hasSelection   = false;
        }
    }

    protected trigger ( event , el ) {
        el.dispatchEvent( new Event( event ) );
    }

    protected updateValitators () {
        if ( this.control ) {
            this.control.setValidators( RequiredValidator.requiredValidation( this.required ) );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    protected isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
    }

    protected joinToParentGroupAndSetAmpErrors () {
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName , i ) => {
            (<any> this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.control );
        }
    }
}
