import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
let mobilePhoneControl;
let homePhoneControl;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    console.error ('loadComponent()', JSON.stringify(component['childBlocks'].blocks[0]['custom']));

    const controlGroup = ngElement.componentInstance.form.controls.contactDetails.controls;
    emailControl = controlGroup['emailAddress'];
    mobilePhoneControl = controlGroup['mobilePhone'];
    homePhoneControl = controlGroup['homePhone'];
}

function setDefaultState() {
    custom = {
        overrides: {
            isInitiallyActive: true
        }
    };
}

function setCustomOverrides(prop, value) {
    custom.overrides[prop] = value;
}

describe('amp-contact-details-block component', () => {

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
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        setDefaultState();
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
            expect(emailControl).toBeDefined();
            expect(mobilePhoneControl).toBeDefined();
            expect(homePhoneControl).toBeDefined();
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
                setCustomOverrides('blockTitle', 'My Contact Details block title');
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
                expect(mobilePhoneControl._status).toBe('INVALID');
                expect(homePhoneControl._status).toBe('VALID');
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
                mobilePhoneControl.setValue('0401123456');
                expect(emailControl._status).toBe('VALID');
                expect(mobilePhoneControl._status).toBe('VALID');
                fixture.detectChanges();
                const okButtonEl = domElement.querySelector('button');
                expect(okButtonEl).toBeDefined();
                expect(okButtonEl.hasAttribute('disabled')).toBe(false);
            });
        });
        describe('When there is no required fields', () => {
            beforeEach(async(() => {
                setCustomOverrides('controls[0].required', false);
                setCustomOverrides('controls[1].required', false);
                setCustomOverrides('controls[2].required', false);
                loadComponent();
            }));
            it('should have its "OK" button enabled', () => {
                fixture.detectChanges();
                const okButtonEl = domElement.querySelector('button');
                expect(okButtonEl).toBeDefined();
                expect(okButtonEl.hasAttribute('disabled')).toBe(false);
            });
        });
    });

    describe('Labels', () => {
        beforeEach(async(() => {
            // The method setDefaultState is not sufficient to clear out the previous test custom overrides
            // Somewhere is caching/reusing the custom overrides and therefore must be explicitly be undone here.
            setCustomOverrides('controls[0].required', true);
            setCustomOverrides('controls[1].required', true);
            setCustomOverrides('controls[2].required', false);

            loadComponent();
        }));
        describe('When no custom labels are given', () => {
            it('should display the default label for "Email" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-emailAddress]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Email');
            });
            it('should display the default label for "Mobile phone" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-mobilePhone]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Mobile number');
            });
            it('should display the default label for "Home phone" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-homePhone]'));
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
            it('should display the customised label for "Mobile phone" field', () => {
                setCustomOverrides('controls[1].label', 'My mobile number');
                loadComponent();
                const mobileNumberLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-mobilePhone]'));
                expect(mobileNumberLabelEl).toBeDefined();
                expect(mobileNumberLabelEl.nativeElement.textContent.trim()).toEqual('My mobile number');
            });
            it('should display the customised label for "Home number" field', () => {
                setCustomOverrides('controls[2].label', 'My home number');
                loadComponent();
                const homeNumberLabelEl = ngElement.query(By.css('label[for=Application-contactDetails-homePhone]'));
                expect(homeNumberLabelEl).toBeDefined();
                expect(homeNumberLabelEl.nativeElement.textContent.trim()).toEqual('My home number (optional)');
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
                const mobilePhoneFormRow = domElement.querySelectorAll('amp-form-row').item(1);
                const mobilePhoneTooltip = mobilePhoneFormRow.querySelector('amp-tooltip-cmp span');
                expect(mobilePhoneTooltip).toBeDefined();
                expect(mobilePhoneTooltip.getAttribute('ng-reflect-message')).toBe('A mobile phone number is required to allow AMP Bank to securely protect your account.');
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
                const mobilePhoneFormRow = domElement.querySelectorAll('amp-form-row').item(1);
                const mobilePhoneTooltip = mobilePhoneFormRow.querySelector('amp-tooltip-cmp span');
                expect(mobilePhoneTooltip).toBeDefined();
                expect(mobilePhoneTooltip.getAttribute('ng-reflect-message')).toBe('My mobile number tooltip message');
            });
        });
    });

    describe('Error messages', () => {
        describe('When no custom error messages are given', () => {
            beforeEach(() => {
                loadComponent();
            });
            it('should have the default required error message for "Mobile number" field', () => {
                expect(mobilePhoneControl.errors.required.text).toEqual('Mobile number is a required field.');
            });
            it('should have the default pattern error message for "Mobile number" field', () => {
                mobilePhoneControl.setValue('Wrong number');
                fixture.detectChanges();
                expect(mobilePhoneControl._errors.pattern.text).toEqual('Mobile number must be in the format 04nnnnnnnn.');
            });
        });
        describe('When customising error messages', () => {
            it('should have the customised required error message for "Mobile number" field', () => {
                const customRequiredErrorMessage = 'Mobile number is a highly required field.';
                setCustomOverrides('controls[1].errors.required', customRequiredErrorMessage);
                loadComponent();
                expect(mobilePhoneControl.errors.required.text).toEqual(customRequiredErrorMessage);
            });
            it('should have the customised pattern error message for "Mobile number" field', () => {
                const customPatternErrorMessage = 'Mobile number has a very specific pattern.';
                setCustomOverrides('controls[1].errors.pattern', customPatternErrorMessage);
                loadComponent();
                mobilePhoneControl.setValue('Wrong number');
                fixture.detectChanges();
                expect(mobilePhoneControl._errors.pattern.text).toEqual(customPatternErrorMessage);
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
