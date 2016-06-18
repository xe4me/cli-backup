import {Component, ViewEncapsulation} from '@angular/core';
import {MdProgressBar} from '@angular2-material/progress-bar';

@Component({
    selector: 'amp-linear-progress-bar',
    template: `
        <md-progress-bar color="amp-progressbar-sky-blue"
        [mode]="determinate"
        [value]="value">
        </md-progress-bar>
    `,
    inputs: ['value', 'determinate'],
    directives: [MdProgressBar],
    styles: [require('./amp-linear-progress-bar.scss').toString()],
    encapsulation: ViewEncapsulation.None
})
export class AmpLinearProgressBarComponent {
    private value: number;
    private determinate: string;

    constructor() {
    }
}
