import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'contact-details-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpContactDetailsBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any>,
                  private _builder : FormBuilder,
                  public router : Router ) {
        this.form = this._builder.group( {} );
    }

    public navigate ( to : any ) {
        this.router.navigate( to );
    }

}
