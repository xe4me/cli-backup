import { View , Component , AfterViewInit , ChangeDetectorRef } from 'angular2/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { AmpSwitchComponent } from "../../../app/components/amp-switch/amp-switch.component";
@Component( { selector : 'amp-switch-block-basic-usage' } )
@View( {
           templateUrl : 'src/styleguide/components/amp-switch/basic_usage.html' ,
           styles      : [ require( './basic_usage.scss' ).toString() ] ,
           directives  : [ MATERIAL_DIRECTIVES , FORM_DIRECTIVES , AmpSwitchComponent , CORE_DIRECTIVES ]
       } )
export default class AmpSwitchComponentBasicUsage {
    toggleFlag : boolean;
    control : Control = new Control();
    private switch    = {
        yes       : {
            id    : 'yesId' ,
            label : 'YES' ,
            value : 'true'
        } ,
        no        : {
            id    : 'noId' ,
            label : 'NO' ,
            value : 'false'
        } ,
        radioName : 'equityHolders'
    };
    surnameControl : Control = new Control();
    visibilityRule : Action;

    constructor ( private _cd : ChangeDetectorRef ) {
    }
}
