import { Component } from '@angular/core';
import { AmpLogoComponent } from '../../../app/modules/amp-logo/components/amp-logo/amp-logo.component';

@Component( {
    selector    : 'amp-logo-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-logo/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpLogoComponent ]
} )

export default class AMPLogoComponentBasicUsage {

    constructor () {
    }

}
