import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { AmpTextareaComponent } from '../../../app/components/amp-textarea/amp-textarea.component';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from "../../../app/services/form-model/form-model.service";
import { ScrollService } from "../../../app/services/scroll/scroll.service";
import { ProgressObserverService } from "../../../app/services/progress-observer/progress-observer.service";
class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-textarea component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule ] ,
            declarations : [
                AmpTextareaComponent ,
                AmpTextAreaTest
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
    it( 'Should contain 1 textarea input field with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpTextAreaTest> = TestBed.createComponent( AmpTextAreaTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        // TODO: This variable should be renamed so that it is not the same as the test Class above (AmpTextAreaTest)
        let ampTextAreaTest = fixture.debugElement;
        let Component       = ampTextAreaTest.componentInstance;
        let Textareas       = Element.querySelector( 'textarea' );
        let Labels          = Element.querySelector( 'label' );
        expect( Textareas ).toBeDefined();
        expect( Textareas.name ).toBe( Component.textarea.id );
        expect( Textareas.id ).toBe( Component.textarea.id );
        expect( Textareas.getAttribute( 'data-automation-id' ) ).toBe( 'textarea_' + Component.textarea.id );
    } );
    it( 'Should contain a label with for attribute pointed to the id' , () => {
        let fixture : ComponentFixture<AmpTextAreaTest> = TestBed.createComponent( AmpTextAreaTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampTextAreaTest = fixture.debugElement;
        let Component       = ampTextAreaTest.componentInstance;
        let Textareas       = Element.querySelector( 'textarea' );
        let Labels          = Element.querySelector( 'label' );
        expect( Labels.getAttribute( 'for' ) ).toBe( Textareas.id );
    } );
    it( 'Should not show the character count if the maxLength is not provided or if it\'s 0' , () => {
        let fixture : ComponentFixture<AmpTextAreaTest> = TestBed.createComponent( AmpTextAreaTest );
        fixture.detectChanges();
        let Element               = fixture.nativeElement;
        let ampTextAreaTest       = fixture.debugElement;
        let Component             = ampTextAreaTest.componentInstance;
        let Textareas             = Element.querySelector( 'textarea' );
        let Labels                = Element.querySelector( 'label' );
        let CharacterCountElement = Element.querySelector( '.char-left' );
        expect( CharacterCountElement ).toBeDefined();
        Component.textarea.maxLenght = 0;
        fixture.detectChanges();
        let CharacterCountElementAfter = Element.querySelector( '.char-left' );
        expect( CharacterCountElementAfter ).toBeNull();
    } );
} );
@Component( {
    template   : `
        <form  #formModel='ngForm' class='nl-form' >
            <amp-textarea
            [isInSummaryState]='textarea.isInSummaryState'
            [label]='textarea.label'
            [id]='textarea.id'
            [controlGroup]='controlGroup'
            [maxLength]='textarea.maxLenght'>
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
        id               : 'textarea' ,
        label            : 'A Label' ,
        maxLenght        : 5 ,
        isInSummaryState : false
    };
    controlGroup     = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ 'textarea' ];
    }

    private toggleIsInSummaryState () {
        this.textarea.isInSummaryState = ! this.textarea.isInSummaryState;
    }
}
