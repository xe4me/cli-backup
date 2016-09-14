import { Component , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpErrorComponent } from '../../../app/components/amp-error/amp-error.component';
import { AmpLastNameComponent } from '../../../app/components/amp-last-name/amp-last-name.component';
@Component(
    {
        selector    : 'amp-last-name-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-last-name/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpLastNameComponent , AmpErrorComponent ]
    } )
export default class AmpLastNameBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'amp-last-name' ];
    }
}
