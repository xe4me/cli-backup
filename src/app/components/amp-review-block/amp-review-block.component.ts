import {
    Component
} from '@angular/core';

@Component(
    {
        selector      : 'amp-review-block' ,
        template      : `
          <div class="grid review--section">
            <div class="grid__item 1/2">
              <h3>{{title}}</h3>
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
