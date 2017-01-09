import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ScrollService } from '../../../app/services/scroll/scroll.service';

const formDef = require( './form-def.def.json' );
import { FDN } from './Application.fdn';

@Component( {
    selector    : 'contact-details-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpContactDetailsBlockBasicUsage implements AfterViewInit {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> ,
                  private _builder : FormBuilder,
                  private scrollService : ScrollService,
                  public router : Router ) {
        this.form = this._builder.group( {} );
    }

    public ngAfterViewInit () {
        // Activate the block (not active by default as set in form-block.ts)
        // FIXME To be removed once form-def 'active' property taken into account
        this.fireMockScrolledEvent(FDN.contactDetails);
    }

    public navigate ( to : any ) {
        this.router.navigate( to );
    }

    private fireMockScrolledEvent(fdn) {
        this.scrollService.$scrolled.emit( {
            componentSelector : [ ...fdn, 'block' ].join( '-' ),
            section           : null
        } );
    }

}
