import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , ElementRef , ViewChild } from '@angular/core';
import { FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
// Load the implementations that should be tested
describe( 'amp-password component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpInputsModule ] ,
            declarations : [ TestComponent ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window } ,
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    describe( 'correct attributes should be set' , () => {
        it( 'should contain a label element with name as value and password as for attribute' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let Component             = fixture.componentInstance;
            let compiledLabel         = compiledTestComponent.query( By.css( '.password label' ) );
            expect( compiledLabel.name ).toBe( 'label' );
            expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Password' );
            expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( 'password' + '_' + Component.passwordCmp._randomString + '-input' );
        } );
        it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
            let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
            fixture.detectChanges();
            let compiledTestComponent = fixture.debugElement;
            let Component             = fixture.componentInstance;
            let compiledInput         = compiledTestComponent.query( By.css( '.password input' ) );
            expect( compiledInput.nativeElement.name ).toBe( 'password' + '_' + Component.passwordCmp._randomString );
            expect( compiledInput.nativeElement.id ).toBe( 'password' + '_' + Component.passwordCmp._randomString + '-input' );
            expect( compiledInput.nativeElement.type ).toBe( 'password' );
            expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text_password' + '_' + Component.passwordCmp._randomString );
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
        <div class="password">
            <amp-password
                #passwordCmp
                [id]="'password'"
                [controlGroup]='passwordControl'></amp-password>
        </div>
    </form>
    `
} )
class TestComponent {
    @ViewChild( 'passwordCmp' ) passwordCmp;
    passwordControl : FormGroup = new FormGroup( {} );
}
