import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { AmpStandAloneMenuComponent } from '../../../app/components/amp-standalone-menu/amp-standalone-menu.component';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-standalone-menu component ' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule ] ,
            declarations : [
                AmpStandAloneMenuComponent
            ] ,
            providers    : [
                { provide : FormModelService , useClass : MockFormModelService } ,
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : ScrollService , useClass : MockScrollService } ,
                ProgressObserverService ,
                { provide : Window , useClass : window }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Should contain an aside element ' , () => {
        let fixture : ComponentFixture<AmpStandAloneMenuComponent> = TestBed.createComponent( AmpStandAloneMenuComponent );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let myMenuComponent = fixture.componentInstance;
        let containerElement = Element.querySelector( '.sidebar' );

        expect( containerElement).toBeDefined();

    } );
    it( 'Should contain an aside element ' , () => {
        let fixture : ComponentFixture<AmpStandAloneMenuComponent> = TestBed.createComponent( AmpStandAloneMenuComponent );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let myMenuComponent = fixture.componentInstance;
        let containerElement = Element.querySelector( '.sidebar' );

        expect( containerElement).toBeDefined();

    } );
} );
