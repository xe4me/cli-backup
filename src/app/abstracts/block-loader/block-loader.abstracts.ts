import {
    ViewContainerRef,
    ComponentRef
} from '@angular/core';
import {
    arrayJoinByDash,
    DomUtils
} from './modules/amp-utils';
import { FormGroup } from '@angular/forms';
import { SaveService } from './services/save/save.service';
import { ScrollService } from './services/scroll/scroll.service';
import { FormDefinition } from '../../interfaces/form-def.interface';
import { AutoFocusOnDirective } from './modules/amp-directives/directives/auto-focus-on/auto-focus-on.directive';
import {
    RemoveNextOptions,
    LoadNextOptions,
    LoadedBlockInfo
} from '../../amp-block-loader';
/*
 * BlockLoaderAbstracts
 *
 * This is just an abstract class and extending from it or not is not actually adding or removing any
 * javascript value.
 * This is just to make typescript and auto completion happy.
 * All of the bellow properties will be created dynamically on the fly in the browser and will be
 * injected into the dynamically created blocks.
 *
 * */

export abstract class BlockLoaderAbstracts {
    /*
     * __onChildsLoaded :
     * Pass in a callback to notify when the children of this block are loaded
     * E.g
     * A block like Section , which itself will load bunch of other blocks , will call this function on loaded.
     * And the parent and siblings of the parent will be notified if they've subscribed to .
     * */
    protected __onChildsLoaded : ( callback : Function ) => void;
    /*
     * __fdn : the fully distinguished name to this block :
     * E.g : ['Application','SomeSection','ContactDetails'];
     * */
    protected __fdn : Array<(number|string)>;

    /*
     * __repeaterIndex : This will be populated if this component is loaded inside a repeater
     * */
    protected __repeaterIndex : number;
    /*
     * __form : The overall form , this is accessible in all the blocks and is the same everywhere
     * */
    protected __form : FormGroup;
    /*
     * controlGroup : The control group that created specifically for this block
     * */
    protected __controlGroup : FormGroup;
    protected __sectionName : string;
    /*
     * __removeAt : Will remove a block at a given index
     * */
    protected __removeAt : ( index : number ) => Promise<number>;
    /*
     * __removeByFdn : Will remove a block based on it's FDN
     * */
    protected __removeByFdn : ( fdn : Array<string | number> ) => Promise<any>;
    /*
     * __removeByFdn : Will remove a block based on it's name and it's section's FDN
     * */
    protected __removeByName : ( name : string ) => Promise<any>;
    /*
     * __removeNext : Will remove the next block , need to specify the current block which is ViewContainerRef
     * */
    protected __removeNext : ( viewContainerRef : ViewContainerRef, options? : RemoveNextOptions ) => Promise<number>;
    /*
     * __removeAllAfter : Will remove all the blocks after current block if they're in the same container
     * E.g : If you're inside menu frame , you cannot delete review block if they not in the same blocks array in
     * form definition
     * */
    protected __removeAllAfter : ( viewContainerRef : ViewContainerRef ) => Promise<number>;
    /*
     * __removeAllAfterIndex
     * Same as removeAllAfter, except you just need to specify an index , it'll nicely remove all after that index
     * */
    protected __removeAllAfterIndex : ( index : number ) => Promise<any>;
    /*
     * __removeSelf : Will remove the current block
     * */
    protected __removeSelf : ( viewContainerRef : ViewContainerRef ) => Promise<any>;
    /*
     * __getIndex : Will give you your index in the current container
     * */
    protected __getIndex : ( viewContainerRef : ViewContainerRef ) => number;
    /*
     * __loadNext : Will load a chunk of form definition after the current block
     * E.g :
     * @example
     let toBeLoadedBlock = {
     "equityHolders": {
     "name": "EquityHolders",
     "prettyName": "Equity holders",
     "blockType": "EquityHoldersBlockComponent",
     "blockLayout": "INLINE",
     "commonBlock": false,
     "path": "blocks/equity-holders/equity-holders.component",
     }
     }
     __loadNext(toBeLoadedBlock , this.viewContainerRef);
     * */
    protected __loadNext : ( def : FormDefinition, viewContainerRef : ViewContainerRef, options? : LoadNextOptions ) => Promise<ComponentRef<any>>;
    /*
     * __loadAt
     * Same as loadNext , except load at a specific index without telling where you are(viewContainerRef)
     * */
    protected __loadAt : ( def : FormDefinition, index : number ) => Promise<ComponentRef<any>>;
    /*
     * __loadAt
     * Same as loadNext , except loads an array of blocks
     * */
    protected __loadAllNext : ( _defs : FormDefinition[],
                                _viewContainerRef : ViewContainerRef ) => Promise<ComponentRef<any[]>>;
    /*
     * __custom : All the custom properties that you've specified in your form definition chunk will be accessible
     @example
     let toBeLoadedBlock = {
     "equityHolders": {
     "name": "EquityHolders",
     "prettyName": "Equity holders",
     "blockType": "EquityHoldersBlockComponent",
     "blockLayout": "INLINE",
     "commonBlock": false,
     "path": "blocks/equity-holders/equity-holders.component",
     "custom": {
     "whateverField": "whatever value"
     }
     }
     }
     Then inside the class you can access to whateverField like :
     console.log(this.__custom.whateverField); // it's amazing I know :)
     * */
    protected __custom : any;
    /*
     * __isRetrieved :
     * If this block has been created with a hydrated form ( form that has value and controls , or in
     * another words , a retrieved form ) , this variable will be true
     * */
    protected __isRetrieved : boolean;
    protected __name : string;
    protected __emitChildLoaded : ( _loadedBlockInfo : LoadedBlockInfo ) => void;
    protected __child_blocks : FormDefinition;
}
