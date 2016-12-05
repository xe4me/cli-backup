import { Injectable } from '@angular/core';
import { FormGroup , FormControl , AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { FDN } from '../forms/better-form/Application.fdn';
import { Constants } from '../shared';
import { CustomerDetailsService } from 'amp-ddc-components';
/**
 * All methods here are static, no need for instantiation therefore not an injectable
 */
export class PrepopMappingService {
    /**
     * Maps customer-details prepop data into the BasicInfo object of the Application Model
     */
    public static prepopBasicInfo(
        basicInfoFormGroup : FormGroup,
        customerDetails,
        customerDetailsService : CustomerDetailsService) {

        if (!customerDetails) {
            return;
        }

        basicInfoFormGroup.get('FirstName').setValue(customerDetails.givenName);
        customerDetailsService.isFirstNamePrepop = true;
        basicInfoFormGroup.get('MiddleName').setValue(customerDetails.firstMiddleName);
        customerDetailsService.isMiddleNamePrepop = true;
        basicInfoFormGroup.get('LastName').setValue(customerDetails.familyName);
        customerDetailsService.isLastNamePrepop = true;

        // Convert from yyyy-mm-dd to dd/mm/yyyy
        let parsedDOB = moment(customerDetails.birthDate, 'YYYY-MM-DD');
        if (parsedDOB.isValid()) {
            basicInfoFormGroup.get('DateOfBirth').setValue(parsedDOB.format('DD/MM/YYYY'));
            // Potentially we can use DISABLED one day 
            // https://gitlab.ccoe.ampaws.com.au/DDC/experience-bett3r/issues/2
            customerDetailsService.isDOBPrepop = true;
        }

        // According to https://teamtools.amp.com.au/confluence/pages/viewpage.action?pageId=55352824 the title value
        // can be something other than one of the drop down value but still let it thru.
        let parsedTitle = PrepopMappingService.parseTitle(customerDetails.title);
        basicInfoFormGroup.get('TitleDropdown').get('SelectedItem').setValue(parsedTitle);
        basicInfoFormGroup.get('TitleDropdown').get('Query').setValue(parsedTitle);
        customerDetailsService.isTitlePrepop = true;
    }

    public static prepopAddresses(addressFormGroup : FormGroup, customerDetails) {
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
            this.prepopAddress(<FormGroup> addressFormGroup.get('residentialAddress'),
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
                this.prepopAddress(
                    <FormGroup> addressFormGroup.get('postalAddress'),
                    customerDetails.contactDetails.postalAddress);
            }
        }
    }

    public static prepopAddress(addressFormGroup : FormGroup, prepopAddress) {
        addressFormGroup.get('isItPoBox').setValue(false);
        addressFormGroup.get('isManualSearch').setValue(false);
        let mAddrFG = addressFormGroup.get('manualAddress');
        mAddrFG.get('postCode').setValue(prepopAddress.postcode);
        mAddrFG.get('streetName').setValue(prepopAddress.addressLine1);
        mAddrFG.get('suburb').setValue(prepopAddress.suburbName);
        mAddrFG.get('stateDropdown').get('Query').setValue(prepopAddress.stateCode);
        mAddrFG.get('stateDropdown').get('SelectedItem').setValue(prepopAddress.stateCode);
        addressFormGroup.get('search').get('query').setValue(
            prepopAddress.addressLine1 + ', ' +
            prepopAddress.suburbName + ' ' +
            prepopAddress.stateCode + ' ' +
            prepopAddress.postcode);
    }

    public static prepopContactDetails(
        contactDetailsFormGroup : FormGroup,
        customerDetails,
        customerDetailsService : CustomerDetailsService) {
        if (!customerDetails || !customerDetails.contactDetails) {
            return;
        }

        contactDetailsFormGroup.get('EmailAddress').setValue(customerDetails.contactDetails.emailAddress);
        contactDetailsFormGroup.get('HomeNumber').setValue(customerDetails.contactDetails.homePhone);
        let parsedMobile = PrepopMappingService.parseMobileNumber(customerDetails.contactDetails.mobilePhone);
        if (parsedMobile) {
            contactDetailsFormGroup.get('MobileNumber').setValue(parsedMobile);
            // Update the flag to indicate this form control was populated via prepop
            // https://gitlab.ccoe.ampaws.com.au/DDC/experience-bett3r/issues/2
            customerDetailsService.isMobilePrepop = true;
        }
    }

    /**
     * Rules so far is remove white spaces and replace +61 with 0 according to JIRA
     * https://teamtools.amp.com.au/jira/browse/BET-3979
     * 
     * But if we get too smart, do take a look at Google i18n
     * https://github.com/googlei18n/libphonenumber/tree/master/javascript/i18n/phonenumbers
     */
    private static parseMobileNumber (mobile : String ) {
        let validMobileRegex = /^04\d{8}$/;
        if (mobile) {
            let parseMobile = mobile.replace(/ /g, '');
            if (parseMobile) {
                parseMobile = parseMobile.replace('+61', '0');
            }

            if (validMobileRegex.test(parseMobile)) {
                return parseMobile;
            }
        }
        return null;
    }

    private static parseTitle (title : String ) {
        if (title) {
            let parsedTitle = title.replace(/\./g, '');
            if (parsedTitle) {
                return parsedTitle;
            }
        }
        return title;
    }
}
