import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
let formDef = require( './form-def.def.json' );
@Component( {
    selector : 'amp-form-block-basic-usage',
    template : require( './basic_usage.html' ),
    styles   : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpFormBlockBasicUsage {
    public __controlGroup          = new FormGroup( {} );
    public __custom                = { controls : [ { id : 'controlId' } ] };
    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any>, private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
