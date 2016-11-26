import {
  Component
} from '@angular/core';

@Component(
  {
    selector      : 'amp-review-item' ,
    template      : `
          <div class="grid__container">
            <div class="grid__item_floated amp-review-item__label 2/5">
              <span>{{label}}</span>
            </div><!--
         --><div class="amp-review-item__value grid__item_floated 3/5 pl">
              <span *ngIf="value">
                <span>{{value}}</span>
                <span *ngIf="frequency">{{frequency}}</span>
              </span>
              <span *ngIf="!value">-</span>
            </div>
          </div>
        ` ,
    styles        : [ require( './amp-review-item.scss' ).toString() ] ,
    inputs        : [
      'label' ,
      'value' ,
      'frequency'
    ]
  } )

export class AmpReviewItemComponent {
}
