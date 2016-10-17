import { Component , AfterViewInit , ChangeDetectorRef , ViewChild } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
@Component( {
    templateUrl : 'src/styleguide/components/amp-tooltip/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    selector    : 'amp-tooltip-basic-usage'
} )

export default class AmpTooltipComponentBasicUsage {
    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
