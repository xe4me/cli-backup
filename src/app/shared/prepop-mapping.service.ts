import { Injectable } from '@angular/core';
import { FormGroup , FormControl , AbstractControl } from '@angular/forms';
import { FDN } from '../forms/better-form/Application.fdn';
import { Constants } from '../shared';

/**
 * All methods here are static, no need for instantiation therefore not an injectable
 */
export class PrepopMappingService {
    /**
     * Maps customer-details prepop data into the BasicInfo object of the Application Model
     */
    public static prepopBasicInfo(basicInfoFormGroup, customerDetails) {
        if (!customerDetails) {
            return;
        }

        basicInfoFormGroup.get('FirstName').setValue(customerDetails.givenName);
        basicInfoFormGroup.get('MiddleName').setValue(customerDetails.firstMiddleName);
        basicInfoFormGroup.get('LastName').setValue(customerDetails.familyName);
        // Convert from yyyy-mm-dd to dd/mm/yyyy
        let dob = (customerDetails.birthDate ? customerDetails.birthDate.split('-') : null);
        if (dob && dob.length === 3) {
            basicInfoFormGroup.get('DateOfBirth').setValue(dob[2] + '/' + dob[1] + '/' + dob[0]);
        }
        // According to https://teamtools.amp.com.au/confluence/pages/viewpage.action?pageId=55352824 the title value
        // can be something other than one of the drop down value but still let it thru.
        basicInfoFormGroup.get('TitleDropdown').get('SelectedItem').setValue(customerDetails.title);
        basicInfoFormGroup.get('TitleDropdown').get('Query').setValue(customerDetails.title);
    }

    public static prepopAddresses(addressFormGroup, customerDetails) {
        if (!customerDetails.contactDetails ||
            (!customerDetails.contactDetails.residentialAddress &&
             !customerDetails.contactDetails.postalAddress)) {
            return;
        }
        // TODO: Move this code into the calling module
        // let FDN_Applicant1_address = 
        //     [ 'Application' , 'Applicant1Section' , 'PersonalDetailsSection' , 'Address' , 'Address' ];
        // let address : FormGroup = <FormGroup> this.__form.get(FDN_Applicant1_address);

        // Prepop residential if available
        if (customerDetails.contactDetails.residentialAddress) {
            this.prepopAddress(addressFormGroup.get('residentialAddress'),
                customerDetails.contactDetails.residentialAddress);
        }

        // Check residential vs postal
        if (customerDetails.contactDetails.residentialAddress &&
            customerDetails.contactDetails.postalAddress &&
            customerDetails.contactDetails.residentialAddress.addressId ===
            customerDetails.contactDetails.postalAddress.addressId) {
            addressFormGroup.get('postalAndResidentialAreSame').setValue(true);
        } else {
            addressFormGroup.get('postalAndResidentialAreSame').setValue(false);
            // Prepop postal if available
            if (customerDetails.contactDetails.postalAddress) {
                addressFormGroup.addControl('postalAddress', new FormGroup({
                    'isManualSearch': new FormControl(false),
                    'search': new FormGroup({
                        'selectedItem': new FormControl(),
                        'query': new FormControl()
                    }),
                    'manualAddress': new FormGroup({
                        'buildingName': new FormControl(),
                        'unitNumber': new FormControl(),
                        'streetNumber': new FormControl(),
                        'streetName': new FormControl(),
                        'streetTypeDropdown': new FormGroup({
                            'SelectedItem': new FormControl(),
                            'Query': new FormControl()
                        }),
                        'poBox': new FormControl(),
                        'suburb': new FormControl(),
                        'postCode': new FormControl(),
                        'stateDropdown': new FormGroup({
                            'SelectedItem': new FormControl(),
                            'Query': new FormControl()
                        })
                    }),
                    'isItPoBox': new FormControl()
                }));
                this.prepopAddress(addressFormGroup.get('postalAddress'), customerDetails.contactDetails.postalAddress);
            }
        }
    }

    public static prepopAddress(addressFormGroup, prepopAddress) {
        addressFormGroup.get('isItPoBox').setValue(false);
        addressFormGroup.get('isManualSearch').setValue(false);
        addressFormGroup.get('manualAddress').get('postCode').setValue(prepopAddress.postcode);
        addressFormGroup.get('manualAddress').get('streetName').setValue(prepopAddress.addressLine1);
        addressFormGroup.get('manualAddress').get('suburb').setValue(prepopAddress.suburbName);
        addressFormGroup.get('manualAddress').get('stateDropdown').get('Query')
            .setValue(prepopAddress.stateCode);
        addressFormGroup.get('manualAddress').get('stateDropdown').get('SelectedItem')
            .setValue(prepopAddress.stateCode);
        addressFormGroup.get('search').get('query').setValue(
            prepopAddress.addressLine1 + ', ' +
            prepopAddress.suburbName + ' ' +
            prepopAddress.stateCode + ' ' +
            prepopAddress.postcode);
    }

    public static prepopContactDetails(contactDetailsFormGroup, customerDetails) {
        if (!customerDetails || !customerDetails.contactDetails) {
            return;
        }

        contactDetailsFormGroup.get('EmailAddress').setValue(customerDetails.contactDetails.emailAddress);
        contactDetailsFormGroup.get('HomeNumber').setValue(customerDetails.contactDetails.homePhone);
        contactDetailsFormGroup.get('MobileNumber').setValue(customerDetails.contactDetails.mobilePhone);
    }
}
