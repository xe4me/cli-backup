import { async , ComponentFixture , TestBed, inject } from '@angular/core/testing';
import { Component , provide , ElementRef, ViewChild, Injector, EventEmitter, Input, Injectable, Output } from '@angular/core';
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
                TestComponent,
                TestComponent1,
                TestComponent2
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true },
                { provide : ScrollService , useClass: ScrollService1 },
                { provide : AmpStandAloneMenuComponent , useClass: TestComponent2 },
                ProgressObserverService,
                BrowserDomAdapter,
                FormSectionService
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'amp-standalone-menu contains a form' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledLabel         = compiledTestComponent.query( By.css( 'form' ) );
        expect( compiledLabel.name ).toBe( 'form' );
    } );
    it( 'amp-standalone-menu check for shown element ' , () => {
        let fixture : ComponentFixture<TestComponent1> = TestBed.createComponent( TestComponent1 );
        let compiledTestComponentNav = fixture.debugElement;
        let compiledNav = compiledTestComponentNav.query( By.css( 'nav' ) );
        expect( compiledNav ).toBe( null );
        fixture.componentInstance.showNavigation = true;
        fixture.detectChanges();
        expect( compiledNav ).toBe( null );
    } );
    it( 'amp-standalone-menu check to see of the div has a class' , () => {
        let fixture : ComponentFixture<TestComponent2> = TestBed.createComponent( TestComponent2 );
        let compiledTestComponentNav = fixture.debugElement;
        let compiledNav = compiledTestComponentNav.query( By.css( 'div' ) );
        let menuComp = new AmpStandAloneMenuComponent();
        expect( menuComp.testForClass( compiledNav.nativeElement, 'thisisaclass')).toBe(true);
        expect( menuComp.testForClass( compiledNav.nativeElement, 'somespruisclass')).toBe(false);
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// test the ui element for a form
@Component( {
    template : `
    <form class='nl-form'>
        <amp-standalone-menu #menu [form]="form" [sectionObservable]="scrollService.$scrolled"></amp-standalone-menu>
    </form>
    `
} )
class TestComponent {
    private form : FormGroup;

    constructor(private _builder : FormBuilder,
                private scrollService : ScrollService) {
        this.form = this._builder.group({ });
    }
}
// test to see if the shown flag is triggered
@Component( {
    template : `
    <nav *ngIf="showNavigation">This element is visible</nav>
    `
} )
class TestComponent1  {
    public showNavigation : boolean = false;

    constructor() {

    }
}
// test a public method inside the class
@Component( {
    template : `
    <div class="thisisaclass">hi, i'm a div</div>
    `
} )
class TestComponent2 {
    public form : FormGroup;

    constructor(private _builder : FormBuilder,
                private scrollService : ScrollService) {

        this.form = this._builder.group({ });
    }

}
