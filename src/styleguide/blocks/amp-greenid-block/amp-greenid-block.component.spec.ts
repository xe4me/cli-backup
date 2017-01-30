import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    ElementRef,
    ViewChild,
    Renderer
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormControl
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    By,
    BrowserModule
} from '@angular/platform-browser';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { DYNAMICALLY_LOADED_COMPONENTS } from './app.entry-components';
import { AmpGreenIdBlockModule, AmpGreenIdBlockComponent } from '../../../app/modules/amp-greenid-block';
import { formDef } from './form-def.def.json';

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

function loadComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;

    // const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    // emailControl = controlGroup['email'];
    // mobileNumberControl = controlGroup['mobileNumber'];
    // homeNumberControl = controlGroup['homeNumber'];
}

// No tests have been written for this so skipping to make this obvious
// GitLab issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/4
xdescribe( 'Green id unit tests', () => {

    beforeEach( async( () => {
        const modelValue = {
            firstName : 'John',
            lastName : 'Smith',
            middleNames : 'Danger',
            honorific : 'Mr',
            dateOfBirth2 : '12/04/2001',
            dateOfBirth : '12/04/2001',
            email : 'sample@test.com',
            verificationId : 'fred',
            verificationToken : 'fred',
            verificationStatus : 'fred',
            address : {
                country : 'AU',
                state : 'NSW',
                streetName : 'SMITH',
                flatNumber : 'U 2',
                streetNumber : '53-57',
                suburb : 'SYDNEY'
            }
        };

        TestBed.configureTestingModule( {
            imports : [
                AmpGreenIdBlockModule,
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                HttpModule
            ],
            declarations : [
                // ...DYNAMICALLY_LOADED_COMPONENTS,
                TestComponent
            ],
            providers : [
                { provide : ElementRef, useClass : MockElementRef },
                { provide : Window, useClass : window },
                { provide : ComponentFixtureAutoDetect, useValue : true },
                // ...APP_RESOLVER_PROVIDERS,
                BrowserDomAdapter,
                Renderer
            ]
        } );
        TestBed.compileComponents();
    } ) );

    it( 'mapGreenIdModel should extract the form model values for GreenId to consume', () => {
        // loadComponent();
        let _custom = {
            titleFDN        : 'personalDetails.title',
            firstNameFDN    : 'personalDetails.firstName',
            middleNamesFDN  : 'personalDetails.middleName',
            lastNameFDN     : 'personalDetails.lastName',
            dateOfBirthFDN  : 'personalDetails.dob',
            emailFDN        : 'personalDetails.contactDetails.email',
            stateFDN        : 'personalDetails.address.state',
            streetNameFDN   : 'personalDetails.address.streetName',
            flatNumberFDN   : 'personalDetails.address.flatNumber',
            streetNumberFDN : 'personalDetails.address.streetNumber',
            suburbFDN       : 'personalDetails.address.suburb',
            postcodeFDN     : 'personalDetails.address.postCode',
            streetTypeFDN   : 'personalDetails.address.streetType'
        };

        let ampGreenIdBlockCmp = new AmpGreenIdBlockComponent(null, null, null, null, null);
        ampGreenIdBlockCmp['__form'] = new FormGroup({
            personalDetails : new FormGroup({
                title: new FormControl('Mr'),
                firstName: new FormControl('John'),
                lastName: new FormControl('Smith'),
                dob: new FormControl('11/11/1980'),
                contactDetails: new FormGroup({
                    email: new FormControl('test@amp.com.au')
                }),
                address: new FormGroup({
                    state: new FormControl('NSW'),
                    streetName: new FormControl('Johnson'),
                    streetNumber: new FormControl('1'),
                    postCode: new FormControl('2000'),
                    streetType: new FormControl('st')
                })
            })
        });

        ampGreenIdBlockCmp['__custom'] = _custom;

        expect(ampGreenIdBlockCmp['mapGreenIdModel']() ).toEqual({
            title       : 'Mr',
            firstName   : 'John',
            middleNames : '',
            lastName    : 'Smith',
            dateOfBirth : '11/11/1980',
            email       : 'test@amp.com.au',
            address     : {
                country      : 'AU',
                state        : 'NSW',
                streetName   : 'Johnson',
                flatNumber   : '',
                streetNumber : '1',
                suburb       : '',
                postcode     : '2000',
                streetType   : 'st'
            }
        } );
    });
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// test a public method inside the class
@Component( {
    template : `
        <form [formGroup]="form" class='nl-form myAmp-login'>
            <amp-greenid-block></amp-greenid-block>
        </form>
    `
} )
class TestComponent {
    @ViewChild( 'ampGreenIdBlock' )
    public ampGreenIdBlockCmp;
    public form : FormGroup = new FormGroup( {} );
    private fullyDistinguishedName = [];
    private childBlocks = formDef;

    constructor () {

    }
}
