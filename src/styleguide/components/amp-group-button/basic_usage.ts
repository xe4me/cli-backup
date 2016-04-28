import { View , Component , AfterViewInit , ChangeDetectorRef } from 'angular2/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { AmpGroupButtonComponent } from "../../../app/components/amp-group-button/amp-group-button.component";
@Component( { selector : 'amp-group-button-block-basic-usage' } )
@View( {
    templateUrl : 'src/styleguide/components/amp-group-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ MATERIAL_DIRECTIVES , FORM_DIRECTIVES , AmpGroupButtonComponent , CORE_DIRECTIVES ]
} )
export default class AmpGroupButtonComponentBasicUsage {
    control : Control            = new Control();
    private fullOrPartialButtons = {
        buttons       : [
            {
                id    : 'fullId' ,
                value : 'full' ,
                label : 'Full sale'
            } ,
            {
                id    : 'partialId' ,
                value : 'partial' ,
                label : 'Partial sale'
            }
        ] ,
        fullOrPartial : 'fullOrPartial'
    };

    private color                = 'red';

    private onButtonClick () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }

    constructor () {
    }
}
