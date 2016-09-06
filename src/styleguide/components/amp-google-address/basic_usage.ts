import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AMPGoogleAddressComponent } from '../../../app/components/amp-google-address/amp-google-address.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-google-address-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-google-address/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ],
    directives  : [ AMPGoogleAddressComponent ]
} )

export default class AMPGoogleAddressComponentBasicUsage implements AfterViewInit {
    addressControl : FormControl = new FormControl();

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }
}
