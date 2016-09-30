import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , NgForm , ReactiveFormsModule , FormsModule , FormGroup } from '@angular/forms';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpDropdownModule } from '../../../app/modules/amp-dropdown';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-dropdown component' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ ReactiveFormsModule , FormsModule , AmpDropdownModule ] ,
            declarations : [
                AmpdropdownTest
            ] ,
            providers    : [
                { provide : FormModelService , useClass : MockFormModelService } ,
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : ScrollService , useClass : MockScrollService } ,
                ProgressObserverService ,
                { provide : Window , useClass : window }
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
        expect( dropdown.id ).toBe( 'Title' );
        expect( dropdown.getAttribute( 'data-automation-id' ) ).toBe( 'slt_Title' );
        expect( options ).toBeDefined();
        expect( options.length ).toBe( 6 );
        expect( options[ 0 ].value ).toEqual( '' );
        expect( options[ 1 ].value ).toEqual( 'mr' );
        expect( options[ 2 ].value ).toEqual( 'mrs' );
        expect( options[ 3 ].value ).toEqual( 'miss' );
        expect( options[ 4 ].value ).toEqual( 'ms' );
        expect( options[ 5 ].value ).toEqual( 'dr' );
    } );
} );
@Component( {
    template : `
        <form #formModel  class='nl-form' >
            <amp-dropdown
                    [attr.theme]='"forms"'
                    [isInSummaryState]='false'
                    [id]='"Title"'
                    [label]='"Title"'
                    [labelHidden]='"HiddenLabel"'
                    [options]='titleOptions'
                    [controlGroup]="controlGroup"
                    [required]="true">
            </amp-dropdown>
        </form>
    `
} )
class AmpdropdownTest {
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ 'Title' ];
    }

    isInSummaryState = false;
    clickedOnThedropdown;
    titleOptions     = [
        { value : 'mr' , label : 'Mr' } ,
        { value : 'mrs' , label : 'Mrs' } ,
        { value : 'miss' , label : 'Miss' } ,
        { value : 'ms' , label : 'Ms' } ,
        { value : 'dr' , label : 'Dr' }
    ];

    private onAcknowledgeSelect ( value ) {
        this.clickedOnThedropdown = value;
    }
}
