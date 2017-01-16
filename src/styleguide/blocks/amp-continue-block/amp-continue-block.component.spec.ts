import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AmpRetrieveBlockModule } from '../../../app/modules/amp-retrieve';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let referenceCodeControl;
let lastNameControl;
let dateOfBirthControl;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    referenceCodeControl = controlGroup['ReferenceCode'];
    lastNameControl = controlGroup['LastName'];
    dateOfBirthControl = controlGroup['DateOfBirth'];
}

describe('amp-continue-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpRetrieveBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            controls: [
                {
                    'id': 'ReferenceCode',
                    'requiredErrMsg': 'Reference code is a required field.'
                },
                {
                    'id': 'LastName',
                    'requiredErrMsg': 'Last name is a required field.'
                },
                {
                    'id': 'DateOfBirth',
                    'requiredErrMsg': 'Date of birth is a required field.'
                }
            ]
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
            expect(referenceCodeControl).toBeDefined();
            expect(lastNameControl).toBeDefined();
            expect(dateOfBirthControl).toBeDefined();
        });
    });

});

@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="address-block">
            <amp-continue-block #block>
            </amp-continue-block>
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
