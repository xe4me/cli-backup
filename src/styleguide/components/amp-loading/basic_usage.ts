import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component( {
    selector : 'amp-loading-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ) ]
} )

export default class AmpLoadingComponentBasicUsage {
    value = 20;
    firstnameControl = new FormControl();
    private loading = true;
    private loadingAnother = true;

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }

    increase() {
        this.value += 10;
    }

    decrease() {
        this.value -= 10;
    }

    setloading() {
        this.loading = !this.loading;
    }

    setloadingAnother() {
        this.loadingAnother = !this.loadingAnother;
    }
}
