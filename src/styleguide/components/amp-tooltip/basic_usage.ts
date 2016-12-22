import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../services/theme';
@Component( {
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ],
    selector : 'amp-tooltip-basic-usage',
    encapsulation : ViewEncapsulation.None
} )

export default class AmpTooltipComponentBasicUsage {
    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }
}
