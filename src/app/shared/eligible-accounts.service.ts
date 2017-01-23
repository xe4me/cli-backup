import { Injectable } from '@angular/core';
import {
    Headers,
    RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
    Environments,
    AmpHttpService
} from 'amp-ddc-components';

@Injectable()
export class EligibleAccountsService {
    public static BASE_URL = Environments.property.ApiCallsBaseUrl;
    public static API_URL = EligibleAccountsService.BASE_URL + '/bett3r/eligible-accounts';

    constructor( private http : AmpHttpService ) {
    }

    public getEligibleAccounts () : Observable<any> {
        const headers = new Headers( {
            'Content-Type' : 'application/json',
            'caller'       : Environments.property.ExperienceName
        } );
        const options = new RequestOptions( { headers, body : '' } );

        return this.http
            .get( EligibleAccountsService.API_URL, options )
            .map( ( res ) => res.json() );
    }
}
