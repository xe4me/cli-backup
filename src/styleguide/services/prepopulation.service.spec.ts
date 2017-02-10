import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
    async,
    ComponentFixture,
    TestBed,
    inject
} from '@angular/core/testing';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { PrepopulationService } from '../../app/services/prepopulation/prepopulation.service';
import { LoginStatusService } from '../../app/services/login/login-status.service';
import { CustomerDetailsService } from '../../app/services/customer-details/customer-details.service';
import { PrepopAmpContactDetailsService } from '../../app/modules/amp-contact-details-block/services/prepop-amp-contact-details.service';
import { AmpContactDetailsBlockModule } from '../../app/modules/amp-contact-details-block';
import { APP_RESOLVER_PROVIDERS } from '../app.resolver';
import { AmpBlockLoaderDirective } from '../amp-block-loader-test.directive';

const mockCustomerData = require('../mocks/customerDetails.json');
let mockAmpContactDetailConfig = require('../mocks/ampContactDetailsBlock.config.json');
let custom : any;

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let emailControl;
let mobilePhoneControl;
let homePhoneControl;

let prepopulationService;
let mockFormBlock;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

}

function setDefaultState() {
    custom = JSON.parse(JSON.stringify(mockAmpContactDetailConfig));
    mockFormBlock = {
        __controlGroup: 'foobar',
        __custom: {
            applicantIndex: 1
        },
        __repeaterIndex: 1
    };
}

function setCustomOverrides(prop, value) {
    custom.overrides[prop] = value;
}

