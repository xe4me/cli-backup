import { Injectable, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
    FormSectionService
} from 'amp-ddc-components';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    BrowserDomAdapter ,
    AmpHttpService ,
    FormSectionService,
    Renderer
];
