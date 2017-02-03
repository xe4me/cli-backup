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

fdescribe( 'Component: BetterChoiceBlock', () => {

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


    describe ( 'Better Choice Block with No login Users', () => {

        let betterChoice: ComponentFixture<BetterChoiceBlockTest>;

        beforeEach(() => {
            mockSharedFormDataService.setNewCustomerControl();
            betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
            betterChoice.detectChanges();
        });

        it('Ensure the better choice block is created', () => {
            let title = betterChoice.debugElement.query(By.css('h2.heading.js-heading.heading-intro')).nativeElement.textContent
            expect( title ).toBe( betterChoice.componentInstance.block.__custom.blockTitle );
        });

        it('Ensure the better choice block is hided for none-login users', () => {
            expect( betterChoice.componentInstance.block.hideBlock ).toBe(true);
        });

        it('Ensure the better choice block is preset value for deposit account', () => {

        });
    } );

    describe ( 'Better Choice Block with existing users no login', () => {
        let betterChoice: ComponentFixture<BetterChoiceBlockTest>;
        let betterChoiceBlockJSON;

        // beforeEach(() => {
        //     betterChoiceBlockJSON = require('../../forms/better-form/better-choice-block.json');
        //     mockEligibleAccountsService.setEligibleAccounts(mockEligibleAccountsService.accounts.NO_LOGIN);
        //     mockLoginStatusService.loginSuccess();
        //     mockSharedFormDataService.setExistingCustomerControl();
        //     betterChoice = TestBed.createComponent( BetterChoiceBlockTest );
        //     betterChoice.detectChanges();
        // });
    } );

    describe ( 'Better Choice Block with existing users deposit accounts only', () => {

    } );

    describe ( 'Better Choice Block with existing users deposit and loan accounts only', () => {

    } );

    describe ( 'Better Choice Block with existing users deposit, loan and offset accounts', () => {

    } );

    describe ( 'Better Choice Block with existing users loan accounts only', () => {

    });

    describe ( 'Better Choice Block with existing users loan and offsets accounts only', () => {

    });

    describe ( 'Better Choice Block for retrieve scenario', () => {

    } );
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
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'DepositTransition'];
        this.block.__controlGroup = new FormGroup({
            TransitChoice: new FormControl('')
        });
        this.block.__custom = require('../../forms/better-form/better-choice-block.json').custom;
        // console.log(this.block.__custom);
        // this.block.__custom = {
        //     "blockTitle": "How can we make your life Bett3r?",
        //     "controls": [ {
        //         "id": "TransitChoice",
        //         "buttons": [ {
        //             "id": "deposit_account",
        //             "value": "deposit_account",
        //             "label": "Create a new or transition an existing deposit account"
        //         }, {
        //             "id": "offset_account",
        //             "value": "offset_account",
        //             "label": "Create a new or transition an existing offset account"
        //         } ]
        //     } ],
        //     "account_types_block_mapping": {
        //         "deposit": "deposit_account",
        //         "offset": "offset_account",
        //         "loan": "offset_account"
        //     },
        //     "optionalBlocks": {
        //         "offset_account": {
        //             "name": "LoanOffset",
        //             "blockType": "LoanOffsetTransitionBlock",
        //             "blockLayout": "INLINE",
        //             "commonBlock": false,
        //             "path": "blocks/loan-offset-transition/loan-offset-transition.component",
        //             "custom": {
        //                 "blockTitle": "Your offset account",
        //                 "type" : "loanOffset",
        //                 "controls": [ {
        //                     "id" : "BetterChoice",
        //                     "buttons" : [{
        //                         "id": "convert_offset_account",
        //                         "value": "convert",
        //                         "label": "Switch account"
        //                     }, {
        //                         "id": "new_offset_account",
        //                         "value": "new",
        //                         "label": "Create new account"
        //                     }]
        //                 }, {
        //                     "id": "AccountNumber"
        //                 }
        //                 ],
        //                 "description": "You can either switch your existing offset account to become a Bett3r Pay account or choose to create a new account.",
        //                 "additional_convert_input_instruction": "Please enter the offset account number you want to switch to become your Bett3r Pay account.",
        //                 "additional_convert_dropdown_instruction": "Please select the offset account number you want to switch to become your Bett3r Pay account.",
        //                 "additional_new_input_instruction": "Please enter the loan account number you want to offset with your Bett3r Pay account.",
        //                 "additional_new_dropdown_instruction": "Please select the loan account number you want to offset with your Bett3r Pay account."
        //             }
        //         },
        //         "deposit_account": {
        //             "name": "DepositTransition",
        //             "blockType": "DepositTransitionBlock",
        //             "blockLayout": "INLINE",
        //             "commonBlock": false,
        //             "path": "blocks/deposit-transition/deposit-transition.component",
        //             "custom": {
        //                 "blockTitle": "Your deposit account",
        //                 "type" : "deposit",
        //                 "controls": [ {
        //                     "id" : "BetterChoice",
        //                     "buttons" : [{
        //                         "id": "convert_deposit_account",
        //                         "value": "convert",
        //                         "label": "Switch account"
        //                     }, {
        //                         "id": "new_deposit_account",
        //                         "value": "new",
        //                         "label": "Create new account"
        //                     }]
        //                 }, {
        //                     "id": "AccountNumber",
        //                     "label": "Deposit Account Number"
        //                 } ],
        //                 "description": "You can either switch your existing deposit account to become a Bett3r Pay account or choose to create a new account.",
        //                 "additional_input_instruction": "Please enter the deposit account number you want to switch to become your Bett3r Pay account.",
        //                 "additional_dropdown_instruction": "Please select the deposit account number you want to switch to become your Bett3r Pay account."
        //             }
        //         }
        //     }
        // };
    }

}
