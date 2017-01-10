import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';

import { ScrollService } from '../../../app/services/scroll/scroll.service';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'basic-info-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpBasicInfoBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> ,
                  private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

}
