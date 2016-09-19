import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from '../../../app/components/amp-error/amp-error.component';
import { AmpMobileNumberComponent } from '../../../app/components/amp-mobile-number/amp-mobile-number.component';
@Component(
    {
        selector    : 'amp-mobile-number-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-mobile-number/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpMobileNumberComponent , AmpErrorComponent ]
    } )
export default class AmpMobileNumberBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'mobile-number' ];
    }
}
