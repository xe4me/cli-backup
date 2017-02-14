import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    FormModelService,
    LoginStatusService,
    CustomerDetailsService
} from 'amp-ddc-components';
import { EligibleAccountsService } from '../../shared/eligible-accounts.service';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'better-form',
    template        : require( './better-form.component.html'),
    providers: [
        LoginStatusService,
        EligibleAccountsService,
        CustomerDetailsService
    ],
    styles      : [ require( './better-form.component.scss' ) ]
} )
export class BetterFormComponent {
    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( private formModelService : FormModelService ) {
        this.form = this.formModelService.hydrateForm();
    }
}
