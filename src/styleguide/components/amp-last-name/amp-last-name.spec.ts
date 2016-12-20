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

        it( 'should allow full stops, spaces, hyphens and single quotes in last name' , () => {
            lastNameControl.setValue( 'John-Smith\'o Jr.' );
            expect( lastNameControl._status ).toBe( 'VALID' );
        } );

        it( 'should NOT allow any other special characters in last name' , () => {
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
