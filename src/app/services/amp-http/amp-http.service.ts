import { Environments } from '../../abstracts/environments/environments.abstract';
import { Http , BaseRequestOptions , Headers , Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Injectable } from '@angular/core';
const TAM_GW_API_KEY    = 'apiKey';
const BASIC_AUTH_BEARER = 'Bearer ';
const CACHE_CONTROL = 'Cache-Control';

@Injectable()
export class AmpHttpService {
    constructor ( private http : Http ) {
    }

    get ( url , options ) : Observable<Response> {
        if (url.startsWith('http')) {
            return this.http.get( url , this.injectCustomOptions( url , options ) );
        }
        return this.http.get( Environments.host + url , this.injectCustomOptions( url , options ) );
    }

    post ( url , data , options ) : Observable<Response> {
        if (url.startsWith('http')) {
            return this.http.post( url , data , this.injectCustomOptions( url , options ) );
        }
        return this.http.post( Environments.host + url , data , this.injectCustomOptions( url , options ) );
    }

    injectCustomOptions ( url : string , options : BaseRequestOptions ) : BaseRequestOptions {
        if ( url && options ) {
            if ( url.indexOf( Environments.property.GwPracticeService.Path ) > - 1 ) {
                this.addHeader( options , TAM_GW_API_KEY , BASIC_AUTH_BEARER + Environments.property.GwPracticeService.ApiKey );
            } else if ( url.indexOf( Environments.property.GwDDCService.Path ) > - 1 ) {
                this.addHeader( options , TAM_GW_API_KEY , BASIC_AUTH_BEARER + Environments.property.GwDDCService.ApiKey );
            }
        }

        // Default Cache-Control to no-cache header if none is specified.
        if (!(options && options.headers && options.headers.has(CACHE_CONTROL))) {
            this.addHeader(options, CACHE_CONTROL, 'no-cache');
        }
        return options;
    }

    addHeader ( option : BaseRequestOptions , key : string , value : string ) {
        if ( option && option.headers ) {
            // Will override whatever value in the existing headers
            option.headers.set(key, value);
        } else {
            option.headers = new Headers( { [key]: value } );
        }
    }
}
