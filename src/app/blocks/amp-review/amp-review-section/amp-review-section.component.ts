import {
    Component,
    Input } from '@angular/core';
import { AmpButton } from '../../../components/amp-button/amp-button.component';
@Component(
    {
        selector      : 'amp-review-section' ,
        template      : `
          <div class="grid amp-review-section pv">
            <div class="grid__item" *ngIf="title">
              <h3 class="amp-review-section__title mb-10">
                {{title}}
              </h3>
            </div>
            <div class="amp-review-section__change-link" *ngIf="shouldShowChangeLink">
              <amp-button (click)='onChangeClick()' class='btn btn-anchor'>
                Change
              </amp-button>
            </div>
            <ng-content></ng-content>
          </div>
        ` ,
        styles        : [ require( './amp-review-section.scss' ).toString() ] ,
        directives    : [ AmpButton ],
        inputs        : [
            'title'
        ]
    } )

export class AmpReviewSection {
    @Input() changeCallback : any;
    @Input() changeTarget : string;

    private onChangeClick() {
        if (typeof this.changeCallback === 'function') {
            this.changeCallback(this.changeTarget);
        }
    }

    private get shouldShowChangeLink() : boolean {
        return typeof this.changeCallback === 'function';
    }
}
