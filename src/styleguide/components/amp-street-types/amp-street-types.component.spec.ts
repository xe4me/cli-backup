import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , ViewChild } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AmpDropdownNewModule } from '../../../app/modules/amp-dropdown-new';
xdescribe( 'amp-street-types component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ ReactiveFormsModule , FormsModule , AmpDropdownNewModule ] ,
            declarations : [
                AmpdropdownTest
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Should contain 1 dropdown input field with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpdropdownTest> = TestBed.createComponent( AmpdropdownTest );
        fixture.detectChanges();
        let Element         = fixture.nativeElement;
        let ampdropdownTest = fixture.debugElement;
        let Component       = ampdropdownTest.componentInstance;
        let dropdown        = Element.querySelector( 'select' );
        let options         = dropdown.children;
        expect( dropdown ).toBeDefined();
        expect( dropdown.id ).toBe( Component.dropDownCmp.randomizedId );
        expect( dropdown.getAttribute( 'data-automation-id' ) ).toBe( 'slt_' + Component.dropDownCmp.randomizedId );
        expect( options ).toBeDefined();
    } );
} );
@Component( {
    template : `    
        <amp-street-types
                #dropDownCmp
                [isInSummaryState]='false'
                [id]='"StreetTypes"'
                [label]='"StreetTypes"'
                [required]="true">
                 <template let-option="option">
                    {{ option.label }}
                </template>
        </amp-street-types>
    `
} )
class AmpdropdownTest {
    @ViewChild( 'dropDownCmp' ) dropDownCmp;

    get control () {
        return this.dropDownCmp.control;
    }

    isInSummaryState = false;
    clickedOnThedropdown;

    private onAcknowledgeSelect ( value ) {
        this.clickedOnThedropdown = value;
    }
}
