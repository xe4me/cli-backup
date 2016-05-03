import { View , Component , AfterViewInit , ChangeDetectorRef } from 'angular2/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from 'angular2/common';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { AmpRadioButtonGroupComponent } from "../../../app/components/amp-radio-button-group/amp-radio-button-group.component";
@Component( { selector : 'amp-radio-group-button-block-basic-usage' } )
@View( {
    templateUrl : 'src/styleguide/components/amp-radio-group-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ MATERIAL_DIRECTIVES , FORM_DIRECTIVES , AmpRadioButtonGroupComponent , CORE_DIRECTIVES ]
} )
export default class AmpRadioGroupButtonComponentBasicUsage {
    oneOptionControl : Control        = new Control();
    multipleOptionControl : Control   = new Control();
    public radiosOneOption            = {
        buttons   : [
            {
                id    : 'five_years' ,
                value : 'five_years' ,
                label : 'At least five years'
            }
        ] ,
        groupName : 'practiceAssociation'
    };
    public radiosMultipleOptions      = {
        buttons   : [
            {
                id    : 'five_years2' ,
                value : 'five_years2' ,
                label : 'At least five years'
            } ,
            {
                id    : 'fewer_than_five_years' ,
                value : 'fewer_than_five_years' ,
                label : 'Fewer than five years'
            } ,
            {
                id    : 'more_than_five_years' ,
                value : 'more_than_five_years' ,
                label : 'More than five years'
            } ,
            {
                id    : 'amazing_value' ,
                value : 'amazing_value' ,
                label : 'How amazing this radio button is '
            }
        ] ,
        groupName : 'amazingRadioButtonGroupName'
    };
    private autoSelectOnOne : boolean = true;
    private color                     = 'red';

    private onOneRadioButtonSelect () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }

    private onMultipleRadioButtonSelect () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }

    constructor () {
    }
}
