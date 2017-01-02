import {
    async,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    Injector,
    Injectable,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder
} from '@angular/forms';
import {
    Observable,
    BehaviorSubject
} from 'rxjs';
import { AmpQasAddressModule } from '../../../app/modules/amp-qas-address';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpCountryService } from '../../../app/modules/amp-dropdown/services/amp-country.service';
import { By } from '@angular/platform-browser';
import { AmpManualAddressComponent } from '../../../app/modules/amp-qas-address/components/amp-manual-address/amp-manual-address.component';
import {
    fakeAsync,
    tick
} from '@angular/core/testing/fake_async';
@Injectable()
export class MockAmpCountryService {
    public static _countries = [
        {
            countryCode : 'AUS',
            country     : 'Australia'
        },
        {
            countryCode : 'NZL',
            country     : 'New Zealand'
        },
        {
            countryCode : 'AFG',
            country     : 'Afghanistan'
        },
        {
            countryCode : 'ALB',
            country     : 'Albania'
        },
        {
            countryCode : 'DZA',
            country     : 'Algeria'
        },
        {
            countryCode : 'ASM',
            country     : 'American Samoa'
        },
        {
            countryCode : 'AND',
            country     : 'Andorra'
        },
        {
            countryCode : 'AGO',
            country     : 'Angola'
        },
        {
            countryCode : 'AIA',
            country     : 'Anguilla'
        },
        {
            countryCode : 'ATA',
            country     : 'Antarctica'
        },
        {
            countryCode : 'ATG',
            country     : 'Antigua and Barbuda'
        },
        {
            countryCode : 'ARG',
            country     : 'Argentina'
        },
        {
            countryCode : 'ARM',
            country     : 'Armenia'
        },
        {
            countryCode : 'ABW',
            country     : 'Aruba'
        },
        {
            countryCode : 'AUT',
            country     : 'Austria'
        },
        {
            countryCode : 'AZE',
            country     : 'Azerbaijan'
        },
        {
            countryCode : 'BHS',
            country     : 'Bahamas'
        },
        {
            countryCode : 'BHR',
            country     : 'Bahrain'
        },
        {
            countryCode : 'BGD',
            country     : 'Bangladesh'
        },
        {
            countryCode : 'BRB',
            country     : 'Barbados'
        },
        {
            countryCode : 'BLR',
            country     : 'Belarus'
        },
        {
            countryCode : 'BEL',
            country     : 'Belgium'
        },
        {
            countryCode : 'BLZ',
            country     : 'Belize'
        },
        {
            countryCode : 'BEN',
            country     : 'Benin'
        },
        {
            countryCode : 'BMU',
            country     : 'Bermuda'
        },
        {
            countryCode : 'BTN',
            country     : 'Bhutan'
        },
        {
            countryCode : 'BOL',
            country     : 'Bolivia'
        },
        {
            countryCode : 'BIH',
            country     : 'Bosnia and Herzegowina'
        },
        {
            countryCode : 'BWA',
            country     : 'Botswana'
        },
        {
            countryCode : 'BVT',
            country     : 'Bouvet Island'
        },
        {
            countryCode : 'BRA',
            country     : 'Brazil'
        },
        {
            countryCode : 'IOT',
            country     : 'British Indian Ocean Territory'
        },
        {
            countryCode : 'BRN',
            country     : 'Brunei Darussalam'
        },
        {
            countryCode : 'BGR',
            country     : 'Bulgaria'
        },
        {
            countryCode : 'BFA',
            country     : 'Burkina Faso'
        },
        {
            countryCode : 'BDI',
            country     : 'Burundi'
        },
        {
            countryCode : 'HRV',
            country     : 'CROATIA (Local Name: Hrvatska)'
        },
        {
            countryCode : 'KHM',
            country     : 'Cambodia'
        },
        {
            countryCode : 'CMR',
            country     : 'Cameroon'
        }
    ];
    private subject          = new BehaviorSubject( MockAmpCountryService._countries );
    public getCountries      = () : Observable<any> => {
        return this.subject.asObservable();
    }
}
describe( 'manual-address component', () => {
    let _fixture;
    let _compInjector : Injector;
    let _comp;
    let _element;
    let _debugElement;
    let _countryDropdownElement;
    let _testComponentControlGroup;
    let _countryDropdownCmp;
    let _countryDropdownFixture;
    let _addressCtrl : any;
    let _stateCtrl : any;
    let _countryCtrl : any;
    let _suburbCtrl : any;
    let _postCodeCtrl : any;
    let _cityCtrl : any;
    let _manualAddressCmp;
    const COUNTRY_AUS    = 'Australia';
    const COUNTRY_OTHERS = 'Iran';
    const COUNTRY_NZ     = 'New Zealand';
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ AmpManualAddressComponentTest ],
            providers    : [
                {
                    provide  : AmpCountryService,
                    useClass : MockAmpCountryService
                },
                { provide : ComponentFixtureAutoDetect, useValue : true }
            ],
            imports      : [ FormsModule, ReactiveFormsModule, AmpQasAddressModule ]
        } );
        _fixture = TestBed.createComponent( AmpManualAddressComponentTest );
        _fixture.detectChanges();
        _compInjector = _fixture.debugElement.injector;
        _comp         = _fixture.componentInstance;
        _debugElement = _fixture.debugElement;
        _element      = _fixture.nativeElement;
    } ) );
    beforeEach( () => {
        _testComponentControlGroup = _comp.__controlGroup;
        _manualAddressCmp          = _comp.manualAddressCmp;
    } );
    // Lets get all the elements we need
    beforeEach( () => {
        _countryDropdownFixture = _debugElement.query( By.css( 'amp-country' ) );
        _countryDropdownElement = _countryDropdownFixture.nativeElement;
        _countryDropdownCmp     = _countryDropdownFixture.componentInstance;
        _addressCtrl            = _manualAddressCmp.addressCtrl;
        _stateCtrl              = _manualAddressCmp.stateCtrl;
        _countryCtrl            = _manualAddressCmp.countryCtrl;
        _suburbCtrl             = _manualAddressCmp.suburbCtrl;
        _postCodeCtrl           = _manualAddressCmp.postCodeCtrl;
        _cityCtrl               = _manualAddressCmp.cityCtrl;
    } );
    function selectNewZealand () {
        _manualAddressCmp.manualCountryCmp.control.setValue( AmpManualAddressComponent.COUNTRY_NZ );
        _fixture.detectChanges();
    }

    function selectOtherCountries () {
        _manualAddressCmp.manualCountryCmp.control.setValue( MockAmpCountryService._countries[ 5 ].country );
        _countryCtrl.updateValueAndValidity( {
            emitEvent : true
        } );
        _fixture.detectChanges();
    }

    it( 'testComponentControlGroup should be defined ', () => {
        expect( _testComponentControlGroup ).toBeDefined();
    } );
    it( '_manualAddressCmp should be defined ', () => {
        expect( _manualAddressCmp ).toBeDefined();
    } );
    it( 'controls to be defined', () => {
        expect( _addressCtrl ).toBeDefined();
        expect( _stateCtrl ).toBeDefined();
        expect( _countryCtrl ).toBeDefined();
        expect( _suburbCtrl ).toBeDefined();
        expect( _postCodeCtrl ).toBeDefined();
        expect( _cityCtrl ).toBeDefined();
    } );
    it( 'controls value to be null initially except Country control', () => {
        expect( _addressCtrl.value ).toBeNull();
        expect( _stateCtrl.value ).toBeNull();
        expect( _suburbCtrl.value ).toBeNull();
        expect( _postCodeCtrl.value ).toBeNull();
        expect( _cityCtrl.value ).toBeNull();
    } );
    it( 'It should have the country dropdown always, preselected with Australia and the value should be' + COUNTRY_AUS, fakeAsync( () => {
        tick()
        expect( _countryDropdownElement ).toBeDefined();
        expect( _countryDropdownCmp ).toBeDefined();
        expect( _countryDropdownCmp.control ).toBeDefined();
        expect( _countryDropdownCmp.control.value ).toBe( COUNTRY_AUS );
    } ) );
    describe( 'When selected Australia', () => {
        it( 'it should have Street address , Suburb , State and Postcode visible and' +
            ' mandatory', () => {
            expect( _addressCtrl.errors.required ).toBeDefined();
            expect( _addressCtrl.errors.required.text ).toBe( _manualAddressCmp.address.errors.required );
            expect( _suburbCtrl.errors.required ).toBeDefined();
            expect( _suburbCtrl.errors.required.text ).toBe( _manualAddressCmp.suburb.errors.required );
            expect( _stateCtrl.errors.required ).toBeDefined();
            expect( _stateCtrl.errors.required.text ).toBe( _manualAddressCmp.state.errors.required );
            expect( _postCodeCtrl.errors.required ).toBeDefined();
            expect( _postCodeCtrl.errors.required.text ).toBe( _manualAddressCmp.postCode.errors.required );
        } );
        it( ' City should be defined but not visible and not mandatory', () => {
            expect( _cityCtrl.errors ).toBeNull();
            expect( _cityCtrl.valid ).toBeTruthy();
            let cityComponent = _debugElement.query( By.css( '#' + _manualAddressCmp.city.id ) );
            expect( cityComponent ).toBeNull();
        } );
        it( ' Suburb should have a label of suburb', () => {
            expect( _manualAddressCmp.manualSuburbCmp.label ).toBe( _manualAddressCmp.suburb.label );
        } );
    } );
    describe( 'When selected NewZealand', () => {
        beforeEach( () => {
            selectNewZealand();
        } );
        it( 'Suburb should not be required and should be valid (should be optional)', fakeAsync( () => {
            _fixture.detectChanges();
            tick( 1000 );
            expect( _suburbCtrl.valid ).toBeTruthy();
            expect( _suburbCtrl.errors ).toBeNull();
        } ) );
    } );
    describe( 'When selected not Australia and not NewZealand', () => {
        beforeEach( () => {
            selectOtherCountries();
        } );
        it( 'Postcode should not be required and should be valid (should be optional)', () => {
            expect( _postCodeCtrl.valid ).toBeTruthy();
            expect( _postCodeCtrl.errors ).toBeNull();
        } );
        it( 'Suburb should NOT be required ', () => {
            expect( _suburbCtrl.valid ).toBeTruthy();
            expect( _suburbCtrl.errors ).toBeNull();
        } );
    } );
} );
@Component( {
    template        : `
        <form [formGroup]='form' class='nl-form'>
            <amp-manual-address
                #manualAddressCmp
                [controlGroup]='__controlGroup'
                [id]='__custom.controls[0].id'
                [isInSummaryState]='isInSummaryState'>
            </amp-manual-address>
        </form>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
class AmpManualAddressComponentTest {
    @ViewChild( 'manualAddressCmp' ) manualAddressCmp;
    public __controlGroup    = new FormGroup( {} );
    public __custom          = {
        controls : [
            {
                id       : 'amp-qas-manual',
                required : true
            }
        ]
    };
    private isInSummaryState = false;
    private form : FormGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
