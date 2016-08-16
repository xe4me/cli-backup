import {
  Component
} from '@angular/core';

@Component(
  {
    selector      : 'amp-review-item' ,
    template      : `
          <div class="grid">
            <div class="grid__item amp-review-item__label 2/5">
              <span>{{label}}</span>
            </div><!--
         --><div class="grid__item 3/5 pl">
              <span *ngIf="value">
                <span>{{value}}</span>
                <span *ngIf="postfix">{{postfix}}</span>
              </span>
              <span *ngIf="!value">-</span>
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
