import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { AmpCountryComponent } from '../../../app/modules/amp-dropdown/components/amp-country/amp-country.component';
@Component( {
    templateUrl : './basic_usage.html',
    providers : [ ScrollService ],
    styles : [ require( './basic_usage.scss' ).toString() ],
    selector : 'amp-country-basic-usage'
} )

export default class AmpCountryDropDownComponentBasicUsage {
    @ViewChild( 'dropDown' ) dropDown : AmpCountryComponent;
    private controlGroup : FormGroup = new FormGroup( {} );
    private isInSummaryState = false;

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }
}
