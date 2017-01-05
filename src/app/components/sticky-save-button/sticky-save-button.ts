import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
    FormModelService,
    SaveService
} from 'amp-ddc-components';
@Component(
    {
        selector        : 'sticky-save-button',
        templateUrl     : './sticky-save-button.html',
        styles          : [ require( './sticky-save-button.scss' ) ],
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class StickySaveButton {
    @Input() private form : FormGroup;

    constructor ( private router : Router,
                  private formModelService : FormModelService,
                  private saveService : SaveService ) {
    }

    public onSave () {
        /*
         * Store the model in form model service in here so we can retrieve it when we press back button !
         * */

        this.saveService.save( this.form.value ).subscribe( ( result ) => {
            this.formModelService.storeModel( this.form.value );
            const applicationId = this.form.get( [
                'Application',
                'referenceId' ] ).value;
            const mobileNumber  = this.form.get( [
                'Application',
                'Applicant1Section',
                'PersonalDetailsSection',
                'ContactDetails',
                'MobileNumber' ] ).value;
            this.router.navigate( [ 'requestsms', applicationId, mobileNumber === null ? '' : mobileNumber ] );
        } );
    }

}
