import {
    Component ,
    ViewChild
} from '@angular/core';
import { Control , Validators } from '@angular/common';
import { isPresent } from '@angular/core/src/facade/lang';
import { ClickedOutsideDirective, RequiredValidator } from 'amp-ddc-components';

@Component({
    selector   : 'amp-dropdown' ,
    template   : `
        <div 
            #dropdownEl
            class='amp-dropdown'
            [class.amp-dropdown--has-selection]='hasSelection'
            [class.amp-dropdown--animate]='animateSelection'
            [clicked-outside]='hideOptions'>

            <label class='sr-only' [attr.for]='id'>
                {{ label }}
            </label>
            <select 
                #selectEl
                class='sr-only'
                [attr.id]='id'
                [ngFormControl]='parentControl'
                (keydown)='onKeypressEvent($event)'
                (change)='onChangeEvent()'
                (focus)='onFocusEvent($event)'
                [attr.disabled]='disabled ? "disabled" : null'>

                <option value='' selected [attr.disabled]='currentOption > 0 ? "disabled" : null'></option>

                <option *ngFor='let option of options'
                    [value]='option.value'>
                    {{ option.label }}
                </option>
                
            </select>

            <div class='amp-dropdown__select' (click)='toggleOptions()' aria-hidden='true'>
                <div class='amp-dropdown__label' aria-hidden='true'>{{ label }}</div>
                <span class='amp-dropdown__icon icon icon--chevron-down' aria-hidden='true'></span>

                <span class='amp-dropdown__select-value' aria-hidden='true'>{{ selectedOption.label }}</span>&nbsp;
            </div>
            
            <div 
                #optionsEl 
                class='amp-dropdown__options amp-dropdown__options--{{ numOptions }}'
                [class.amp-dropdown__options--hidden]='!optionsShown'
                aria-hidden='true'>
                
                <div 
                    *ngFor='let option of options' 
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
    inputs     : [
        'id' ,
        'label',
        'options',
        'parentControl',
        'numOptions',
        'disabled',
        'isRequired'
    ],
    styles     : [ require( './amp-dropdown.component.scss' ).toString() ] ,
    directives : [ ClickedOutsideDirective ] ,
    outputs    : [ 'select' ]
})

export class AmpDropdownComponent {

    @ViewChild('selectEl') selectEl;
    @ViewChild('optionsEl') optionsEl;
    @ViewChild('dropdownEl') dropDownEl;

    private id : string = 'amp-dropdown-' + Math.round(Math.random() * 1e10);
    private label : string;
    private disabled : string;
    private options;
    private parentControl : Control;
    private numOptions: number = 4;
    private optionsShown: boolean = false;
    private hasSelection: boolean = false;
    private animateSelection: boolean = false;
    private hasWidth: boolean = false;
    private _required: boolean = false;
    private currentOption;

    private selectedOption = {
        label: '',
        value: ''
    };

    private selectElem;
    private dropdownElem;
    private optionsElem;

    ngAfterViewInit () : any {
        this.updateValitators();

        this.selectElem  = this.selectEl.nativeElement;
        this.dropdownElem  = this.dropDownEl.nativeElement;
        this.optionsElem  = this.optionsEl.nativeElement;

        // Set default value        
        this.selectElem.selectedIndex = Math.max(0, this.selectElem.selectedIndex);
        this.setSelectedOption('initial');

        return undefined;
    }

    get isRequired () {
        return this._required;
    }

    set isRequired ( value : boolean ) {
        this._required = this.isTrue( value );
        this.updateValitators();
    }

    private toggleOptions () {
        if (this.disabled) {
            return false;
        }

        if (this.optionsShown) {
            this.hideOptionsWithFocus();
        } else {
            this.showOptions(true);
        }
    }

    private showOptions (showActive) {
        let activeOption = this.optionsElem.querySelectorAll('.amp-dropdown__option--active')[0];

        if (!this.hasWidth) {
            var width = this.optionsElem.offsetWidth;
            this.dropdownElem.style.width = width + 'px';
            this.hasWidth = true;
        }

        this.optionsShown = true;

        if (showActive && activeOption) {
            setTimeout(() => {
                activeOption.focus();
            });
        }
        setTimeout(() => {
            this.selectElem.focus();
        }, 10);
    }

    private hideOptions = (): void => {
        this.optionsShown = false;
    }

    private hideOptionsWithFocus () {
        this.selectElem.focus();

        setTimeout(() => {
            this.hideOptions();
        });
    }

    private onKeypressEvent ($event) {

        switch ($event.keyCode) {
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

    private changeCurrentOption() {
        // Fix for firefox select change event not being fired 
        // each option change
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            setTimeout(() => {
                this.onChangeEvent();
            });
        }
    }

    private onChangeEvent () {
        this.setSelectedOption('change');

        if (this.optionsShown && this.hasSelection) {
            this.optionsElem.querySelectorAll('[data-option-val=' + this.selectedOption.value + ']')[0].focus();
            this.selectElem.focus();
        }
    }

    private onFocusEvent ($event) {
        this.showOptions(false);
    }

    private setSelectValue (value) {
        this.selectElem.value = value;
        this.trigger('change', this.selectElem);
        this.hideOptionsWithFocus();
    }

    private setSelectedOption(type) {
        this.currentOption = this.selectElem.selectedIndex;

        if (this.currentOption > 0) {

            if (!this.animateSelection && type === 'change') {
                this.animateSelection = true;
            }

            let selected = this.selectElem.options[this.currentOption];

            this.selectedOption = {
                label: selected.text,
                value: selected.value
            };

            this.hasSelection = true;
        }
    }

    private trigger (event, el) {
        var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent(event, true, true);
        el.dispatchEvent(evObj);
    }

    private updateValitators () {
        if ( this.parentControl ) {
            this.parentControl.validator = Validators.compose( [
                RequiredValidator.requiredValidation( this._required )
            ] );
            this.parentControl.updateValueAndValidity( { emitEvent : true , onlySelf : false } );
        }
    }

    private isTrue ( value ) {
        return isPresent( value ) && (value === true || value === 'true' || false);
    }
}