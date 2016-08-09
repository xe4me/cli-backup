import { FormBlock } from './formBlock';
import {
    Injector ,
    Injectable ,
    Inject ,
    Component ,
    ViewEncapsulation ,
    OnInit ,
    AfterViewInit ,
    NgZone ,
    ViewContainerRef
} from '@angular/core';
import { RouteParams , Router , RouteRegistry } from '@angular/router-deprecated';
import { UIControlService , ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
@Injectable()
export abstract class FormSection extends FormBlock {
    CLASS_NAME : string;    // Populated by the implementation class
    public label : string;   // The displayed text that represents this Section, mostly used by the NavigationComponent.
    // ViewContainerRef is mandatory because for DynamicComponentLoader.loadNextToLocation the api requires this information
    constructor ( public _viewContainerRef : ViewContainerRef ,
                  controlService? : UIControlService ,
                  progressObserver? : ProgressObserverService ) {
        super( controlService , progressObserver );
    }

    // Noop but can be overriden by child class
    public preBindControls ( _formBlockDef ) {
    }

    public get blocksAnchorId () {
        return this.CLASS_NAME + (this.name ? '_' + this.name : '') + '_blocks';
    }
}
