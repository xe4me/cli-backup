import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup, FormBuilder } from '@angular/forms';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpStandAloneMenuModule, AmpStandAloneMenuComponent } from '../../../app/modules/amp-standalone-menu';
import { By } from '@angular/platform-browser';
@Injectable()
class ScrollService1 {
    @Input() sectionObservable;

    public $scrolled : EventEmitter<any>;

    constructor () {
        this.$scrolled  = new EventEmitter();
    }
}
describe( 'amp standalone menu tests' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpStandAloneMenuModule ] ,
            declarations : [
                TestComponent
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true },
                { provide : ScrollService , useClass: ScrollService1 },
                ProgressObserverService,
                BrowserDomAdapter,
                FormSectionService
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'amp-standalone-menu contains a label' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledLabel         = compiledTestComponent.query( By.css( 'label' ) );
        expect( compiledLabel.name ).toBe( 'label' );
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
    <label></label>
        <amp-standalone-menu #menu [form]="form" [sectionObservable]="scrollService.$scrolled"></amp-standalone-menu>
    </form>
    `
} )
class TestComponent {
    @ViewChild('menu') menu;

    private form : FormGroup;

    constructor ( private _builder : FormBuilder,
                  private scrollService : ScrollService
                ) {
        this.form = this._builder.group( {} );

    }
}

