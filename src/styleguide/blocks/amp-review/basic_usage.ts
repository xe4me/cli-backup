import { Component } from '@angular/core';
import { AmpReviewSection } from '../../../app/blocks/amp-review/amp-review-section/amp-review-section.component';
import { AmpReviewItem } from '../../../app/blocks/amp-review/amp-review-item/amp-review-item.component';
import { AmpReviewTotal } from '../../../app/blocks/amp-review/amp-review-total/amp-review-total.component';

@Component( {
    selector    : 'amp-review-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/amp-review/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpReviewSection, AmpReviewItem, AmpReviewTotal ]
} )

export default class AMPReviewBasicUsage {
}
