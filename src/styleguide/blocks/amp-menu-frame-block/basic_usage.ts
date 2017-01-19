import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
const formDef = require( './form-def.def.json' );
import { FDN } from './Application.fdn';

@Component( {
    selector    : 'menu-frame-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ],
    encapsulation: ViewEncapsulation.None,
} )
export default class AmpMenuFrameBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
