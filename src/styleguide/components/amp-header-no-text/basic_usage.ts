import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component(
    {
        selector    : 'amp-header-no-text-basic-usage' ,
        templateUrl : './basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ) ] ,
    } )
export default class AmpHeaderNoTextBasicUsage {
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
