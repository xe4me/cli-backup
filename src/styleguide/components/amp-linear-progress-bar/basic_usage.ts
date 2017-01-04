import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme';
@Component( {
    selector : 'amp-linear-progress-bar-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ) ]
} )

export default class AmpLinearProgressBarBasicUsage {
    constructor( private  themeService : ThemeService ) {
    }
}
