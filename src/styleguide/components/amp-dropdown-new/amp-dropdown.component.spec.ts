import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , ViewChild } from '@angular/core';
import { ReactiveFormsModule , FormsModule , FormGroup , FormControl } from '@angular/forms';
import { AmpDropdownNewModule } from '../../../app/modules/amp-dropdown-new';
import { AmpDropdownComponent } from '../../../app/modules/amp-dropdown-new/components/amp-dropdown/amp-dropdown.component';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { tick , fakeAsync } from '@angular/core/testing/fake_async';
import { AmpFormGroup } from '../../../app/base-control';
describe( 'amp-dropdown component' , () => {
    let Element;
    let Fixture : ComponentFixture<AmpdropdownTest>;
    let DebugElement;
    let TestComponent;
    let DropdownComponent;
    let Dropdown_input;
    let Dropdown_label;
    let Dropdown_select;
    let Select_Options;
    let ULElement;
    let LiElements;
    let TestCmpControlGroup;
    let CmpControlGroup;
    let QueryControl;
    let SelectedControl;
    let TitleOptions;
    let DeselectButton;
    let WrongSelectButton;

    function focusOnInput () {
        Dropdown_input.focus();
        Dropdown_input.dispatchEvent( new Event( 'input' ) );
        Fixture.detectChanges();
    }

    function openTheDropdown () {
        Dropdown_label.focus();
        Dropdown_label.dispatchEvent( new Event( 'click' ) );
        Fixture.detectChanges();
    }

    function deselect () {
        DeselectButton.click();
        Fixture.detectChanges();
    }

    function wrongSelect () {
        WrongSelectButton.click();
        Fixture.detectChanges();
    }

    function selectFirstItem () {
        selectItemByIndex( 0 );
    }

    function getValueOfSelectedOption () {
        if ( Dropdown_select.options[ Dropdown_select.selectedIndex ] ) {
            return Dropdown_select.options[ Dropdown_select.selectedIndex ].value;
        } else {
            return null;
        }
    }

    function selectItemByIndex ( _index ) {
        getAlltheLis()[ _index ].nativeElement.click();
        Fixture.detectChanges();
    }

    function expectAllControlsToBeNull () {
        expect( QueryControl.value ).toBeNull();
        expect( SelectedControl.value ).toBeNull();
        if ( getValueOfSelectedOption() === '' ) {
            expect( getValueOfSelectedOption() ).toBe( '' );
        } else {
            expect( getValueOfSelectedOption() ).toBe( null );
        }
        let emptySelectedOption = { label : null , value : null };
        expect( DropdownComponent.selectedOption ).toEqual( emptySelectedOption );
    }

    function getAlltheLis () {
        return DebugElement.queryAll( By.css( 'li' ) );
    }

    function createComponent () {
        Fixture = TestBed.createComponent( AmpdropdownTest );
        Fixture.detectChanges();
        TestBed.compileComponents();
    }

    function createOverridenComponent () {
        Fixture = TestBed
            .overrideComponent( AmpdropdownTest , {
                set : {
                    template : `
                    <form class='nl-form' >
                         <amp-dropdown
                            #dropDownCmp
                            [isInSummaryState]='isInSummaryState'
                            [id]='"Title"'
                            [label]='"Title"'
                            [options]='titleOptions'
                            [controlGroup]="__retrievedControlGroup"
                            [required]="true">
                            <template let-option="option">
                                {{ option.label }}
                            </template>
                        </amp-dropdown>
                    </form>
                    <button id='deselect' (click)='setTo(null)'>Deselect</button>
                    <button id='wrongSelect' (click)='setTo("Milad")'>wrongSelect</button>
                `
                }
            } )
            .createComponent( AmpdropdownTest );
        Fixture.detectChanges();
    }

    function doDefineElementsBeforeEach () {
        beforeEach( () => {
            Element             = Fixture.nativeElement;
            DebugElement        = Fixture.debugElement;
            TestComponent       = DebugElement.componentInstance;
            DropdownComponent   = TestComponent.dropDownCmp;
            Dropdown_input      = Element.querySelector( 'input' );
            Dropdown_label      = Element.querySelector( 'label' );
            Dropdown_select     = Element.querySelector( 'select' );
            ULElement           = Element.querySelector( 'ul' );
            LiElements          = Element.querySelector( 'li' );
            DeselectButton      = Element.querySelector( '#deselect' );
            WrongSelectButton   = Element.querySelector( '#wrongSelect' );
            Select_Options      = Dropdown_select.children;
            TestCmpControlGroup = TestComponent.__controlGroup;
            CmpControlGroup     = TestComponent.DropdownControlGroup;
            QueryControl        = TestComponent.QueryControl;
            SelectedControl     = TestComponent.SelectedControl;
            TitleOptions        = TestComponent.titleOptions;
        } );
    }

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ ReactiveFormsModule , FormsModule , AmpDropdownNewModule ] ,
            declarations : [
                AmpdropdownTest
            ] ,
            providers    : [
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ]
        } );
    } ) );
    describe( 'With empty controlGroup' , () => {
        beforeEach( () => {
            createComponent();
        } );
        doDefineElementsBeforeEach();
        it( 'Dropdown component should be defiend' , () => {
            expect( DropdownComponent ).toBeDefined();
        } );
        it( 'Should contain 1 input field with proper data-automation-id and name attributes ' , () => {
            expect( Dropdown_input ).toBeDefined();
            expect( Dropdown_input.id ).toBe( 'dropdown_Title' + '_' + TestComponent.fdnJoined );
            expect( Dropdown_input.getAttribute( 'data-automation-id' ) ).toBe( 'dropdown_Title' + '_' + TestComponent.fdnJoined );
            expect( Dropdown_input.getAttribute( 'name' ) ).toBe( 'dropdown_Title' + '_' + TestComponent.fdnJoined );
        } );
        it( 'Should contain 1 select field with proper data-automation-id and name attributes ' , () => {
            expect( Dropdown_select ).toBeDefined();
            expect( Dropdown_select.id ).toBe( 'select_Title' + '_' + TestComponent.fdnJoined );
            expect( Dropdown_select.getAttribute( 'data-automation-id' ) ).toBe( 'select_Title' + '_' + TestComponent.fdnJoined );
            expect( Dropdown_select.getAttribute( 'name' ) ).toBe( 'select_Title' + '_' + TestComponent.fdnJoined );
        } );
        it( 'Select should have options' , () => {
            expect( Select_Options ).toBeDefined();
            expect( Select_Options.length ).toBe( TitleOptions.length + 1 );
        } );
        it( 'Should have a controlGroup which has two controls' , () => {
            expect( CmpControlGroup ).toBeDefined();
            expect( Object.keys( CmpControlGroup.controls ).length ).toBe( 2 );
            expect( CmpControlGroup.controls[ AmpDropdownComponent.SELECTED_CONTROL_NAME ] ).toBeDefined();
            expect( CmpControlGroup.controls[ AmpDropdownComponent.QUERY_CONTROL_NAME ] ).toBeDefined();
        } );
        it( 'Click on the first item should set query control and selectedControl and should select the dropdown' , () => {
            expectAllControlsToBeNull();
            openTheDropdown();
            selectFirstItem();
            expect( QueryControl.value ).toBe( TitleOptions[ 0 ].label );
            expect( SelectedControl.value ).toBe( TitleOptions[ 0 ].value );
            expect( getValueOfSelectedOption() ).toBe( TitleOptions[ 0 ].label );
        } );
        it( 'Click on the deselect button should empty the query control and selectedControl inside the dropdown' , () => {
            expectAllControlsToBeNull();
            openTheDropdown();
            selectFirstItem();
            deselect();
            expect( QueryControl.value ).toBe( null );
            expect( SelectedControl.value ).toBe( null );
            expect( getValueOfSelectedOption() ).toBe( null );
        } );
        it( 'Click on the first option of the hidden select should select the item ' , () => {
            expectAllControlsToBeNull();
            Select_Options[ 1 ].click();
            expect( QueryControl.value ).toBe( TitleOptions[ 0 ].label );
            expect( SelectedControl.value ).toBe( TitleOptions[ 0 ].value );
            expect( getValueOfSelectedOption() ).toBe( TitleOptions[ 0 ].label );
        } );
        it( 'Setting the value to an option that is not in the list should not change the controls value (should not' +
            ' select)' , () => {
            expectAllControlsToBeNull();
            wrongSelect();
            expectAllControlsToBeNull();
        } );
        it( 'should fire an $selected event up to parent component when seleing an item ' , fakeAsync( () => {
            openTheDropdown();
            let changes;
            DropdownComponent.selected.subscribe( ( _changes ) => {
                changes = _changes;
            } );
            selectFirstItem();
            tick();
            let selectedObject = {
                label : TitleOptions[ 0 ].label ,
                value : TitleOptions[ 0 ].value
            };
            expect( changes ).toEqual( selectedObject );
        } ) );
        it( 'should not fire a selected event if selecting the same option' , fakeAsync( () => {
            openTheDropdown();
            let changes;
            let firedCounter = 0;
            DropdownComponent.selected.subscribe( ( _changes ) => {
                changes = _changes;
                firedCounter ++;
            } );
            selectFirstItem();
            tick();
            let selectedObject = {
                label : TitleOptions[ 0 ].label ,
                value : TitleOptions[ 0 ].value
            };
            expect( changes ).toEqual( selectedObject );
            expect( firedCounter ).toBe( 1 );
            openTheDropdown();
            selectFirstItem();
            tick();
            expect( firedCounter ).toBe( 1 );
        } ) );
        it( 'should fire selected event after setting the value pragmatically' , fakeAsync( () => {
            let changes;
            let firedCounter = 0;
            DropdownComponent.selected.subscribe( ( _changes ) => {
                changes = _changes;
                firedCounter ++;
            } );
            QueryControl.setValue( TitleOptions[ 0 ].label );
            tick();
            let selectedObject = {
                label : TitleOptions[ 0 ].label ,
                value : TitleOptions[ 0 ].value
            };
            expect( changes ).toEqual( selectedObject );
            expect( firedCounter ).toBe( 1 );
            openTheDropdown();
            selectFirstItem();
            tick();
            expect( firedCounter ).toBe( 1 );
        } ) );
        it( 'should fire selected event after setting the value to null ' , fakeAsync( () => {
            openTheDropdown();
            selectFirstItem();
            let changes;
            DropdownComponent.selected.subscribe( ( _changes ) => {
                changes = _changes;
            } );
            QueryControl.setValue( null );
            tick();
            let selectedObject = {
                label : null ,
                value : null
            };
            expect( changes ).toEqual( selectedObject );
        } ) );
    } );
    describe( 'With retrieved controlGroup' , () => {
        beforeEach( () => {
            createOverridenComponent();
        } );
        doDefineElementsBeforeEach();
        it( 'it should be preselected if the controlGroup has values initially' , () => {
            expect( QueryControl.value ).toBe( TitleOptions[ 0 ].label );
            expect( SelectedControl.value ).toBe( TitleOptions[ 0 ].value );
            expect( getValueOfSelectedOption() ).toBe( TitleOptions[ 0 ].label );
        } );
        it( 'should empty all the controls and selectedElement object' , () => {
            DropdownComponent.emptyAll();
            expectAllControlsToBeNull();
        } );
    } );
} );
@Component( {
    template : `
        <form #formModel  class='nl-form' >
             <amp-dropdown
                #dropDownCmp
                [isInSummaryState]='isInSummaryState'
                [id]='"Title"'
                [label]='"Title"'
                [options]='titleOptions'
                [controlGroup]="__controlGroup"
                [required]="true">
                <template let-option="option">
                    {{ option.label }}
                </template>
            </amp-dropdown>
        </form>
        <button id='deselect' (click)='setTo(null)'>Deselect</button>
        <button id='wrongSelect' (click)='setTo("Milad")'>wrongSelect</button>
    `
} )
class AmpdropdownTest {
    @ViewChild( 'dropDownCmp' ) dropDownCmp;
    public titleOptions            = [
        { value : 'mr' , label : 'Mr' } ,
        { value : 'mrs' , label : 'Mrs' } ,
        { value : 'miss' , label : 'Miss' } ,
        { value : 'ms' , label : 'Ms' } ,
        { value : 'dr' , label : 'Dr' }
    ];
    public __controlGroup          = new AmpFormGroup( {} );
    public __retrievedControlGroup = new AmpFormGroup( {
            'TitleDropdown' : new FormGroup( {
                'SelectedItem' : new FormControl( this.titleOptions[ 0 ].value ) ,
                'Query'        : new FormControl( this.titleOptions[ 0 ].label )
            } )
        }
    );
    public isInSummaryState        = false;
    private FDN                    = [ 'Application' , 'ContactDetails' ];

    constructor () {
        this.__controlGroup.__fdn          = this.FDN;
        this.__retrievedControlGroup.__fdn = this.FDN;
    }

    get fdnJoined () {
        return [ ...this.FDN , 'Title' ].join( '-' );
    }

    get DropdownControlGroup () {
        return <AmpFormGroup> this.dropDownCmp.dropdownControlGroup;
    }

    get QueryControl () {
        return this.dropDownCmp.control;
    }

    get SelectedControl () {
        return this.dropDownCmp.selectedControl;
    }

    private setTo ( _value ) {
        this.QueryControl.setValue( _value );
    }
}
