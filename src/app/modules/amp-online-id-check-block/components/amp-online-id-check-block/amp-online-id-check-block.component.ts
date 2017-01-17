import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormBlock } from "../../../../form-block";
import { IGreenIdFormModel } from "../../../amp-greenid-block/interfaces/form-model";
import { SaveService } from "../../../../services/save/save.service";
import { ScrollService } from "../../../../services/scroll/scroll.service";

@Component( {
    selector        : 'amp-online-id-check-block',
    template        : require( './amp-online-id-check-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( './amp-online-id-check-block.component.scss' ).toString() ]
} )
export class AmpOnlineIdCheckBlockComponent extends FormBlock {

    private showOkButton : boolean = false;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    private onVerificationComplete () {
        this.showOkButton = true;
        this._cd.markForCheck();
    }

    private onOkClick () {
        this.onNext();
        this.showOkButton = false;
    }

    private get mappedGreenIdModel () : IGreenIdFormModel {
        return this.mapGreenIdModel();
    }

    private mapGreenIdModel () {

        const personalDetailsObj = this.__form.get(this.__custom.personalDetailsSectionName);
        if (!personalDetailsObj) {
            console.error(`Problem in "onlineIdCheck" custom properties. form.personalDetailsSectionName is ${personalDetailsObj}`);
            return AmpOnlineIdCheckBlockComponent.buildEmptyGreenIdModel();
        }
        const personalDetails = this.__form.get(this.__custom.personalDetailsSectionName).value;
        const basicInfo       = personalDetails[this.__custom.basicInfoBlockName];
        const contactDetails  = personalDetails[this.__custom.contactDetailsBlockName];
        const address         = personalDetails[this.__custom.addressBlockName];

        const residentialAddress = address.Address.residentialAddress.manualAddress;
        const state              = residentialAddress.stateDropdown ? residentialAddress.stateDropdown.SelectedItem : '';
        const streetType         = residentialAddress.streetTypeDropdown ? residentialAddress.streetTypeDropdown.SelectedItem : '';

        return {
            title       : basicInfo[this.__custom.titleFieldId],
            firstName   : basicInfo[this.__custom.firstNameFieldId],
            middleNames : basicInfo[this.__custom.middleNamesFieldId] || '',
            lastName    : basicInfo[this.__custom.lastNameFieldId],
            dateOfBirth : basicInfo[this.__custom.dateOfBirthFieldId],
            email       : contactDetails[this.__custom.emailFieldId],
            address     : {
                country      : 'AU',
                state        : state,
                streetName   : residentialAddress.streetName || '',
                flatNumber   : residentialAddress.unitNumber || '',
                streetNumber : residentialAddress.streetNumber || '',
                suburb       : residentialAddress.suburb,
                postcode     : residentialAddress.postCode,
                streetType   : streetType
            }
        };
    }

    private static buildEmptyGreenIdModel () {
        return {
            title       : '',
            firstName   : '',
            middleNames : '',
            lastName    : '',
            dateOfBirth : '',
            email       : '',
            address     : {
                country      : '',
                state        : '',
                streetName   : '',
                flatNumber   : '',
                streetNumber : '',
                suburb       : '',
                postcode     : '',
                streetType   : ''
            }
        };
    }
}
