/**
 * Created by SNGSE2 on 26/09/2016.
 */
import { Injectable } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Environments } from '../../../abstracts/environments/environments.abstract';
@Injectable()
export class AmpCountryService {
    public static BASE_URL     = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
    public static COUNTRY_URL  = AmpCountryService.BASE_URL + '/refdata/countries';
    // public static COUNTRY_URL = 'http://localhost:8080/ddc/public/api/refdata/countries';
    public countryServiceError = null;
    private _cachedCountries : Observable<any[]>;

    constructor ( private http : Http ) {
    }

    public getCountries () {
        let headers = new Headers( {
            'Content-Type' : 'application/json' ,
            'caller'       : 'components'
        } );
        let options = new RequestOptions( { headers : headers , body : '' } );
        return this._cachedCountries ? this._cachedCountries :
            this.http
                .get( AmpCountryService.COUNTRY_URL , options )
                .map( ( res ) => {
                    this._cachedCountries = Observable.of( res.json().payload );
                    return res.json().payload;
                } );
    }
}
