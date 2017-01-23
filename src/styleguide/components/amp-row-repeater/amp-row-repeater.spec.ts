import {
    async,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';
import {
    Component,
    ViewChild,
    Injector
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import {
    AmpRowRepeaterModule,
    AmpRowRepeaterComponent
} from '../../../app/modules/amp-row-repeater';
import { AmpInputsModule } from '../../../app/modules/amp-inputs';
import { AmpFormModule } from '../../../app/modules/amp-form';
describe( 'amp-row-repeater component', () => {
    let _fixture;
    let _testCmpInjector : Injector;
    let _testCmp;
    let _element;
    let _debugElement;
    let _testCmpControlGroup;
    let _repeaterComp : AmpRowRepeaterComponent;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ TestComponent ],
            providers    : [
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ],
            imports      : [
                HttpModule,
                FormsModule,
                ReactiveFormsModule,
                AmpRowRepeaterModule,
                AmpInputsModule,
                AmpFormModule
            ]
        } );
        _fixture             = TestBed.createComponent( TestComponent );
        _testCmpInjector     = _fixture.debugElement.injector;
        _testCmp             = _fixture.componentInstance;
        _repeaterComp        = _testCmp.repeater;
        _debugElement        = _fixture.debugElement;
        _element             = _fixture.nativeElement;
        _testCmpControlGroup = _testCmp.__controlGroup;
        _fixture.detectChanges();
    } ) );
    it( 'testComponentControlGroup should be defined ', () => {
        expect( _testCmpControlGroup ).toBeDefined();
    } );
    it( '_repeaterComp should be defined ', () => {
        expect( _repeaterComp ).toBeDefined();
    } );
    describe( 'add', () => {
        it( 'should initially have one row if initialRowCount has not been specified', () => {
            expect( _repeaterComp.rowCount ).toBe( 1 );
        } );
        it( 'should should add a row when clicking calling add() without specifying how many ', () => {
            _repeaterComp.add();
            expect( _repeaterComp.rowCount ).toBe( 2 );
        } );
        it( 'should should add as much row as specified in the add function when called', () => {
            _repeaterComp.add( 4 );
            expect( _repeaterComp.rowCount ).toBe( 5 );
        } );
        it( 'should not add more than the maxRows if specified', () => {
            // considering max row is 5
            _repeaterComp.add( 10 );
            expect( _repeaterComp.rowCount ).toBe( 5 );
        } );
        it( 'should add one more , if the number of rows are less than specified number', () => {
            _repeaterComp.addIfLt( 2 );
            expect( _repeaterComp.rowCount ).toBe( 2 );
        } );
        it( 'should add one more , if the number of rows are less than or equal to specified number', () => {
            _repeaterComp.addIfLtE( 1 );
            expect( _repeaterComp.rowCount ).toBe( 2 );
        } );
        it( 'should NOT add one more if the row count is NOT less than or equal the specified number ', () => {
            _repeaterComp.addIfLtE( 0 );
            expect( _repeaterComp.rowCount ).toBe( 1 );
        } );
        it( 'should NOT add one more if the row count is not less than the specified number ', () => {
            _repeaterComp.addIfLt( 0 );
            expect( _repeaterComp.rowCount ).toBe( 1 );
        } );
        it( 'should add one more , if the number of rows are greater than specified number', () => {
            _repeaterComp.addIfGt( 0 );
            expect( _repeaterComp.rowCount ).toBe( 2 );
        } );
        it( 'should add one more , if the number of rows are greater than or equal to the specified number', () => {
            _repeaterComp.addIfGtE( 1 );
            expect( _repeaterComp.rowCount ).toBe( 2 );
        } );
        it( 'should NOT add one more , if the number of rows are NOT greater than to the specified number', () => {
            _repeaterComp.addIfGt( 1 );
            expect( _repeaterComp.rowCount ).toBe( 1 );
        } );
        it( 'should NOT add one more , if the number of rows are NOT greater than or equal to the specified number', () => {
            _repeaterComp.addIfGtE( 2 );
            expect( _repeaterComp.rowCount ).toBe( 1 );
        } );
        it( 'should have the rowCount the same as initialRowCount if specified', () => {
            _testCmp.initialRowCount = 5;
            _fixture.detectChanges();
            _repeaterComp.removeAll();
            _repeaterComp.init();
            _fixture.detectChanges();
            expect( _repeaterComp.rowCount ).toBe( _testCmp.initialRowCount );
        } );
        it( 'should emit an event when adding a row', fakeAsync( () => {
            let eventCounter = 0;
            _repeaterComp.$add.subscribe( ( event ) => {
                expect( event ).toBeDefined();
                expect( eventCounter ).toBe( 0 );
                eventCounter++;
            } );
            tick();
        } ) );
    } );
    describe( 'remove', () => {
        it( 'should REMOVE all the rows and the rowCount should be 0 if reset is called', () => {
            _repeaterComp.removeAll();
            expect( _repeaterComp.rowCount ).toBe( 0 );
        } );
        it( 'should REMOVE only the specified row if remove is called', () => {
            _repeaterComp.add( 4 );
            expect( _repeaterComp.rowCount ).toBe( 5 );
            _repeaterComp.removeAt( 4 );
            expect( _repeaterComp.rowCount ).toBe( 4 );
        } );
        it( 'should NOT REMOVE if the number is not specified when remove is called', () => {
            _repeaterComp.add( 4 );
            expect( _repeaterComp.rowCount ).toBe( 5 );
            (<any> _repeaterComp).removeAt();
            expect( _repeaterComp.rowCount ).toBe( 5 );
        } );
        it( 'should emit an event when removing a row', fakeAsync( () => {
            _repeaterComp.add( 5 );
            _fixture.detectChanges();
            let eventCounter = 0;
            _repeaterComp.$remove.subscribe( ( event ) => {
                expect( event ).toBeDefined();
                expect( event ).toBe( 0 );
                expect( eventCounter ).toBe( 0 );
                eventCounter++;
            } );
            _repeaterComp.removeAt( 0 );
            tick();
        } ) );
    } );

    describe( 'buttons when specified', () => {
        it( 'should have an add button with the correct label if specified', () => {
            let AddButtonElementDebugElem = _debugElement.query( By.css( '.btn-add' ) );
            let AddButtonElement          = AddButtonElementDebugElem.nativeElement;
            expect( AddButtonElementDebugElem ).toBeDefined();
            expect( AddButtonElement ).toBeDefined();
            expect( AddButtonElement.innerText ).toBe( 'Add another one' );
        } );
        it( 'should have the add button disabled if the rowCount and maxRows are met', () => {
            _repeaterComp.add( 10 );
            _fixture.detectChanges();
            let AddButtonElementDebugElem = _debugElement.query( By.css( '.btn-add' ) );
            let AddButtonElement          = AddButtonElementDebugElem.nativeElement;
            expect( AddButtonElementDebugElem ).toBeDefined();
            expect( AddButtonElement ).toBeDefined();
            expect( AddButtonElement.disabled ).toBe( true );
        } );
        it( 'should have a remove button for each row if the row count is more than 1', () => {
            _repeaterComp.add( 5 );
            _fixture.detectChanges();
            let RemoveButtons = document.querySelectorAll( '.row-repeated__btn-remove' );
            expect( RemoveButtons ).toBeDefined();
            expect( RemoveButtons.length ).toBe( _repeaterComp.rowCount );
        } );
        it( 'should NOT have a remove button if the row count is less than or equal to one', () => {
            let RemoveButtons = document.querySelectorAll( '.row-repeated__btn-remove' );
            expect( RemoveButtons.length ).toBe( 0 );
        } );
    } );
} );
@Component( {
    template : `
    <amp-row-repeater
            #repeater
            [controlGroup]="__controlGroup"
            [id]="'EquityHolders'"
            [addBtn]="'Add another one'"
            [maxRows]="5"
            [removeBtn]="'Remove'"
            [initialRowCount]="initialRowCount"
            [hasButtons]="hasButtons"
            [isInSummaryState]="isInSummaryState">
        <template let-index="index" let-controlGroup="controlGroup">
            <h2 class="heading heading-intro" [ngClass]="{'mt-30': index }">
                Row {{ index + 1 }}
            </h2>

            <amp-form-row>
                <div class="grid__item_floated lap-and-up-1/2 lap-and-up-pr">
                    <amp-first-name
                            [id]="'firstname'"
                            [keepControl]='true'
                            [controlGroup]="controlGroup"
                            [isInSummaryState]="isInSummaryState">
                    </amp-first-name>
                </div>
                <div class="grid__item_floated lap-and-up-1/2">
                    <amp-last-name
                            [id]="'lastname'"
                            [keepControl]='true'
                            [controlGroup]="controlGroup"
                            [isInSummaryState]="isInSummaryState">
                    </amp-last-name>
                </div>
            </amp-form-row>
        </template>
    </amp-row-repeater>
    `
} )
class TestComponent {
    @ViewChild( 'repeater' ) repeater;
    private initialRowCount : 1;
    private toggleFlag : boolean;
    private hasButtons : boolean       = true;
    private __controlGroup : FormGroup = new FormGroup( {} );
}
