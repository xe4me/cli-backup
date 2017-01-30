import {
    Http,
    Response,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AmpLoadingService } from '../amp-loading/amp-loading.service';

@Injectable()
export class AmpHttpInterceptor extends Http {
    constructor ( backend : ConnectionBackend,
                  defaultOptions : RequestOptions,
                  private loadingService : AmpLoadingService, ) {
        super( backend, defaultOptions );
    }

    request ( url : string | Request, options? : RequestOptionsArgs ) : Observable<Response> {
        return super.request( url, options ).let( ( obs ) => this.loadingService.intercept( obs, url ) );
    }
}
