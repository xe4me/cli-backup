import { View , Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
@Component( { selector : 'amp-button-basic-usage' } )
@View( {
    templateUrl : 'src/styleguide/components/amp-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ MATERIAL_DIRECTIVES , FORM_DIRECTIVES , AmpButton , CORE_DIRECTIVES ]
} )
export default class AMPButtonComponentBasicUsage {
    isInSummaryState    = false;

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    clickMethod (id: number) {
        console.log('Clicked on button number ' + id);
    }

    // ngAfterViewInit () {
    //
    //     // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
    //     this._cd.detectChanges();
    // }

    // private onAcknowledgeSelect ( value ) {
    //     console.log( 'onAcknowledgeSelect value' , value );
    // }
}
