import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    ViewChild
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';

// Load the implementations that should be tested
describe( 'amp-input component', () => {
    let fixture : ComponentFixture<TestComponent>;
    let compiledTestComponent;
    let Component;
    let dateCmp;
    let ageCmp;
    let firstNameCmp;
    let dateInputElement;
    let inputEvent;

    function updateInputText( text : any, _inputElement ) {
        _inputElement.value = text;
        _inputElement.dispatchEvent( inputEvent );
        fixture.detectChanges();
    }

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, ReactiveFormsModule, AmpInputsModule ],
            declarations : [
                TestComponent
            ],
            providers    : [
                { provide : ComponentFixtureAutoDetect, useValue : true }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( () => {
        fixture = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        compiledTestComponent = fixture.debugElement;
        Component             = fixture.componentInstance;
        dateCmp               = Component.dateCmp;
        ageCmp               = Component.ageCmp;
        firstNameCmp          = Component.firstNameCmp;
        dateInputElement      = compiledTestComponent.query( By.css( 'input#date-val' ) ).nativeElement;
        inputEvent            = document.createEvent( 'Event' );
        inputEvent.initEvent( 'input', true, false );
    } );
    describe( 'correct attributes should be set', () => {
        it( 'should contain a label element with name as value and firstname as for attribute', () => {
            let compiledLabel = compiledTestComponent.query( By.css( '.first-name label' ) );
            expect( compiledLabel.name ).toBe( 'label' );
            expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Name' );
            expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( firstNameCmp.randomizedId );
        } );

        it( 'should contain an input text element with the correct name, id and data-automation-id attribute', () => {
            let compiledInput = compiledTestComponent.query( By.css( '.first-name input' ) );
            expect( compiledInput.nativeElement.name ).toBe( firstNameCmp.randomizedId );
            expect( compiledInput.nativeElement.id ).toBe( firstNameCmp.randomizedId );
            expect( compiledInput.nativeElement.type ).toBe( 'text' );
            expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text' + '_' + firstNameCmp.randomizedId );
        } );
    } );

    describe( '"valDate" attribute should correctly validate date data', () => {

        it( 'should be invalid if not invalid date and "valDate" property is set', () => {
            const dateValControl = Component.dateCmp.control;
            dateValControl.setValue( '01011980' );
            expect( dateValControl.valid ).toBe( false );
        } );

        it( 'should be valid if valid date and "valDate" property is set', () => {
            const dateValControl = Component.dateCmp.control;
            dateValControl.setValue( '01/01/1980' );
            expect( dateValControl.valid ).toBe( true );
        } );
    } );

    describe( 'Min and Max age validation', () => {

        it( 'should be invalid if age entered from d.o.b is less than 18 years old', () => {

            const dateValControl = Component.ageCmp.control;
            dateValControl.setValue( '01/01/2016' );
            expect( dateValControl.valid ).toBe( false );
        } );

        it( 'should be invalid if age entered from d.o.b is greater than 100 years old', () => {
            const dateValControl = Component.ageCmp.control;
            dateValControl.setValue( '01/01/1900' );
            expect( dateValControl.valid ).toBe( false );
        } );

        it( 'should be valid if age entered from d.o.b is between 18 and 100 years old', () => {
            const dateValControl = Component.ageCmp.control;
            dateValControl.setValue( '01/01/1970' );
            expect( dateValControl.valid ).toBe( true );
        } );
    } );
    describe( 'on blur', () => {
        it( 'should trim the value if the value is empty space', () => {
            let value = '    ';
            updateInputText( value, dateInputElement );
            expect( dateCmp.control.value ).toBe( value );
            dateCmp.onBlured( null );
            expect( dateCmp.control.value ).toBe( '' );
        } );
        it( 'should trim the value if the value has numbers and spaces', () => {
            let value = '124234 ';
            updateInputText( value, dateInputElement );
            expect( dateCmp.control.value ).toBe( value );
            dateCmp.onBlured( null );
            expect( dateCmp.control.value ).toBe( value.trim() );
        } );
        it( 'should NOT trim the value if the value is only numbers', () => {
            let value = 124234;
            dateCmp.control.setValue( value );
            expect( dateCmp.control.value ).toBe( value );
            dateCmp.onBlured( null );
            expect( dateCmp.control.value ).toBe( value );
        } );
        it( 'should NOT trim the value the noTrim is set to true', () => {
            Component.noTrim = true;
            let value        = '124234 ';
            updateInputText( value, dateInputElement );
            expect( dateCmp.control.value ).toBe( value );
            dateCmp.onBlured( null );
            expect( dateCmp.control.value ).toBe( value );
        } );
    } );
    describe( 'with defaultValue ', () => {
        it( 'should populate the input if default value is set and control.value is empty', () => {
            let value              = 'milad';
            Component.defaultValue = value;
            fixture.detectChanges();
            expect( dateCmp.control.value ).toBe( value );
        } );
        it( 'should NOT populate the input if default value is set and control.value is NOT empty', () => {
            let retrievedValue = 'retrieved value';
            dateCmp.control.setValue( retrievedValue );
            let value              = 'milad';
            Component.defaultValue = value;
            fixture.detectChanges();
            expect( dateCmp.control.value ).toBe( retrievedValue );
        } );
    } );
} );

// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <div class="first-name">
            <amp-input
                #firstNameCmp
                [id]="'firstname'"
                [label]="'Name'"
                [controlGroup]='controlGroup'
                [required]='true'
                pattern='^([A-Za-z ])*$'
                maxLength='50'>blah</amp-input>
        </div>
        <div class="date-validator">
            <amp-input
                #dateCmp
                [id]="'date-val'"
                [label]="'Name'"
                [noTrim]="noTrim"
                [defaultValue]="defaultValue"
                [controlGroup]='controlGroup'
                [required]='true'
                [valDate]='true'
                maxLength='50'>blah</amp-input>
        </div>
        <div class="age-validator">
            <amp-input
                #ageCmp
                [id]="'age-val'"
                [label]="'Date of birth'"
                [controlGroup]='controlGroup'
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
    @ViewChild( 'ageCmp' ) ageCmp;
    @ViewChild( 'dateCmp' ) dateCmp;
    public controlGroup : FormGroup = new FormGroup( {} );
    public noTrim : boolean         = false;
    public defaultValue : string;

    constructor() {
        ( <any> this.controlGroup ).__fdn = [];
    }
}
