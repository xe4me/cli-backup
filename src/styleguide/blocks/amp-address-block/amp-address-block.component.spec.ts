import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpAddressBlockModule } from '../../../app/modules/amp-address-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let addressControl;
let sameThanPrimaryApplicantControl;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    addressControl = controlGroup['address'];
    sameThanPrimaryApplicantControl = controlGroup['sameThanPrimary'];
}

describe('amp-address-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, AmpAddressBlockModule, HttpModule ],
            declarations: [ TestComponent ],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            targetApplicantRepeaterId: "applicants",
            targetPrimaryApplicantBasicInfoId: "basicInfo",
            controls: [
                { id: 'address' },
                { id: 'sameThanPrimaryApplicant' }
            ]
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
        });
    });

});

@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="address-block">
            <amp-address-multi-block #block>
            </amp-address-multi-block>
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
        this.block.__form = new FormGroup({});

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
