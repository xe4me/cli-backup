import { View , Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
@Component( { selector : 'amp-checkbox-basic-usage' } )
@View( {
    templateUrl : 'src/styleguide/components/amp-checkbox/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ MATERIAL_DIRECTIVES , FORM_DIRECTIVES , AmpCheckboxComponent , CORE_DIRECTIVES ]
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
