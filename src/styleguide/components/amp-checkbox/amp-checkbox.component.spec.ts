import {
    async,
    ComponentFixture,
    TestBed,
    ComponentFixtureAutoDetect
} from '@angular/core/testing';
import {
    Component,
    ViewChild
} from '@angular/core';
import { ScrollService } from '../../../app/services';
import { MockScrollService } from '../../services/mock-scroll.service';
import { FormGroup } from '@angular/forms';
import { AmpCheckboxModule } from '../../../app/modules/amp-checkbox';

describe( 'amp-checkbox component', () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ AmpCheckboxModule ],
            declarations : [
                AmpCheckboxTest
            ],
            providers    : [
                { provide    : ScrollService,
                    useClass : MockScrollService
                },
                { provide    : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Should contain 1 checkbox input field with proper data-automation-id and name attributes ', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        expect( Checkbox ).toBeDefined();
        expect( Checkbox.name ).toBe( Component.checkboxCmp.randomizedId );
        expect( Checkbox.id ).toBe( Component.checkboxCmp.randomizedId );
        expect( Checkbox.getAttribute( 'data-automation-id' ) ).toBe( 'checkbox_' + Component.checkboxCmp.randomizedId );
    } );
    it( 'Should be required initially when required attr has set to true and the control should be invalid ', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        expect( Component.checkbox.required ).toBe( true );
        expect( Component.control.valid ).toBe( false );
        expect( Component.control.errors ).not.toBeNull();
        expect( Component.control.errors.required ).toBeDefined();
        expect( Component.control.errors.required ).toEqual( Component.checkbox.errors.required );
    } );
    it( 'Should have the control with validity as true ,  after setting the required attr to false ', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        fixture.detectChanges();
        expect( Component.checkbox.required ).toBe( true );
        expect( Component.control.valid ).toBe( false );
        expect( Component.control.errors ).not.toBeNull();
        expect( Component.control.errors.required ).toBeDefined();
        expect( Component.control.errors.required ).toEqual( Component.checkbox.errors.required );
        let ToggleRequired = Element.querySelector( '#toggleRequired' );
        ToggleRequired.click();
        fixture.detectChanges();
        expect( Component.control.valid ).toBe( true );
        expect( Component.control.errors ).toBeNull();
    } );
    it( 'Should be checked initially if the checked attr has set to true', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        fixture.detectChanges();
        expect( Component.checkbox.checked ).toBe( false );
        expect( Component.control.valid ).toBe( false );
        expect( Component.control.errors.required ).toBeDefined();
        expect( Component.control.errors.required ).toEqual( Component.checkbox.errors.required );
        // Let's change the checked to true
        let ToggleChecked = Element.querySelector( '#toggleChecked' );
        ToggleChecked.click();
        fixture.detectChanges();
        expect( Component.checkbox.checked ).toBe( true );
        expect( Component.control.valid ).toBe( true );
        expect( Component.control.errors ).toBeNull();
    } );
    it( 'Should be in summary mode if isInSummaryState is set to true ', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        let ContainerElem   = Element.querySelector( '.container' );
        expect( (' ' + ContainerElem.className + ' ').indexOf( ' hidden ' ) ).toBe( -1 );
        expect( Component.isInSummaryState ).toBe( false );
        // Let's change the checked to true
        let ToggleSummary = Element.querySelector( '#toggleSummary' );
        ToggleSummary.click();
        fixture.detectChanges();
        /// Let's check again
        expect( Component.isInSummaryState ).toBe( true );
    } );
    it( 'Should emit a select event to the parent component after clicking on the checkbox ', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Label           = Element.querySelector( 'label' );
        let ContainerElem   = Element.querySelector( '.container' );
        expect( Component.checkboxEmittedValue ).toBeUndefined();
        Label.click();
        fixture.detectChanges();
        expect( Component.checkboxEmittedValue ).toBe( true );
    } );
    it( 'Should update the control value to true after clicking on the checkbox ', () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Label           = Element.querySelector( 'label' );
        let ContainerElem   = Element.querySelector( '.container' );
        expect( Component.control.value ).toBe( false );
        Label.click();
        fixture.detectChanges();
        expect( Component.checkboxEmittedValue ).toBe( true );
        expect( Component.control.value ).toBe( true );
    } );
} );
@Component( {
    template : `
            <amp-checkbox
                    #checkboxCmp
                    [isInSummaryState]="isInSummaryState"
                    [controlGroup]="controlGroup"
                    [required]="checkbox.required"
                    [checked]="checkbox.checked"
                    [disabled]="checkbox.disabled"
                    [errors]="checkbox.errors"
                    [scrollOutOn]="checkbox.scrollOutOn"
                    [id]="checkbox.id"
                    (change)="onAcknowledgeSelect($event)">
                <div class="heading heading-contxtual-label">
                    I agree to advertising my practice"s register internally, and for to seek out
                    practices that
                    may be interested in becoming the servicing practice for some or all of the register.
                </div>
            </amp-checkbox>
            <!-- End copy at here -->
            <button id="toggleSummary" type="button" (click)="isInSummaryState=!isInSummaryState">Toggle Summary</button>
            <button id="toggleChecked" type="button" (click)="checkbox.checked=!checkbox.checked">Toggle Checked</button>
            <button id="toggleDisabled" type="button" (click)="checkbox.disabled=!checkbox.disabled">Toggle Disabled</button>
            <button id="toggleRequired" type="button" (click)="checkbox.required=false">Toggle Required</button>
    `
} )
class AmpCheckboxTest {
    @ViewChild( 'checkboxCmp' ) checkboxCmp;
                                controlGroup : FormGroup = new FormGroup( {} );

    isInSummaryState = false;
    checkboxEmittedValue;
    checkbox         = {
        id          : 'anId',
        disabled    : false,
        errors      : {
            required : {
                text : 'Checkbox field is required'
            }
        },
        required    : true,
        checked     : false,
        scrollOutOn : null
    };

    get control () {
        return this.controlGroup.get( 'anId' );
    }

    onAcknowledgeSelect ( $event ) {
        this.checkboxEmittedValue = $event.target.checked;
    }
}
