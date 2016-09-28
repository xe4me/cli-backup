import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
// Load the implementations that should be tested
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
describe( 'amp-input directive' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpInputsModule ] ,
            declarations : [
                TestComponent
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'should contain a label element with name as value and firstname as for attribute' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledLabel         = compiledTestComponent.query( By.css( 'label' ) );
        expect( compiledLabel.name ).toBe( 'label' );
        expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Name' );
        expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( 'firstname-input' );
    } );
    it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        expect( compiledInput.nativeElement.name ).toBe( 'firstname' );
        expect( compiledInput.nativeElement.id ).toBe( 'firstname-input' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text_firstname' );
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <amp-input
            [id]="'firstname'"
            [label]="'Name'"
            [controlGroup]='firstnameControl'
            [required]='true'
            pattern='^([A-Za-z ])*$'
            maxLength='50'>blah</amp-input>
    </form>
    `
} )
class TestComponent {
    firstnameControl : FormGroup = new FormGroup( {} );
}
