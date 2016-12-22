// import {
//     async,
//     ComponentFixture,
//     TestBed
// } from '@angular/core/testing';
// import {
//     FormGroup,
//     FormControl
// } from '@angular/forms';
// import { CustomerDetailsService } from 'amp-ddc-components';
//
// import { PrepopMappingService } from './prepop-mapping.service';
//
// // Load the implementations that should be tested
// fdescribe( 'Service: PrepopMappingService' , () => {
//     let basicInfo : FormGroup;
//     let contactDetails : FormGroup;
//     let customerDetailsService : CustomerDetailsService;
//     beforeEach( async( () => {
//         basicInfo = new FormGroup({
//             'FirstName' : new FormControl(),
//             'LastName' : new FormControl(),
//             'MiddleName' : new FormControl(),
//             'DateOfBirth' : new FormControl(),
//             'TitleDropdown' : new FormGroup({
//                 'Query' : new FormControl(),
//                 'SelectedItem' : new FormControl()
//             })
//         });
//
//         contactDetails = new FormGroup({
//             'EmailAddress' : new FormControl(),
//             'HomeNumber' : new FormControl(),
//             'MobileNumber' : new FormControl()
//         });
//         customerDetailsService = new CustomerDetailsService(null);
//     } ) );
//
//     describe ( 'prepopBasicInfo', () => {
//         it( 'should not throw error if the prepop data is empty' , () => {
//             expect(function () {
//                 PrepopMappingService.prepopBasicInfo(basicInfo, null, customerDetailsService);
//             }).not.toThrow();
//         } );
//         it( 'should populate FirstName, even when other data are undefined' , () => {
//             let cmdmData = { 'givenName' : 'Bob' };
//             PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData, customerDetailsService);
//             expect(basicInfo.get('FirstName').value).toBe(cmdmData.givenName);
//         } );
//         it( 'should populate MiddleName, even when other data are undefined' , () => {
//             let cmdmData = { 'firstMiddleName' : 'Bob' };
//             PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData, customerDetailsService);
//             expect(basicInfo.get('MiddleName').value).toBe(cmdmData.firstMiddleName);
//         } );
//         it( 'should populate LastName, even when other data are undefined' , () => {
//             let cmdmData = { 'familyName' : 'Bob' };
//             PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData, customerDetailsService);
//             expect(basicInfo.get('LastName').value).toBe(cmdmData.familyName);
//         } );
//         it( 'should populate DateOfBirth, even when other data are undefined' , () => {
//             let cmdmData = { 'birthDate' : '1980-01-30' };
//             PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData, customerDetailsService);
//             expect(basicInfo.get('DateOfBirth').value).toBe('30/01/1980');
//         } );
//         it( 'should populate all basicInfo' , () => {
//             let cmdmData = {
//                 'givenName' : 'eric',
//                 'firstMiddleName' : 'wei shing',
//                 'familyName' : 'kwok',
//                 'birthDate' : '1980-01-30'
//             };
//             PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData, customerDetailsService);
//             expect(basicInfo.get('FirstName').value).toBe(cmdmData.givenName);
//             expect(basicInfo.get('MiddleName').value).toBe(cmdmData.firstMiddleName);
//             expect(basicInfo.get('LastName').value).toBe(cmdmData.familyName);
//             expect(basicInfo.get('DateOfBirth').value).toBe('30/01/1980');
//         } );
//         it( 'should populate Title, even when other data are undefined' , () => {
//             let cmdmData = { 'title' : 'Mr.' };
//             PrepopMappingService.prepopBasicInfo(basicInfo, cmdmData, customerDetailsService);
//             expect(basicInfo.get('TitleDropdown').get('Query').value).toBe('Mr');
//             expect(basicInfo.get('TitleDropdown').get('SelectedItem').value).toBe('Mr');
//         } );
//     });
//
//     describe ( 'prepopContactDetails', () => {
//         it( 'should not throw error if the prepop data is empty' , () => {
//             PrepopMappingService.prepopContactDetails(contactDetails, null, customerDetailsService);
//         } );
//         it( 'should populate EmailAddress, even when other data are undefined' , () => {
//             let cmdmData = {
//                 'contactDetails' : {
//                     'emailAddress' : 'test@amp.com.au'
//                 }
//             };
//             PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//             expect(contactDetails.get('EmailAddress').value).toBe(cmdmData.contactDetails.emailAddress);
//         } );
//         it( 'should populate HomeNumber, even when other data are undefined' , () => {
//             let cmdmData = {
//                 'contactDetails' : {
//                     'homePhone' : '07 12341234'
//                 }
//             };
//             PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//             expect(contactDetails.get('HomeNumber').value).toBe(cmdmData.contactDetails.homePhone);
//         } );
//         it( 'should populate MobileNumber when valid, even when other data are undefined' , () => {
//             let cmdmData = {
//                 'contactDetails' : {
//                     'mobilePhone' : '0413123123'
//                 }
//             };
//             PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//             expect(contactDetails.get('MobileNumber').value).toBe(cmdmData.contactDetails.mobilePhone);
//         } );
//         // Note: Google i18n looks like a good option is we need start trying to get too smart
//         // https://github.com/googlei18n/libphonenumber/tree/master/javascript/i18n/phonenumbers
//         describe ( 'mobile number parse and format', () => {
//             it( 'should replace whitespace', () => {
//                 let cmdmData = {
//                     'contactDetails' : {
//                         'mobilePhone' : '0413 123 123'
//                     }
//                 };
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBe('0413123123');
//
//                 cmdmData.contactDetails.mobilePhone = '  04  13 1   23123   ';
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBe('0413123123');
//             });
//             it( 'should replace +61 with 0', () => {
//                 let cmdmData = {
//                     'contactDetails' : {
//                         'mobilePhone' : '+61413123123'
//                     }
//                 };
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBe('0413123123');
//
//                 cmdmData.contactDetails.mobilePhone = '  + 6  1 4  13 1   23123   ';
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBe('0413123123');
//             });
//             it( 'should prepopulate only when processed number pass regular express 04nnnnnnnn', () => {
//                 let cmdmData = {
//                     'contactDetails' : {
//                         'mobilePhone' : '41+613123123'
//                     }
//                 };
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBeNull();
//
//                 cmdmData.contactDetails.mobilePhone = '  + 6  1 0 4  13 1   23123   ';
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBeNull();
//
//                 cmdmData.contactDetails.mobilePhone = '1234567890';
//                 PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//                 expect(contactDetails.get('MobileNumber').value).toBeNull();
//             });
//         });
//         it( 'should map all contact details' , () => {
//             let cmdmData = {
//                 'contactDetails' : {
//                     'emailAddress' : 'test@amp.com.au',
//                     'homePhone' : '07 12341234',
//                     'mobilePhone' : '0413123123'
//                 }
//             };
//             PrepopMappingService.prepopContactDetails(contactDetails, cmdmData, customerDetailsService);
//             expect(contactDetails.get('EmailAddress').value).toBe(cmdmData.contactDetails.emailAddress);
//             expect(contactDetails.get('HomeNumber').value).toBe(cmdmData.contactDetails.homePhone);
//             expect(contactDetails.get('MobileNumber').value).toBe(cmdmData.contactDetails.mobilePhone);
//         } );
//     });
// } );
