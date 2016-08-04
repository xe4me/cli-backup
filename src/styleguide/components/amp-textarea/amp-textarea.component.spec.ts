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
import { AmpTextareaComponent } from '../../../app/components/amp-textarea/amp-textarea.component';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe( 'amp-textarea component' , () => {
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
               <amp-textarea
                [isInSummaryState]='textarea.isInSummaryState'
                [label]='textarea.label'
                [id]='textarea.id'
                [parentControl]='textarea.control'
                [valMaxLength]='textarea.maxLenght'>
                </amp-textarea>
                <!-- End copy at here -->
                <br><br>
                <button (click)='toggleIsInSummaryState()'>Toggle summary
                mode</button>
            </form>
        ` ,
        directives : [ AmpTextareaComponent ]
    } )
    class AmpTextAreaTest {
        isInSummaryState = false;
        private textarea = {
            id               : 'a-text-area' ,
            label            : 'A Label' ,
            maxLenght        : 5 ,
            isInSummaryState : false ,
            control          : new Control()
        };

        private toggleIsInSummaryState () {
            this.textarea.isInSummaryState = ! this.textarea.isInSummaryState;
        }
    }
    it( 'Should contain 1 textarea input field with proper data-automation-id and name attributes ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpTextAreaTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element         = fixture.nativeElement;
                    let AmpTextAreaTest = fixture.debugElement;
                    let Component       = AmpTextAreaTest.componentInstance;
                    let Textareas       = Element.querySelector( 'textarea' );
                    let Labels          = Element.querySelector( 'label' );
                    expect( Textareas ).toBeDefined();
                    expect( Textareas.name ).toBe( Component.textarea.id );
                    expect( Textareas.id ).toBe( Component.textarea.id );
                    expect( Textareas.getAttribute( 'data-automation-id' ) ).toBe( 'textarea_' + Component.textarea.id );
                } );
        } )
    );
    it( 'Should contain a label with for attribute pointed to the id' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpTextAreaTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element         = fixture.nativeElement;
                    let AmpTextAreaTest = fixture.debugElement;
                    let Component       = AmpTextAreaTest.componentInstance;
                    let Textareas       = Element.querySelector( 'textarea' );
                    let Labels          = Element.querySelector( 'label' );
                    expect( Labels.getAttribute( 'for' ) ).toBe( Textareas.id );
                } );
        } )
    );
    it( 'Should assign an "error" class to character count element if the maxLength and value.length are equal' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpTextAreaTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element               = fixture.nativeElement;
                    let AmpTextAreaTest       = fixture.debugElement;
                    let Component             = AmpTextAreaTest.componentInstance;
                    let Textareas             = Element.querySelector( 'textarea' );
                    let Labels                = Element.querySelector( 'label' );
                    let CharacterCountElement = Element.querySelector( '.char-left' );
                    expect( CharacterCountElement.className.trim() ).toBe( 'char-left' );
                    expect( (' ' + CharacterCountElement.className + ' ').indexOf( ' error ' ) ).not.toBeGreaterThan( - 1 );
                    Component.textarea.control.updateValue( '12345' );
                    fixture.detectChanges();
                    expect( Textareas.value ).toBe( '12345' );
                    expect( (' ' + CharacterCountElement.className + ' ').indexOf( ' error ' ) ).toBeGreaterThan( - 1 );
                    Component.textarea.control.updateValue( '' );
                    fixture.detectChanges();
                    expect( (' ' + CharacterCountElement.className + ' ').indexOf( ' error ' ) ).not.toBeGreaterThan( - 1 );
                } );
        } )
    );
    it( 'Should not show the character count if the maxLength is not provided or if it\'s 0' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpTextAreaTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    let Element               = fixture.nativeElement;
                    let AmpTextAreaTest       = fixture.debugElement;
                    let Component             = AmpTextAreaTest.componentInstance;
                    let Textareas             = Element.querySelector( 'textarea' );
                    let Labels                = Element.querySelector( 'label' );
                    let CharacterCountElement = Element.querySelector( '.char-left' );
                    expect( CharacterCountElement ).toBeDefined();
                    Component.textarea.maxLenght = 0;
                    fixture.detectChanges();
                    let CharacterCountElementAfter = Element.querySelector( '.char-left' );
                    expect( CharacterCountElementAfter ).toBeNull();
                } );
        } )
    );
} );

