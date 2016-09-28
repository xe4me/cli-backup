import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef , ReflectiveInjector , Injector , Injectable } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup , FormBuilder } from '@angular/forms';
import { Observable , BehaviorSubject } from 'rxjs';
import {
    AmpQasAddressModule ,
    AmpQasAddressService ,
    AmpQasAddressComponent
} from '../../../app/modules/amp-qas-address';
import { AmpTypeaheadComponent } from '../../../app/modules/amp-typeahead';
import { By } from '@angular/platform-browser';
import { inject , ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
@Injectable()
export class MockAmpQasAddressService {
    public static sampleSearchTerm = 'Pymble';
    public sampleResponse          = [
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'COAUSHAfgBwMAAQAARkumQAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, MILLTHORPE  NSW  2798' ,
            'Picklist'       : 'Pym Street, MILLTHORPE  NSW' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : '1OAUSHAfgBwMAAQAAgnUMgAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, BOONDALL  QLD  4034' ,
            'Picklist'       : 'Pym Street, BOONDALL  QLD' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'uOAUSHAfgBwMAAQAAyu6_wAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, BELAIR  SA  5052' ,
            'Picklist'       : 'Pym Street, BELAIR  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : '7OAUSHAfgBwMAAQAAzYdWwAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, CROYDON PARK  SA  5008' ,
            'Picklist'       : 'Pym Street, CROYDON PARK  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'BOAUSHAfgBwMAAQAAzf0CgAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, DUDLEY PARK  SA  5008' ,
            'Picklist'       : 'Pym Street, DUDLEY PARK  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'TOAUSHAfgBwMAAQAA0tIzAAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Road, INKERMAN  SA  5550' ,
            'Picklist'       : 'Pym Road, INKERMAN  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'COAUSHAfgBwMAAQAA1bYuwAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, MIDDLETON  SA  5213' ,
            'Picklist'       : 'Pym Street, MIDDLETON  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : 'JOAUSHAfgBwMAAQAA3B47AAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Street, PROSPECT  SA  5082' ,
            'Picklist'       : 'Pym Street, PROSPECT  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        } ,
        {
            'attributes'     : {
                'Multiples' : 'true' ,
                'CanStep'   : 'true'
            } ,
            'Moniker'        : '2OAUSHAfgBwMAAQAA3OcqgAAAAAAAFAA-' ,
            'PartialAddress' : 'Pym Road, ROCKLEIGH  SA  5254' ,
            'Picklist'       : 'Pym Road, ROCKLEIGH  SA' ,
            'Postcode'       : '' ,
            'Score'          : '20'
        }
    ];
    private subject                = new BehaviorSubject( this.sampleResponse );
    private nullSubject            = new BehaviorSubject( null );
    public query                   = ( queryValue : string ) : Observable<any> => {
        return queryValue === MockAmpQasAddressService.sampleSearchTerm ? this.subject.asObservable() : this.nullSubject.asObservable();
        // .catch(this.handleError);
    };
}
describe( 'amp-qas-address component' , () => {
    let _searchTerm = MockAmpQasAddressService.sampleSearchTerm;
    let _fixture;
    let _compInjector : Injector;
    let _comp;
    let _element;
    let _debugElement;
    let _testComponentControlGroup;
    let _qasComponentControlGroup;
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ AmpQasAddressComponentTest ] ,
            providers    : [
                {
                    provide  : AmpQasAddressService ,
                    useClass : MockAmpQasAddressService
                } ,
                { provide : ComponentFixtureAutoDetect , useValue : true }
            ] ,
            imports      : [ FormsModule , ReactiveFormsModule , AmpQasAddressModule ]
        } );
        _fixture = TestBed.createComponent( AmpQasAddressComponentTest );
        _fixture.detectChanges();
        _compInjector = _fixture.debugElement.injector;
        _comp         = _fixture.componentInstance;
        _debugElement = _fixture.debugElement;
        _element      = _fixture.nativeElement;
    } ) );
    beforeEach( () => {
        _testComponentControlGroup = _comp.__controlGroup;
        _qasComponentControlGroup  = _testComponentControlGroup.controls[ AmpQasAddressComponent.QAS_ADDRESS_CONTROL_GROUP_NAME ];
    } );
    it( 'testComponentControlGroup should be defined ' , () => {
        _fixture.detectChanges();
        expect( _testComponentControlGroup ).toBeDefined();
    } );
    it( 'testComponentControlGroup should have a  controlGroup named ' + AmpQasAddressComponent.QAS_ADDRESS_CONTROL_GROUP_NAME , () => {
        _fixture.detectChanges();
        expect( _qasComponentControlGroup ).toBeDefined();
    } );
    it( 'qas controlGroup should have two controls corresponding to the ids provided ' , () => {
        _fixture.detectChanges();
        expect( Object.keys( _qasComponentControlGroup.controls ).length ).toEqual( 2 );
        expect( _qasComponentControlGroup.controls [ _comp.__custom.controls[ 0 ].id ] ).toBeDefined();
        expect( _qasComponentControlGroup.controls [ _comp.__custom.controls[ 0 ].id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ] ).toBeDefined();
    } );
    it( 'should have a amp-error component that has the same controlGroup as qasAddressComponent' , () => {
        _fixture.detectChanges();
        let ErrorEl = _debugElement.query( By.css( 'amp-error' ) );
        expect( ErrorEl ).toBeDefined();
        let ErrorComponent = ErrorEl.componentInstance;
        expect( ErrorComponent.controlGroup ).toBeDefined();
        expect( ErrorComponent.controlGroup ).toEqual( _qasComponentControlGroup );
    } );
    it( 'should fire up the selected' , () => {
        _fixture.detectChanges();
        let ErrorEl = _debugElement.query( By.css( 'amp-error' ) );
        expect( ErrorEl ).toBeDefined();
        let ErrorComponent = ErrorEl.componentInstance;
        expect( ErrorComponent.controlGroup ).toBeDefined();
        expect( ErrorComponent.controlGroup ).toEqual( _qasComponentControlGroup );
    } );
} );
@Component( {
    template : `
        <form [formGroup]='form' class='nl-form'>
            <amp-qas-address
                class='1/3'
                [controlGroup]='__controlGroup'
                [id]='__custom.controls[0].id'
                [required]='__custom.controls[0].required'
                [label]='__custom.controls[0].label'
                >
            </amp-qas-address>
        </form>
    `
} )
class AmpQasAddressComponentTest {
    public __controlGroup = new FormGroup( {} );
    public __custom       = {
        controls : [
            {
                id       : 'amp-qas' ,
                label    : 'Search here' ,
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

    get control () {
        if ( this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            return this.__controlGroup.controls[ this.__custom.controls[ 0 ].id ];
        }
    }
}
