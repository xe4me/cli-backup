import { Component } from '@angular/core';
import { AmpReviewBlock } from '../../../app/blocks/amp-review/amp-review-block/amp-review-block.component';
import { AmpReviewItem } from '../../../app/blocks/amp-review/amp-review-item/amp-review-item.component';

@Component( {
    selector    : 'amp-review-block-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/amp-review/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpReviewBlock, AmpReviewItem ]
} )

export default class AMPReviewBasicUsage {
}
