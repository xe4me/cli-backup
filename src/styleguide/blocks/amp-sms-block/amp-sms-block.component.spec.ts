import {
    Component,
    ViewChild,
    OnInit
} from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { AmpSaveCloseBlockModule } from '../../../app/modules/amp-save-close-block/amp-save-close-block.module';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';
import {By} from '@angular/platform-browser';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let mobileControl;
let acceptPrivacyControl;

function loadComponent () {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;
    component = fixture.componentInstance;

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    mobileControl = controlGroup[ 'mobileNumber' ];
    acceptPrivacyControl = controlGroup[ 'acceptPrivacy' ];
}

describe('amp-sms-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpSaveCloseBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });
        custom = {
            description : 'test description',
            controls: [
                { id: 'mobileNumber' },
                { id: 'acceptPrivacy' }
            ]
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each formControl', () => {
            loadComponent();
            expect(component).toBeDefined();
            expect(mobileControl).toBeDefined();
            expect(acceptPrivacyControl).toBeDefined();
        });
    });

    describe('Should disable OK button, if any required field is not valid', () => {
        beforeEach(async(() => {
            loadComponent();
        }));
        it ('if mobileNumber empty, should disable OK buton', () => {
            expect(mobileControl._status).toBe('INVALID');
            const okButtonEl = domElement.querySelector('button');
            expect(okButtonEl).toBeDefined();
            expect(okButtonEl.hasAttribute('disabled')).toBe(true);
        });
        it ('if mobileNumber fail with validation rule, should disable OK buton', () => {
            mobileControl.setValue('0545456789');
            expect(mobileControl._status).toBe('INVALID');
            const okButtonEl = domElement.querySelectorAll('button').item(0);
            expect(okButtonEl).toBeDefined();
            expect(okButtonEl.hasAttribute('disabled')).toBe(true);
        });
        it ('if acceptPrivacy empty, should disable OK buton', () => {
            expect(acceptPrivacyControl._status).toBe('INVALID');
            const okButtonEl = domElement.querySelectorAll('button').item(0);
            expect(okButtonEl).toBeDefined();
            expect(okButtonEl.hasAttribute('disabled')).toBe(true);
        });
        it ('if acceptPrivacy === false, should disable OK buton', () => {
            acceptPrivacyControl.setValue(false);
            expect(acceptPrivacyControl._status).toBe('INVALID');
            const okButtonEl = domElement.querySelectorAll('button').item(0);
            expect(okButtonEl).toBeDefined();
            expect(okButtonEl.hasAttribute('disabled')).toBe(true);
        });
    });
});

@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="sms-block">
            <amp-sms-block #block>
            </amp-sms-block>
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
