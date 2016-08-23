import { FormBlock } from './formBlock';
import {
    Injector ,
    Injectable ,
    Inject ,
    Component ,
    ViewEncapsulation ,
    OnInit ,
    AfterViewInit ,
    NgZone
} from '@angular/core';
import { RouteParams , Router , RouteRegistry } from '@angular/router-deprecated';
import { UIControlService , ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
@Injectable()
export class FormPage extends FormBlock {
    pageId : string;
    nextPageId : string;
    prevPageId : string;
    routeName : string;    // TODO: This needs more thinking
                           // Should it really be nextRouteName and prevRouteName?
                           // Maybe, no routeName at all, as the entire form is a single component and just use the formDef ID?
    _router : Router;

    constructor ( controlService? : UIControlService ,
                  progressObserver? : ProgressObserverService ) {
        super( controlService , progressObserver );
        this.path = 'pages/';
    }

    // Noop but can be overriden by child class
    public preBindControls ( _formBlockDef ) {
        if ( _formBlockDef ) {
            this.routeName = _formBlockDef.page.routeName;
        }
    }

    next () {
        this._router.navigate( [ this.routeName , { id : this.nextPageId } ] );
        return false;
    }

    prev () {
        this._router.navigate( [ this.routeName , { id : this.prevPageId } ] );
        return false;
    }
}