import { Component , AfterViewInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Highlight } from '../../highlight';
@Component( {
    templateUrl : 'src/styleguide/components/amp-manual-address/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        Highlight
    ] ,
    selector    : 'amp-manual-address-basic-usage'
} )

export default class AmpManualAddressComponentBasicUsage  {
    public __controlGroup   = new FormGroup( {} );
    public isInSummaryState = false;
    public __custom         = {
        controls : [
            {
                id       : 'amp-manual' ,
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

    ngAfterViewInit () : void {
    }
}
