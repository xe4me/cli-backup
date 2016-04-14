import {Control, ControlGroup} from 'angular2/common';

import {BlockLayout, FormDefinition, BlockID, Action} from 'amp-ddc-ui-core/ui-core';
export class NamedControl {
    constructor(public name:string, public control:Control) {
    }
}


export abstract class FormBlock {

    _id:BlockID;                      // Auto-Generated id based on the flatten index of the formDefinition blocks array of the current page (i.e {page: ABC, index: 2})
    blockType:string;                // Concrete FormBlock implementation class name

    path = '';                        // Physical path from src/app/blocks to the concrete FormBlock implementation class
    blockLayout:BlockLayout;         // INLINE or PAGE, top level FormBlock should always be PAGE
    formModel:ControlGroup;          // Overall form control
    formControl:NamedControl[];      // Individual form control element (i.e. input) binded to a string name. This basically is to gives FormDef JSON control
    blocks:FormBlock[];              // Dynamic array of FormBlock, could be a single contentblock or a deep nested multiple control element blocks, even a PAGE is just another formBlock

    // Optional extras
    public placeholder:string;
    public errorMessage:string;
    public options:Array<string>;
    public visibility:Action;
    public validation:Action;

    // Used by both nested formModel binding as well as dcl formModel binding
    public bindControls(formModel:ControlGroup) {
        // Called by BaseForm straight after each block is dcl generated
        if (formModel && this.formControl && this.formControl.length > 0) {
            this.formControl.map(function (namedControl) {
                this.addControl(namedControl.name, namedControl.control);
            }, formModel);
        }
    }

    // Must implement this method for FormBlock that deals with FormControls
    abstract preBindControls(_formBlockDef:any):void;

    // Reference:   http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
    // TODO:        There are limitations and will need to test browser compatibility
    public getName() {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this).constructor.toString());
        return (results && results.length > 1) ? results[1] : '';
    };


}
