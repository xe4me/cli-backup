import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup, FormBuilder } from '@angular/forms';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpStandAloneMenuModule, AmpStandAloneMenuComponent } from '../../../app/modules/amp-standalone-menu';
import { By } from '@angular/platform-browser';

describe('amp-standalone-menu component ', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            providers: [
                {provide: FormModelService, useClass: MockFormModelService},
                {provide: ElementRef, useClass: MockElementRef},
                {provide: ScrollService, useClass: MockScrollService},
                {provide: Window, useClass: window},
                ProgressObserverService,
                BrowserDomAdapter,
                FormSectionService,
            ],
            imports: [FormsModule, ReactiveFormsModule, AmpStandAloneMenuModule]
        });
        TestBed.compileComponents();
    }));
    it( 'amp-menu should be defined ', () => {
        // let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        // fixture.detectChanges();
        // let compiledTestComponent = fixture.debugElement;
        // let compiledLabel         = compiledTestComponent.query( By.css( 'steps-nav' ) );
    } );
});
class MockElementRef implements ElementRef {
    nativeElement = {};
}
@Component(
    {
        template: `<aside class="steps-nav"> </aside> `
    })
class TestComponent {
}
