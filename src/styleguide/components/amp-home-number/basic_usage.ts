import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component(
    {
        selector    : 'amp-home-number-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-home-number/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ]
    } )
export default class AmpHomeNumberBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'home-number' ];
    }
}
