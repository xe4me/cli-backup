import {
    Component,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import {
    FormControl,
    FormGroup
} from '@angular/forms';
import { ThemeService } from '../../services/theme';

@Component(
    {
        selector    : 'amp-password-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-password/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ]
    } )
export default class AmpPasswordBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup     = new FormGroup( {} );
    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'amp-password' ];
    }

}
