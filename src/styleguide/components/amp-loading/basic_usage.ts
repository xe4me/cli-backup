import { Component , ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmpLoadingComponent } from '../../../app/components/amp-loading/amp-loading.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-loading-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-loading/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpLoadingComponent ]
} )

export default class AmpLoadingComponentBasicUsage {
    value                  = 20;
    firstnameControl       = new FormControl();
    private loading        = true;
    private loadingAnother = true;

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    increase () {
        this.value += 10;
    }

    decrease () {
        this.value -= 10;
    }

    setloading () {
        this.loading = ! this.loading;
    }

    setloadingAnother () {
        this.loadingAnother = ! this.loadingAnother;
    }
}
