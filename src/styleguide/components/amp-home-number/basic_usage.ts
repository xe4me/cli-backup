import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from '../../../app/components/amp-error/amp-error.component';
import { AmpHomeNumberComponent } from '../../../app/components/amp-home-number/amp-home-number.component';
@Component(
    {
        selector    : 'amp-home-number-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-home-number/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpHomeNumberComponent , AmpErrorComponent ]
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
