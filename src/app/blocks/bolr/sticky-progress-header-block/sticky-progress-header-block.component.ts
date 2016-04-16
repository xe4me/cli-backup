import {Component} from 'angular2/core';
import {AmpLinearProgressBarComponent} from '../../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
@Component({
    selector: 'sticky-progress-header-block',
    template: `
        <div class="sticky">
            <div class="sticky__header">
                <div class="sticky__header--left">
                    <span>Request to exercise buyer of last resort (BOLR)</span><span class="line-vertical-text-wrap line-vertical-text-wrap-gray "></span><span class="utils__weight--700">{{value}}%</span>
                </div>
                <div class="sticky__header--right bolr-right-padding">
                    <span class="sticky__header--right--chat">
                        <span aria-hidden="true" class="icon icon--chat"></span> Chat now
                    </span>
                    <span class="sticky__header--right--call">
                        <span aria-hidden="true" class="icon icon--phone"></span> 1300 158 587
                    </span>
                </div>
            </div>

            <div class="sticky__progress">
                <amp-linear-progress-bar
                    [determinate]="determinate"
                    [value]="value"
                    >
                </amp-linear-progress-bar>
            </div>
        </div>

    `,
    directives: [AmpLinearProgressBarComponent],
    inputs: ['determinate', 'value'],
    styles: [require('./sticky-progress-header-block.component.scss').toString()],
})

export class StickyProgressHeaderBlockComponent {
    private value: number;
    private determinate: string;

    constructor() {
    }
}
