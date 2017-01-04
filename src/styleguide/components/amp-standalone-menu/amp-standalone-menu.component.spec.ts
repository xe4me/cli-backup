import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Injectable
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder
} from '@angular/forms';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import {
    AmpStandAloneMenuModule,
    AmpStandAloneMenuComponent
} from '../../../app/modules/amp-standalone-menu';
import { DomUtils } from '../../../app/modules/amp-utils/dom-utils';
import { By } from '@angular/platform-browser';
@Injectable()
class ScrollService1 {
    @Input() sectionObservable;

    public $scrolled : EventEmitter<any>;

    constructor () {
        this.$scrolled = new EventEmitter();
    }
}
describe( 'amp standalone menu tests', () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, ReactiveFormsModule, AmpStandAloneMenuModule ],
            declarations : [
                TestComponent,
                TestComponent1,
                TestComponent2
            ],
            providers    : [
                { provide : ElementRef, useClass : MockElementRef },
                { provide : ComponentFixtureAutoDetect, useValue : true },
                { provide : ScrollService, useClass : ScrollService1 },
                { provide : AmpStandAloneMenuComponent, useClass : TestComponent2 },
                DomUtils
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'amp-standalone-menu check for shown element ', () => {
        let fixture : ComponentFixture<TestComponent1> = TestBed.createComponent( TestComponent1 );
        let compiledTestComponentNav                   = fixture.debugElement;
        let compiledNav                                = compiledTestComponentNav.query( By.css( 'nav' ) );
        expect( compiledNav ).toBe( null );
        fixture.componentInstance.showNavigation = true;
        fixture.detectChanges();
        expect( compiledNav ).toBe( null );
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// test the ui element for a form
@Component( {
    template : `
    <form class='nl-form'>
        <amp-standalone-menu #menu></amp-standalone-menu>
    </form>
    `
} )
class TestComponent {
    private form : FormGroup;

    constructor ( private _builder : FormBuilder,
                  private scrollService : ScrollService ) {
        this.form = this._builder.group( {} );
    }
}
// test to see if the shown flag is triggered
@Component( {
    template : `
    <nav *ngIf="showNavigation">This element is visible</nav>
    `
} )
class TestComponent1 {
    public showNavigation : boolean = false;

    constructor () {

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

    constructor ( private _builder : FormBuilder,
                  private scrollService : ScrollService ) {

        this.form = this._builder.group( {} );
    }

}
