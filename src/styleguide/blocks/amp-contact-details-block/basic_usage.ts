import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'contact-details-block-basic-usage',
    template    : require('./basic_usage.html'),
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpContactDetailsBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup       = new FormGroup ({});

    constructor () {}

}
