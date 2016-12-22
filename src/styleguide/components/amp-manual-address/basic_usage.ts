import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component( {
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ],
    selector : 'amp-manual-address-basic-usage'
} )

export default class AmpManualAddressComponentBasicUsage {
    public __controlGroup = new FormGroup( {} );
    public isInSummaryState = false;
    public __custom = {
        controls : [
            {
                id : 'amp-manual',
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

    ngAfterViewInit() : void {
    }
}
