import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AmpEmailComponent } from '../../../app/components/amp-email/amp-email.component';
describe( 'amp-email component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule ] ,
            declarations : [
                AmpEmailComponent ,
                TestComponent
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'should contain a label as Email' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledLabel         = compiledTestComponent.query( By.css( 'label' ) );
        expect( compiledLabel.name ).toBe( 'label' );
        expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Email' );
        expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( 'email-input' );
    } );
    it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        expect( compiledInput.nativeElement.name ).toBe( 'email' );
        expect( compiledInput.nativeElement.id ).toBe( 'email-input' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text_email' );
    } );
    it( 'should be required' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        expect( ComponentInstance.controlGroup.controls[ 'email' ].errors.required ).toBeDefined();
    } );
    it( 'should be invalid if it has wrong value ' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.controlGroup.controls[ 'email' ].setValue(' a wrong email');
        fixture.detectChanges();
        expect( ComponentInstance.controlGroup.controls[ 'email' ].errors.pattern ).toBeDefined();
    } );
    it( 'should be invalid if it has correct email but is more than 50 character' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.controlGroup.controls[ 'email' ].setValue('smiladhismiladhismiladhismilasmiladhismiladhismiladhismilasmiladhismiladhismiladhismilasmiladhismiladhismiladhismilasmiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhi@gmail.com');
        fixture.detectChanges();
        expect( ComponentInstance.controlGroup.controls[ 'email' ].errors.maxLength ).toBeDefined();
    } );
    it( 'should be valid if its passed required test and has a lower than 50 character length email' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.controlGroup.controls[ 'email' ].setValue('smiladhi@gmail.com');
        fixture.detectChanges();
        expect( ComponentInstance.controlGroup.controls[ 'email' ].valid ).toBeTruthy();
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <amp-email
            [id]="'email'"
            [controlGroup]='controlGroup'>    
        </amp-email>
    </form>
    `
} )
class TestComponent {
    controlGroup : FormGroup = new FormGroup( {} );
}
