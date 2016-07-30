import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core'
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
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

export default class AMPGoogleAddressComponentBasicUsage implements AfterViewInit {
    control : Control   = new Control();
    isInSummaryState    = false;
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }

    private onAcknowledgeSelect ( value ) {
        console.log( 'onAcknowledgeSelect value' , value );
    }
}
