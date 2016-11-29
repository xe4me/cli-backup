import {
    Injectable,
    EventEmitter
} from '@angular/core';

import {
    RequestOptions,
    Headers,
 } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

/**
 * Customer details retrieval service using api-customer (which sources from CMDM).
 * If result is successful, cache it indefinitely but provide a method to force refresh. 
 */
@Injectable()
export class CustomerDetailsService {

    public $customerDetailsChanged : EventEmitter<any> = new EventEmitter<any>();

    private _customerDetails : Promise<any>;
    private _apiCustomerUrl =
        Environments.property.TamServicePath +
        Environments.property.GwDDCService.EnvPath +
        Environments.property.GwDDCService.Path +
        '/customer/customer-details';

    constructor( private http : AmpHttpService ){
    }

    public getCustomerDetails ( useCache = true ) : Promise<any> {
        // Use cache if it has valid value and requested so
        if (!this._customerDetails || !useCache) {
            this._customerDetails = this.fetchCustomerDetails().toPromise();
            this.$customerDetailsChanged.emit(this._customerDetails);
        }

        return this._customerDetails;
    }

    public fetchCustomerDetails () : Observable<any> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers , body: '' } );
        return this.http.get( this._apiCustomerUrl , options )
                        .map( (res) => res.json() );
    }
}
