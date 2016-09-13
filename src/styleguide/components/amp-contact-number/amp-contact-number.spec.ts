import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AmpContactNumberComponent } from '../../../app/components/amp-contact-number/amp-contact-number.component';
describe( 'amp-contact-number component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule ] ,
            declarations : [
                AmpContactNumberComponent ,
                TestComponent
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'should contain a label as Contact Number' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledLabel         = compiledTestComponent.query( By.css( 'label' ) );
        expect( compiledLabel.name ).toBe( 'label' );
        expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Contact number' );
        expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( 'contact-number-input' );
    } );
    it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        expect( compiledInput.nativeElement.name ).toBe( 'contact-number' );
        expect( compiledInput.nativeElement.id ).toBe( 'contact-number-input' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text_contact-number' );
    } );
    it( 'should be required it it is empty' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        expect( (<any>ComponentInstance.control.errors).required ).toBeDefined();
    } );
    it( 'should have pattern error if the length is less than 8 character' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.control.setValue( '12345' );
        fixture.detectChanges();
        expect( (<any>ComponentInstance.control.errors).required ).toBeUndefined();
        expect( (<any>ComponentInstance.control.errors).pattern ).toBeDefined();
    } );
    it( 'should have maxLength error if the length is less than 20 character' , () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        const ComponentInstance = fixture.componentInstance;
        ComponentInstance.control.setValue( '1234567890123456789000' );
        fixture.detectChanges();
        expect( (<any>ComponentInstance.control.errors).required ).toBeUndefined();
        expect( (<any>ComponentInstance.control.errors).pattern ).toBeUndefined();
        expect( (<any>ComponentInstance.control.errors).maxLength ).toBeDefined();
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <amp-contact-number
            [id]="id"
            [controlGroup]='controlGroup'>    
        </amp-contact-number>
    </form>
    `
} )
class TestComponent {
    id                       = 'contact-number';
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ this.id ];
    }
}
