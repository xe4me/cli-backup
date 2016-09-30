import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpFormRowComponent } from '../../../app/blocks/amp-form-row/amp-form-row.component';
@Component(
    {
        selector    : 'amp-input-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-input/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ AmpFormRowComponent ]
    } )
export default class AmpInputBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup     = new FormGroup( {} );
    private dateControlGroup : FormGroup = new FormGroup( {} );

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'firstname' ];
    }

    get dateControl () {
        return this.dateControlGroup.controls[ 'date' ];
    }
}
