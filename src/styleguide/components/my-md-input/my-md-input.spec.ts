import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component , provide, ElementRef } from '@angular/core';
import { BaseRequestOptions , Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
// Load the implementations that should be tested
import { MdInputComponent } from '../../../app/components/my-md-input/my-md-input.component';

describe( 'my-md-input directive' , () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule ],
            declarations: [
                MdInputComponent,
                TestComponent
            ],
            providers: [
                { provide: ElementRef, useClass: MockElementRef },
                { provide: Window, useClass: window }
            ]
        });

        TestBed.compileComponents();
    }));

    it( 'should contain a label element with name as value and firstname as for attribute' , () => {
        let fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        let compiledTestComponent    = fixture.debugElement;
        let compiledLabel            = compiledTestComponent.query(By.css('label'));
        expect( compiledLabel.name ).toBe( 'label' );
        expect( compiledLabel.nativeElement.textContent.trim() ).toEqual( 'Name' );
        expect( compiledLabel.nativeElement.attributes['for'].value ).toBe( 'firstname-input' );
    } );

    it( 'should contain an input text element with the correct name, id and data-automation-id attribute' , () => {
        let fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        let compiledTestComponent    = fixture.debugElement;
        let compiledInput            = compiledTestComponent.query(By.css('input'));
        expect( compiledInput.nativeElement.name ).toBe( 'firstname' );
        expect( compiledInput.nativeElement.id ).toBe( 'firstname-input' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes['data-automation-id'].value ).toBe( 'text_firstname' );
    } );

    // it( 'should have 3 validators' , () => {
    //     let fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    //     fixture.detectChanges();
    //     let compiledTestComponent    = fixture.debugElement;
    //     let compiledInput            = compiledTestComponent.query(By.css('input'));
    //     expect( compiledInput.nativeElement.name ).toBe( 'firstname' );
    //     expect( compiledInput.nativeElement.id ).toBe( 'firstname-input' );
    //     expect( compiledInput.nativeElement.type ).toBe( 'text' );
    //     expect( compiledInput.nativeElement.attributes['data-automation-id'].value ).toBe( 'text_firstname' );

    //     //expect( compiledInput.componentInstance._validators.length ).toBe( 4 );
    //     // expect(compiledInput.componentInstance._validators[0]).toBe(MdPatternValidator);
    //     expect( compiledInput.componentInstance._validators[ 0 ].mdPattern ).toBe( '^([A-Za-z ])*$' );
    //     // TODO: Fix the MaxLength validator in my-md-input by Milad
    //     expect( compiledInput.componentInstance._validators[ 1 ].mdMaxLength ).toBe( '50' );
    //     // TODO: Work out the mandatory validator that got added to the Control but doesn't show up.
    // } );
} );

class MockElementRef implements ElementRef {
  nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template   : `
    <form  #formModel='ngForm' class='nl-form' >
        <my-md-input [id]="'firstname'" [label]="'Name'" [parentControl]='firstnameControl'
            isRequired='true'
            valPattern='^([A-Za-z ])*$'
            valMaxLength='50'>blah</my-md-input>
    </form>
    `
} )
class TestComponent {
    firstnameControl : FormControl = new FormControl();
}
