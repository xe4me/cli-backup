import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { AmpStreetTypesComponent } from '../../../app/modules/amp-dropdown/components/amp-street-types/amp-street-types.component';
@Component( {
    templateUrl : './basic_usage.html',
    providers : [ ScrollService ],
    styles : [ require( './basic_usage.scss' ) ],
    selector : 'amp-street-types-basic-usage'
} )

export default class AmpStreetTypesDropDownComponentBasicUsage {
    @ViewChild( 'dropDown' ) dropDown : AmpStreetTypesComponent;
    private controlGroup : FormGroup = new FormGroup( {} );
    private isInSummaryState = false;

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }
}
