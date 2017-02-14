import { Component } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AmpBasicInfoBlockModule } from '../../../app/modules/amp-basic-info-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';
import { AmpBlockLoaderDirective } from '../../amp-block-loader-test.directive';

let custom : any;

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let titleControl;
let firstNameControl;
let middleNameControl;
let lastNameControl;
let dateOfBirthControl;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    const controlGroup = ngElement.componentInstance.form.controls.basicInfo.controls;
    titleControl = controlGroup['title'];
    firstNameControl = controlGroup['firstName'];
    middleNameControl = controlGroup['middleName'];
    lastNameControl = controlGroup['surName'];
    dateOfBirthControl = controlGroup['dateOfBirth'];
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

describe('amp-basic-info-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                AmpBasicInfoBlockModule,
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
            expect(titleControl).toBeDefined();
            expect(firstNameControl).toBeDefined();
            expect(middleNameControl).toBeDefined();
            expect(lastNameControl).toBeDefined();
            expect(dateOfBirthControl).toBeDefined();
        });
    });

    describe('Block title', () => {
        describe('when no custom block title has been given', () => {
            it('should display the default title', () => {
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('Tell us about yourself');
            });
        });
        describe('when a custom block title has been given', () => {
            it('should display the given title', () => {
                setCustomOverrides('blockTitle', 'And now for applicant 2');
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('And now for applicant 2');
            });
        });
    });

    it('should allow letters in first name', () => {
        loadComponent();
        firstNameControl.setValue('John');
        expect(firstNameControl._status).toBe('VALID');
    });

    it('should have its "OK" button disabled if some required values are missing', () => {
        loadComponent();
        const okButtonEl = domElement.querySelector('button');
        expect(okButtonEl).toBeDefined();
        expect(okButtonEl.hasAttribute('disabled')).toBe(true);
    });

    it('should have its "OK" button enabled if form is valid', () => {
        loadComponent();

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

    it('should have the correct label for the "Middle name" text input', () => {
        loadComponent();
        const middleNameLabelEl = ngElement.query(By.css('label[for=Application-basicInfo-middleName]'));
        expect(middleNameLabelEl).toBeDefined();
        expect(middleNameLabelEl.nativeElement.textContent.trim()).toEqual('Middle name(s)');
    });

    it('should have the correct label for the "Date of birth" text input', () => {
        loadComponent();
        const dateOfBirthLabelEl = ngElement.query(By.css('label[for=Application-basicInfo-dateOfBirth]'));
        expect(dateOfBirthLabelEl).toBeDefined();
        expect(dateOfBirthLabelEl.nativeElement.textContent.trim()).toEqual('Date of birth');
    });

    describe('Required fields', () => {
        beforeEach(() => {
            loadComponent();
        });
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
    });

    describe('Error messages', () => {
        beforeEach(() => {
            loadComponent();
        });
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
            expect(dateOfBirthControl._errors.required.text).toEqual('Date of birth is a required field.');
        });

        it('should define the correct pattern error message for "Middle name(s)" field', () => {
            expect(middleNameControl._ampErrors.pattern).toEqual('Middle name(s) has an invalid value.');
        });

        it('should enforce the date format for the "Date of birth" test input', () => {
            dateOfBirthControl.setValue('abc');
            expect(dateOfBirthControl._status).toBe('INVALID');
            fixture.detectChanges();
            expect(dateOfBirthControl.errors.invalidDate).toBeDefined();
        });
    });

    describe('Minimum age', () => {
        describe('When no minimum age is defined', () => {
            it('any value should be marked as valid', () => {
                loadComponent();
                dateOfBirthControl.setValue('11/11/2012');
                expect(dateOfBirthControl._status).toBe('VALID');
            });
        });
        describe('When a minimum age is defined', () => {
            it('an invalid value should be marked as invalid', () => {
                setCustomOverrides('controls[4].minAge', 18);
                loadComponent();
                dateOfBirthControl.setValue('11/11/2012');
                expect(dateOfBirthControl._status).toBe('INVALID');
                expect(dateOfBirthControl._errors.minAge.text.trim()).toEqual('You must be older than 18 years old.');
            });
            it('a valid value should be marked as valid', () => {
                setCustomOverrides('controls[4].minAge', 18);
                loadComponent();
                dateOfBirthControl.setValue('11/11/1982');
                expect(dateOfBirthControl._status).toBe('VALID');
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
                name: 'basicInfo',
                blockType: 'AmpBasicInfoBlockComponent',
                blockLayout: 'INLINE',
                commonBlock: false,
                path: 'modules/amp-basic-info-block/components/amp-basic-info-block/amp-basic-info-block.component'
            }
        ]
    };

    constructor () {
        if (custom) {
            this.childBlocks.blocks[0]['custom'] = custom;
        }
    }
}
