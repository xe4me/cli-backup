import {
    async,
    TestBed,
    ComponentFixture,
    ComponentFixtureAutoDetect,
    fakeAsync,
    tick,
    discardPeriodicTasks
} from '@angular/core/testing';
import {
    Component,
    ViewChild,
    OnInit
} from '@angular/core';
import {
    FormsModule,
    FormGroup,
    FormControl
} from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import {
    LoginStatusService,
    SaveService
} from 'amp-ddc-components';
import { AppModule } from '../../app.module';
import { EligibleAccountsService } from '../../shared/';
import {
    MockLoginStatusService,
    MockEligibleAccountsService
} from '../../../../test/mocks/';

const betterChoiceTypes = {
    convert_account : 'convert',
    new_account : 'new'
};

describe('Component: LoanOffsetTransitionBlock', () => {

    let mockLoginStatusService = new MockLoginStatusService();
    let mockEligibleAccountsService = new MockEligibleAccountsService();

    beforeEach(  async( () => {
        TestBed.configureTestingModule( {
            imports      : [
                FormsModule,
                AppModule
            ],
            declarations : [
                LoanOffsetBlockTest
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
                }
            ]
        } );
        TestBed.compileComponents();
    } ) );

    describe( 'Loan Offset Transition Account Block Pure Creation', () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('convert')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.convert_account );

            let groupButtonLabels = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBe( true );
            expect( groupButtonInputs[1].nativeElement.checked ).toBe( false );

            groupButtonLabels[1].nativeElement.click();
            tick();
            loanOffsetTransition.detectChanges();

            expect( groupButtonInputs[0].nativeElement.checked ).toBe( false );
            expect( groupButtonInputs[1].nativeElement.checked ).toBe( true );

            discardPeriodicTasks();
        }));
    });

    describe( 'Offset Loan Transition Account Block with Retrieve - no accounts' , () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            loanOffsetTransition.componentInstance.block.__isRetrieved = true;
            loanOffsetTransition.detectChanges();
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('convert')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.convert_account );
        }));
    });

    describe( 'Loan Offset Transition Account Block with Retrieve - valid accounts:Dropdown' , () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            loanOffsetTransition.componentInstance.block.__isRetrieved = true;
            loanOffsetTransition.detectChanges();
            let accountNumberGroupId = loanOffsetTransition.componentInstance.block.__custom.controls[1].id;
            let accountNumberFormGroup = new FormGroup({});
            let accountNumber = '111111111';
            accountNumberFormGroup.addControl('Query', new FormControl(accountNumber));
            accountNumberFormGroup.addControl('SelectedItem', new FormControl(accountNumber));
            loanOffsetTransition.componentInstance.block.__controlGroup.setControl(accountNumberGroupId, accountNumberFormGroup);
            loanOffsetTransition.componentInstance.block.ngAfterViewInit();
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('convert')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.convert_account );

            let accountNumberControl = loanOffsetTransition.componentInstance.block.__controlGroup.controls.AccountNumber;
            expect( accountNumberControl.value ).toBe('111111111');
        }));
    });

    describe( 'Loan Offset Transition Account Block with Retrieve - valid accounts:Input' , () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            loanOffsetTransition.componentInstance.block.__isRetrieved = true;
            loanOffsetTransition.detectChanges();
            let accountNumberGroupId = loanOffsetTransition.componentInstance.block.__custom.controls[1].id;
            let accountNumber = '111111111';
            loanOffsetTransition.componentInstance.block.__controlGroup.setControl(accountNumberGroupId, new FormControl(accountNumber));
            loanOffsetTransition.componentInstance.block.ngAfterViewInit();
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('convert')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.convert_account );

            let accountNumberControl = loanOffsetTransition.componentInstance.block.__controlGroup.controls.AccountNumber;
            expect( accountNumberControl.value ).toBe('111111111');
        }));
    });

    describe( 'Loan Offset Transition Account Block with Login Existing Users - Loan accounts only', () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_LOAN_ACCOUNTS_ONLY);
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('new')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.new_account );

            let groupButtonLabels = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBe( false );
            expect( groupButtonInputs[1].nativeElement.checked ).toBe( true );

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - Deposit and Loan Accounts Only', () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_AND_LOAN_ACCOUNTS_ONLY);
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('new')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.new_account );

            let groupButtonLabels = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBe( false );
            expect( groupButtonInputs[1].nativeElement.checked ).toBe( true );

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - Loan and offset accounts only', () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_LOAN_AND_OFFSET_ACCOUNTS_ONLY);
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('convert')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.convert_account );

            let groupButtonLabels = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBe( true );
            expect( groupButtonInputs[1].nativeElement.checked ).toBe( false );

            discardPeriodicTasks();
        }));
    });

    describe( 'Deposit Transition Account Block with Login Existing Users - Deposit, Loan and Offset Accounts', () => {
        let loanOffsetTransition : ComponentFixture<LoanOffsetBlockTest> = null;

        beforeEach(async(() => {
            loanOffsetTransition = TestBed.createComponent( LoanOffsetBlockTest );
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_LOAN_AND_OFFSET_ACCOUNTS);
        }));

        it(`Ensure the loan offset transition block is created and block is visible 
            WITH the value for the better choice control set to the default value ('convert')`, fakeAsync(() => {
            loanOffsetTransition.detectChanges();
            tick();
            loanOffsetTransition.detectChanges();

            expect( loanOffsetTransition.componentInstance ).toBeDefined();

            let title = loanOffsetTransition.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent;
            expect( title ).toBe( loanOffsetTransition.componentInstance.block.__custom.blockTitle);

            let eligibleAccountsService = loanOffsetTransition.debugElement.injector.get(EligibleAccountsService);
            expect( eligibleAccountsService ).toBeDefined();

            let loginStatusService = loanOffsetTransition.debugElement.injector.get(LoginStatusService);
            expect( loginStatusService ).toBeDefined();

            expect( loanOffsetTransition.componentInstance.block.userHasLoggedIn ).toBe(true);
            expect( loanOffsetTransition.componentInstance.block.hideBlock ).toBe(false);

            let betterChoice = loanOffsetTransition.componentInstance.block.__controlGroup.controls.BetterChoice;
            expect( betterChoice.value ).toBe( betterChoiceTypes.convert_account );

            let groupButtonLabels = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button label'));
            let groupButtonInputs = loanOffsetTransition.debugElement.queryAll(By.css('amp-group-buttons div.amp-group-button input'));

            expect( groupButtonLabels.length ).toBe(2);
            expect( groupButtonInputs.length ).toBe(2);

            expect( groupButtonInputs[0].nativeElement.checked ).toBe( true );
            expect( groupButtonInputs[1].nativeElement.checked ).toBe( false );

            discardPeriodicTasks();
        }));
    });
});

