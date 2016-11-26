import { Component } from '@angular/core';
@Component( {
    selector    : 'amp-review-basic-usage' ,
    templateUrl : './basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AMPReviewBasicUsage {
    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {
        // Note: This method is only needed in the AMP Review block
    }
}
