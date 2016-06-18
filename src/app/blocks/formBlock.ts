import { Control , ControlGroup } from '@angular/common';
import { forwardRef , provide , Provider } from '@angular/core';
import { BlockLayout , FormDefinition , BlockID , Action } from 'amp-ddc-ui-core/ui-core';
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
    formModel : ControlGroup;          // Overall form control
    formControl : NamedControl[];      // Individual form control element (i.e. input) binded to a string name. This
                                       // basically is to gives FormDef JSON control
    formControlGroupName : string;
    blocks : FormBlock[];              // Dynamic array of FormBlock, could be a single contentblock or a deep nested
                                       // multiple control element blocks, even a PAGE is just another formBlock
    // Optional extras
    public placeholder : string;
    public errorMessage : string;
    public options : Array<string>;
    public visibility : Action;
    public validation : Action;

    public get blocksAnchorId () {
        return this.blockType + "_blocks";
    }

    // Used by both nested formModel binding as well as dcl formModel binding
    public bindControls ( formModel : ControlGroup , instance : any ) {
        if ( instance.formControlGroupName ) {
            // Called by BaseForm straight after each block is dcl generated
            if ( formModel && this.formControl && this.formControl.length > 0 ) {
                let tempControlGroup = new ControlGroup( {} );
                this.formControl.map(
                    function( namedControl ) {
                        tempControlGroup.addControl( namedControl.name , namedControl.control );
                    } , formModel );
                formModel.addControl( instance.formControlGroupName , tempControlGroup );
            }
        }
        this.formModel = formModel;
    }

    // Must implement this method for FormBlock that deals with FormControls
    abstract preBindControls ( _formBlockDef : any ) : void;

    // Reference:   http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
    // TODO:        There are limitations and will need to test browser compatibility
    public getName () {
        var funcNameRegex = /function (.{1,})\(/;
        var results       = (funcNameRegex).exec( (this).constructor.toString() );
        return (results && results.length > 1) ? results[ 1 ] : '';
    };

    public getMyVisibleFlagString () {
        return this.formControlGroupName + 'IsVisible';
    }

    public getMyDoneFlagString () {
        return this.formControlGroupName + 'IsDone';
    }
}
