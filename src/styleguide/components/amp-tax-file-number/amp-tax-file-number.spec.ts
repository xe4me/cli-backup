import {
    async,
    ComponentFixtureAutoDetect,
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
import { AmpInputsModule } from '../../../app/modules/amp-inputs/amp-inputs.module';
import { By } from '@angular/platform-browser';

describe( 'amp-tax-file-number component', () => {
    let _fixture : any;
    let _debugElement : any;
    let _inputElement : any;
    let _ampTFNTest : any;
    let _ampTFNTestCmp;
    let _inputEvent : Event;

    function updateInputText ( text : string ) {
        _inputElement.value = text;
        _inputElement.dispatchEvent( _inputEvent );
        _fixture.detectChanges();
    }

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, ReactiveFormsModule, AmpInputsModule ],
            declarations : [
                AmpTFNTest
            ],
            providers    : [
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ]
        } );
        _fixture       = TestBed.createComponent( AmpTFNTest );
        _ampTFNTest    = _fixture.debugElement;
        _ampTFNTestCmp = _ampTFNTest.componentInstance;
        _debugElement  = _fixture.debugElement;
        _fixture.detectChanges();
        _inputElement = _debugElement.query( By.css( 'input' ) ).nativeElement;
        _inputEvent   = document.createEvent( 'Event' );
        _inputEvent.initEvent( 'input', true, false );
    } ) );
    it( 'Should contain 1 tax-file-number input field with proper data-automation-id and name attributes ', () => {
        let Element  = _fixture.nativeElement;
        let TFNInput = Element.querySelector( 'input[type="text"]' );
        expect( TFNInput ).toBeDefined();
        expect( TFNInput.name ).toBe( _ampTFNTestCmp.tfnCmp.randomizedId );
        expect( TFNInput.id ).toBe( _ampTFNTestCmp.tfnCmp.randomizedId );
        expect( TFNInput.getAttribute( 'data-automation-id' ) ).toBe( 'text_' + _ampTFNTestCmp.tfnCmp.randomizedId );
    } );
    it( 'Should display an error when an INVALID tax-file-number is entered', () => {
        const expectedError = { checkDigitValidation : { text : 'You have entered an invalid tax file number.' } };
        _ampTFNTestCmp.control.setValue( '123654789' );
        _fixture.detectChanges();
        expect( _ampTFNTestCmp.control.errors ).toEqual( expectedError );
    } );
    it( 'Should NOT display an error when a VALID tax-file-number is entered', () => {
        const expectedError = null;
        _ampTFNTestCmp.control.setValue( '123456782' );
        _fixture.detectChanges();
        expect( _ampTFNTestCmp.control.errors ).toEqual( expectedError );
    } );
    it( 'should allow numberic values', () => {
        updateInputText( '65433' );
        expect( _inputElement.value ).toEqual( '65433' );
    } );
    it( 'should not allow anything but numbers', () => {
        updateInputText( 'sdf a-=-=-' );
        expect( _inputElement.value ).toEqual( '' );
    } );
    it( 'should not let more than the maxLength specified to be entered', () => {
        let maxLength = _ampTFNTestCmp.tfnCmp.maxLength;
        let text      = '';
        for ( let i = 0 ; i < maxLength + 1 ; i++ ) {
            text += '' + i;
        }
        updateInputText( text );
        expect( _ampTFNTestCmp.control.valid ).toBe( false );
    } );

} );

@Component( {
    template : `
        <form  #formModel class='nl-form' >
            <amp-tax-file-number
                #tfnCmp
                [id]="'tax-file-number'"
                [controlGroup]="controlGroup">
            </amp-tax-file-number>
        </form>
    `
} )
class AmpTFNTest {
    @ViewChild( 'tfnCmp' ) tfnCmp;
                           controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ this.tfnCmp.id ];
    }
}
