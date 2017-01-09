import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AmpContactDetailsBlockModule } from '../../../app/modules/amp-contact-details-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

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

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    emailControl = controlGroup['email'];
    mobileNumberControl = controlGroup['mobileNumber'];
    homeNumberControl = controlGroup['homeNumber'];
}

describe('amp-contact-details-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpContactDetailsBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            controls: [
                { id: 'email' },
                { id: 'mobileNumber' },
                { id: 'homeNumber' }
            ]
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
        describe('when no block title has been defined', () => {
            it('should display a blank title', () => {
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('');
            });
        });
        describe('when a block title has been defined', () => {
            it('should display the given title', () => {
                custom.blockTitle = 'My Contact Details block title';
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
                custom.controls[0].required = false;
                custom.controls[1].required = false;
                custom.controls[2].required = false;
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
                const emailLabelEl = ngElement.query(By.css('label[for=Application-email]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Email');
            });
            it('should display the default label for "Mobile number" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-mobileNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Mobile number');
            });
            it('should display the default label for "Home number" field', () => {
                const emailLabelEl = ngElement.query(By.css('label[for=Application-homeNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Home number (optional)');
            });
        });
        describe('When customising labels', () => {
            it('should display the customised label for "Email" field', () => {
                custom.controls[0].label = 'My email';
                loadComponent();
                const emailLabelEl = ngElement.query(By.css('label[for=Application-email]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My email');
            });
            it('should display the customised label for "Mobile number" field', () => {
                custom.controls[1].label = 'My mobile number';
                loadComponent();
                const emailLabelEl = ngElement.query(By.css('label[for=Application-mobileNumber]'));
                expect(emailLabelEl).toBeDefined();
                expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My mobile number');
            });
            it('should display the customised label for "Home number" field', () => {
                custom.controls[2].label = 'My home number';
                loadComponent();
                const emailLabelEl = ngElement.query(By.css('label[for=Application-homeNumber]'));
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
                custom.controls[0].tooltipMessage = 'My email tooltip message';
                loadComponent();
                const emailFormRow = domElement.querySelectorAll('amp-form-row').item(0);
                const emailTooltip = emailFormRow.querySelector('amp-tooltip-cmp span');
                expect(emailTooltip).toBeDefined();
                expect(emailTooltip.getAttribute('ng-reflect-message')).toBe('My email tooltip message');
            });
            it('should display the customised tooltip message for "Mobile number" field', () => {
                custom.controls[1].tooltipMessage = 'My mobile number tooltip message';
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
                custom.controls[1].requiredErrorMessage = customRequiredErrorMessage;
                loadComponent();
                expect(mobileNumberControl.errors.required.text).toEqual(customRequiredErrorMessage);
            });
            it('should have the customised pattern error message for "Mobile number" field', () => {
                const customPatternErrorMessage = 'Mobile number has a very specific pattern.';
                custom.controls[1].patternErrorMessage = customPatternErrorMessage;
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
    <form #formModel='ngForm' class='nl-form'>
        <div class="contact-details-block">
            <amp-contact-details-block #block>
            </amp-contact-details-block>
        </div>
    </form>
    `
})
class TestComponent implements OnInit {

    @ViewChild('block') block;

    ngOnInit() {
        this.block.__fdn = ['Application'];
        this.block.__custom = custom;
        this.block.__controlGroup = new FormGroup({});

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
