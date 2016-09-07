import {
    Injectable
} from '@angular/core';
import { Router } from '@angular/router';
import {
    ProgressObserverService
} from 'amp-ddc-ui-core/ui-core';

@Injectable()
export class FormPage  {
    // context () : any {
    //     return undefined;
    // }
    //
    // pageId : string;
    // nextPageId : string;
    // prevPageId : string;
    // routeName : string;    // TODO: This needs more thinking
    //                        // Should it really be nextRouteName and prevRouteName?
    //                        // Maybe, no routeName at all, as the entire form is a single component and just use the formDef ID?
    // _router : Router;
    //
    // constructor ( progressObserver? : ProgressObserverService ) {
    //     super( progressObserver );
    //     this.path = 'pages/';
    // }
    //
    // // Noop but can be overridden by child class
    // public preBindControls ( _formBlockDef ) {
    //     if ( _formBlockDef ) {
    //         this.routeName = _formBlockDef.page.routeName;
    //     }
    // }
    //
    // next () {
    //     this._router.navigate( [ this.routeName , { id : this.nextPageId } ] );
    //     return false;
    // }
    //
    // prev () {
    //     this._router.navigate( [ this.routeName , { id : this.prevPageId } ] );
    //     return false;
    // }
}
