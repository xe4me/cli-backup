import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from "../../../app/components/amp-error/amp-error.component";
import { AmpWorkNumberComponent } from "../../../app/components/amp-work-number/amp-work-number.component";
@Component(
    {
        selector    : 'amp-work-number-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-work-number/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpWorkNumberComponent , AmpErrorComponent ]
    } )
export default class AmpWorkNumberBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'work-number' ];
    }
}

