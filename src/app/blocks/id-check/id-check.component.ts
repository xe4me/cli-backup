import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService,
    IGreenIdFormModel,
    AmpGreenIdBlockComponent,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector        : 'id-check-block' ,
    templateUrl     : './id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [require('./id-check-component.scss').toString()]
} )
export class IdCheckBlock extends FormBlock {
    private showOkButton : boolean = false;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private onVerificationComplete() {
        this.showOkButton = true;
        this._cd.markForCheck();
    }

    private onOkClick() {
        this.onNext();
        this.showOkButton = false;
    }

    private get mappedGreenIdModel() : IGreenIdFormModel {
        return this.mapGreenIdModel();
    }

    private mapGreenIdModel() {
        const applicantIndex = this.__custom.applicantIndex;
        const applicant = this.__form.get(['Application', `Applicant${applicantIndex}Section` ]).value;
        const personalDetails = applicant.PersonalDetailsSection;
        const residentialAddress = personalDetails.Address.Address.residentialAddress.manualAddress;
        const state = residentialAddress.stateDropdown ? residentialAddress.stateDropdown.SelectedItem : '';
        const streetType = residentialAddress.streetTypeDropdown
                                ? residentialAddress.streetTypeDropdown.SelectedItem : '';

        return {
            firstName : personalDetails.BasicInfo.FirstName,
            lastName : personalDetails.BasicInfo.LastName,
            middleNames : personalDetails.BasicInfo.MiddleName || '',
            title : personalDetails.BasicInfo.TitleDropdown.SelectedItem,
            dateOfBirth : personalDetails.BasicInfo.DateOfBirth,
            email : personalDetails.ContactDetails.EmailAddress,
            address : {
                country : 'AU',
                state : state,
                streetName : residentialAddress.streetName || '',
                flatNumber : residentialAddress.unitNumber || '',
                streetNumber : residentialAddress.streetNumber || '',
                suburb : residentialAddress.suburb,
                postcode : residentialAddress.postCode,
                streetType : streetType
            }
        };
    }
}
