import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { AmpTitlesComponent } from '../../../app/modules/amp-dropdown/components/amp-titles/amp-titles.component';
@Component( {
    templateUrl : './basic_usage.html',
    providers : [ ScrollService ],
    styles : [ require( './basic_usage.scss' ) ],
    selector : 'amp-titles-basic-usage'
} )

export default class AmpTitlesDropDownComponentBasicUsage {
    @ViewChild( 'dropDown' ) dropDown : AmpTitlesComponent;
    private controlGroup : FormGroup = new FormGroup( {} );
    private isInSummaryState = false;

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }
}
