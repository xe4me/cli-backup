import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdInputComponent } from '../../../app/components/my-md-input/my-md-input.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { ThemeService } from '../../services/theme';
@Component(
    {
        selector    : 'my-md-input-basic-usage' ,
        templateUrl : 'src/styleguide/components/my-md-input/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ],
        directives  : [ MdInputComponent ]
    } )
export default class MyMdInputBasicUsage implements AfterViewInit {
    toggleFlag : boolean;
    dateControl : FormControl = new FormControl();
    firstnameControl : FormControl = new FormControl();
    surnameControl : FormControl   = new FormControl();
    visibilityRule : Action;

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {
        this.visibilityRule = new Action( ( toggle ) => {
            // console.log("toggleFlag", toggle, this.toggleFlag);
            // For some reason the parameters are not working as it should.
            return this.toggleFlag;
        } , [ this.toggleFlag ] );
        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }
}

