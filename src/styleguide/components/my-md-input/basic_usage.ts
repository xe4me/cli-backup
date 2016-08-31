import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { MdInputComponent } from '../../../app/components/my-md-input/my-md-input.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { ThemeService } from '../../services/theme';
@Component(
    {
        selector    : 'my-md-input-basic-usage' ,
        templateUrl : 'src/styleguide/components/my-md-input/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ] ,
        directives  : [ FORM_DIRECTIVES , MdInputComponent , CORE_DIRECTIVES ]
    } )
export default class MyMdInputBasicUsage implements AfterViewInit {
    toggleFlag : boolean;
    firstnameControl : Control = new Control();
    dateControl : Control = new Control();
    surnameControl : Control   = new Control();
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

