import {Component} from 'angular2/core'
import {MdProgressLinear} from 'ng2-material/all'

@Component({
    selector:'amp-linear-progress-bar',
    template:`
        <md-progress-linear  id="progress-bar"
        [mode]="determinate" 
        [value]="value">
        </md-progress-linear>
    `,
    inputs:['value','determinate'],
    directives:[MdProgressLinear],
    styles: [require('./amp-linear-progress-bar.scss').toString()],
})
export class AmpLinearProgressBarComponent{
    private value:number;
    private determinate:string;
    constructor(){

    }
}