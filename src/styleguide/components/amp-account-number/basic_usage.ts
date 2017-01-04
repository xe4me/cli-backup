import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component(
    {
        selector : 'amp-account-number-basic-usage',
        templateUrl : './basic_usage.html',
        styles : [ require( './basic_usage.scss' ) ]
    } )
export default class AmpAccountNumberBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }

    get control() {
        return this.controlGroup.controls[ 'account-number' ];
    }
}
