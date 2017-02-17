import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'contact-details-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpCaptchaBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any>,
                  private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

}