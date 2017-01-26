import { Component } from '@angular/core';
import { AmpCountryService } from '../../../app/modules/amp-dropdown/services/amp-country.service';
import { Http } from '@angular/http';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-loading-button-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ]
} )
export default class AmpLoadingButtonBasicUsage {
    constructor ( private  themeService : ThemeService, private http : Http ) {

    }

    private callHttp () {
        this.http.get( AmpCountryService.COUNTRY_URL, null ).subscribe();
    }
}
