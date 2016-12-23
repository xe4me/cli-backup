import { Component } from '@angular/core';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
import {
    FormModelService
} from 'amp-ddc-components';
import { AmpBlockLoaderDirective } from 'amp-ddc-components/src/app/amp-block-loader.directive';

const formDef = require('./form-def.def.json');

@Component({
    selector: 'better-form',
    templateUrl: './better-form.component.html',
    styles: [require('./better-form.component.scss')]
})
export class BetterFormComponent {
    private fullyDistinguishedName = [];
    private childBlocks = formDef;
    private form : FormGroup;

    constructor(private _builder : FormBuilder, private formModelService : FormModelService ) {
        this.form = this.formModelService.hydrateForm();
    }
}
