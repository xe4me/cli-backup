import { Component , ViewEncapsulation } from '@angular/core';
@Component( {
    selector      : 'amp-linear-progress-bar' ,
    template      : `
        <md-progress-bar color="amp-progressbar-sky-blue"
        [mode]="determinate"
        [value]="value">
        </md-progress-bar>
    ` ,
    inputs        : [ 'value' , 'determinate' ] ,
    styles        : [ require( './amp-linear-progress-bar.scss' ) ] ,
    encapsulation : ViewEncapsulation.None
} )
export class AmpLinearProgressBarComponent {
    private value : number;
    private determinate : string;

    constructor () {
    }
}
