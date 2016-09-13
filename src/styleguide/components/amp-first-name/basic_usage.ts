import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from "../../../app/components/amp-error/amp-error.component";
import { AmpFirstNameComponent } from "../../../app/components/amp-first-name/amp-first-name.component";
@Component(
    {
        selector    : 'amp-first-name-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-first-name/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpFirstNameComponent , AmpErrorComponent ]
    } )
export default class AmpFirstNameBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'amp-first-name' ];
    }
}

