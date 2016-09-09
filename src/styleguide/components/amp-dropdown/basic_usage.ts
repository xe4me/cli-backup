import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpDropdownComponent } from '../../../app/components/amp-dropdown/amp-dropdown.component';
import { ThemeService } from '../../services/theme';
@Component( {
    templateUrl : 'src/styleguide/components/amp-dropdown/basic_usage.html' ,
    providers   : [ ScrollService ] ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        FORM_DIRECTIVES ,
        AmpDropdownComponent ,
        CORE_DIRECTIVES
    ] ,
    selector    : 'amp-dropdown-basic-usage'
} )

export default class AMPDropDownComponentBasicUsage implements AfterViewInit {
    control : Control = new Control();
    isInSummaryState  = false;
    titleOptions      = [
        { value : 'mr' , label : 'Mr' } ,
        { value : 'mrs' , label : 'Mrs' } ,
        { value : 'miss' , label : 'Miss' } ,
        { value : 'ms' , label : 'Ms' } ,
        { value : 'dr' , label : 'Dr' }
    ];
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }

    private onAcknowledgeSelect ( value ) {
        console.log( 'onAcknowledgeSelect value' , value );
    }
}
