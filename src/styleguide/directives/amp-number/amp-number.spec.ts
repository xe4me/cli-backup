import {
    async ,
    TestBed
} from '@angular/core/testing';
import { Component , ChangeDetectionStrategy } from '@angular/core';
import { FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
import { AmpDirectivesModule } from '../../../app/modules/amp-directives/amp-directives.module';
describe( 'amp-number-only directive' , () => {
    let _fixture : any;
    let _debugElement : any;
    let _inputElement : any;
    let _inputEvent : Event;

    function updateInputText ( text : string ) {
        _inputElement.value = text;
        _inputElement.dispatchEvent( _inputEvent );
        _fixture.detectChanges();
    }

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpInputsModule, AmpDirectivesModule ] ,
            declarations : [
                TestComponent
            ] ,
            providers    : [
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ]
        } );
        _fixture      = TestBed.createComponent( TestComponent );
        _debugElement = _fixture.debugElement;
        _fixture.detectChanges();
        _inputElement = _debugElement.query( By.css( 'input' ) ).nativeElement;
        _inputEvent   = document.createEvent( 'Event' );
        _inputEvent.initEvent( 'input' , true , false );
    } ) );
    it( 'Input element should exist' , () => {
        expect( _inputElement ).toBeDefined();
    } );
    it( 'Input element should allow numeric values' , () => {
        updateInputText( '65433' );
        expect( _inputElement.value ).toEqual( '65433' );
    } );
    it( 'Input element should not allow non-numeric values' , () => {
        updateInputText( 'abcd--++%$' );
        expect( _inputElement.value ).toEqual( '' );
    } );
    it( 'Input element should only strip non-numeric characters leaving the numeric characters' , () => {
        updateInputText( '123abc87*&' );
        expect( _inputElement.value ).toEqual( '12387' );
    } );
} );
@Component( {
    template        : `
    <form  #formModel='ngForm' class='nl-form'>
        <amp-input
            [id]='__custom.controls[0].id'
            [label]='__custom.controls[0].label'
            [controlGroup]='__controlGroup'
            amp-number-only
            [required]='__custom.controls[0].required'
            [maxLength]='__custom.controls[0].maxLength'>
        </amp-input>
    </form>
    ` ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
class TestComponent {
    public __controlGroup : FormGroup = new FormGroup( {} );
    public __custom : any             = {
        controls : [
            {
                id        : 'number' ,
                label     : 'Number' ,
                required  : true ,
                maxLength : '10'
            }
        ]
    };
}
