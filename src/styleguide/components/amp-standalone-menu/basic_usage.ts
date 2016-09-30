import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-standalone-menu-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-standalone-menu/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]

} )

export default class AmpStandaloneMenuComponentBasicUsage {

}
