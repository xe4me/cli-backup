import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from '../../../app/components/amp-error/amp-error.component';
import { AmpContactNumberComponent } from '../../../app/components/amp-contact-number/amp-contact-number.component';
@Component(
    {
        selector    : 'amp-contact-number-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-contact-number/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpContactNumberComponent , AmpErrorComponent ]
    } )
export default class AmpContactNumberBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'contact-number' ];
    }
}
