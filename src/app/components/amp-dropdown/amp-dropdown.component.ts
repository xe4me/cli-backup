import {
    Component ,
    ViewChild , EventEmitter , ChangeDetectionStrategy
} from '@angular/core';
import { FormControl,
    FormGroup } from '@angular/forms';
import { isPresent } from '@angular/core/src/facade/lang';
import { RequiredValidator } from '../../util/validations';
import { ClickedOutsideDirective } from '../../directives/clicked-outside/clicked-outside.directive';
@Component( {
    selector        : 'amp-dropdown' ,
    template        : `
        <div
            #dropdownEl
            class='amp-dropdown'
            [class.amp-dropdown--has-selection]='hasSelection'
            [class.amp-dropdown--animate]='animateSelection'
            [class.amp-dropdown--summary-state]='isInSummaryState'
            [class.amp-dropdown--is-open]='optionsShown'
            [clicked-outside]='hideOptions'>

            <label class='sr-only' [attr.for]='id'>
                {{ label }}
            </label>
            <select
                #selectEl
                class='sr-only'
                [attr.id]='id'
                [formControl]='control'
                (keydown)='onKeypressEvent($event)'
                (change)='onChangeEvent()'
                (focus)='onFocusEvent($event)'
                [attr.data-automation-id]='"slt_" + id'
                [attr.disabled]='(disabled || isInSummaryState) ? "disabled" : null'>

                <option value='' selected [attr.disabled]='currentOption > 0 ? "disabled" : null'></option>

                <option *ngFor='let option of options | slice:0:_limitTo; let i=index'
                    [value]='option.value'>
                    {{ option.label }}
                </option>

            </select>

            <div class='amp-dropdown__select' (click)='toggleOptions()' aria-hidden='true'>
                <div class='amp-dropdown__label' aria-hidden='true' *ngIf='!labelHidden'>{{ label }}</div>
                <span class='amp-dropdown__icon icon icon--chevron-down' aria-hidden='true'></span>

                <span class='amp-dropdown__select-value' aria-hidden='true'>{{ selectedOption.label }}</span>&nbsp;
            </div>

            <div
                #optionsEl
                class='amp-dropdown__options amp-dropdown__options--{{ numOptions }}'
                [class.amp-dropdown__options--hidden]='!optionsShown'
                aria-hidden='true'>

                <div
                    *ngFor='let option of options | slice:0:_limitTo; let i=index'
                    class='amp-dropdown__option'
                    [class.amp-dropdown__option--active]='option.value == selectedOption.value'
                    (click)='setSelectValue(option.value)'
                    aria-hidden='true'
                    tabindex='-1'
                    [attr.data-option-val]='option.value'>

                    {{ option.label }}

                </div>
            </div>
        </div>
    ` ,
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
    styles          : [ require( './amp-dropdown.component.scss' ).toString() ] ,
    directives      : [ ClickedOutsideDirective ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    outputs         : [ 'select' ]
} )
export class AmpDropdownComponent {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;
    public control : FormControl       = new FormControl();
    public errors                      = {};
    private controlGroup : FormGroup;
    private id : string                = 'amp-dropdown-' + Math.round( Math.random() * 1e10 );
    private label : string;
    private disabled : string;
    private options;
    private numOptions : number        = 4;
    private optionsShown : boolean     = false;
    private hasSelection : boolean     = false;
    private animateSelection : boolean = false;
    private hasWidth : boolean         = false;
    private _required : boolean        = false;
    private isInSummaryState : boolean = false;
    private labelHidden : boolean      = false;
    private currentOption;
    private _limitTo : number          = 999;
    private select                     = new EventEmitter();
    private selectedOption             = {
        label : '' ,
        value : ''
    };
    private selectElem;
    private dropdownElem;
    private optionsElem;

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

    private toggleOptions () {
        if ( this.disabled || this.isInSummaryState ) {
            return false;
        }
        if ( this.optionsShown ) {
            this.hideOptionsWithFocus();
        } else {
            this.showOptions( true );
        }
    }

    private showOptions ( showActive ) {
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

    private hideOptions = () : void => {
        this.optionsShown = false;
        setTimeout( () => {
            if ( this.control.touched ) {
                this.control[ 'hasOpened' ] = true;
            }
        } );
    }

    private hideOptionsWithFocus () {
        this.selectElem.focus();
        setTimeout( () => {
            this.hideOptions();
        } );
    }

    private onKeypressEvent ( $event ) {
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

    private changeCurrentOption () {
        // Fix for firefox select change event not being fired
        // each option change
        if ( navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > - 1 ) {
            setTimeout( () => {
                this.onChangeEvent();
            } );
        }
    }

    private onChangeEvent () {
        this.setSelectedOption( 'change' );
        if ( this.optionsShown && this.hasSelection ) {
            this.optionsElem.querySelectorAll( '[data-option-val="' + this.selectedOption.value + '"]' )[ 0 ].focus();
            this.selectElem.focus();
        }
        setTimeout( () => {
            this.select.emit( this.control.value );
        } , 0 );
    }

    private onFocusEvent ( $event ) {
        this.showOptions( false );
    }

    private setSelectValue ( value ) {
        this.selectElem.value = value;
        this.trigger( 'change' , this.selectElem );
        this.hideOptionsWithFocus();
    }

    private setSelectedOption ( type ) {
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
        }
    }

    private trigger ( event , el ) {
        let evObj = document.createEvent( 'HTMLEvents' );
        evObj.initEvent( event , true , true );
        el.dispatchEvent( evObj );
    }

    private updateValitators () {
        if ( this.control ) {
            this.control.setValidators( RequiredValidator.requiredValidation( this.required ) );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
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
