import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpTaxFileNumberBlockModule } from '../../../app/modules/amp-tax-file-number-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let hasTaxFileNumberControl;
let taxFileNumberControl;
let noTaxFileNumberReasonControl;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    hasTaxFileNumberControl = controlGroup['hasTaxFileNumber'];
    taxFileNumberControl = controlGroup['taxFileNumber'];
    noTaxFileNumberReasonControl = controlGroup['noTaxFileNumberReason'];
}

describe('amp-tax-file-number-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpTaxFileNumberBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            controls: [
                { id: 'hasTaxFileNumber' },
                { id: 'taxFileNumberControl' },
                { id: 'noTaxFileNumberReasonControl' }
            ]
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
            expect(hasTaxFileNumberControl).toBeDefined();
        });
    });

    describe('Block title', () => {
        describe('when no block title has been defined', () => {
            it('should not have the block title h2', () => {
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBe(null);
            });
        });
        describe('when a block title has been defined', () => {
            it('should display the given title', () => {
                custom.blockTitle = 'Questions we need to ask...';
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('Questions we need to ask...');
            });
        });
    });

    describe('OK button', () => {
        describe('when just loaded', () => {
            it('OK button should be disabled', () => {
                loadComponent();
                expect(hasTaxFileNumberControl._status).toBe('INVALID');

                const okButtonEl = domElement.querySelector('button');
                expect(okButtonEl).toBeDefined();
                expect(okButtonEl.hasAttribute('disabled')).toBe(true);
            });
        });
    });
});

@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="tax-file-number-block">
            <amp-tax-file-number-block #block>
            </amp-tax-file-number-block>
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
