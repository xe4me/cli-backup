import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import{ Highlight } from '../../highlight';
import { AmpQasAddressComponent } from "../../../app/components/amp-qas-address/amp-qas-address.component";
import { AmpErrorComponent } from "../../../app/components/amp-error/amp-error.component";
@Component( {
    templateUrl : 'src/styleguide/components/amp-qas-address/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        Highlight ,
        AmpQasAddressComponent ,
    ] ,
    selector    : 'amp-qas-address-basic-usage'
} )

export default class AmpQasAddressComponentBasicUsage implements AfterViewInit {
    ngAfterViewInit () : void {
    }

    public __controlGroup = new FormGroup( {} );
    public __custom       = {
        controls : [
            {
                id       : 'amp-qas' ,
                label    : 'Search here' ,
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
