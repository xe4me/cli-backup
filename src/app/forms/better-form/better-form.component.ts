import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModelService } from 'amp-ddc-components';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'better-form',
    templateUrl : './better-form.component.html',
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
