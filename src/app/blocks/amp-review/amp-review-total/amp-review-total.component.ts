import {
  Component
} from '@angular/core';

@Component(
  {
    selector      : 'amp-review-total' ,
    template      : `
          <div class="grid amp-review-total pv">
            <h3 class="grid__item amp-review-total__label 2/5">
              <span>{{label}}</span>
            </h3><!--
         --><div class="amp-review-total__value grid__item 3/5 pl">
              <span *ngIf="value">
                <span>{{value}}</span>
                <span *ngIf="frequency">{{frequency}}</span>
              </span>
              <span *ngIf="!value">-</span>
            </div>
          </div>
        ` ,
    styles        : [ require( './amp-review-total.scss' ).toString() ] ,
    inputs        : [
      'label' ,
      'value' ,
      'frequency'
    ]
  } )

export class AmpReviewTotal {
}
