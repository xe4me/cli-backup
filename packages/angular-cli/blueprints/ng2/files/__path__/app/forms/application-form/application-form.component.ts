import { Component } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import {  FormModelService} from 'amp-ddc-components';
let formDefinition = require( './form-def.def.json' );
@Component( {
    selector : 'application-form',
    templateUrl : './application-form.component.html',
    styles : [ require( './application-form.component.scss' ) ]
} )
export class ApplicationFormComponent {
    private form : FormGroup;
    private formDef                      = formDefinition;
    private fullyDistinguishedName                      = [];
    constructor( private _builder : FormBuilder,
                 private formModelService : FormModelService ) {
        this.form = this.formModelService.hydrateForm();
    }
}
