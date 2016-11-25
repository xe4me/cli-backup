import {
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import {
    FormModelService
} from 'amp-ddc-components';
@Component(
    {
        selector: 'sticky-save-button',
        templateUrl : './sticky-save-button.html',
        styles: [require('./sticky-save-button.scss')],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
export class StickySaveButton {
    @Input() private form : FormGroup;
    constructor(private _cd : ChangeDetectorRef, private formModelService : FormModelService) {
    }

    public onSave() {
        this.formModelService.save(this.form.value);
    }

}
