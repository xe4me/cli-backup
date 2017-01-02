import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';

let formDef = require( './form-def.def.json' );

// Test:
// /Users/mac-cedric/Downloads/galen-bin-2.3.2/galen test ./src/styleguide/blocks/amp-basic-info-block/ --htmlreport report --recursive"

@Component( {
    selector : 'basic-info-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ]
} )
export default class BasicInfoBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> , private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
