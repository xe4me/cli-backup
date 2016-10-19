import { Injectable } from '@angular/core';
import { Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Environments } from '../../../abstracts/environments/environments.abstract';
import { AmpHttpService } from '../../../services/amp-http/amp-http.service';
@Injectable()
export class AmpCountryService {
    public static BASE_URL     = Environments.property.ApiCallsBaseUrl;
    public static COUNTRY_URL  = AmpCountryService.BASE_URL + '/refdata/countries';
    // public static COUNTRY_URL = 'https://ddc-uat.digital-np.ampaws.com.au/ddc/public/api/refdata/countries';
    public countryServiceError = null;
    private _cachedCountries : Observable<any[]>;

    constructor ( private http : AmpHttpService ) {
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
