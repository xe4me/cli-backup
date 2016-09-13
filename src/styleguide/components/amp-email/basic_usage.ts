import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from "../../../app/components/amp-error/amp-error.component";
import { AmpEmailComponent } from "../../../app/components/amp-email/amp-email.component";
@Component(
    {
        selector    : 'amp-email-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-email/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpEmailComponent , AmpErrorComponent ]
    } )
export default class AmpEmailBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'email' ];
    }
}

