import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component(
    {
        selector    : 'amp-tax-file-number-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-tax-file-number/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
    } )
export default class AmpTaxFileNumberBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'tax-file-number' ];
    }
}
