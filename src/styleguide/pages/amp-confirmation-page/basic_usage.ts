import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component( {
    selector    : 'amp-confirmation-page-basic-usage',
    templateUrl : 'basic_usage.html',
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpConfirmationPageBasicUsage {

    constructor ( public store : Store<any>,
                  public router : Router ) {
    }

}
