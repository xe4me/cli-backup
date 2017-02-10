import {
    async, TestBed, ComponentFixture, ComponentFixtureAutoDetect, inject, fakeAsync,
    tick, discardPeriodicTasks
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {Component, ViewChild, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {
    AmpInputsModule,
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

const betterChoiceTypes = {
    convert_account : 'convert',
    new_account : 'new'
}

fdescribe('Component: DepositTransitionBlock', () => {

    let mockLoginStatusService = new MockLoginStatusService();
    let mockEligibleAccountsService = new MockEligibleAccountsService();

    beforeEach(  async( () => {
        TestBed.configureTestingModule( {
            imports      : [
                FormsModule,
                AppModule
            ],
            declarations : [
                DepositTransitionBlockTest
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
                    provide: LoginStatusService,
                    useValue: mockLoginStatusService
                },
                {
                    provide: SaveService,
                    useValue: true
                },
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                },
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

    describe( 'Deposit Transition Account Block Pure Creation', () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
        }));

        it('Ensure the deposit transition block is created and block is not hided with default value convert for better choice', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();

            let title = depositTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( depositTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = depositTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = depositTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( depositTransition.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( depositTransition.componentInstance.block.hideBlock ).toBe(false);
            expect( depositTransition.componentInstance.block.__controlGroup.controls.BetterChoice.value).toBe(betterChoiceTypes.convert_account);

            let groupButtonLabels = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBeTruthy();
            expect( groupButtonInputs[1].nativeElement.checked ).toBeFalsy();

            groupButtonLabels[1].nativeElement.click();
            tick();
            depositTransition.detectChanges();

            expect( groupButtonInputs[0].nativeElement.checked ).toBeFalsy();
            expect( groupButtonInputs[1].nativeElement.checked ).toBeTruthy();

            let ampAccountNumber = depositTransition.debugElement.query(By.css('amp-account-number'));

            expect( ampAccountNumber ).toBeUndefined();

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - No Accounts', () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_NO_ACCOUNTS);
        }));

        it('Ensure the deposit transition block is created and block is hided with default value new for better choice', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();

            let title = depositTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( depositTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = depositTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = depositTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( depositTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( depositTransition.componentInstance.block.hideBlock ).toBe(true);
            expect( depositTransition.componentInstance.block.__controlGroup.controls.BetterChoice.value).toBe(betterChoiceTypes.new_account);

            let groupButtonLabels = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBeFalsy();
            expect( groupButtonInputs[1].nativeElement.checked ).toBeTruthy();

            let ampAccountNumber = depositTransition.debugElement.query(By.css('amp-account-number'));

            expect( ampAccountNumber ).toBeDefined();

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - Deposit Accounts Only', () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSITS_ACCOUNTS_ONLY);
        }));

        it('Ensure the deposit transition block is created and block is not hided with data pre-populated', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();

            let title = depositTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( depositTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = depositTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = depositTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( depositTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( depositTransition.componentInstance.block.hideBlock ).toBe(false);
            expect( depositTransition.componentInstance.block.__controlGroup.controls.BetterChoice.value).toBe(betterChoiceTypes.convert_account);

            let groupButtonLabels = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBeTruthy();
            expect( groupButtonInputs[1].nativeElement.checked ).toBeFalsy();

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - Deposit and Loan Accounts Only', () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_AND_LOAN_ACCOUNTS_ONLY);
            mockLoginStatusService.loginSuccess();
        }));

        it('Ensure the deposit transition block is created and block is', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();

            let title = depositTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( depositTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = depositTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = depositTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( depositTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( depositTransition.componentInstance.block.hideBlock ).toBe(false);
            expect( depositTransition.componentInstance.block.__controlGroup.controls.BetterChoice.value).toBe(betterChoiceTypes.convert_account);

            let groupButtonLabels = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBeTruthy();
            expect( groupButtonInputs[1].nativeElement.checked ).toBeFalsy();

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - Deposit, Loan and Offset Accounts', () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_LOAN_AND_OFFSET_ACCOUNTS);
            mockLoginStatusService.loginSuccess();
        }));

        it('Ensure the deposit transition block is created and block is', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();

            let title = depositTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( depositTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = depositTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = depositTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( depositTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( depositTransition.componentInstance.block.hideBlock ).toBe(false);
            expect( depositTransition.componentInstance.block.__controlGroup.controls.BetterChoice.value).toBe(betterChoiceTypes.convert_account);

            let groupButtonLabels = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = depositTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBeTruthy();
            expect( groupButtonInputs[1].nativeElement.checked ).toBeFalsy();

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Retrieve - no accounts' , () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
            depositTransition.componentInstance.block.__isRetrieved = true;
            depositTransition.detectChanges();
        }));

        it('Ensure the deposit transition block is created and block is visible', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();
        }));
    });

    describe( 'Deposit Transition Account Block with Retrieve - valid accounts:Dropdown' , () => {
        let depositTransition : ComponentFixture<DepositTransitionBlockTest> = null;

        beforeEach(async(() => {
            depositTransition = TestBed.createComponent( DepositTransitionBlockTest );
            depositTransition.componentInstance.block.__isRetrieved = true;
            let accountNumberGroupId = depositTransition.componentInstance.block.__custom.controls[1].id;
            let accountNumberFormGroup = new FormGroup({});
            let accountNumber = '111111111';
            accountNumberFormGroup.addControl('Query', new FormControl(accountNumber));
            accountNumberFormGroup.addControl('SelectedItem', new FormControl(accountNumber));
            depositTransition.componentInstance.block.__controlGroup.setControl(accountNumberGroupId, accountNumberFormGroup);
            depositTransition.componentInstance.block.ngAfterViewInit();
        }));

        it('Ensure the deposit transition block is created and block is visible', fakeAsync(() => {
            depositTransition.detectChanges();
            tick();
            depositTransition.detectChanges();

            expect( depositTransition.componentInstance ).toBeDefined();
        }));
    });

    describe( 'Deposit Transition Account Block with Retrieve - valid accounts:Input' , () => {

    });
});

@Component( {
    template : `
        <div>
            <deposit-transition-block #block></deposit-transition-block>
        </div>
    `
})
class DepositTransitionBlockTest implements OnInit{

    @ViewChild('block') block;

    ngOnInit() {
        let blockJSON = require('../../forms/better-form/better-choice-block.json');
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'DepositTransition'];
        this.block.__controlGroup = new FormGroup({});
        let accountNumberControl = new FormControl();
        let betterChoiceControl = new FormControl(betterChoiceTypes.convert_account);
        let betterChoiceControlId = blockJSON.custom.optionalBlocks.deposit_account.custom.controls[0].id;
        let accountNumberGroupId = blockJSON.custom.optionalBlocks.deposit_account.custom.controls[1].id;
        this.block.__controlGroup.addControl(betterChoiceControlId, betterChoiceControl);
        this.block.__controlGroup.addControl(accountNumberGroupId, accountNumberControl);
        this.block.__custom = blockJSON.custom.optionalBlocks.deposit_account.custom;
        this.block.__form = new FormGroup({});
        let applicationFormGroup = new FormGroup({});
        let newOrExistingFormGroup = new FormGroup({});
        newOrExistingFormGroup.addControl('NewOrExistingCustomer', new FormControl());
        applicationFormGroup.addControl('NewOrExistingCustomer', newOrExistingFormGroup);
        this.block.__form.addControl('Application', applicationFormGroup);
    }
}
