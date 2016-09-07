import {
    Injectable ,
    ViewContainerRef
} from '@angular/core';
import {
    ProgressObserverService
} from 'amp-ddc-ui-core/ui-core';
import { FormBlock } from './blocks/formBlock';
@Injectable()
export abstract class FormSection extends FormBlock {
    CLASS_NAME : string;    // Populated by the implementation class
    public label : string;   // The displayed text that represents this Section, mostly used by the NavigationComponent.
    // ViewContainerRef is mandatory because for DynamicComponentLoader.loadNextToLocation the api requires this information
    constructor ( public _viewContainerRef : ViewContainerRef ,
                  progressObserver? : ProgressObserverService ) {
        super( progressObserver );
    }

    // Noop but can be overridden by child class
    public preBindControls ( _formBlockDef ) {
    }

    public get blocksAnchorId () {
        return this.CLASS_NAME + (this.name ? '_' + this.name : '') + '_blocks';
    }
}