// Load the implementations that should be tested
describe( 'Service: PrepopulationService' , () => {
    beforeEach(() => {
        setDefaultState();
    });
    describe('registerBlockForPrepop', () => {

        it('should trigger prepop method when loginStatusService.userHasLoggedIn and the customerDetailsService returns successfully', (done) => {
            const mockLoginStatusService = new MockLoginStatusService();
            const mockCustomerDetailsService = new MockCustomerDetailsService(null);
            prepopulationService = new PrepopulationService(mockCustomerDetailsService, mockLoginStatusService);
            prepopulationService.prepop = () => {
                done();
            };

            prepopulationService.registerBlockForPrepop(mockFormBlock);
            expect(true).toBeTruthy;

            // Now pretent to login
            mockLoginStatusService.loggedInSubject.next('boo');
        });

        it('should not trigger prepop method if customerDetailsService fails to return', (done) => {
            const mockLoginStatusService = new MockLoginStatusService();
            const mockCustomerDetailsService = new MockCustomerDetailsService(null);
            mockCustomerDetailsService.customerDetailsPromise = new Promise((resolve, reject) => {
                reject('CMDM is down...crap are we resilentish');
            });
            prepopulationService = new PrepopulationService(mockCustomerDetailsService, mockLoginStatusService);
            prepopulationService.prepop = () => {
                fail('Prepopulate should not have been fired as Customer Details never came back!!!');
            };

            prepopulationService.registerBlockForPrepop(mockFormBlock);
            expect(true).toBeTruthy;

            // Now pretent to login
            mockLoginStatusService.loggedInSubject.next('boo');

            setTimeout(done, 500);
        });

        it('should not trigger prepop method for applicant 2', (done) => {
            delete mockFormBlock.__custom.applicantIndex;
            mockFormBlock.__repeaterIndex = 2;

            const mockLoginStatusService = new MockLoginStatusService();
            const mockCustomerDetailsService = new MockCustomerDetailsService(null);
            prepopulationService = new PrepopulationService(mockCustomerDetailsService, mockLoginStatusService);
            prepopulationService.prepop = () => {
                fail('Prepopulate should not have been fired as Applicant 2 should not get the logged in user details!');
            };

            prepopulationService.registerBlockForPrepop(mockFormBlock);
            expect(true).toBeTruthy;

            // Now pretent to login
            mockLoginStatusService.loggedInSubject.next('boo');

            setTimeout(done, 500);
        });
    });

    describe ( 'prepop', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    AmpContactDetailsBlockModule,
                    HttpModule
                ],
                declarations: [
                    AmpBlockLoaderDirective,
                    TestComponent
                ],
                providers: [
                    ...APP_RESOLVER_PROVIDERS,
                    PrepopAmpContactDetailsService
                ]
            });
        }));

        it( 'should populate the __controlGroup with default configuration' , (done) => {
            custom = null;
            loadComponent();

            expect(component).toBeDefined();
            const ampContactDetailsBlock_debugElement = ngElement.query(By.css('amp-contact-details-block'));
            const ampContactDetailsBlock_componentInstance = ampContactDetailsBlock_debugElement.componentInstance;

            expect(ampContactDetailsBlock_debugElement).toBeDefined();

            prepopulationService = ampContactDetailsBlock_debugElement.injector.get(PrepopAmpContactDetailsService);

            prepopulationService.prepopCompletedSubject.subscribe(() => {
                done();
            });

            prepopulationService.prepop(mockCustomerData, ampContactDetailsBlock_componentInstance);

            expect(ampContactDetailsBlock_componentInstance.__controlGroup.value).toEqual({
                emailAddress: 'XBIL_B_FAPXLVE@BCX.RDC.BI',
                mobilePhone: '0411245314',
                homePhone: '02 94030714'
            });
        });

        it( 'should not populate the __controlGroup with custom config that do not have prepopMapping custom property' , (done) => {
            delete custom.controls[0].prepopMapping;
            delete custom.controls[1].prepopMapping;
            delete custom.controls[2].prepopMapping;

            loadComponent();

            expect(component).toBeDefined();
            const ampContactDetailsBlock_debugElement = ngElement.query(By.css('amp-contact-details-block'));
            const ampContactDetailsBlock_componentInstance = ampContactDetailsBlock_debugElement.componentInstance;

            expect(ampContactDetailsBlock_debugElement).toBeDefined();

            prepopulationService = ampContactDetailsBlock_debugElement.injector.get(PrepopAmpContactDetailsService);

            prepopulationService.prepopCompletedSubject.subscribe(() => {
                fail('Prepop completed should not have occurred.');
            });

            prepopulationService.prepop(mockCustomerData, ampContactDetailsBlock_componentInstance);

            expect(ampContactDetailsBlock_componentInstance.__controlGroup.value).toEqual({
                emailAddress: null,
                mobilePhone: null,
                homePhone: null
            });

            setTimeout(done, 500);
        });

        it( 'should populate only the controls that has a valid prepopMapping custom property' , (done) => {
            delete custom.controls[1].prepopMapping;
            delete custom.controls[2].prepopMapping;

            loadComponent();

            expect(component).toBeDefined();
            const ampContactDetailsBlock_debugElement = ngElement.query(By.css('amp-contact-details-block'));
            const ampContactDetailsBlock_componentInstance = ampContactDetailsBlock_debugElement.componentInstance;

            expect(ampContactDetailsBlock_debugElement).toBeDefined();

            prepopulationService = ampContactDetailsBlock_debugElement.injector.get(PrepopAmpContactDetailsService);

            prepopulationService.prepopCompletedSubject.subscribe(() => {
                done();
            });

            prepopulationService.prepop(mockCustomerData, ampContactDetailsBlock_componentInstance);

            expect(ampContactDetailsBlock_componentInstance.__controlGroup.value).toEqual({
                emailAddress: 'XBIL_B_FAPXLVE@BCX.RDC.BI',
                mobilePhone: null,
                homePhone: null
            });
        });

        it( 'should not fail when the source data is empty' , (done) => {
            loadComponent();

            expect(component).toBeDefined();
            const ampContactDetailsBlock_debugElement = ngElement.query(By.css('amp-contact-details-block'));
            const ampContactDetailsBlock_componentInstance = ampContactDetailsBlock_debugElement.componentInstance;

            expect(ampContactDetailsBlock_debugElement).toBeDefined();

            prepopulationService = ampContactDetailsBlock_debugElement.injector.get(PrepopAmpContactDetailsService);

            prepopulationService.prepopCompletedSubject.subscribe(() => {
                fail('Prepop completed should not have occurred.');
            });

            prepopulationService.prepop({}, ampContactDetailsBlock_componentInstance);

            expect(ampContactDetailsBlock_componentInstance.__controlGroup.value).toEqual({
                emailAddress: null,
                mobilePhone: null,
                homePhone: null
            });

            setTimeout(done, 500);
        });

    });
} );

class MockLoginStatusService extends LoginStatusService {
    public loggedInSubject = new Subject();
    public userHasLoggedIn () {
        return this.loggedInSubject;
    }
}
class MockCustomerDetailsService extends CustomerDetailsService {
    public customerDetailsPromise = new Promise((resolve, reject) => {
        resolve(mockCustomerData);
    });
    public getCustomerDetails () {
        return this.customerDetailsPromise;
    }
}

@Component({
    template: `
        <div [amp-block-loader]='childBlocks'
            [fdn]='fullyDistinguishedName'
            [form]='form'></div>
    `
})
class TestComponent {

    public form : FormGroup = new FormGroup( {} );
    private fullyDistinguishedName = [];
    private childBlocks = {
        id: 'Application',
        name: 'Application',
        version: '0.0.1',
        path: '/application',
        status: 'NEW',
        blocks: [
            {
                name: 'contactDetails',
                blockType: 'AmpContactDetailsBlockComponent',
                blockLayout: 'INLINE',
                commonBlock: false,
                path: 'modules/amp-contact-details-block/components/amp-contact-details-block/amp-contact-details-block.component'
            }
        ]
    };

    constructor () {
        if (custom) {
            this.childBlocks.blocks[0]['custom'] = custom;
        }
    }
}
