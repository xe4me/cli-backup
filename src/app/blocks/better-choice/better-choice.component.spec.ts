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
import {
    EligibleAccountsService,
    SharedFormDataService
} from '../../shared/';
import {
    MockLoginStatusService,
    MockEligibleAccountsService,
    MockSharedFormDataService
} from '../../../../test/mocks/';

const transitChoiceTypes = {
    deposit_account : 'deposit_account',
    offset_account : 'offset_account'
};

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
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ]
        } );
        TestBed.compileComponents();
    } ) );

    describe ( 'Better Choice Block with New Customer Journey', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl(betterChoiceForm);
            newOrExistingCustomerControl.setValue('NewCustomer');
        }));

        it('Ensure the better choice block is not visible', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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

            expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(true);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            discardPeriodicTasks();
        }));
    } );

    describe ( 'Better Choice Block for Existing Customer - No Login', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl(betterChoiceForm);
            newOrExistingCustomerControl.setValue('ExistingCustomer');
        }));

        it('Ensure the better choice block is visible', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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

            expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    } );

    describe ( 'Better Choice Block for Retrieve Users - New Customer', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('NewCustomer');
            betterChoice.componentInstance.block.__isRetrieved = true;
        }));

        it('Ensure the better choice block is visible', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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

            expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(true);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    } );

    describe( 'Better Choice Block for Retrieve Users - Existing Customer', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            betterChoice.componentInstance.block.__isRetrieved = true;
        }));

        it('Ensure the better choice block is visible', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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

            expect( betterChoice.componentInstance.block.userHasLoggedIn ).toBe(false);
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    });

    describe ( 'Better Choice Block with Existing Customers - No Accounts' , () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_NO_ACCOUNTS);
        }));

        it('Ensure the better choice block is visible and default to create a new deposit_account', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            discardPeriodicTasks();
        }));
    });

    describe ( 'Better Choice Block with Existing Customers - Deposit Accounts Only', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSITS_ACCOUNTS_ONLY);
        }));

        it('Ensure the better choice block is visible and default to select one from list deposit accounts', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            discardPeriodicTasks();
        }));
    } );

    describe ( 'Better Choice Block with Existing Customers - Loan and Deposit Accounts Only', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_AND_LOAN_ACCOUNTS_ONLY);
        }));

        it('Ensure the better choice block is visible and let user to choose', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    } );

    describe ( 'Better Choice Block with Existing Customers - Loan Accounts Only', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_LOAN_ACCOUNTS_ONLY);
        }));

        it('Ensure the better choice block is visible and let user to choose', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    });

    describe ( 'Better Choice Block with Existing Customers - Loan and Offset Accounts Only', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_LOAN_AND_OFFSET_ACCOUNTS_ONLY);
        }));

        it('Ensure the better choice block is visible and let user to choose', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    });

    describe ( 'Better Choice Block with Existing Customers - Loan, Offset and Deposit Accounts', () => {
        let betterChoice : ComponentFixture<BetterChoiceBlockTest> = null;

        beforeEach( async(() => {
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            let betterChoiceForm = betterChoice.componentInstance.block.__form;
            let newOrExistingCustomerControl = mockSharedFormDataService.getNewOrExistingCustomerControl( betterChoiceForm );
            newOrExistingCustomerControl.setValue('ExistingCustomer');
            mockLoginStatusService.loginSuccess();
            mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.LOGIN_DEPOSIT_LOAN_AND_OFFSET_ACCOUNTS);
        }));

        it('Ensure the better choice block is visible and let user to choose', fakeAsync(() => {
            betterChoice.detectChanges();
            tick();
            betterChoice.detectChanges();

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
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(false);

            let transitChoice = betterChoice.componentInstance.block.__controlGroup.controls.TransitChoice;
            expect( transitChoice.value ).toBe( null );

            let radioButtonLabels = betterChoice.debugElement.queryAll(By.css('amp-radio-button-group div.amp-radio-button-group label'));

            radioButtonLabels[0].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.deposit_account );

            radioButtonLabels[1].nativeElement.click();
            tick();
            betterChoice.detectChanges();

            expect( transitChoice.value ).toBe( transitChoiceTypes.offset_account );

            discardPeriodicTasks();
        }));
    } );
} );
@Component( {
    template : `
        <div>
            <better-choice-block #block></better-choice-block>
        </div>
    `
} )
class BetterChoiceBlockTest implements OnInit {

    @ViewChild('block') public block;

    public ngOnInit () {
        let blockJSON = require('../../forms/better-form/better-choice-block.json');
        this.block.__loadNext = (nextBlock, viewContainerRef) => {};
        this.block.__removeNext = (viewContainerRef) => {};
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'BetterChoice'];
        this.block.__controlGroup = new FormGroup({});
        let transitChoiceControlId = blockJSON.custom.controls[0].id;
        let transitChoiceControl = new FormControl();
        this.block.__controlGroup.addControl(transitChoiceControlId, transitChoiceControl);
        this.block.__custom = blockJSON.custom;
        this.block.__form = new FormGroup({});
        let applicationFormGroup = new FormGroup({});
        let newOrExistingFormGroup = new FormGroup({});
        newOrExistingFormGroup.addControl('NewOrExistingCustomer', new FormControl());
        applicationFormGroup.addControl('NewOrExistingCustomer', newOrExistingFormGroup);
        this.block.__form.addControl('Application', applicationFormGroup);
    }
}
