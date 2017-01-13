import { Component, AfterViewInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
const formDef = require( './form-def.def.json' );
import { FDN } from './Application.fdn';

@Component( {
    selector    : 'welcome-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ]
} )
export default class AmpWelcomeBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
