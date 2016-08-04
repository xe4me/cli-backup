import { Control , ControlArray, ControlGroup } from '@angular/common';
import { forwardRef , provide , Provider } from '@angular/core';
import { BlockLayout,
         FormDefinition,
         BlockID,
         Action,
         UIControlService,
         FormModelService,
         ProgressObserverService,
         ScrollService } from 'amp-ddc-ui-core/ui-core';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { FullyDistinguishedNames, FormSections } from './form-sections';
import * as moment from 'moment';

export class NamedControl {
    constructor ( public name : string , public control : any ) {
    }
}
export const provideParent =
                 ( component : any , parentType? : any ) =>
                     provide( parentType || FormBlock , { useExisting : forwardRef( () => component ) } );

/**
 * This class is both a Abstract Class (i.e. Java like Abstract, property and method implementation that are common) and
 * a Class-Interface (https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#class-interface)
 */
export abstract class FormBlock {
    _id : BlockID;                      // Auto-Generated id based on the flatten index of the formDefinition blocks
                                        // array of the current page (i.e {page: ABC, index: 2})
    blockType : string;                // Concrete FormBlock implementation class name
    path = '';                        // Physical path from src/app/blocks to the concrete FormBlock implementation
                                      // class
    blockLayout : BlockLayout;         // INLINE or PAGE, top level FormBlock should always be PAGE
                                       // basically is to gives FormDef JSON control
    blocks : FormBlock[];              // Dynamic array of FormBlock, could be a single contentblock or a deep nested
                                       // multiple control element blocks, even a PAGE is just another formBlock
    // Optional extras
    public placeholder : string;
    public errorMessage : string;
    public options : Array<string>;
    public visibility : Action;
    public validation : Action;
    protected isInSummaryState     : boolean          = false;
    protected hasClickedOnOkButton : boolean          = false;
    protected formModelService     : FormModelService = null;
    protected scrollService        : ScrollService    = null;
    protected fullyDistinguishedName: string[]        = null;
    protected dateErrorMessage                        = null;
    protected dateFormat           : string           = 'DD/MM/YYYY';
    private haveQuoteId            : boolean          = false;


    constructor ( public controlService?: UIControlService,
                  protected progressObserver?: ProgressObserverService ) {

        // What about Application FormBlocks?
        // TODO: Move this into the relevant blocks 
        const quoteControl: Control = this.controlService.getControl(FullyDistinguishedNames.QuoteDetails, 'identifier');
        this.haveQuoteId = quoteControl && quoteControl.value;
        this.isInSummaryState = this.haveQuoteId;
    }

    public get blocksAnchorId () {
        return this.blockType + '_blocks';
    }

    // Used by both nested formModel binding as well as dcl formModel binding
    public bindControls ( formModel : ControlGroup , instance : any ) {
        // TODO: Fix this, need to give control back to the FormDefinition json
        // if ( instance.formControlGroupName ) {
        //     // Called by BaseForm straight after each block is dcl generated
        //     if ( formModel && this.formControl && this.formControl.length > 0 ) {
        //         let tempControlGroup = new ControlGroup( {} );
        //         this.formControl.map(
        //             function( namedControl ) {
        //                 tempControlGroup.addControl( namedControl.name , namedControl.control );
        //             } , formModel );
        //         formModel.addControl( instance.formControlGroupName , tempControlGroup );
        //     }
        // }
        // this.formModel = formModel;
    }

    // Must implement this method for FormBlock that deals with FormControls
    abstract preBindControls ( _formBlockDef : any ) : void;

    // Hook for processing after the controls and model is available for block to use.
    public postBindControls () : void {
        return;
    }

