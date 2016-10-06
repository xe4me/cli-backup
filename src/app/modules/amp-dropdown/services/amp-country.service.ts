/**
 * Created by SNGSE2 on 26/09/2016.
 */
import { Injectable } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AmpCountryService {
    public countries : Observable<any[]>;
    public countryServiceError = null;
    private _countryUrl        = '/ddc/public/api/refdata/countries';
    private _countries;

    constructor ( private http : Http ) {
    }

    public getCountries () {
        let headers = new Headers( {
            'Content-Type' : 'application/json'
        } );
        let options = new RequestOptions( { headers : headers , body : '' } );
        return this.http
                   .get( this._countryUrl , options )
                   .map( ( res )  => res.json().payload );
    }
}
