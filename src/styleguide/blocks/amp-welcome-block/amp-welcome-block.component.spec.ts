// import { Component, ViewChild, OnInit } from '@angular/core';
// import { FormsModule, FormGroup } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { AmpButtonModule } from '../../../app/modules/amp-button';
// import { AmpWelcomeBlockModule } from '../../../app/modules/amp-welcome-block';
// import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';
// import { AfterViewInit } from '@angular/core';
// import {  FormBuilder } from '@angular/forms';
// const formDef = require( './form-def.def.json' );
// import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
// import {
//     ReactiveFormsModule
// } from '@angular/forms';
// import { FDN } from './Application.fdn';
// import {shouldBeReplacedWithModulesComponents} from '../../app.module';
// import { BrowserModule } from '@angular/platform-browser';

// fdescribe('amp-welcom-block component', () => {

//     let fixture : ComponentFixture<TestComponent>;
//     let component;
//     let domElement;
//     let ngElement;

//     let titleControl;
//     let firstNameControl;
//     let middleNameControl;
//     let lastNameControl;
//     let dateOfBirthControl;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule, AmpWelcomeBlockModule, HttpModule , BrowserModule, FormsModule, ReactiveFormsModule],
//             declarations: [TestComponent, AmpBlockLoaderDirective],
//             providers: [
//                 ...APP_RESOLVER_PROVIDERS
//             ]
//         });

//         fixture = TestBed.createComponent(TestComponent);
//         fixture.detectChanges();
//         TestBed.compileComponents();
//         domElement = fixture.nativeElement;
//         ngElement = fixture.debugElement;
//         component = fixture.componentInstance;
//         // titleControl = controlGroup['TitleDropdown'];
//         // firstNameControl = controlGroup['FirstName'];
//         // middleNameControl = controlGroup['MiddleName'];
//         // lastNameControl = controlGroup['LastName'];
//         // dateOfBirthControl = controlGroup['DateOfBirth'];
//     }));

//     it('should be defined', () => {
//         expect(true).toBe(true);
//     });
// });

// @Component({
//     template: `
//     <form [formGroup]="form" class='nl-form p+'>
//         <div [amp-block-loader]="childBlocks" [fdn]="fullyDistinguishedName" [form]="form"></div>
//     </form>
//     `
// })
// class TestComponent {
//     private fullyDistinguishedName = [];
//     private childBlocks            = formDef;
//     private form : FormGroup;

//     constructor ( private _builder : FormBuilder ) {
//         this.form = this._builder.group( {} );
//     }

//     // @ViewChild('block') block;

//     // ngOnInit() {
//     //     this.block.__fdn = ['Application'];
//     //     this.block.__custom = {
//     //         'welcomeTitle': 'AMP Saver Account',
//     //         'welcomeMessage': 'Reach your savings goals sooner',
//     //         'backgroundImageUrl': 'url(/assets/images/Intro-background_96DPI.jpg)',
//     //         'welcomePoints': [
//     //             {
//     //                'icon': 'time-clock-icon',
//     //                'text': 'It will only take about 5 minutes'
//     //             },
//     //             {
//     //                'icon': 'eighteen-plus-icon',
//     //                'text': 'You must be over 18 years old'
//     //             },
//     //             {
//     //                'icon': 'id-check-icon',
//     //                'text': 'You must have a valid form of identification'
//     //             }
//     //         ],
//     //         'actions': [
//     //             {
//     //                 'action': 'start',
//     //                 'buttonName': 'New application',
//     //                 'nextBlock': {
//     //                     'name': 'contactDetails',
//     //                     'blockType': 'AmpContactDetailsBlockComponent',
//     //                     'blockLayout': 'INLINE',
//     //                     'commonBlock': true,
//     //                     'path': 'modules/amp-contact-details-block/components/amp-contact-details-block/amp-contact-details-block.component',
//     //                     'custom': {
//     //                     'blockTitle': 'And your contact details...',
//     //                     'blockFdn' : ['PersonalDetailsSection' , 'contactDetails'],
//     //                     'controls': [
//     //                         {
//     //                         'id': 'EmailAddress',
//     //                         'label': 'Email',
//     //                         'required': true,
//     //                         'tooltipMessage': 'Confirmation of your application will be sent to this email address.'
//     //                         },
//     //                         {
//     //                         'id': 'MobileNumber',
//     //                         'label': 'Mobile number',
//     //                         'required': true,
//     //                         'tooltipMessage': 'A mobile phone number is required to allow AMP Bank to securely protect your account.',
//     //                         'requiredErrorMessage' : 'Mobile number is a required field.',
//     //                         'patternErrorMessage': 'Mobile number must be in the format 04nnnnnnnn.'
//     //                         },
//     //                         {
//     //                         'id': 'HomeNumber',
//     //                         'label': 'Home number',
//     //                         'required': false
//     //                         }
//     //                     ]
//     //                     }

//     //                 }
//     //             },
//     //             {
//     //                 'action': 'continue',
//     //                 'buttonName': 'Continue application',
//     //                 'nextBlock': {
//     //                     'name': 'basicInfo',
//     //                     'blockType': 'AmpBasicInfoBlockComponent',
//     //                     'blockLayout': 'INLINE',
//     //                     'commonBlock': true,
//     //                     'path': 'modules/amp-basic-info-block/components/amp-basic-info-block/amp-basic-info-block.component',
//     //                     'custom': {
//     //                         'blockTitle': 'Where did we leave off?',
//     //                         'blockFdn' : ['PersonalDetailsSection' , 'basicInfo'],
//     //                         'controls': [
//     //                         { 'id': 'Title' },
//     //                         { 'id': 'FirstName' },
//     //                         { 'id': 'MiddleName' },
//     //                         { 'id': 'LastName' },
//     //                         { 'id': 'DateOfBirth' }
//     //                         ]
//     //                     }
//     //                 }
//     //         }
//     //         ]
//     //     };
//     //     this.block.__controlGroup = new FormGroup({});

//     //     // No more random IDs
//     //     this.block.__controlGroup.__fdn = this.block.__fdn;
//     // }
// }
