import {
    async,
    ComponentFixture,
    TestBed,
    inject
} from '@angular/core/testing';
import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    FormsModule,
    FormGroup
} from '@angular/forms';
import {
    HttpModule,
    Http,
    BaseRequestOptions,
    ResponseOptions,
    Response
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import { AmpResidencyBlockModule } from '../../../app/modules/amp-residency-block';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';

// Prepare a http provider to handdle the list of countries for the two dropdown input
const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

let custom : any = {};

let fixture : ComponentFixture<AmpResidencyTestComponent>;
let component;
let domElement;
let ngElement;

let countryOfCitizenshipControl;
let countryOfResidencyControl;
let usTaxCitizenControl;
let tinControl;

function loadComponent() {
    fixture = TestBed.createComponent(AmpResidencyTestComponent);
    fixture.detectChanges();
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;
    component = fixture.componentInstance;

    const controlGroup = ngElement.componentInstance.block.__controlGroup.controls;
    countryOfCitizenshipControl = controlGroup['countryOfCitizenshipDropdown'];
    countryOfResidencyControl = controlGroup['countryOfResidencyDropdown'];
    usTaxCitizenControl = controlGroup['USTaxCitizen'];
    tinControl = controlGroup['tin'];
}

describe('amp-residency-block component', () => {

    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule({
            declarations: [AmpResidencyTestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS,
                BaseRequestOptions,
                MockBackend,
                mockHttpProvider
            ],
            imports: [ FormsModule, AmpResidencyBlockModule, HttpModule ]
        });

        custom = {
            'controls': [
                { 'id': 'countryOfCitizenship' },
                { 'id': 'countryOfResidency' },
                {
                    'id': 'USTaxCitizen',
                    'buttons': [
                        {
                            'id': 'Yes',
                            'value': true,
                            'label': 'Yes'
                        },
                        {
                            'id': 'No',
                            'value': false,
                            'label': 'No'
                        }
                    ]
                },
                { 'id': 'tin' }
            ],
            'ssnRequiredMsg': 'Either SSN or TIN is required.'
        };
    }));

    // Prepare the mocked answer of AmpCountryService / getCountries()
    beforeEach(inject([MockBackend], (_mockBackend : MockBackend) => {
        backend = _mockBackend;
        backend.connections.subscribe((connection : MockConnection) => {
            let options = new ResponseOptions({
                body : JSON.stringify([
                    {
                        countryCode : 'AUS',
                        country : 'Australia'
                    },
                    {
                        countryCode : 'NZL',
                        country : 'New Zealand'
                    }
                ])
            });
            connection.mockRespond(new Response(options));
        });
    }));

    describe('When the component is loaded', () => {
        describe('the component should be defined with one control for each input', () => {
            beforeEach(loadComponent);
            it('component', () => {
                expect(component).toBeDefined();
            });
            it('countryOfCitizenshipControl', () => {
                expect(countryOfCitizenshipControl).toBeDefined();
            });
            it('countryOfResidencyControl', () => {
                expect(countryOfResidencyControl).toBeDefined();
            });
            it('usTaxCitizenControl', () => {
                expect(usTaxCitizenControl).toBeDefined();
            });
        });
    });

    describe('Block title', () => {
        describe('when no block title has been defined', () => {
            it('should not have the block title h2', () => {
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBe(null);
            });
        });
        describe('when a block title has been defined', () => {
            it('should display the given title', () => {
                custom.blockTitle = 'Nearly there...';
                loadComponent();
                const titleEl = domElement.querySelector('h2');
                expect(titleEl).toBeDefined();
                expect(titleEl.textContent).toEqual('Nearly there...');
            });
        });
    });

});

@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="residency-block">
            <amp-residency-block #block>
            </amp-residency-block>
        </div>
    </form>
    `
})
class AmpResidencyTestComponent implements OnInit {

    @ViewChild('block') block;

    ngOnInit() {
        this.block.__fdn = ['Application'];
        this.block.__custom = custom;
        this.block.__controlGroup = new FormGroup({});

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
