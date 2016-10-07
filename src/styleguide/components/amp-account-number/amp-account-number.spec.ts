import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
// Load the implementations that should be tested
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
describe( 'amp-account-number component' , () => {
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
    it( 'should contain an input text element with the correct name, max value, id and data-automation-id attribute' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        expect( compiledInput.nativeElement.name ).toBe( 'account-number' );
        expect( compiledInput.nativeElement.id ).toBe( 'account-number-input' );
        expect( compiledInput.nativeElement.attributes['maxlength'].value ).toBe( '9' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text_account-number' );
    } );
    it( 'should be invalid if longer than 9 characters' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls['account-number'];
        accountNumberControl.setValue('12345678910');
        expect( accountNumberControl._status).toBe( 'INVALID');
    } );
    it( 'should be invalid if shorter than 9 characters' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls['account-number'];
        accountNumberControl.setValue('12345678');
        expect( accountNumberControl._status).toBe( 'INVALID');
    } );
    it( 'should be valid if exactly 9 digits' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls['account-number'];
        accountNumberControl.setValue('123456789');
        expect( accountNumberControl._status).toBe( 'VALID');
    } );
    it( 'should be invalid if contains non-numeric characters' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls['account-number'];
        accountNumberControl.setValue('12345678ab');
        expect( accountNumberControl._status).toBe( 'INVALID');
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <amp-account-number
            [id]="'account-number'"
            [controlGroup]='accountNumberControl'></amp-account-number>
    </form>
    `
} )
class TestComponent {
    accountNumberControl : FormGroup = new FormGroup( {} );
}
