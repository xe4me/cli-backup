import { Component } from '@angular/core';
import { AmpCountryService } from '../../../app/modules/amp-dropdown/services/amp-country.service';
import { Http } from '@angular/http';
@Component( {
    selector    : 'amp-loading-button-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ]
} )
export default class AmpLoadingButtonBasicUsage {
    constructor ( private http : Http ) {

    }

    private callHttp () {
        console.log( 'Calling callHttp' );
        this.http.get( AmpCountryService.COUNTRY_URL, null ).subscribe()
    }
}
