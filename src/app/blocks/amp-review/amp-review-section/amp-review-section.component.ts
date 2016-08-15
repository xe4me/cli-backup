import {
    Component
} from '@angular/core';

@Component(
    {
        selector      : 'amp-review-section' ,
        template      : `
          <div class="grid amp-review-section pv">
            <div class="grid__item">
              <h3 class="amp-review-section__title mb-10">{{title}}</h3>
            </div>
            <ng-content></ng-content>
          </div>
        ` ,
        styles        : [ require( './amp-review-section.scss' ).toString() ] ,
        inputs        : [
            'title'
        ]
    } )

export class AmpReviewSection {
}
