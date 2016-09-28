import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import {
    Component , provide , ElementRef , ReflectiveInjector , Injector , Injectable ,
    ViewChild
} from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup , FormBuilder } from '@angular/forms';
import { Observable , BehaviorSubject } from 'rxjs';
import {
    AmpTypeaheadModule
} from '../../../app/modules/amp-typeahead';
import { AmpTypeaheadComponent } from '../../../app/modules/amp-typeahead';
import { By } from '@angular/platform-browser';
import { inject , ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { fakeAsync , tick } from '@angular/core/testing/fake_async';
describe( 'amp-typeahead component' , () => {
    let _fixture;
    let _testCmpInjector : Injector;
    let _typeAheadCmp;
    let _testCmp;
    let _element;
    let _debugElement;
    let _testCmpControlGroup;
    let _cmpControlGroup;
    let _inputElement;
    let _btnElement;

    function getAlltheLis () {
        return _debugElement.queryAll( By.css( 'li' ) );
    }

    function getAlltheUls () {
        return _debugElement.queryAll( By.css( 'ul' ) );
    }

    function focusOnInput () {
        _inputElement.focus();
        _inputElement.dispatchEvent( new Event( 'input' ) );
        _fixture.detectChanges();
    }

    function focusOut () {
        _btnElement.click();
        _fixture.detectChanges();
    }

    function selectFirstItem () {
        selectItemByIndex( 0 );
    }

    function selectItemByIndex ( _index ) {
        let liElements = getAlltheLis();
        liElements[ _index ].nativeElement.click();
        _fixture.detectChanges();
    }

    function updateInputText ( text : string ) {
        _inputElement.value = text;
        _inputElement.dispatchEvent( new Event( 'input' ) );
        _fixture.detectChanges();
    }

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ AmpTypeaheadComponentTest ] ,
            providers    : [
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ] ,
            imports      : [ FormsModule , ReactiveFormsModule , AmpTypeaheadModule ]
        } );
        _fixture         = TestBed.createComponent( AmpTypeaheadComponentTest );
        _testCmpInjector = _fixture.debugElement.injector;
        _testCmp         = _fixture.componentInstance;
        _typeAheadCmp    = _testCmp.typeAheadComponent;
        _debugElement    = _fixture.debugElement;
        _element         = _fixture.nativeElement;
        _fixture.detectChanges();
    } ) );
    beforeEach( () => {
        _testCmpControlGroup = _testCmp.__controlGroup;
        _cmpControlGroup     = _testCmpControlGroup.controls[ AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ];
        _inputElement        = _debugElement.query( By.css( 'input' ) ).nativeElement;
        _btnElement          = _debugElement.query( By.css( '#btn' ) ).nativeElement;
    } );
    describe( 'controlGroup and controls ' , () => {
        it( 'testComponentControlGroup should be defined ' , () => {
            expect( _testCmpControlGroup ).toBeDefined();
        } );
        it( '_cmpControlGroup should be defined ' , () => {
            expect( _cmpControlGroup ).toBeDefined();
        } );
        it( '_cmpControlGroup should should have two controls one for the input and one for the selected' +
            ' item ' , () => {
            expect( Object.keys( _cmpControlGroup.controls ).length ).toBe( 2 );
            expect( _cmpControlGroup.contains( _testCmp.id ) ).toBeTruthy();
            expect( _cmpControlGroup.contains( _testCmp.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ) ).toBeTruthy();
        } );
        it( '_cmpControlGroup value should have null values initially  ' , () => {
            let groupValue                                                                = {};
            groupValue[ _testCmp.id ]                                                     = null;
            groupValue[ _testCmp.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ] = null;
            expect( _cmpControlGroup.value ).toEqual( groupValue );
        } );
    } );
    describe( 'Component native elements and tags' , () => {
        it( 'should not have any ul element initially and should isOptionsHidden be true    ' , () => {
            let ulElements = getAlltheUls();
            expect( ulElements.length ).toBe( 0 );
            expect( _typeAheadCmp.isOptionsHidden ).toBeTruthy();
        } );
        it( 'should open the search result after focus on the input , if the options are provided ' , () => {
            focusOnInput();
            let ulElements = getAlltheUls();
            expect( ulElements.length ).toBe( 1 );
            expect( _typeAheadCmp.isOptionsHidden ).toBeFalsy();
        } );
        it( 'should have as many list element as provider options , after focusing without typing' +
            ' typing(filtering)' , () => {
            focusOnInput();
            let liElements = getAlltheLis();
            expect( liElements.length ).toBe( _testCmp.options.length );
        } );
        it( 'should close the dropdown upon clicking oputside of the typeahead' +
            ' typing(filtering)' , () => {
            focusOnInput();
            let liElements = getAlltheLis();
            expect( liElements.length ).toBe( _testCmp.options.length );
            let ulElements = getAlltheUls();
            expect( ulElements.length ).toBe( 1 );
            expect( _typeAheadCmp.isOptionsHidden ).toBeFalsy();
            focusOut();
            liElements = getAlltheLis();
            expect( liElements.length ).toBe( 0 );
            expect( _typeAheadCmp.isOptionsHidden ).toBeTruthy();
        } );
    } );
    describe( 'Typing and updating controls' , () => {
        it( 'should update the AmpTypeahead control and controlGroup when typing inside the search input' , () => {
            let text = 'im searching ';
            updateInputText( text );
            expect( _cmpControlGroup.controls[ _testCmp.id ].value ).toBe( text );
            let groupValue                                                                = {};
            groupValue[ _testCmp.id ]                                                     = text;
            groupValue[ _testCmp.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ] = null;
            expect( _cmpControlGroup.value ).toEqual( groupValue );
        } );
        it( 'should update the AmpTypeahead control and selectedControl and controlGroup after selecting an option' , () => {
            _inputElement.focus();
            _inputElement.dispatchEvent( new Event( 'input' ) );
            _fixture.detectChanges();
            let liElements = getAlltheLis();
            liElements[ 0 ].nativeElement.click();
            expect( _cmpControlGroup.controls[ _testCmp.id ].value ).toBe( _testCmp.options[ 0 ].title );
            expect( _cmpControlGroup.controls[ _testCmp.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ].value ).toBe( JSON.stringify( _testCmp.options[ 0 ] ) );
        } );
        it( 'control group should be valid if select an option' , () => {
            focusOnInput();
            selectFirstItem();
            expect( _cmpControlGroup.valid ).toBeTruthy();
        } );
        it( 'should empty the selectedControl after selecting an option and typing again ' , () => {
            focusOnInput();
            selectFirstItem();
            expect( _cmpControlGroup.controls[ _testCmp.id ].value ).toBe( _testCmp.options[ 0 ].title );
            expect( _cmpControlGroup.controls[ _testCmp.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ].value ).toBe( JSON.stringify( _testCmp.options[ 0 ] ) );
            let text = 'this text will be added to the end of the curent text';
            updateInputText( _inputElement.value + text );
            expect( _cmpControlGroup.controls[ _testCmp.id ].value ).toBe( _testCmp.options[ 0 ].title + text );
            expect( _cmpControlGroup.controls[ _testCmp.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ].value ).toBe( null );
        } );
        it( 'control should have an invalidSearch error if update the input after selecting an option' , () => {
            focusOnInput();
            selectFirstItem();
            updateInputText( 'dymmy text' );
            expect( _cmpControlGroup.valid ).toBeFalsy();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors.invalidSearch ).toBeDefined();
        } );
        it( 'controlGroup should be valid after selecting , updating , selecting again !!! ' , () => {
            focusOnInput();
            selectFirstItem();
            updateInputText( 'dymmy text' );
            expect( _cmpControlGroup.valid ).toBeFalsy();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors.invalidSearch ).toBeDefined();
            updateInputText( '' );
            selectItemByIndex( 5 );
            expect( _cmpControlGroup.valid ).toBeTruthy();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors ).toBeNull();
        } );
        it( 'control should only have required error after selecting and the removing the text ' , () => {
            focusOnInput();
            selectFirstItem();
            updateInputText( '' );
            expect( _cmpControlGroup.valid ).toBeFalsy();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors.required ).toBeDefined();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors.invalidSearch ).toBeUndefined();
        } );
        it( 'control should only have invalidSearch error after updating the text but not selecting' , () => {
            focusOnInput();
            selectFirstItem();
            updateInputText( 'dummy text' );
            expect( _cmpControlGroup.valid ).toBeFalsy();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors.required ).toBeUndefined();
            expect( _cmpControlGroup.controls[ _testCmp.id ].errors.invalidSearch ).toBeDefined();
        } );
    } );
} );
@Component( {
    template : `
        <form [formGroup]='form' class='nl-form'>
            <button id='btn'>button</button>
            <amp-typeahead
                    #typeAheadComponent
                    [options]="options"
                    [controlGroup]="__controlGroup"
                    (selected)="onChange($event)"
                    [selectedItemValueIdentifier]='__custom.controls[0].selectedItemValueIdentifier'
                    [selectedItemIdentifier]='__custom.controls[0].selectedItemIdentifier'
                    [isInSummaryState]="isInSummaryState"
                    [label]='__custom.controls[0].label'
                    [required]='__custom.controls[0].required'
                    [id]='__custom.controls[0].id'
                    [selectLabel]='__custom.controls[0].dropDownLabel'>
                <template let-option="option">
                    {{ option.title }}
                </template>
            </amp-typeahead>
        </form>
    `
} )
class AmpTypeaheadComponentTest {
    @ViewChild( 'typeAheadComponent' ) typeAheadComponent;
    public __controlGroup : FormGroup                   = new FormGroup( {} );
    public __custom                                     = {
        controls : [
            {
                id                          : 'amp-typeahead' ,
                label                       : 'This is a type ahead label' ,
                required                    : true ,
                selectedItemIdentifier      : 'id' ,
                dropDownLabel               : 'drop down first label' ,
                selectedItemValueIdentifier : 'title'
            }
        ]
    };
                                       isInSummaryState = false;
    private options                                     = [
        {
            'id'       : 1 ,
            'title'    : 'Professional (medical)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 2 ,
            'title'    : 'White collar professional (specialist)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 903 ,
            'title'    : 'University - tutor (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 905 ,
            'title'    : 'Upholsterer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 906 ,
            'title'    : 'Urologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 907 ,
            'title'    : 'Valuer (registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 908 ,
            'title'    : 'Vending machine serviceman' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 909 ,
            'title'    : 'Veterinarian - domestic pets (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 910 ,
            'title'    : 'Veterinarian - other' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 911 ,
            'title'    : 'Veterinary surgeon - city practice (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 912 ,
            'title'    : 'Veterinary surgeon - country practice' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 913 ,
            'title'    : 'Vigneron/winemaker (minimal manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 914 ,
            'title'    : 'Waiter/waitress - bar duties incuded' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 915 ,
            'title'    : 'Waiter/waitress - table service only' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 916 ,
            'title'    : 'Wardrobe - film/theatre' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        }
    ];
    private selectedOption;
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

    private onChange ( option ) {
        this.selectedOption = option;
    }

    get searchControlGroup () : any {
        if ( this.__controlGroup.controls[ AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ] ) {
            return this.__controlGroup.controls[ AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ];
        }
    }

    get control () {
        if ( this.searchControlGroup ) {
            return this.searchControlGroup.controls[ this.id ];
        }
    }

    get selectControl () {
        if ( this.searchControlGroup ) {
            return this.searchControlGroup.controls[ this.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ];
        }
    }

    get id () {
        return this.__custom.controls[ 0 ].id;
    }

    private onAcknowledgeSelect ( value ) {
    }
}