@Component( {
    template : `
        <div>
            <loan-offset-block #block></loan-offset-block>
        </div>
    `
})
class LoanOffsetBlockTest implements OnInit {

    @ViewChild('block') public block;

    public ngOnInit() {
        let blockJSON = require('../../forms/better-form/better-choice-block.json');
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'LoanOffset'];
        this.block.__controlGroup = new FormGroup({});
        let accountNumberControl = new FormControl();
        let betterChoiceControl = new FormControl(betterChoiceTypes.convert_account);
        let betterChoiceControlId = blockJSON.custom.optionalBlocks.deposit_account.custom.controls[0].id;
        let accountNumberGroupId = blockJSON.custom.optionalBlocks.deposit_account.custom.controls[1].id;
        this.block.__controlGroup.addControl(betterChoiceControlId, betterChoiceControl);
        this.block.__controlGroup.addControl(accountNumberGroupId, accountNumberControl);
        this.block.__custom = blockJSON.custom.optionalBlocks.offset_account.custom;
        this.block.__form = new FormGroup({});
        let applicationFormGroup = new FormGroup({});
        let newOrExistingFormGroup = new FormGroup({});
        newOrExistingFormGroup.addControl('NewOrExistingCustomer', new FormControl());
        applicationFormGroup.addControl('NewOrExistingCustomer', newOrExistingFormGroup);
        this.block.__form.addControl('Application', applicationFormGroup);
    }
}
