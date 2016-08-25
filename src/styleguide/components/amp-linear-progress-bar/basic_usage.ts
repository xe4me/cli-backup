import { Component } from '@angular/core';
import { AmpLinearProgressBarComponent } from '../../../app/components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-linear-progress-bar-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-linear-progress-bar/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpLinearProgressBarComponent ]
} )

export default class AmpLinearProgressBarBasicUsage {
    constructor ( private  themeService : ThemeService ) {
    }
}