    // Reference:   http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
    // TODO:        There are limitations and will need to test browser compatibility
    public getName () {
        var funcNameRegex = /function (.{1,})\(/;
        var results       = (funcNameRegex).exec( (this).constructor.toString() );
        return (results && results.length > 1) ? results[ 1 ] : '';
    };

    public getMyVisibleFlagString () {
        return this.getfullyDistinguishedName().join('_') + 'IsVisible';
    }

    public getMyDoneFlagString () {
        return this.getfullyDistinguishedName().join('_') + 'IsDone';
    }

    public get canGoNext () {
        return this.controlService.getControlGroup(this.getfullyDistinguishedName()).valid;
    }

    public getControl(name: string, defaultValue?: string | number) : Control {
        let exists = this.controlService.getControl(this.getfullyDistinguishedName(), name);
        if ( ! exists ) {
            exists = this.controlService.createControl(this.getfullyDistinguishedName(), name, defaultValue);
        }
        return exists;
    }

    public getControlArray(name: string) : ControlArray {
        let exists = this.controlService.getControlArray(this.getfullyDistinguishedName(), name);
        if ( ! exists ) {
            exists = this.controlService.createControlArray(this.getfullyDistinguishedName(), name);
        }
        return exists;
    }

    public pushControltoControlArray(name: string, controls: Array<any>) {
        var newGroup = new ControlGroup({});

        controls.forEach(function(control) {
            newGroup.addControl(control.id, new Control(control.default || ''));
        });

        this.getControlArray(name).push(newGroup);
    }

    protected getfullyDistinguishedName () : string[] {
        return this.fullyDistinguishedName;
    }

    protected next ( nextBlock ) {
        // console.log(nextBlock);
        this.hasClickedOnOkButton = true;
        if (this.controlService.getControlGroup(this.getfullyDistinguishedName()).valid) {
            this.isInSummaryState = true;
            this.progressObserver.onProgress();
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
            this.scrollService.scrollToNextUndoneBlock(this.controlService.getControlGroup(FullyDistinguishedNames.QuoteLifeInsuredOneAll));
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : nextBlock + 'IsVisible',
                flagValue : true
            } );
        }
    }

    public getLabel (array: Array<any>, value: string) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].value === value) {
                return array[i].label;
            }
        }
    }

    public errorEmptyControl (control) {
        return control.touched && !control.value && !control.valid;
    }

    public errorInvalidControl (control) {
        return control.touched && control.value && !control.valid;
    }

    public errorUnselectedControl (control) {
        return control.touched && control.hasOpened && !control.valid;
    }

    public errorUncheckedControl (control) {
        return control.touched && !control.valid;
    }

    protected tickDone () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.getMyDoneFlagString ,
            flagValue : true
        } );
    }

    protected tickUnDone () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.getMyDoneFlagString ,
            flagValue : false
        } );
    }

    protected isCurrentBlockActive () {
        const isCurrentBlockVisible : boolean = this.formModelService.getFlags(this.getMyVisibleFlagString());
        return this.haveQuoteId || isCurrentBlockVisible;
    }

    protected showError ( errorMessage ) {
        this.dateErrorMessage = errorMessage;
    }

    protected hideError () {
        this.dateErrorMessage = null;
    }

    protected validateDateField ( age, dateControl ) {
        this.hideError();
        if ( (age > 0 && age < 18) || age > 59 ) {
            dateControl.setErrors( { 'invalidAge' : true } );
            this.showError( 'The insured person is ineligible to apply for this product due to their age' );
            age = null;
        }
        if ( age < 0 ) {
            dateControl.setErrors( { 'dateInFuture' : true } );
            this.showError( 'Date of birth cannot be a date in the future' );
            age = null;
        }
        return age;
    }


    protected validateDateControl ( dateControl ) {
        this.hideError();
        if ( ! dateControl.value ) {
            this.showError( 'Date of birth is a required field.' );
            return;
        }
        const aMoment = moment( dateControl.value , this.dateFormat );
        if ( ! aMoment.isValid() ) {
            dateControl.setErrors( { 'invalidDate' : true } );
            this.showError( 'Invalid date entered' );
            return;
        }
        let datesDiff = moment().diff( aMoment , 'years' );
        return this.validateDateField( datesDiff , dateControl );
    }

    private resetBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.getMyVisibleFlagString,
            flagValue : false
        } );
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
    }

}
