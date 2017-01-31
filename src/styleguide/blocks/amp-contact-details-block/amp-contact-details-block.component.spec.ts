import { Component } from '@angular/core';
import {
    FormsModule,
    FormGroup
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AmpContactDetailsBlockModule } from '../../../app/modules/amp-contact-details-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';
import { AmpBlockLoaderDirective } from '../../amp-block-loader-test.directive';

let custom : any;

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let emailControl;
let mobileNumberControl;
let homeNumberControl;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    const controlGroup = ngElement.componentInstance.form.controls.contactDetails.controls;
    emailControl = controlGroup['emailAddress'];
    mobileNumberControl = controlGroup['mobileNumber'];
    homeNumberControl = controlGroup['homeNumber'];
}

function setCustomOverrides(prop, value) {
    custom.overrides[prop] = value;
}

describe('amp-contact-details-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                AmpContactDetailsBlockModule,
                HttpModule
            ],
            declarations: [
                AmpBlockLoaderDirective,
                TestComponent
            ],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            overrides: {
                isInitiallyActive: true
            }
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
            expect(emailControl).toBeDefined();
            expect(mobileNumberControl).toBeDefined();
            expect(homeNumberControl).toBeDefined();
        });
    });

    describe('Block title', () => {
        describe('when no custom block title has been given', () => {
            it('should display the default title', () => {
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('And your contact details...');
            });
        });
        describe('when a custom block title has been given', () => {
            it('should display the given title', () => {
                setCustomOverrides('blockTitle', 'My Contact Details block title')
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('My Contact Details block title');
            });
        });
    });

    describe('OK button', () => {
        describe('when some required fields are still empty', () => {
            it('OK button should be disabled', () => {
                loadComponent();
                expect(emailControl._status).toBe('INVALID');
                expect(mobileNumberControl._status).toBe('INVALID');
                expect(homeNumberControl._status).toBe('VALID');
                const okButtonEl = domElement.querySelector('button');
                expect(okButtonEl).toBeDefined();
                expect(okButtonEl.hasAttribute('disabled')).toBe(true);
            });
        });
        describe('when all required values have been provided', () => {
            beforeEach(async(() => {
                loadComponent();
            }));
            it('OK button should be enabled', () => {
                emailControl.setValue('john.doe@star.com');
                mobileNumberControl.setValue('0401123456');
                expect(emailControl._status).toBe('VALID');
                expect(mobileNumberControl._status).toBe('VALID');
                fixture.detectChanges();
                const okButtonEl = domElement.querySelector('button');
                expect(okButtonEl).toBeDefined();
                expect(okButtonEl.hasAttribute('disabled')).toBe(false);
            });
        });
        describe('When there is no required fields', () => {
            it('should have its "OK" button enabled', () => {
                setCustomOverrides('controls[0].required', false);
                setCustomOverrides('controls[1].required', false);
                setCustomOverrides('controls[2].required', false);
                loadComponent();
                fixture.detectChanges();
                const okButtonEl = domElement.querySelector('button');
                expect(okButtonEl).toBeDefined();
                expect(okButtonEl.hasAttribute('disabled')).toBe(false);
            });
        });
    });

    describe('Labels', () => {
        describe('When no custom labels are given', () => {
            beforeEach(() => {
                loadComponent();
            });
            it('should display the default label for "Email" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-emailAddress]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Email');
            });
            it('should display the default label for "Mobile number" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-mobileNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Mobile number');
            });
            it('should display the default label for "Home number" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-homeNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Home number (optional)');
            });
        });
        describe('When customising labels', () => {
            it('should display the customised label for "Email" field', () => {
                setCustomOverrides('controls[0].label', 'My email');
                loadComponent();
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-emailAddress]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My email');
            });
            it('should display the customised label for "Mobile number" field', () => {
                setCustomOverrides('controls[1].label', 'My mobile number');
                loadComponent();
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-mobileNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My mobile number');
            });
            it('should display the customised label for "Home number" field', () => {
                setCustomOverrides('controls[2].label', 'My home number');
                loadComponent();
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-homeNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My home number (optional)');
            });
        });
    });

    describe('Tooltip messages', () => {
        describe('When no custom tooltip messages are given', () => {
            beforeEach(() => {
                loadComponent();
            });
            it('should display the default tooltip message for "Email" field', () => {
                const emailFormRow = domElement.querySelectorAll('amp-form-row').item(0);
                const emailTooltip = emailFormRow.querySelector('amp-tooltip-cmp span');
                expect(emailTooltip).toBeDefined();
                expect(emailTooltip.getAttribute('ng-reflect-message')).toBe('Confirmation of your application will be sent to this email address.');
            });
            it('should display the default tooltip message for "Mobile number" field', () => {
                const mobileNumberFormRow = domElement.querySelectorAll('amp-form-row').item(1);
                const mobileNumberTooltip = mobileNumberFormRow.querySelector('amp-tooltip-cmp span');
                expect(mobileNumberTooltip).toBeDefined();
                expect(mobileNumberTooltip.getAttribute('ng-reflect-message')).toBe('A mobile phone number is required to allow AMP Bank to securely protect your account.');
            });
        });
        describe('When customising tooltip messages', () => {
            it('should display the customised tooltip message for "Email" field', () => {
                setCustomOverrides('controls[0].tooltipMessage', 'My email tooltip message');
                loadComponent();
                const emailFormRow = domElement.querySelectorAll('amp-form-row').item(0);
                const emailTooltip = emailFormRow.querySelector('amp-tooltip-cmp span');
                expect(emailTooltip).toBeDefined();
                expect(emailTooltip.getAttribute('ng-reflect-message')).toBe('My email tooltip message');
            });
            it('should display the customised tooltip message for "Mobile number" field', () => {
                setCustomOverrides('controls[1].tooltipMessage', 'My mobile number tooltip message');
                loadComponent();
                const mobileNumberFormRow = domElement.querySelectorAll('amp-form-row').item(1);
                const mobileNumberTooltip = mobileNumberFormRow.querySelector('amp-tooltip-cmp span');
                expect(mobileNumberTooltip).toBeDefined();
                expect(mobileNumberTooltip.getAttribute('ng-reflect-message')).toBe('My mobile number tooltip message');
            });
        });
    });

    describe('Error messages', () => {
        describe('When no custom error messages are given', () => {
            beforeEach(() => {
                loadComponent();
            });
            it('should have the default required error message for "Mobile number" field', () => {
                expect(mobileNumberControl.errors.required.text).toEqual('Mobile number is a required field.');
            });
            it('should have the default pattern error message for "Mobile number" field', () => {
                mobileNumberControl.setValue('Wrong number');
                fixture.detectChanges();
                expect(mobileNumberControl._errors.pattern.text).toEqual('Mobile number must be in the format 04nnnnnnnn.');
            });
        });
        describe('When customising error messages', () => {
            it('should have the customised required error message for "Mobile number" field', () => {
                const customRequiredErrorMessage = 'Mobile number is a highly required field.';
                setCustomOverrides('controls[1].errors.required', customRequiredErrorMessage);
                loadComponent();
                expect(mobileNumberControl.errors.required.text).toEqual(customRequiredErrorMessage);
            });
            it('should have the customised pattern error message for "Mobile number" field', () => {
                const customPatternErrorMessage = 'Mobile number has a very specific pattern.';
                setCustomOverrides('controls[1].errors.pattern', customPatternErrorMessage);
                loadComponent();
                mobileNumberControl.setValue('Wrong number');
                fixture.detectChanges();
                expect(mobileNumberControl._errors.pattern.text).toEqual(customPatternErrorMessage);
            });
        });
    });

});

@Component({
    template: `
        <div [amp-block-loader]="childBlocks"
            [fdn]="fullyDistinguishedName"
            [form]="form"></div>
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
