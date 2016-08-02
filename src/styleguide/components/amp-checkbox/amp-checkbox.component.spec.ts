import {
    it ,
    injectAsync ,
    describe ,
    beforeEachProviders ,
    expect
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , provide , ElementRef } from '@angular/core';
import { Control } from '@angular/common';
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
import { MockScrollService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-scroll.service';
import { MockFormModelService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-form-mode.service';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe( 'amp-checkbox component' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : MockElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    @Component( {
        template   : `
            <form  #formModel='ngForm' class='nl-form' >
               <amp-checkbox
                        [isInSummaryState]='isInSummaryState'
                        [parentControl]='control'
                        [required]='checkbox.required'
                        [checked]='checkbox.checked'
                        [disabled]='checkbox.disabled'
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
                <button id='toggleRequired' (click)='checkbox.required=!checkbox.required'>Toggle Required</button>
            </form>
        ` ,
        directives : [ AmpCheckboxComponent ]
    } )
    class AmpCheckboxTest {
        control : Control = new Control();
        isInSummaryState  = false;
        clickedOnTheCheckbox;
        private checkbox  = {
            id          : 'anId' ,
            disabled    : false ,
            required    : true ,
            checked     : false ,
            scrollOutOn : null
        };

        private onAcknowledgeSelect ( value ) {
            this.clickedOnTheCheckbox = value;
        }
    }
    it( 'Should contain 1 checkbox input field with proper data-automation-id and name attributes ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
                    let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
                    let Labels          = Element.querySelector( 'label' );
                    fixture.detectChanges();
                    expect( Checkbox ).toBeDefined();
                    expect( Checkbox.name ).toBe( Component.checkbox.id );
                    expect( Checkbox.id ).toBe( Component.checkbox.id );
                    expect( Checkbox.getAttribute( 'data-automation-id' ) ).toBe( 'checkbox_' + Component.checkbox.id );
                } );
        } )
    );
    it( 'Should be required initially when required attr has set to true and the control should be invalid ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
                    let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
                    let Labels          = Element.querySelector( 'label' );
                    fixture.detectChanges();
                    expect( Component.checkbox.required ).toBeTruthy();
                    expect( Component.control.valid ).toBeFalsy();
                    expect( Component.control.errors ).not.toBeNull();
                    expect( Component.control.errors.checkboxrequired ).toBeDefined();
                    expect( Component.control.errors.checkboxrequired ).toBeTruthy();
                } );
        } )
    );
    it( 'Should have the control with validity as true ,  after setting the required attr to false ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
                    let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
                    let Labels          = Element.querySelector( 'label' );
                    fixture.detectChanges();
                    expect( Component.checkbox.required ).toBeTruthy();
                    expect( Component.control.valid ).toBeFalsy();
                    expect( Component.control.errors ).not.toBeNull();
                    expect( Component.control.errors.checkboxrequired ).toBeDefined();
                    expect( Component.control.errors.checkboxrequired ).toBeTruthy();
                    let ToggleRequired = Element.querySelector( '#toggleRequired' );
                    ToggleRequired.click();
                    fixture.detectChanges();
                    expect( Component.checkbox.required ).toBeFalsy();
                    expect( Component.control.valid ).toBeTruthy();
                    expect( Component.control.errors ).toBeNull();
                } );
        } )
    );
    it( 'Should be checked initially if the checked attr has set to true' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
                    let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
                    let Labels          = Element.querySelector( 'label' );
                    fixture.detectChanges();
                    expect( Component.checkbox.checked ).toBeFalsy();
                    expect( Component.control.valid ).toBeFalsy();
                    expect( Component.control.errors.checkboxrequired ).toBeDefined();
                    expect( Component.control.errors.checkboxrequired ).toBeTruthy();
                    // Let's change the checked to true
                    let ToggleChecked = Element.querySelector( '#toggleChecked' );
                    ToggleChecked.click();
                    fixture.detectChanges();
                    expect( Component.checkbox.checked ).toBeTruthy();
                    expect( Component.control.valid ).toBeTruthy();
                    expect( Component.control.errors ).toBeNull();
                } );
        } )
    );
    it( 'Should be in summary mode if isInSummaryState is set to true ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
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
        } )
    );
    it( 'Should emit a select event to the parent component after clicking on the checkbox ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
                    let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
                    let Label           = Element.querySelector( 'label' );
                    let ContainerElem   = Element.querySelector( '.container' );
                    expect( Component.clickedOnTheCheckbox ).toBeUndefined();
                    Label.click();
                    fixture.detectChanges();
                    expect( Component.clickedOnTheCheckbox ).toBeTruthy();
                } );
        } )
    );
    it( 'Should update the control value to true after clicking on the checkbox ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpCheckboxTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element         = fixture.nativeElement;
                    let AmpCheckboxTest = fixture.debugElement;
                    let Component       = AmpCheckboxTest.componentInstance;
                    let Checkbox        = Element.querySelector( 'input[type="checkbox"]' );
                    let Label           = Element.querySelector( 'label' );
                    let ContainerElem   = Element.querySelector( '.container' );
                    expect( Component.control.value ).toBeFalsy();
                    Label.click();
                    fixture.detectChanges();
                    expect( Component.clickedOnTheCheckbox ).toBeTruthy();
                    expect( Component.control.value ).toBeTruthy();
                } );
        } )
    );
} );

