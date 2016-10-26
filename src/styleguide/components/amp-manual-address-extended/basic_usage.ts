import { Component , AfterViewInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Highlight } from '../../highlight';
@Component( {
    templateUrl : 'src/styleguide/components/amp-manual-address-extended/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        Highlight
    ] ,
    selector    : 'amp-manual-address-extended-basic-usage'
} )

export default class AmpManualAddressExtendedComponentBasicUsage {
    public __controlGroup   = new FormGroup( {} );
    public isInSummaryState = false;
    public __custom         = {
        controls : [
            {
                id       : 'amp-manual-extended' ,
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}