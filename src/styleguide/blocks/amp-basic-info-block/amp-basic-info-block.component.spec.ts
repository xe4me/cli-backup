import { Component } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AmpBasicInfoBlockModule } from '../../../app/modules/amp-basic-info-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';
import { AmpBlockLoaderDirective } from '../../amp-block-loader-test.directive';

let custom : any;

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

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        domElement = fixture.nativeElement;
        ngElement = fixture.debugElement;
        component = fixture.componentInstance;

        const controlGroup = ngElement.componentInstance.form.controls.basicInfo.controls;
        titleControl = controlGroup['title'];
        firstNameControl = controlGroup['firstName'];
        middleNameControl = controlGroup['middleName'];
        lastNameControl = controlGroup['surName'];
        dateOfBirthControl = controlGroup['dateOfBirth'];

        custom = {
            overrides: {
                isInitiallyActive: true
            }
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            expect(component).toBeDefined();
            expect(titleControl).toBeDefined();
            expect(firstNameControl).toBeDefined();
            expect(middleNameControl).toBeDefined();
            expect(lastNameControl).toBeDefined();
            expect(dateOfBirthControl).toBeDefined();
        });
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

    it('should have the correct label for the "Middle name" text input', () => {
        const middleNameLabelEl = ngElement.query(By.css('label[for=Application-basicInfo-middleName]'));
        expect(middleNameLabelEl).toBeDefined();
        expect(middleNameLabelEl.nativeElement.textContent.trim()).toEqual('Middle name(s)');
    });

    it('should have the correct label for the "Date of birth" text input', () => {
        const dateOfBirthLabelEl = ngElement.query(By.css('label[for=Application-basicInfo-dateOfBirth]'));
        expect(dateOfBirthLabelEl).toBeDefined();
        expect(dateOfBirthLabelEl.nativeElement.textContent.trim()).toEqual('Date of birth');
    });

    describe('Required fields', () => {
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
