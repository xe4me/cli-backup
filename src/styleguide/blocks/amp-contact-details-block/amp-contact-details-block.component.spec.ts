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

fdescribe('amp-contact-details-block component', function() {

    beforeEach(async(function() {
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

    it('should be defined', function() {
        loadComponent();
        expect(true).toBe(true);
    });

    it('should display the correct block title', function() {
        custom.blockTitle = 'My Contact Details block title';
        loadComponent();
        const titleEl = domElement.querySelector('h2');
        expect(titleEl).toBeDefined();
        expect(titleEl.textContent).toEqual('My Contact Details block title');
    });

    it('should have its "OK" button disabled if some required values are missing', function() {
        loadComponent();
        expect(emailControl._status).toBe('INVALID');
        expect(mobileNumberControl._status).toBe('INVALID');
        expect(homeNumberControl._status).toBe('VALID');
        const okButtonEl = domElement.querySelector('button');
        expect(okButtonEl).toBeDefined();
        expect(okButtonEl.hasAttribute('disabled')).toBe(true);
    });

    describe('', function() {

        beforeEach(async(function() {
            loadComponent();
        }));

        it('should have its "OK" button enabled if form is valid', function() {

            emailControl.setValue('john.doe@star.com');
            mobileNumberControl.setValue('0401123456');
            homeNumberControl.setValue('0401123456');

            expect(emailControl._status).toBe('VALID');
            expect(mobileNumberControl._status).toBe('VALID');
            expect(homeNumberControl._status).toBe('VALID');

            fixture.detectChanges();

            const okButtonEl = domElement.querySelector('button');
            expect(okButtonEl).toBeDefined();
            expect(okButtonEl.hasAttribute('disabled')).toBe(false);
        });
    });

    // Default "label" properties
    it('should display the correct default label for "Email" field', function() {
        loadComponent();
        const emailLabelEl = ngElement.query(By.css('label[for=Application-email]'));
        expect(emailLabelEl).toBeDefined();
        expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Email');
    });
    it('should display the correct default label for "Mobile number" field', function() {
        loadComponent();
        const emailLabelEl = ngElement.query(By.css('label[for=Application-mobileNumber]'));
        expect(emailLabelEl).toBeDefined();
        expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Mobile number');
    });
    it('should display the correct default label for "Home number" field', function() {
        loadComponent();
        const emailLabelEl = ngElement.query(By.css('label[for=Application-homeNumber]'));
        expect(emailLabelEl).toBeDefined();
        expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('Home number (optional)');
    });

    // Override "label" properties
    it('should display the correct overridden label for "Email" field', function() {
        custom.controls[0].label = 'My email';
        loadComponent();
        const emailLabelEl = ngElement.query(By.css('label[for=Application-email]'));
        expect(emailLabelEl).toBeDefined();
        expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My email');
    });
    it('should display the correct overridden label for "Mobile number" field', function() {
        custom.controls[1].label = 'My mobile number';
        loadComponent();
        const emailLabelEl = ngElement.query(By.css('label[for=Application-mobileNumber]'));
        expect(emailLabelEl).toBeDefined();
        expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My mobile number');
    });
    it('should display the correct overridden label for "Home number" field', function() {
        custom.controls[2].label = 'My home number';
        loadComponent();
        const emailLabelEl = ngElement.query(By.css('label[for=Application-homeNumber]'));
        expect(emailLabelEl).toBeDefined();
        expect(emailLabelEl.nativeElement.textContent.trim()).toEqual('My home number (optional)');
    });

    // Override "required" properties
    it('should have its "OK" button enabled if no field is required', function() {
        custom.controls[0].required = false;
        custom.controls[1].required = false;
        custom.controls[2].required = false;
        loadComponent();
        fixture.detectChanges();
        const okButtonEl = domElement.querySelector('button');
        expect(okButtonEl).toBeDefined();
        expect(okButtonEl.hasAttribute('disabled')).toBe(false);
    });

    // Override "tooltip" properties
    it('should display the correct tooltip for "Email" field', function() {
        custom.controls[0].tooltipMessage = 'My email tooltip message';
        loadComponent();
        const emailFormRow = domElement.querySelectorAll('amp-form-row').item(0);
        const emailTooltip = emailFormRow.querySelector('amp-tooltip-cmp span');
        expect(emailTooltip).toBeDefined();
        expect(emailTooltip.getAttribute('ng-reflect-message')).toBe('My email tooltip message');
    });
    it('should display the correct tooltip for "Mobile number" field', function() {
        custom.controls[1].tooltipMessage = 'My mobile number tooltip message';
        loadComponent();
        const mobileNumberFormRow = domElement.querySelectorAll('amp-form-row').item(1);
        const mobileNumberTooltip = mobileNumberFormRow.querySelector('amp-tooltip-cmp span');
        expect(mobileNumberTooltip).toBeDefined();
        expect(mobileNumberTooltip.getAttribute('ng-reflect-message')).toBe('My mobile number tooltip message');
    });

    // Default "requiredErrorMsg"
    it('should have the correct default required error message for "Mobile number" field', function() {
        loadComponent();
        expect(mobileNumberControl.errors.required.text).toEqual('Mobile number is a required field.');
    });
    // Override "requiredErrorMsg"
    it('should have the correct overridden required error message for "Mobile number" field', function() {
        const customRequiredErrorMessage = 'Mobile number is a highly required field.';
        custom.controls[1].requiredErrorMessage = customRequiredErrorMessage;
        loadComponent();
        expect(mobileNumberControl.errors.required.text).toEqual(customRequiredErrorMessage);
    });

    // Default "patternErrorMsg"
    it('should have the correct default pattern error message for "Mobile number" field', function() {
        loadComponent();
        mobileNumberControl.setValue('Wrong number');
        fixture.detectChanges();
        expect(mobileNumberControl._errors.pattern.text).toEqual('Mobile number must be in the format 04nnnnnnnn.');
    });
    // Override "patternErrorMsg"
    it('should have the correct overridden pattern error message for "Mobile number" field', function() {
        const customPatternErrorMessage = 'Mobile number has a very specific pattern.';
        custom.controls[1].patternErrorMessage = customPatternErrorMessage;
        loadComponent();
        mobileNumberControl.setValue('Wrong number');
        fixture.detectChanges();
        expect(mobileNumberControl._errors.pattern.text).toEqual(customPatternErrorMessage);
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
