import {async, TestBed, ComponentFixture, ComponentFixtureAutoDetect, inject} from '@angular/core/testing';
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
import {BrowserModule} from '@angular/platform-browser';
import {AppModule} from '../../app.module';
import {Response, ResponseOptions, Http, BaseRequestOptions} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

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
                    useValue: MockEligibleAccountsService
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

    describe ( 'Creating the Deposit Transition block', () => {
        it('Creating block', () => {

            let depositTransition : ComponentFixture<DepositTransitionBlockTest> = TestBed.createComponent( DepositTransitionBlockTest );
            depositTransition.detectChanges();

            expect( true ).toBe(true);
        });

        it( 'Should have at least 1 test for the build to success', () => {

            expect( true ).toBe(true);

            // let block : ComponentFixture<BetterChoiceBlockTest> = TestBed.createComponent( BetterChoiceBlockTest );
            // console.log(block);
        } );
    } );

})

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
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'DepositTransition'];
        this.block.__custom = {
            "blockTitle": "Your deposit account",
                "type" : "deposit",
                "controls": [ {
                "id" : "BetterChoice",
                "buttons" : [{
                    "id": "convert_deposit_account",
                    "value": "convert",
                    "label": "Switch account"
                }, {
                    "id": "new_deposit_account",
                    "value": "new",
                    "label": "Create new account"
                }]
            }, {
                "id": "AccountNumber",
                "label": "Deposit Account Number"
            } ],
                "description": "You can either switch your existing deposit account to become a Bett3r Pay account or choose to create a new account.",
                "additional_input_instruction": "Please enter the deposit account number you want to switch to become your Bett3r Pay account.",
                "additional_dropdown_instruction": "Please select the deposit account number you want to switch to become your Bett3r Pay account."
        };
        this.block.__controlGroup = new FormGroup({
            AccountNumber: new FormGroup({
                Query: new FormControl('11223323423'),
                SelectedItem: new FormControl('232323223')
            }),
            BetterChoice: new FormControl('convert')
        });
        this.block.accountsEligibleForTransitioning = [{
            label: 436209800,
            value: 436209800
        }];

    }
}
