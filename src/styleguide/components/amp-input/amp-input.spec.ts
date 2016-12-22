import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , ElementRef , ViewChild } from '@angular/core';
import { FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';

// Load the implementations that should be tested
describe( 'amp-input component' , () => {

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

    describe( 'correct attributes should be set' , () => {

        it( 'should contain a label element with name as value and firstname as for attribute' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let Component             = fixture.componentInstance;
            let compiledLabel         = compiledTestComponent.query( By.css( '.first-name label' ) );
            expect( compiledLabel.name ).toBe( 'label' );
            expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Name' );
            expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( Component.firstNameCmp.randomizedId );
        } );

        it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let Component             = fixture.componentInstance;
            let compiledInput         = compiledTestComponent.query( By.css( '.first-name input' ) );
            expect( compiledInput.nativeElement.name ).toBe( Component.firstNameCmp.randomizedId );
            expect( compiledInput.nativeElement.id ).toBe( Component.firstNameCmp.randomizedId );
            expect( compiledInput.nativeElement.type ).toBe( 'text' );
            expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text' + '_' + Component.firstNameCmp.randomizedId );
        } );
    } );

    describe( '"valDate" attribute should correctly validate date data' , () => {

        it( 'should be invalid if not invalid date and "valDate" property is set' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let compiledInput         = compiledTestComponent.query( By.css( '.date-validator input' ) );
            const dateValControl      = compiledTestComponent.componentInstance.firstnameControl.controls[ 'date-val' ];
            dateValControl.setValue( '01011980' );
            expect( dateValControl._status ).toBe( 'INVALID' );
        } );

        it( 'should be valid if valid date and "valDate" property is set' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let compiledInput         = compiledTestComponent.query( By.css( '.date-validator input' ) );
            const dateValControl      = compiledTestComponent.componentInstance.firstnameControl.controls[ 'date-val' ];
            dateValControl.setValue( '01/01/1980' );
            expect( dateValControl._status ).toBe( 'VALID' );
        } );
    } );

    describe( 'Min and Max age validation' , () => {

        it( 'should be invalid if age entered from d.o.b is less than 18 years old' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let compiledInput         = compiledTestComponent.query( By.css( '.age-validator input' ) );
            const dateValControl      = compiledTestComponent.componentInstance.ageControl.controls[ 'age-val' ];
            dateValControl.setValue( '01/01/2016' );
            expect( dateValControl._status ).toBe( 'INVALID' );
        } );

        it( 'should be invalid if age entered from d.o.b is greater than 100 years old' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let compiledInput         = compiledTestComponent.query( By.css( '.age-validator input' ) );
            const dateValControl      = compiledTestComponent.componentInstance.ageControl.controls[ 'age-val' ];
            dateValControl.setValue( '01/01/1900' );
            expect( dateValControl._status ).toBe( 'INVALID' );
        } );

        it( 'should be valid if age entered from d.o.b is between 18 and 100 years old' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let compiledInput         = compiledTestComponent.query( By.css( '.age-validator input' ) );
            const dateValControl      = compiledTestComponent.componentInstance.ageControl.controls[ 'age-val' ];
            dateValControl.setValue( '01/01/1970' );
            expect( dateValControl._status ).toBe( 'VALID' );
        } );
    } );
} );

class MockElementRef implements ElementRef {
    nativeElement = {};
}

// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <div class="first-name">
            <amp-input
                #firstNameCmp
                [id]="'firstname'"
                [label]="'Name'"
                [controlGroup]='firstnameControl'
                [required]='true'
                pattern='^([A-Za-z ])*$'
                maxLength='50'>blah</amp-input>
        </div>
        <div class="date-validator">
            <amp-input
                #nameCmp
                [id]="'date-val'"
                [label]="'Name'"
                [controlGroup]='firstnameControl'
                [required]='true'
                [valDate]='true'
                maxLength='50'>blah</amp-input>
        </div>
        <div class="age-validator">
            <amp-input
                [id]="'age-val'"
                [label]="'Date of birth'"
                [controlGroup]='ageControl'
                [required]='true'
                [valDate]='true'
                [minAge]='18'
                [maxAge]='100'>
            </amp-input>
        </div>
    </form>
    `
} )
class TestComponent {
    @ViewChild( 'firstNameCmp' ) firstNameCmp;
    @ViewChild( 'nameCmp' ) nameCmp;
    firstnameControl : FormGroup = new FormGroup( {} );
    ageControl : FormGroup = new FormGroup( {} );
}
