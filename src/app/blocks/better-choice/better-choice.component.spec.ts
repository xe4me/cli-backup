import {async, TestBed, ComponentFixture, ComponentFixtureAutoDetect, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {Component, ViewChild, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {
    FormBlock,
    ScrollService,
    LoginStatusService,
    AmpHttpService,
    SaveService
} from 'amp-ddc-components';
import {EligibleAccountsService, SharedFormDataService} from '../../shared/';
import {MockScrollService, MockLoginStatusService, MockEligibleAccountsService, MockSharedFormDataService} from '../../../../test/mocks/';
import {BrowserModule, By} from '@angular/platform-browser';
import {AppModule} from '../../app.module';
import {Response, ResponseOptions, Http, BaseRequestOptions} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {BetterChoiceBlock} from "./better-choice.component";

describe( 'Component: BetterChoiceBlock', () => {

    let mockLoginStatusService = new MockLoginStatusService();
    let mockSharedFormDataService = new MockSharedFormDataService();
    let mockEligibleAccountsService = new MockEligibleAccountsService();

    beforeEach(  async( () => {
        TestBed.configureTestingModule( {
            imports      : [
                FormsModule,
                AppModule
            ],
            declarations : [
                BetterChoiceBlockTest
            ],
            providers    : [
                {
                    provide: APP_BASE_HREF,
                    useValue : '/ddc/public/ui/bett3r/'
                },
                {
                    provide: EligibleAccountsService,
                    useValue: mockEligibleAccountsService
                },
                {
                    provide: SharedFormDataService,
                    useValue: mockSharedFormDataService
                },
                {
                    provide: LoginStatusService,
                    useValue: mockLoginStatusService
                },
                {
                    provide: SaveService,
                    useValue: true
                },
                // {
                //     provide  : ComponentFixtureAutoDetect,
                //     useValue : true
                // },
                {
                    provide : MockBackend,
                    useValue: true
                },
                {
                    provide : AmpHttpService,
                    useValue: true
                }
            ]
        } );
        TestBed.compileComponents();
    } ) );


    // describe ( 'Better Choice Block with No login Users', () => {
    //     let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;
    //
    //     beforeEach(() => {
    //         betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
    //         betterChoice.detectChanges();
    //         let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl(betterChoice.componentInstance.block.__form);
    //         newOrExistingCustomerControl.setValue('NewCustomer');
    //         console.log(newOrExistingCustomerControl);
    //     });
    //
    //     it('Ensure the better choice block is not visible', () => {
    //         expect( betterChoice.componentInstance ).toBeDefined();
    //
    //         let title = betterChoice.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent
    //         expect( title ).toBe( betterChoice.componentInstance.block.__custom.blockTitle );
    //
    //         let sharedFormDataService = betterChoice.debugElement.injector.get(SharedFormDataService);
    //         let group = betterChoice.componentInstance.block.__controlGroup;
    //         let control : FormControl = sharedFormDataService.getNewOrExistingCustomerControl(group);
    //         expect( control ).toBeDefined();
    //
    //         let eligibleAccountsService = betterChoice.debugElement.injector.get(EligibleAccountsService);
    //         expect( eligibleAccountsService ).toBeDefined();
    //
    //         let loginStatusService = betterChoice.debugElement.injector.get(LoginStatusService);
    //         expect( loginStatusService ).toBeDefined();
    //
    //         expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(false);
    //         expect( betterChoice.componentInstance.block.hideBlock ).toBe(true);
    //
    //         expect( betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice.value).toBe(null);
    //     });
    // } );
    //
    describe ( 'Better Choice Block with existing users no login', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            betterChoice.detectChanges();
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl(betterChoice.componentInstance.block.__form);
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            console.log(newOrExistingCustomerControl);
        });

        it('Ensure the better choice block is visible', () => {
            expect( betterChoice.componentInstance ).toBeDefined();

            let title = betterChoice.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent
            expect( title ).toBe( betterChoice.componentInstance.block.__custom.blockTitle );

            let sharedFormDataService = betterChoice.debugElement.injector.get(SharedFormDataService);
            let group = betterChoice.componentInstance.block.__controlGroup;
            let control : FormControl = sharedFormDataService.getNewOrExistingCustomerControl(group);
            expect( control ).toBeDefined();

            let eligibleAccountsService = betterChoice.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = betterChoice.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);
            expect( betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice.value).toBe(null);
        });
    } );

    describe ( 'Better Choice Block with existing users no accounts' , () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            betterChoice.detectChanges();
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl(betterChoice.componentInstance.block.__form);
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            console.log(newOrExistingCustomerControl);
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_NO_ACCOUNTS);
            return mockLoginStatusService.loginSuccess();
        });

        it('Ensure the better choice block is visible and default to create a new deposit_account', () => {
            expect( betterChoice.componentInstance ).toBeDefined();

            let title = betterChoice.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( betterChoice.componentInstance.block.__custom.blockTitle );

            let sharedFormDataService = betterChoice.debugElement.injector.get(SharedFormDataService);
            let group = betterChoice.componentInstance.block.__controlGroup;
            let control : FormControl = sharedFormDataService.getNewOrExistingCustomerControl(group);
            expect( control ).toBeDefined();

            let eligibleAccountsService = betterChoice.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = betterChoice.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(true);

            expect( betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice.value).toBe('deposit_account');
        });
    });
    //
    // describe ( 'Better Choice Block with existing users deposit accounts only', () => {
    //     let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;
    //
    //     beforeEach(() => {
    //         betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
    //         mockLoginStatusService.loginSuccess();
    //         mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSITS_ACCOUNTS_ONLY);
    //         betterChoice.detectChanges();
    //     });
    //
    //     it('Ensure the better choice block is visible and default to select one from list deposit accounts', () => {
    //         expect( betterChoice.componentInstance ).toBeDefined();
    //
    //         let title = betterChoice.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
    //         expect( title ).toBe( betterChoice.componentInstance.block.__custom.blockTitle );
    //
    //         let sharedFormDataService = betterChoice.debugElement.injector.get(SharedFormDataService);
    //         let group = betterChoice.componentInstance.block.__controlGroup;
    //         let control : FormControl = sharedFormDataService.getNewOrExistingCustomerControl(group);
    //         expect( control ).toBeDefined();
    //
    //         let eligibleAccountsService = betterChoice.debugElement.injector.get(EligibleAccountsService);
    //         expect( eligibleAccountsService ).toBeDefined();
    //
    //         let loginStatusService = betterChoice.debugElement.injector.get(LoginStatusService);
    //         expect( loginStatusService ).toBeDefined();
    //
    //         expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(true);
    //         expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);
    //
    //         expect( betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice.value).toBe('deposit_account');
    //     });
    // } );
    //
    //
    // describe ( 'Better Choice Block with existing users deposit and loan accounts only', () => {
    //     let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;
    //
    //     beforeEach(() => {
    //         betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
    //         mockLoginStatusService.loginSuccess();
    //         mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSITS_ACCOUNTS_ONLY);
    //         betterChoice.detectChanges();
    //     });
    //
    //     it('Ensure the better choice block is visible and let user to choose', () => {
    //         expect( betterChoice.componentInstance ).toBeDefined();
    //
    //         let title = betterChoice.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
    //         expect( title ).toBe( betterChoice.componentInstance.block.__custom.blockTitle );
    //
    //         let sharedFormDataService = betterChoice.debugElement.injector.get(SharedFormDataService);
    //         let group = betterChoice.componentInstance.block.__controlGroup;
    //         let control : FormControl = sharedFormDataService.getNewOrExistingCustomerControl(group);
    //         expect( control ).toBeDefined();
    //
    //         let eligibleAccountsService = betterChoice.debugElement.injector.get(EligibleAccountsService);
    //         expect( eligibleAccountsService ).toBeDefined();
    //
    //         let loginStatusService = betterChoice.debugElement.injector.get(LoginStatusService);
    //         expect( loginStatusService ).toBeDefined();
    //
    //         expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(true);
    //         expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);
    //
    //         expect( betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice.value).toBe(null);
    //     });
    // } );

    // describe ( 'Better Choice Block with existing users deposit, loan and offset accounts', () => {
    //     let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;
    //     let betterChoiceBlockJSON;
    //
    //     beforeEach(() => {
    //         mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_LOAN_AND_OFFSET_ACCOUNTS);
    //         mockLoginStatusService.loginSuccess();
    //         mockSharedFormDataService.setExistingCustomerControl();
    //         betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
    //         betterChoice.detectChanges();
    //     });
    // } );
    //
    // describe ( 'Better Choice Block with existing users loan accounts only', () => {
    //     let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;
    //     let betterChoiceBlockJSON;
    //
    //     beforeEach(() => {
    //         mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_LOAN_ACCOUNTS_ONLY);
    //         mockLoginStatusService.loginSuccess();
    //         mockSharedFormDataService.setExistingCustomerControl();
    //         betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
    //         betterChoice.detectChanges();
    //     });
    // });
    //
    // describe ( 'Better Choice Block with existing users loan and offsets accounts only', () => {
    //     let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;
    //     let betterChoiceBlockJSON;
    //
    //     beforeEach(() => {
    //         mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_LOAN_AND_OFFSET_ACCOUNTS_ONLY);
    //         mockLoginStatusService.loginSuccess();
    //         mockSharedFormDataService.setExistingCustomerControl();
    //         betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
    //         betterChoice.detectChanges();
    //     });
    //
    //     it('Ensure the better choice block is created', () => {
    //         expect(true).toBe(true);
    //     });
    // });
    //
    // describe ( 'Better Choice Block for retrieve scenario', () => {
    //
    // } );
} );
@Component( {
    template : `
        <div>
            <better-choice-block #block></better-choice-block>
        </div>
    `
} )
class BetterChoiceBlockTest implements OnInit{

    @ViewChild('block') block;

    ngOnInit() {
        let blockJSON = require('../../forms/better-form/better-choice-block.json');
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'DepositTransition'];
        this.block.__controlGroup = new FormGroup({});
        this.block.__controlGroup.addControl(blockJSON.custom.controls[0].id, new FormControl());
        this.block.__custom = blockJSON.custom;
        this.block.__form = new FormGroup({});
        let applicationFormGroup = new FormGroup({});
        let newOrExistingFormGroup = new FormGroup({});
        newOrExistingFormGroup.addControl('NewOrExistingCustomer', new FormControl());
        applicationFormGroup.addControl('NewOrExistingCustomer', newOrExistingFormGroup);
        this.block.__form.addControl('Application', applicationFormGroup);
    }

}
