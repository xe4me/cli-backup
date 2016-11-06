import { Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy } from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    IGreenIdFormModel ,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector        : 'id-check-block' ,
    templateUrl     : './id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IdCheckBlock extends FormBlock implements OnInit {
    private modelValue : IGreenIdFormModel;
    private configScriptUrl = Environments.property.GreenId.configScriptUrl;
    private uiScriptUrl     = Environments.property.GreenId.uiScriptUrl;
    private styleUrl        = Environments.property.GreenId.styleUrl;
    private environment     = Environments.property.GreenId.environment;
    private checkboxLabel : string;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        const applicantIndex     = this.__custom.applicantIndex;
        const applicant          = this.__form.get( [ 'Application' , `Applicant${applicantIndex}Section` ] ).value;
        const personalDetails    = applicant.PersonalDetailsSection;
        const residentialAddress = personalDetails.Address.Address.residentialAddress.manualAddress;
        this.checkboxLabel       = this.__custom.checkboxLabel;
        this.modelValue          = {
            firstName          : personalDetails.BasicInfo.FirstName ,
            lastName           : personalDetails.BasicInfo.LastName ,
            middleNames        : personalDetails.BasicInfo.MiddleName || '' ,
            title              : personalDetails.BasicInfo.Title ,
            dateOfBirth        : personalDetails.BasicInfo.DateOfBirth ,
            email              : personalDetails.ContactDetails.EmailAddress ,
            verificationId     : '' ,
            verificationToken  : '' ,
            verificationStatus : '' ,
            address            : {
                country      : 'AU' ,
                state        : residentialAddress.state ,
                streetName   : residentialAddress.streetName || '' ,
                flatNumber   : residentialAddress.unitNumber || '' ,
                streetNumber : residentialAddress.streetNumber || '' ,
                suburb       : residentialAddress.suburb ,
                postcode     : residentialAddress.postCode ,
                streetType   : residentialAddress.streetType || ''
            }
        };
    }
}
