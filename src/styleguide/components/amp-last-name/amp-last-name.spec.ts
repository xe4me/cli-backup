import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule , FormGroup } from '@angular/forms';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';

describe( 'amp-last-name component' , () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , AmpInputsModule ] ,
            declarations : [ TestComponent ]
        } );
        TestBed.compileComponents();
    } ) );

    describe( 'Pattern validation' , () => {
        let lastNameControl;

        beforeEach( async( () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            lastNameControl     = compiledTestComponent.componentInstance.lastNameControl.controls[ 'lastName' ];
        } ) );

        it( 'should allow letters in last name' , () => {
            lastNameControl.setValue( 'Smith' );
            expect( lastNameControl._status ).toBe( 'VALID' );
        } );

        it( 'should not allow full stops' , () => {
            lastNameControl.setValue( 'John Jr.' );
            expect( lastNameControl.valid ).toBe( false );
        } );
        it( 'should last character be lower case' , () => {
            lastNameControl.setValue( 'John JJ' );
            expect( lastNameControl.valid ).toBe( false );
        } );
        it( 'should not allow numbers' , () => {
            lastNameControl.setValue( 'John J 1' );
            expect( lastNameControl.valid ).toBe( false );
        } );

        it( 'should allow dash , pipe , apostrophe' , () => {
            lastNameControl.setValue( 'John-Paul\'o Jr' );
            expect( lastNameControl.valid ).toBe( true );
        } );

        it( 'should NOT allow any other special characters in first name' , () => {
            lastNameControl.setValue( 'John$' );
            expect( lastNameControl._status ).toBe( 'INVALID' );
        } );
        it( 'should start with a letter' , () => {
            lastNameControl.setValue( '.John' );
            expect( lastNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should NOT allow only spaces as last name' , () => {
            lastNameControl.setValue( '   ' );
            expect( lastNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should NOT allow number in last name' , () => {
            lastNameControl.setValue( 'John1' );
            expect( lastNameControl._status ).toBe( 'INVALID' );
        } );

    } );
} );

@Component( {
    template : `
    <form #formModel='ngForm' class='nl-form'>
        <div class="last-name">
            <amp-last-name
                [id]="'lastName'"
                [controlGroup]='lastNameControl'
                [required]='true'>
            </amp-last-name>
        </div>
    </form>
    `
} )

class TestComponent {
    lastNameControl : FormGroup = new FormGroup( {} );
}
