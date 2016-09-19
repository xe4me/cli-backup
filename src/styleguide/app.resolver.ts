import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import { Injectable , Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ComponentsService , IComponentMeta , IComponentGroupMeta } from './services/components';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { NavigationService } from './services/navigation';
import { TableContentsService } from './services/content-table-service';
import { ThemeService } from './services/theme';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { FormService } from '../app/services/form/form.service';
import { FormModelService } from '../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../app/services/progress-observer/progress-observer.service';
import { AmpHttpService } from '../app/services/amp-http/amp-http.service';
import { ScrollService } from '../app/services/scroll/scroll.service';
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
    FormService ,
    AmpHttpService ,
    NavigationService ,
    ComponentsService ,
    BrowserDomAdapter ,
    ThemeService ,
    MdIconRegistry ,
    Renderer
];
