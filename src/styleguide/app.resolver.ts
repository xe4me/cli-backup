import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import { Injectable , Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
} from 'amp-ddc-ui-core/ui-core';
import { ComponentsService , IComponentMeta , IComponentGroupMeta } from './services/components';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { NavigationService } from './services/navigation';
import { TableContentsService } from './services/content-table-service';
import { ThemeService } from './services/theme';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ModelActions } from "./blocks/amp-form-block/actions/model.action";
@Injectable()
export class DataResolver implements Resolve<any> {
    constructor () {
    }

    resolve ( route : ActivatedRouteSnapshot , state : RouterStateSnapshot ) {
        return Observable.of( { res : 'I am data' } );
    }
}
// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    DataResolver ,
    FormModelService ,
    TableContentsService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
    NavigationService ,
    ComponentsService ,
    BrowserDomAdapter ,
    ThemeService ,
    ModelActions ,
    MdIconRegistry ,
    Renderer
];
