import {
    Component
} from '@angular/core';

@Component(
    {
        selector      : 'amp-review-item' ,
        template      : `
          <div class="grid">
            <div class="grid__item review--item__title 2/5">
              <span>{{label}}</span>
            </div><!--
         --><div class="grid__item 2/5">
              <span>{{value}}</span>
              <span *ngIf="postfix">{{postfix}}</span>
            </div>
          </div>
        ` ,
        styles        : [ require( './amp-review-item.scss' ).toString() ] ,
        inputs        : [
            'label' ,
            'value' ,
            'postfix'
        ]
    } )

export class AmpReviewItem {
}
