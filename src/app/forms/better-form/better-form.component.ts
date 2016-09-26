import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AmpBlockLoaderDirective } from 'amp-ddc-components/src/app/amp-block-loader.directive';
const formDef = require('./form-def.def.json');
@Component({
    selector: 'better-form',
    directives: [AmpBlockLoaderDirective],
    templateUrl: 'better-form.component.html',
    styles: [require('./better-form.component.scss')]
})
export class BetterFormComponent{
    private fullyDistinguishedName = [];
    private childBlocks = formDef;
    private form : FormGroup;

    constructor(private _builder: FormBuilder) {
        this.form = this._builder.group({});
    }
}
