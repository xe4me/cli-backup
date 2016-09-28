import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { AmpStandAloneMenuComponent } from '../../../app/components/amp-standalone-menu/amp-standalone-menu.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-standalone-menu-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-standalone-menu/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpStandAloneMenuComponent ]
} )

export default class AmpStandaloneMenuComponentBasicUsage {

}
