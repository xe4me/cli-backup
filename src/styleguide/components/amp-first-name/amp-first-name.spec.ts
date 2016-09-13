import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AmpEmailComponent } from '../../../app/components/amp-first-name/amp-first-name.component';
describe( 'amp-first-name component' , () => {
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
        expect( (<any>ComponentInstance.control.errors).required ).toBeDefined();
    } );
    it( 'should be invalid if it has wrong value ' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.control.setValue( ' a wrong email' );
        fixture.detectChanges();
        expect( (<any>ComponentInstance.control.errors).pattern ).toBeDefined();
    } );
    it( 'should be invalid if it has correct email but is more than 50 character' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.control.setValue( 'smiladhismiladhismiladhismilasmiladhismiladhismiladhismilasmiladhismiladhismiladhismilasmiladhismiladhismiladhismilasmiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhismiladhi@gmail.com' );
        fixture.detectChanges();
        expect( (<any>ComponentInstance.control.errors).maxLength ).toBeDefined();
    } );
    it( 'should be valid if its passed required test and has a lower than 50 character length email' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.control.setValue( 'smiladhi@gmail.com' );
        fixture.detectChanges();
        expect( ComponentInstance.control.valid ).toBeTruthy();
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <amp-first-name
            [id]="id"
            [controlGroup]='controlGroup'>    
        </amp-first-name>
    </form>
    `
} )
class TestComponent {
    id                       = 'email';
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ this.id ];
    }
}