import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import {
    Injectable,
    Renderer
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ComponentsService } from './services/components';
import { NavigationService } from './services/navigation';
import { TableContentsService } from './services/content-table-service';
import { ThemeService } from './services/theme';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { MdIconRegistry } from '@angular/material';
import {
    PdfService,
    FormModelService,
    AmpHttpService,
    ScrollService,
    AdvisorProfileService,
    AdvisorsService,
    ContextService,
    ProfileService,
    HydrationService,
    SaveAndSubmitService,
    ErrorService,
    SubmitService,
    SaveService,
    TransformService
} from '../app/services';

@Injectable()
export class DataResolver implements Resolve<any> {
    constructor () {

    }

    resolve ( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
        return Observable.of( { res : 'I am data' } );
    }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    DataResolver,
    FormModelService,
    TableContentsService,
    PdfService,
    ScrollService,
    SaveService,
    TransformService,
    SubmitService,
    SaveAndSubmitService,
    ProfileService,
    HydrationService,
    ContextService,
    AdvisorsService,
    AdvisorProfileService,
    ErrorService,
    AmpHttpService,
    NavigationService,
    ComponentsService,
    BrowserDomAdapter,
    ThemeService,
    MdIconRegistry,
    Renderer
];
