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

    public customerDetailsChanged : EventEmitter<any> = new EventEmitter<any>();

    private customerDetails : Promise<any>;
    private apiCustomerUrl =
        Environments.property.TamServicePath +
        Environments.property.GwDDCService.EnvPath +
        Environments.property.GwDDCService.Path +
        '/customer/customer-details';

    constructor( private http : AmpHttpService ){
    }

    public getCustomerDetails ( useCache = true ) : Promise<any> {
        // Use cache if it has valid value and requested so
        if (!this.customerDetails || !useCache) {
            this.customerDetails = this.fetchCustomerDetails().toPromise();
            this.customerDetailsChanged.emit(this.customerDetails);
        }

        return this.customerDetails;
    }

    public fetchCustomerDetails () : Observable<any> {
        let headers = new Headers( {
            'Content-Type': 'application/json',
            'caller'       : Environments.property.experienceName || 'components'
        } );
        let options = new RequestOptions( { headers: headers , body: '' } );
        return this.http.get( this.apiCustomerUrl , options )
                        .map( (res) => res.json() );
    }
}
