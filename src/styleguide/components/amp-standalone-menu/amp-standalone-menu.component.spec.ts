import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup, FormBuilder } from '@angular/forms';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpStandAloneMenuModule, AmpStandAloneMenuComponent } from '../../../app/modules/amp-standalone-menu';

class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe('amp-standalone-menu component ', () => {
    let _fixture;
    let _compInjector : Injector;
    let _comp;
    let _element;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, AmpStandAloneMenuModule],
            declarations: [
                AmpStandAloneMenuTest
            ],
            providers: [
                {provide: FormModelService, useClass: MockFormModelService},
                {provide: ElementRef, useClass: MockElementRef},
                {provide: ScrollService, useClass: MockScrollService},
                {provide: Window, useClass: window},
                ProgressObserverService,
                BrowserDomAdapter,
                FormSectionService,
            ]
        });
        TestBed.compileComponents();
        _fixture = TestBed.createComponent( AmpStandAloneMenuTest );
        _fixture.detectChanges();
        _compInjector = _fixture.debugElement.injector;
        _comp         = _fixture.componentInstance;
        _element      = _fixture.nativeElement;
    }));
    it( 'testComponentControlGroup should be defined ' , () => {
        _fixture.detectChanges();
        let myMenuComponent = _fixture.componentInstance.ref;
        let containerElement = Element.querySelector( '.steps-nav' );
    } );
});
@Component(
    {
        selector: 'amp-standalone-menu-test',
        template: ` 
            <amp-standalone-menu #ref [form]="__form.controls.Application" [sectionObservable]="scrollService.$scrolled">
            </amp-standalone-menu>`
    });
class AmpStandAloneMenuTest {
    @ViewChild('ref') ref;
    public __controlGroup = new FormGroup( {} );

    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

}
