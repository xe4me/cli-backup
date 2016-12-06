import {
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(
        private _cd : ChangeDetectorRef,
        private router : Router,
        private formModelService : FormModelService) {
    }

    public onSave() {
        this.formModelService.saveModel(this.form.value).subscribe( (result) => {

            /*
            * Store the model in form model service in here so we can retrieve it when we press back button !
            * */
            this.formModelService.storeModel( this.form.value );

            const applicationId = this.form.get([
                'Application',
                'referenceId']).value;
            const mobileNumber = this.form.get([
                'Application',
                'Applicant1Section',
                'PersonalDetailsSection',
                'ContactDetails',
                'MobileNumber']).value;
            this.router.navigate( ['requestsms', applicationId, mobileNumber === null ? '' : mobileNumber] );
        });
    }

}
