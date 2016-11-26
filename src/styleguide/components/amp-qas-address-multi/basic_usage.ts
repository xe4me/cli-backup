import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component( {
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ],
    selector : 'amp-qas-address-multi-basic-usage'
} )

export default class AmpQasAddressMultiComponentBasicUsage implements AfterViewInit {
    public __controlGroup = new FormGroup( {} );
    public isInSummaryState = false;
    public __custom = {
        controls : [
            {
                id : 'amp-qas',
                label : 'Search here',
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
