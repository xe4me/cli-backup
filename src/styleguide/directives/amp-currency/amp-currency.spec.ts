import {
    async,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
import { AmpDirectivesModule } from '../../../app/modules/amp-directives/amp-directives.module';
describe( 'amp-currency directive', () => {
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
            imports      : [ FormsModule, ReactiveFormsModule, AmpInputsModule, AmpDirectivesModule ],
            declarations : [
                TestComponent
            ],
            providers    : [
                { provide : ComponentFixtureAutoDetect, useValue : true }
            ]
        } );
        _fixture      = TestBed.createComponent( TestComponent );
        _debugElement = _fixture.debugElement;
        _fixture.detectChanges();
        _inputElement = _debugElement.query( By.css( 'input' ) ).nativeElement;
        _inputEvent   = document.createEvent( 'Event' );
        _inputEvent.initEvent( 'input', true, false );
    } ) );
    it( 'Input element should exist', () => {
        expect( _inputElement ).toBeDefined();
    } );
    it( 'should convert 300000 to be 300,000', () => {
        updateInputText( '300000' );
        expect( _inputElement.value ).toEqual( '300,000' );
    } );
    it( 'should not convert 12 ', () => {
        updateInputText( '12' );
        expect( _inputElement.value ).toEqual( '12' );
    } );
} );
@Component( {
    template        : `
        <amp-input
            [id]='__custom.controls[0].id'
            [label]='__custom.controls[0].label'
            [controlGroup]='__controlGroup'
            amp-currency
            [required]='__custom.controls[0].required'
            [maxLength]='__custom.controls[0].maxLength'>
        </amp-input>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
class TestComponent {
    public __controlGroup : FormGroup = new FormGroup( {} );
    public __custom : any             = {
        controls : [
            {
                id        : 'number',
                label     : 'Number',
                required  : true,
                maxLength : '10'
            }
        ]
    };
}
