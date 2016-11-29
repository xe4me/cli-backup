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

import { AmpInputsModule } from '../../../app/modules/amp-inputs/amp-inputs.module';

class MockElementRef implements ElementRef {
    nativeElement = {};
}
fdescribe( 'amp-tax-file-number component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpInputsModule ] ,
            declarations : [
                AmpTFNTest
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Should contain 1 tax-file-number input field with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpTFNTest> = TestBed.createComponent( AmpTFNTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampTFNTest      = fixture.debugElement;
        let Component       = ampTFNTest.componentInstance;
        let TFNInput        = Element.querySelector( 'input[type="text"]' );
        expect( TFNInput ).toBeDefined();
        expect( TFNInput.name ).toBe( Component.tfnCmp.randomizedId );
        expect( TFNInput.id ).toBe( Component.tfnCmp.randomizedId + '-input');
        expect( TFNInput.getAttribute( 'data-automation-id' ) ).toBe( 'text_' + Component.tfnCmp.randomizedId );
    } );
    it( 'Should contain 1 invalid tax-file-number and have an error on control' , () => {
        const expectedError = { checkDigitValidation: { text: 'You have entered an invalid tax file number.' } };
        let fixture : ComponentFixture<AmpTFNTest> = TestBed.createComponent( AmpTFNTest );
        fixture.detectChanges();
        let ampTFNTest      = fixture.componentInstance;
        ampTFNTest.control.setValue('123654789');
        fixture.detectChanges();
        expect( ampTFNTest.control.errors ).toEqual( expectedError );
    } );
    it( 'Should contain 1 valid tax-file-number and no error on control' , () => {
        const expectedError = null;
        let fixture : ComponentFixture<AmpTFNTest> = TestBed.createComponent( AmpTFNTest );
        fixture.detectChanges();
        let ampTFNTest      = fixture.componentInstance;
        ampTFNTest.control.setValue('123456782');
        fixture.detectChanges();
        expect( ampTFNTest.control.errors ).toEqual( expectedError );
    } );
} );

@Component( {
    template : `
        <form  #formModel class='nl-form' >
            <amp-tax-file-number
                #tfnCmp
                [id]="'tax-file-number'"
                [controlGroup]="controlGroup">
            </amp-tax-file-number>
        </form>
    `
} )
class AmpTFNTest {
    @ViewChild( 'tfnCmp' ) tfnCmp;
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ this.tfnCmp.id ];
    }
}
