import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AmpContactNumberComponent } from '../../../app/modules/amp-inputs';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
describe( 'amp-contact-number component' , () => {
    let _fixture : ComponentFixture<TestComponent>;
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpInputsModule ] ,
            declarations : [
                TestComponent
            ] ,
            providers    : [
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ]
        } );
        TestBed.compileComponents();
        _fixture = TestBed.createComponent( TestComponent );
        _fixture.detectChanges();
    } ) );
    it( 'should contain a label as Contact Number' , () => {
        _fixture.detectChanges();
        let compiledTestComponent = _fixture.debugElement;
        let compiledLabel         = compiledTestComponent.query( By.css( 'label' ) );
        expect( compiledLabel.name ).toBe( 'label' );
        expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Contact number' );
        expect( compiledLabel.nativeElement.attributes[ 'for' ].value ).toBe( 'contact-number-input' );
    } );
    it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
        _fixture.detectChanges();
        let compiledTestComponent = _fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        expect( compiledInput.nativeElement.name ).toBe( 'contact-number' );
        expect( compiledInput.nativeElement.id ).toBe( 'contact-number-input' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text_contact-number' );
    } );
    it( 'should be required it it is empty' , () => {
        _fixture.detectChanges();
        const ComponentInstance = _fixture.componentInstance;
        expect( <any> ComponentInstance.control.errors ).not.toBeNull();
        expect( (<any> ComponentInstance.control.errors).required ).toBeDefined();
    } );
    it( 'should have pattern error if the length is less than 8 character' , () => {
        _fixture.detectChanges();
        const ComponentInstance = _fixture.componentInstance;
        ComponentInstance.control.setValue( '12345' );
        _fixture.detectChanges();
        expect( (<any> ComponentInstance.control.errors).required ).toBeUndefined();
        expect( (<any> ComponentInstance.control.errors).pattern ).toBeDefined();
    } );
    it( 'should have maxLength error if the length is less than 20 character' , () => {
        _fixture.detectChanges();
        const ComponentInstance = _fixture.componentInstance;
        ComponentInstance.control.setValue( '1234567890123456789000' );
        _fixture.detectChanges();
        expect( (<any> ComponentInstance.control.errors).required ).toBeUndefined();
        expect( (<any> ComponentInstance.control.errors).pattern ).toBeUndefined();
        expect( (<any> ComponentInstance.control.errors).maxLength ).toBeDefined();
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
