import {
    SharedFormDataService,
    ApplicantGeneratorService,
    AccountsListDataService
} from './shared';
import 'rxjs/add/observable/of';
import {
    FormModelService,
    ScrollService,
    ProgressObserverService,
    AmpHttpService,
    FormSectionService,
    CustomerDetailsService
} from 'amp-ddc-components';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    FormModelService,
    ScrollService,
    ProgressObserverService,
    AmpHttpService,
    BrowserDomAdapter,
    SharedFormDataService,
    ApplicantGeneratorService,
    AccountsListDataService,
    FormSectionService,
    CustomerDetailsService
];
