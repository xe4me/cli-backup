import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmpAmlQuestionsBlockModule } from '../../../app/modules/amp-aml-questions-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let primarySourceOfWealth;
let sourceOfFundsForAccount;
let reasonForOpeningAccount;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    console.log(controlGroup);
    primarySourceOfWealth = controlGroup['primarySourceOfWealth'];
    sourceOfFundsForAccount = controlGroup['sourceOfFundsForAccount'];
    reasonForOpeningAccount = controlGroup['reasonForOpeningAccount'];
}

describe('amp-aml-questions-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpAmlQuestionsBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            controls: [
                { id: 'primarySourceOfWealth' },
                { id: 'sourceOfFundsForAccount' },
                { id: 'reasonForOpeningAccount' }
            ]
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
            expect(primarySourceOfWealth).toBeDefined();
            expect(sourceOfFundsForAccount).toBeDefined();
            expect(reasonForOpeningAccount).toBeDefined();
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
                custom.blockTitle = 'And a couple more...';
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('And a couple more...');
            });
        });
    });

    describe('OK button', () => {
        describe('when some fields are still empty', () => {
            it('OK button should be enabled', () => {
                loadComponent();
                expect(primarySourceOfWealth._status).toBe('INVALID');

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
        <div class="contact-details-block">
            <amp-aml-questions-block #block>
            </amp-aml-questions-block>
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
