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

        it( 'should allow certain characters in last name' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            const lastNameControl     = compiledTestComponent.componentInstance.lastNameControl.controls[ 'lastName' ];
            lastNameControl.setValue( 'John-Smith\'o Jr.' );
            expect( lastNameControl._status ).toBe( 'VALID' );
        } );

        it( 'should start with a letter' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            const lastNameControl     = compiledTestComponent.componentInstance.lastNameControl.controls[ 'lastName' ];
            lastNameControl.setValue( '.John' );
            expect( lastNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should not allow only spaces as last name' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            const lastNameControl     = compiledTestComponent.componentInstance.lastNameControl.controls[ 'lastName' ];
            lastNameControl.setValue( '   ' );
            expect( lastNameControl._status ).toBe( 'INVALID' );
        } );

        it( 'should not allow number in last name' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            const lastNameControl     = compiledTestComponent.componentInstance.lastNameControl.controls[ 'lastName' ];
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
