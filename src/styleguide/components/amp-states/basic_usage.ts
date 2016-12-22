import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { AmpStatesComponent } from '../../../app/modules/amp-dropdown/components/amp-states/amp-states.component';
@Component( {
    templateUrl : './basic_usage.html',
    providers : [ ScrollService ],
    styles : [ require( './basic_usage.scss' ).toString() ],
    selector : 'amp-states-basic-usage'
} )

export default class AmpStatesDropDownComponentBasicUsage {
    @ViewChild( 'dropDown' ) dropDown : AmpStatesComponent;
    private controlGroup : FormGroup = new FormGroup( {} );
    private isInSummaryState = false;

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }
}
