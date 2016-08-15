import {
    Component
} from '@angular/core';

@Component(
    {
        selector      : 'amp-review-block' ,
        template      : `
          <div class="grid amp-review-block pv">
            <div class="grid__item">
              <h3 class="amp-review-block__title mb-10">{{title}}</h3>
            </div>
            <ng-content></ng-content>
          </div>
        ` ,
        styles        : [ require( './amp-review-block.scss' ).toString() ] ,
        inputs        : [
            'title'
        ]
    } )

export class AmpReviewBlock {
}
