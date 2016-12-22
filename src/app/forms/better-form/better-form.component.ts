import { Component } from '@angular/core';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
import {
    FormModelService
} from 'amp-ddc-components';
import { AmpBlockLoaderDirective } from 'amp-ddc-components/src/app/amp-block-loader.directive';

const formModel = require('./form-model.model.json');
const formDef = require('./form-def.def.json');

@Component({
    selector: 'better-form',
    directives: [AmpBlockLoaderDirective],
    templateUrl: 'better-form.component.html',
    styles: [require('./better-form.component.scss')]
})
export class BetterFormComponent {
    private fullyDistinguishedName = [];
    private childBlocks = formDef;
    private form : FormGroup = new FormGroup({});

    constructor(private _builder : FormBuilder, private formModelService : FormModelService ) {
        this.form = this.formModelService.hydrateForm();
        //this.form.patchValue(formModel);
    }
}
