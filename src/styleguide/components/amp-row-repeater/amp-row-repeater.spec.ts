import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
describe( 'amp-account-number component', () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, ReactiveFormsModule, AmpInputsModule ],
            declarations : [
                TestComponent
            ],
            providers    : [
                { provide : ElementRef, useClass : MockElementRef },
                { provide : ComponentFixtureAutoDetect, useValue : true }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'should contain an input text element with the correct name, max value, id and data-automation-id attribute', () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent = fixture.debugElement;
        let compiledInput         = compiledTestComponent.query( By.css( 'input' ) );
        let Component             = fixture.componentInstance;
        expect( compiledInput.nativeElement.name ).toBe( Component.accountNumberCmp.randomizedId );
        expect( compiledInput.nativeElement.id ).toBe( Component.accountNumberCmp.randomizedId );
        expect( compiledInput.nativeElement.attributes[ 'maxlength' ].value ).toBe( '9' );
        expect( compiledInput.nativeElement.type ).toBe( 'text' );
        expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value ).toBe( 'text' + '_' + Component.accountNumberCmp.randomizedId );
    } );
    it( 'should be invalid if longer than 9 digits', () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent  = fixture.debugElement;
        let compiledInput          = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls[ 'account-number' ];
        accountNumberControl.setValue( '12345678910' );
        expect( accountNumberControl._status ).toBe( 'INVALID' );
    } );
    it( 'should be invalid if shorter than 9 digits', () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent  = fixture.debugElement;
        let compiledInput          = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls[ 'account-number' ];
        accountNumberControl.setValue( '12345678' );
        expect( accountNumberControl._status ).toBe( 'INVALID' );
    } );
    it( 'should be valid if exactly 9 digits', () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent  = fixture.debugElement;
        let compiledInput          = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls[ 'account-number' ];
        accountNumberControl.setValue( '123456789' );
        expect( accountNumberControl._status ).toBe( 'VALID' );
    } );
    it( 'should be invalid if contains non-numeric characters', () => {
        let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        let compiledTestComponent  = fixture.debugElement;
        let compiledInput          = compiledTestComponent.query( By.css( 'input' ) );
        const accountNumberControl = compiledTestComponent.componentInstance.accountNumberControl.controls[ 'account-number' ];
        accountNumberControl.setValue( '12345678a' );
        expect( accountNumberControl._status ).toBe( 'INVALID' );
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <amp-account-number
            #accountNumberCmp
            [id]="'account-number'"
            [controlGroup]='accountNumberControl'></amp-account-number>
    </form>
    `
} )
class TestComponent {
    @ViewChild( 'accountNumberCmp' ) accountNumberCmp;
                                     accountNumberControl : FormGroup = new FormGroup( {} );
}
