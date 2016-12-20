import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule , FormGroup } from '@angular/forms';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';

describe( 'amp-first-name component' , () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , AmpInputsModule ] ,
            declarations : [ TestComponent ]
        } );
        TestBed.compileComponents();
    } ) );

    describe( 'Pattern validation' , () => {
        let firstNameControl;

        beforeEach( async( () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            firstNameControl    = compiledTestComponent.componentInstance.firstNameControl.controls[ 'firstName' ];
        } ) );

        it( 'should allow letters in first name' , () => {
            firstNameControl.setValue( 'John' );
            expect( firstNameControl._status ).toBe( 'VALID' );
        } );

        it( 'should allow full stops, spaces, hyphens and single quotes in first name' , () => {
            firstNameControl.setValue( 'John-Paul\'o Jr.' );
            expect( firstNameControl._status ).toBe( 'VALID' );
        } );

        it( 'should NOT allow any other special characters in first name' , () => {
            firstNameControl.setValue( 'John$' );
            expect( firstNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should start with a letter' , () => {
            firstNameControl.setValue( '.John' );
            expect( firstNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should NOT allow only spaces as first name' , () => {
            firstNameControl.setValue( '    ' );
            expect( firstNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should NOT allow number in first name' , () => {
            firstNameControl.setValue( 'John1' );
            expect( firstNameControl._status ).toBe( 'INVALID' );
        } );

    } );
} );

@Component( {
    template : `
    <form #formModel='ngForm' class='nl-form'>
        <div class="first-name">
            <amp-first-name
                [id]="'firstName'"
                [controlGroup]='firstNameControl'
                [required]='true'>
            </amp-first-name>
        </div>
    </form>
    `
} )

class TestComponent {
    firstNameControl : FormGroup = new FormGroup( {} );
}
