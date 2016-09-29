import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpCheckboxModule , AmpCheckboxComponent } from '../../../app/modules/amp-checkbox';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-checkbox component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpCheckboxModule ] ,
            declarations : [
                AmpCheckboxTest
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
    it( 'Should contain 1 checkbox input field with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        expect( Checkbox ).toBeDefined();
        expect( Checkbox.name ).toBe( Component.checkbox.id );
        expect( Checkbox.id ).toBe( Component.checkbox.id );
        expect( Checkbox.getAttribute( 'data-automation-id' ) ).toBe( 'checkbox_' + Component.checkbox.id );
    } );
    it( 'Should be required initially when required attr has set to true and the control should be invalid ' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        expect( Component.checkbox.required ).toBeTruthy();
        expect( Component.control.valid ).toBeFalsy();
        expect( Component.control.errors ).not.toBeNull();
        expect( Component.control.errors.required ).toBeDefined();
        expect( Component.control.errors.required.toString() ).toEqual( Component.checkbox.errors.required.toString() );
    } );
    it( 'Should have the control with validity as true ,  after setting the required attr to false ' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        fixture.detectChanges();
        expect( Component.checkbox.required ).toBeTruthy();
        expect( Component.control.valid ).toBeFalsy();
        expect( Component.control.errors ).not.toBeNull();
        expect( Component.control.errors.required ).toBeDefined();
        expect( Component.control.errors.required.toString() ).toEqual( Component.checkbox.errors.required.toString() );
        let ToggleRequired = Element.querySelector( '#toggleRequired' );
        ToggleRequired.click();
        fixture.detectChanges();
        expect( Component.control.valid ).toBeTruthy();
        expect( Component.control.errors ).toBeNull();
    } );
    it( 'Should be checked initially if the checked attr has set to true' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        fixture.detectChanges();
        expect( Component.checkbox.checked ).toBeFalsy();
        expect( Component.control.valid ).toBeFalsy();
        expect( Component.control.errors.required ).toBeDefined();
        expect( Component.control.errors.required.toString() ).toEqual( Component.checkbox.errors.required.toString() );
        // Let's change the checked to true
        let ToggleChecked = Element.querySelector( '#toggleChecked' );
        ToggleChecked.click();
        fixture.detectChanges();
        expect( Component.checkbox.checked ).toBeTruthy();
        expect( Component.control.valid ).toBeTruthy();
        expect( Component.control.errors ).toBeNull();
    } );
    it( 'Should be in summary mode if isInSummaryState is set to true ' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Labels          = Element.querySelector( 'label' );
        let ContainerElem   = Element.querySelector( '.container' );
        expect( (' ' + ContainerElem.className + ' ').indexOf( ' hidden ' ) ).toBe( - 1 );
        expect( Component.isInSummaryState ).toBeFalsy();
        // Let's change the checked to true
        let ToggleSummary = Element.querySelector( '#toggleSummary' );
        ToggleSummary.click();
        fixture.detectChanges();
        /// Let's check again
        expect( Component.isInSummaryState ).toBeTruthy();
        expect( (' ' + ContainerElem.className + ' ').indexOf( ' hidden ' ) ).toBeGreaterThan( - 1 );
    } );
    it( 'Should emit a select event to the parent component after clicking on the checkbox ' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Label           = Element.querySelector( 'label' );
        let ContainerElem   = Element.querySelector( '.container' );
        expect( Component.clickedOnTheCheckbox ).toBeUndefined();
        Label.click();
        fixture.detectChanges();
        expect( Component.clickedOnTheCheckbox ).toBeTruthy();
    } );
    it( 'Should update the control value to true after clicking on the checkbox ' , () => {
        let fixture : ComponentFixture<AmpCheckboxTest> = TestBed.createComponent( AmpCheckboxTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampCheckboxTest = fixture.debugElement;
        let Component       = ampCheckboxTest.componentInstance;
        let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
        let Label           = Element.querySelector( 'label' );
        let ContainerElem   = Element.querySelector( '.container' );
        expect( Component.control.value ).toBeFalsy();
        Label.click();
        fixture.detectChanges();
        expect( Component.clickedOnTheCheckbox ).toBeTruthy();
        expect( Component.control.value ).toBeTruthy();
    } );
} );
@Component( {
    template : `
        <form  #formModel class='nl-form' >
            <amp-checkbox
                    [isInSummaryState]='isInSummaryState'
                    [controlGroup]='controlGroup'
                    [required]='checkbox.required'
                    [checked]='checkbox.checked'
                    [disabled]='checkbox.disabled'
                    [errors]='checkbox.errors'
                    [scrollOutOn]='checkbox.scrollOutOn'
                    [id]='checkbox.id'
                    (select)='onAcknowledgeSelect($event)'>
                <div class='heading heading-contxtual-label'>
                    I agree to advertising my practice's register internally, and for to seek out
                    practices that
                    may be interested in becoming the servicing practice for some or all of the register.
                </div>
            </amp-checkbox>
            <!-- End copy at here -->
            <button id='toggleSummary' (click)='isInSummaryState=!isInSummaryState'>Toggle Summary</button>
            <button id='toggleChecked' (click)='checkbox.checked=!checkbox.checked'>Toggle Checked</button>
            <button id='toggleDisabled' (click)='checkbox.disabled=!checkbox.disabled'>Toggle Disabled</button>
            <button id='toggleRequired' (click)='checkbox.required=false'>Toggle Required</button>
        </form>
    `
} )
class AmpCheckboxTest {
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ 'anId' ];
    }

    isInSummaryState = false;
    clickedOnTheCheckbox;
    private checkbox = {
        id          : 'anId' ,
        disabled    : false ,
        errors      : {
            required : {
                text : 'Checkbox field is required'
            }
        } ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    private onAcknowledgeSelect ( value ) {
        this.clickedOnTheCheckbox = value;
    }
}
