import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    FormGroup ,
    FormBuilder
} from '@angular/forms';

const formDef = require( './form-def.def.json' );
import {SaveAndCloseService} from '../../../app/services/save-and-close/save-and-close.service';

@Component( {
    selector    : 'amp-save-confirmation-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ],
    providers   : [ SaveAndCloseService ]
} )
export default class AmpSaveConfirmationBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> ,
                  private _builder : FormBuilder) {
        this.form = this._builder.group( {} );
    }

}
