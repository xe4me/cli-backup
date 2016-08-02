import { Component , ChangeDetectorRef } from '@angular/core';
import { Control } from '@angular/common';
import { AmpLoadingComponent } from '../../../app/components/amp-loading/amp-loading.component';
import { MdInputComponent } from '../../../app/components/my-md-input/my-md-input.component';
import { InputWithLoadingGroupComponent } from '../../../app/component-groups/input-with-loading-group/input-with-loading-group.component';
@Component( {
    selector    : 'amp-loading-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-loading/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ InputWithLoadingGroupComponent , AmpLoadingComponent , MdInputComponent ]
} )

export default class AmpLoadingComponentBasicUsage {
    value                  = 20;
    firstnameControl       = new Control();
    private loading        = true;
    private loadingAnother = true;

    constructor ( private _cd : ChangeDetectorRef ) {
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
