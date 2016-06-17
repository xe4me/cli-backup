import { View , Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpTextareaComponent } from '../../../app/components/amp-textarea/amp-textarea.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
@Component( { selector : 'amp-textarea-basic-usage' } )
@View( {
    templateUrl : 'src/styleguide/components/amp-textarea/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ MATERIAL_DIRECTIVES , FORM_DIRECTIVES , AmpTextareaComponent , CORE_DIRECTIVES ]
} )
export default class AMPGoogleAddressComponentBasicUsage {
    control : Control = new Control();

    constructor ( private _cd : ChangeDetectorRef ) {
    }
}
