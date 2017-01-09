import { Injectable } from '@angular/core' ;
import { Headers, RequestOptions } from '@angular/http' ;
import { Observable } from 'rxjs/Observable' ;
import { Environments } from '../../../abstracts/environments/environments.abstract' ;
import { AmpHttpService } from '../../../services/amp-http/amp-http.service' ;
export interface Country {
    countryCode : string ;
    country : string ;
}
@Injectable()
export class AmpCountryService {
    public static BASE_URL = Environments.property.ApiCallsBaseUrl ;
    public static COUNTRY_URL = AmpCountryService.BASE_URL + '/refdata/countries' ;
    private headers = new Headers( {
        'Content-Type' : 'application/json',
        'caller' : Environments.property.ExperienceName || 'components'
    } ) ;
    private options = new RequestOptions( { headers : this.headers, body : '' } ) ;

    constructor( private http : AmpHttpService ) {
    }

    public getCountries() : Observable<Country[]> {
        return this.http
            .get( AmpCountryService.COUNTRY_URL, this.options )
            .map( ( res ) => res.json().payload ) ;
    }
}
