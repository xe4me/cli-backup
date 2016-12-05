import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    FormGroup,
    FormControl
} from '@angular/forms';

import { PrepopMappingService } from './prepop-mapping.service';

// Load the implementations that should be tested
fdescribe( 'Service: PrepopMappingService' , () => {
    let basicInfo : FormGroup;
    let contactDetails : FormGroup;
    beforeEach( async( () => {
        basicInfo = new FormGroup({
            'FirstName' : new FormControl(),
            'LastName' : new FormControl(),
            'MiddleName' : new FormControl(),
            'DateOfBirth' : new FormControl(),
            'TitleDropdown' : new FormGroup({
                'Query' : new FormControl(),
                'SelectedItem' : new FormControl()
            })
        });

        contactDetails = new FormGroup({
            'EmailAddress' : new FormControl(),
            'HomeNumber' : new FormControl(),
            'MobileNumber' : new FormControl()
        });
    } ) );

    describe ( 'prepopBasicInfo', () => {
        it( 'should not throw error if the prepop data is empty' , () => {
            expect(function () { PrepopMappingService.prepopBasicInfo(basicInfo, null); }).not.toThrow();
        } );
        it( 'should populate FirstName as the other data are undefined' , () => {
            let cmdmData = { 'givenName' : 'Bob' };
            PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData);
            expect(basicInfo.get('FirstName').value).toBe(cmdmData.givenName);
        } );
        it( 'should populate MiddleName as the other data are undefined' , () => {
            let cmdmData = { 'firstMiddleName' : 'Bob' };
            PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData);
            expect(basicInfo.get('MiddleName').value).toBe(cmdmData.firstMiddleName);
        } );
        it( 'should populate LastName as the other data are undefined' , () => {
            let cmdmData = { 'familyName' : 'Bob' };
            PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData);
            expect(basicInfo.get('LastName').value).toBe(cmdmData.familyName);
        } );
        it( 'should populate DateOfBirth as the other data are undefined' , () => {
            let cmdmData = { 'birthDate' : '1980-01-30' };
            PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData);
            expect(basicInfo.get('DateOfBirth').value).toBe('30/01/1980');
        } );
        it( 'should populate all basicInfo' , () => {
            let cmdmData = {
                'givenName' : 'eric',
                'firstMiddleName' : 'wei shing',
                'familyName' : 'kwok',
                'birthDate' : '1980-01-30'
            };
            PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData);
            expect(basicInfo.get('FirstName').value).toBe(cmdmData.givenName);
            expect(basicInfo.get('MiddleName').value).toBe(cmdmData.firstMiddleName);
            expect(basicInfo.get('LastName').value).toBe(cmdmData.familyName);
            expect(basicInfo.get('DateOfBirth').value).toBe('30/01/1980');
        } );
    });

    describe ( 'prepopContactDetails', () => {
        it( 'should not throw error if the prepop data is empty' , () => {
            PrepopMappingService.prepopContactDetails(contactDetails, null);
        } );
        it( 'should populate EmailAddress as the other data are undefined' , () => {
            let cmdmData = {
                'contactDetails' : {
                    'emailAddress' : 'test@amp.com.au'
                }
            };
            PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
            expect(contactDetails.get('EmailAddress').value).toBe(cmdmData.contactDetails.emailAddress);
        } );
        it( 'should populate HomeNumber as the other data are undefined' , () => {
            let cmdmData = {
                'contactDetails' : {
                    'homePhone' : '07 12341234'
                }
            };
            PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
            expect(contactDetails.get('HomeNumber').value).toBe(cmdmData.contactDetails.homePhone);
        } );
        it( 'should populate MobileNumber as the other data are undefined' , () => {
            let cmdmData = {
                'contactDetails' : {
                    'mobilePhone' : '0413123123'
                }
            };
            PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
            expect(contactDetails.get('MobileNumber').value).toBe(cmdmData.contactDetails.mobilePhone);
        } );
        // Note: Google i18n looks like a good option is we need start trying to get too smart
        // https://github.com/googlei18n/libphonenumber/tree/master/javascript/i18n/phonenumbers
        describe ( 'mobile number', () => {
            it( 'should parse and format mobile number replace whitespace', () => {
                let cmdmData = {
                    'contactDetails' : {
                        'mobilePhone' : '0413 123 123'
                    }
                };
                PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
                expect(contactDetails.get('MobileNumber').value).toBe('0413123123');

                cmdmData.contactDetails.mobilePhone = '  04  13 1   23123   ';
                PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
                expect(contactDetails.get('MobileNumber').value).toBe('0413123123');
            });
            it( 'should parse and format mobile number replace +61 with 0', () => {
                let cmdmData = {
                    'contactDetails' : {
                        'mobilePhone' : '+61413123123'
                    }
                };
                PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
                expect(contactDetails.get('MobileNumber').value).toBe('0413123123');

                cmdmData.contactDetails.mobilePhone = '  + 6  1 4  13 1   23123   ';
                PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
                expect(contactDetails.get('MobileNumber').value).toBe('0413123123');
            });
            it( 'should prepopulate only is processed number pass regular express 04nnnnnnnn', () => {
                let cmdmData = {
                    'contactDetails' : {
                        'mobilePhone' : '41+613123123'
                    }
                };
                PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
                expect(contactDetails.get('MobileNumber').value).toBeNull();

                cmdmData.contactDetails.mobilePhone = '  + 6  1 0 4  13 1   23123   ';
                PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
                expect(contactDetails.get('MobileNumber').value).toBeNull();

            });
        });
        it( 'should map all contact details' , () => {
            let cmdmData = {
                'contactDetails' : {
                    'emailAddress' : 'test@amp.com.au',
                    'homePhone' : '07 12341234',
                    'mobilePhone' : '0413123123'
                }
            };
            PrepopMappingService.prepopContactDetails(contactDetails, cmdmData);
            expect(contactDetails.get('EmailAddress').value).toBe(cmdmData.contactDetails.emailAddress);
            expect(contactDetails.get('HomeNumber').value).toBe(cmdmData.contactDetails.homePhone);
            expect(contactDetails.get('MobileNumber').value).toBe(cmdmData.contactDetails.mobilePhone);
        } );
    });
} );
