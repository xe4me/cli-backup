import { Component , AfterViewInit , ChangeDetectorRef , OnInit } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core'
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
import { ThemeService } from '../../services/theme';
@Component( {
    templateUrl : 'src/styleguide/components/amp-checkbox/basic_usage.html' ,
    providers   : [ ScrollService ] ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        FORM_DIRECTIVES ,
        AmpCheckboxComponent ,
        CORE_DIRECTIVES
    ] ,
    selector    : 'amp-checkbox-basic-usage'
} )

export default class AMPCheckboxComponentBasicUsage implements OnInit {
    control : Control   = new Control();
    isInSummaryState    = false;
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
    }

    private check () {
        this.control.updateValue( ! this.control.value );
    }

    ngAfterViewInit () {
    }

    private onAcknowledgeSelect ( value ) {
        console.log( 'onAcknowledgeSelect value' , value );
    }
}
