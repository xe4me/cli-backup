import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import{ Highlight } from '../../highlight';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
@Component( {
    templateUrl : 'src/styleguide/components/amp-qas-address/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        Highlight ,
        AmpButton
    ] ,
    selector    : 'amp-qas-address-basic-usage'
} )

export default class AmpQasAddressComponentBasicUsage implements AfterViewInit {
    public __controlGroup = new FormGroup( {} );
    public __custom = {
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

    ngAfterViewInit () : void {
    }
}
