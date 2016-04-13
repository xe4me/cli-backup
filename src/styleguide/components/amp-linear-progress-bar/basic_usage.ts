import {View, Component} from 'angular2/core';
import {AmpLinearProgressBarComponent} from "../../../app/components/amp-linear-progress-bar/amp-linear-progress-bar.component";


@Component({selector: 'amp-linear-progress-bar-basic-usage'})
@View({
    templateUrl: 'src/styleguide/components/amp-linear-progress-bar/basic_usage.html',
    styles: [require('./basic_usage.scss').toString()],
    directives: [AmpLinearProgressBarComponent]
})
export default class AmpLinearProgressBarBasicUsage{

    constructor() {

    }
}
