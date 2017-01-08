import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AmpBasicInfoBlockModule } from '../../../app/modules/amp-basic-info-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

describe('amp-basic-info-block component', () => {

    let fixture : ComponentFixture<TestComponent>;
    let component;
    let domElement;
    let ngElement;

    let titleControl;
    let firstNameControl;
    let middleNameControl;
    let lastNameControl;
    let dateOfBirthControl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpBasicInfoBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        domElement = fixture.nativeElement;
        ngElement = fixture.debugElement;
        component = fixture.componentInstance;

        const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
        titleControl = controlGroup['TitleDropdown'];
        firstNameControl = controlGroup['FirstName'];
        middleNameControl = controlGroup['MiddleName'];
        lastNameControl = controlGroup['LastName'];
        dateOfBirthControl = controlGroup['DateOfBirth'];
    }));

    it('should be defined', () => {
        expect(true).toBe(true);
    });

    it('should have the correct title', () => {
        const titleEl = domElement.querySelector('h2');
        expect(titleEl).toBeDefined();
        expect(titleEl.textContent).toContain('Tell us about yourself');
    });

    it('should allow letters in first name', () => {
        firstNameControl.setValue('John');
        expect(firstNameControl._status).toBe('VALID');
    });

    it('should have its "OK" button disabled if some required values are missing', () => {
        const okButtonEl = domElement.querySelector('button');
        expect(okButtonEl).toBeDefined();
        expect(okButtonEl.hasAttribute('disabled')).toBe(true);
    });

    it('should have its "OK" button enabled if form is valid', () => {

        titleControl.setValue({
            Query: 'Mr',
            SelectedItem: 'Mr'
        });
        firstNameControl.setValue('John');
        lastNameControl.setValue('Doe');
        dateOfBirthControl.setValue('11/11/1111');

        expect(titleControl._status).toBe('VALID');
        expect(firstNameControl._status).toBe('VALID');
        expect(lastNameControl._status).toBe('VALID');
        expect(dateOfBirthControl._status).toBe('VALID');

        fixture.detectChanges();

        const okButtonEl = domElement.querySelector('button');
        expect(okButtonEl).toBeDefined();
        expect(okButtonEl.hasAttribute('disabled')).toBe(false);
    });

    // "Middle name" label defined in the component's html template
    it('should have the correct label for the "Middle name" text input', () => {
        const middleNameLabelEl = ngElement.query(By.css('label[for=Application-MiddleName]'));
        expect(middleNameLabelEl).toBeDefined();
        expect(middleNameLabelEl.nativeElement.textContent.trim()).toEqual('Middle name (optional)');
    });

    // "Date of birth" label defined in the component's html template
    it('should have the correct label for the "Date of birth" text input', () => {
        const dateOfBirthLabelEl = ngElement.query(By.css('label[for=Application-DateOfBirth]'));
        expect(dateOfBirthLabelEl).toBeDefined();
        expect(dateOfBirthLabelEl.nativeElement.textContent.trim()).toEqual('Date of birth');
    });

    // --- Required fields
    it('should enforce "Title" as a required field"', () => {
        fixture.detectChanges();
        expect(titleControl.controls.Query.errors.required).toBeDefined();
    });
    it('should enforce "First name" as a required field"', () => {
        fixture.detectChanges();
        expect(firstNameControl.errors.required).toBeDefined();
    });
    it('should enforce "Last name" as a required field"', () => {
        fixture.detectChanges();
        expect(lastNameControl.errors.required).toBeDefined();
    });
    it('should enforce "Date of birth" as a required field"', () => {
        fixture.detectChanges();
        expect(dateOfBirthControl.errors.required).toBeDefined();
    });

    // --- Error messages
    it('should define the correct error message for required "Title" field', () => {
        expect(titleControl.controls.Query._errors.required.text).toEqual('Title is a required field.');
    });
    it('should define the correct error message for required "First name" field', () => {
        expect(firstNameControl._errors.required.text).toEqual('First name is a required field.');
    });
    it('should define the correct error message for required "Last name" field', () => {
        expect(lastNameControl._errors.required.text).toEqual('Last name is a required field.');
    });
    it('should define the correct error message for required "Date of birth" field', () => {
        expect(dateOfBirthControl._errors.required.text).toEqual('This field is required');
    });

    it('should enforce the date format for the "Date of birth" test input', () => {
        dateOfBirthControl.setValue('abc');
        expect(dateOfBirthControl._status).toBe('INVALID');
        fixture.detectChanges();
        expect(dateOfBirthControl.errors.invalidDate ).toBeDefined();
    });

});

@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="basic-info-block">
            <amp-basic-info-block #block>
            </amp-basic-info-block>
        </div>
    </form>
    `
})
class TestComponent implements OnInit {

    @ViewChild('block') block;

    ngOnInit() {
        this.block.__fdn = ['Application'];
        this.block.__custom = {
            'blockTitle': 'Tell us about yourself',
            'controls': [
                { 'id': 'Title' },
                { 'id': 'FirstName' },
                { 'id': 'MiddleName' },
                { 'id': 'LastName' },
                { 'id': 'DateOfBirth' }
            ]
        };
        this.block.__controlGroup = new FormGroup({});

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
