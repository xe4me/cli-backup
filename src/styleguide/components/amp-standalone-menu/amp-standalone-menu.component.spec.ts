import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpStandAloneMenuModule } from '../../../app/modules/amp-standalone-menu/amp-standalone-menu.module';
import { AmpStandAloneMenuComponent } from '../../../app/modules/amp-standalone-menu/components/amp-standalone-menu/amp-standalone-menu.component';

class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-standalone-menu component ' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule, AmpStandAloneMenuModule ] ,
            providers    : [
                { provide : FormModelService , useClass : MockFormModelService } ,
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : ScrollService , useClass : MockScrollService } ,
                { provide : Window , useClass : window } ,
                ProgressObserverService ,
                BrowserDomAdapter ,
                FormSectionService ,
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Should contain an aside element ' , () => {
        let fixture : ComponentFixture<AmpStandAloneMenuComponent> = TestBed.createComponent( AmpStandAloneMenuComponent );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
       // let myMenuComponent = fixture.componentInstance;
        let myMenuComponent = fixture.componentInstance.ref;
        let containerElement = Element.querySelector( '.steps-nav' );

        // console.log(containerElement);

    } );

} );
@Component(
    { 
        selector : 'amp-standalone-menu-test', 
        template : ` 
            <amp-standalone-menu #ref [form]="__form.controls.Application" [sectionObservable]="scrollService.$scrolled">
            </amp-standalone-menu>
        ` 
    } );
