import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmpConfirmationPageComponent } from '../../../app/pages/amp-confirmation-page/amp-confirmation-page.component';

import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;
}

xdescribe('amp-confirmation-block component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpConfirmationPageComponent, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });

        custom = {
            controls: [
            ]
        };
    }));

    describe('When the component is loaded', () => {
        it('the component should be defined with one control for each input', () => {
            loadComponent();
            expect(component).toBeDefined();
        });
    });

    describe('Block title', () => {
        describe('when no block title has been defined', () => {
            it('should not have the block title h3', () => {
                loadComponent();
                const titleEl = domElement.querySelector('h3');
                expect(titleEl).toBe(null);
            });
        });
    });
});

@Component({
    template: `
        <div class="contact-details-block">
            <amp-confirmation-block #block>
            </amp-confirmation-block>
        </div>
    `
})
class TestComponent implements OnInit {

    @ViewChild('block') block;

    ngOnInit() {
    }
}
