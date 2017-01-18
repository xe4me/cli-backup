import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';

import { ScrollService } from '../../../app/services/scroll/scroll.service';

const formDef = require( './form-def.def.json' );
import { FDN } from './Application.fdn';
import {SaveAndCloseService} from '../../../app/services/save-and-close/save-and-close.service';

@Component( {
    selector    : 'amp-save-confirmation-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ],
    providers   : [ SaveAndCloseService ]
} )
export default class AmpSaveConfirmationBlockBasicUsage implements AfterViewInit {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> ,
                  private _builder : FormBuilder,
                  private scrollService : ScrollService) {
        this.form = this._builder.group( {} );
    }

    public ngAfterViewInit () {
        // Activate the block (not active by default as set in form-block.ts)
        this.fireMockScrolledEvent(FDN.saveClose);
    }

    private fireMockScrolledEvent(fdn) {
        this.scrollService.$scrolled.emit( {
            componentSelector : [ ...fdn, 'block' ].join( '-' ),
            section           : null
        } );
    }
}