import {
    async,
    TestBed,
    inject
} from '@angular/core/testing';
import {
    Component,
    ViewChild,
    Injector
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import {
    discardPeriodicTasks,
    tick,
    fakeAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
} from '@angular/http';
import { AmpHttpService } from '../../../app/services/amp-http/amp-http.service';
import {
    AmpLoadingButtonModule,
    AmpLoadingService,
    AmpHttpInterceptor,
    AmpLoadingButtonComponent
} from '../../../app/modules/amp-loading-button';
import { AmpCountryService } from '../../../app/modules/amp-dropdown/services/amp-country.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions, AmpLoadingService ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions, loadingService : AmpLoadingService ) => {
        return new AmpHttpInterceptor( backend, defaultOptions, loadingService );
    }
};
fdescribe( 'loading button component', () => {
    let _fixture;
    let _testCmpInjector : Injector;
    let _testCmp;
    let _element;
    let _debugElement;
    let _backend;
    let _http;
    let _loadingBtnCmp : AmpLoadingButtonComponent;

    function callHttp ( http ) {
        http.get( AmpCountryService.COUNTRY_URL, null ).subscribe();
    }

    function _getMdProgressElement () {
        return _debugElement.query( By.css( 'md-progress-circle' ) );
    }

    function _getButtonElement () {
        return _debugElement.query( By.css( 'button' ) );
    }

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ TestComponent ],
            providers    : [
                BaseRequestOptions,
                MockBackend,
                AmpHttpService,
                mockHttpProvider,
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ],
            imports      : [
                ReactiveFormsModule,
                AmpLoadingButtonModule.forRoot()
            ]
        } );
        _fixture         = TestBed.createComponent( TestComponent );
        _testCmpInjector = _fixture.debugElement.injector;
        _testCmp         = _fixture.componentInstance;
        _loadingBtnCmp   = _testCmp.loadingBtnCmp;
        _debugElement    = _fixture.debugElement;
        _element         = _fixture.nativeElement;
        _fixture.detectChanges();
    } ) );
    beforeEach( inject( [ Http, MockBackend ],
        ( http : Http, _mockBackend : MockBackend ) => {
            _backend = _mockBackend;
            _http    = http;
        } ) );
    it( 'should be defined ', () => {
        expect( _loadingBtnCmp ).toBeDefined();
    } );
    it( 'content text should be Submit if NOT specified', () => {
        let ampButtonElem = _debugElement.query( By.css( 'amp-button' ) );
        expect( ampButtonElem.nativeElement.textContent.trim() ).toEqual( 'Submit' );
    } );
    it( 'should listen to all http calls if the if-url-has is specified as . (dot)', fakeAsync( () => {
        _testCmp.ifUrlHas = '.';
        _backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( {} )
            } );
            setTimeout( () => {
                connection.mockRespond( new Response( options ) );
            }, 1000 );
        } );
        callHttp( _http );
        _fixture.detectChanges();
        expect( _getMdProgressElement() ).not.toBeNull();
        tick( 1001 );
        discardPeriodicTasks();
        _fixture.detectChanges();
        expect( _getMdProgressElement() ).toBeNull();
    } ) );

    it( 'should NOT listen and should NOT show loading because url does NOT match', fakeAsync( () => {
        _testCmp.ifUrlHas = 'someUrl';
        _backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( {} )
            } );
            setTimeout( () => {
                connection.mockRespond( new Response( options ) );
            }, 1000 );
        } );
        callHttp( _http );
        _fixture.detectChanges();
        expect( _getMdProgressElement() ).toBeNull();
        tick( 1001 );
        discardPeriodicTasks();
        _fixture.detectChanges();
        expect( _getMdProgressElement() ).toBeNull();
    } ) );
    it( 'should listen and should show loading because url DOES match', fakeAsync( () => {
        _testCmp.ifUrlHas = 'countries';
        _backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( {} )
            } );
            setTimeout( () => {
                connection.mockRespond( new Response( options ) );
            }, 1000 );
        } );
        callHttp( _http );
        _fixture.detectChanges();
        expect( _getMdProgressElement() ).not.toBeNull();
        tick( 1001 );
        discardPeriodicTasks();
        _fixture.detectChanges();
        expect( _getMdProgressElement() ).toBeNull();
    } ) );
    fit( 'should be disabled when showing the loading icon', fakeAsync( () => {
        _testCmp.ifUrlHas = 'countries';
        _backend.connections.subscribe( ( connection : MockConnection ) => {
            let options = new ResponseOptions( {
                body : JSON.stringify( {} )
            } );
            setTimeout( () => {
                connection.mockRespond( new Response( options ) );
            }, 1000 );
        } );
        callHttp( _http );
        _fixture.detectChanges();
        expect( _getButtonElement().nativeElement.disabled ).toBe( true );
        tick( 1001 );
        discardPeriodicTasks();
        _fixture.detectChanges();
        expect( _getButtonElement().nativeElement.disabled ).toBe( false );
    } ) );
    it( 'should do the save and submit if submit-on-click is true ', fakeAsync( () => {
        _testCmp.submitOnClick = true;
        _fixture.detectChanges();
        let saveResponse   = {
            'meta'       : {
                'url'            : '/ddc/public/api/bett3r/save?id=6812434564',
                'method'         : 'POST',
                'timestamp'      : 'Fri Jan 06 2017 13:57:23 GMT+1100 (AEDT)',
                'responseTimeMs' : 70,
                'requestId'      : '0c05d1a0d7c5499583f5f093bdd3261c',
                'hostname'       : 'api-bett3r-dev-v154-iyrtb',
                'pid'            : 17,
                'params'         : { 'id' : '6812434564' },
                'count'          : 1
            },
            'payload'    : {
                'meta' : {
                    'name'         : 'BETT3R',
                    'modelVersion' : '1.0.0',
                    'id'           : '6812434564',
                    'modified'     : '2017-01-06T02:57:23.161Z',
                    'created'      : '2017-01-06T02:57:04.544Z',
                    'owner'        : {
                        'type' : 'customer',
                        'id'   : null
                    },
                    'status'       : 'open'
                }
            },
            'statusCode' : 200
        };
        let submitResponse = { submitted : true };
        let callCounter    = 0;
        _backend.connections.subscribe( ( connection : MockConnection ) => {
            callCounter++;
            expect( connection.request.method ).toBe( RequestMethod.Post );
            if ( callCounter === 1 ) {
                let options = new ResponseOptions( {
                    body : JSON.stringify( saveResponse )
                } );
                expect( connection.request.getBody() ).toEqual( '{}' ); // because loading-button is connected to formModelSerivice and form is empty
                connection.mockRespond( new Response( options ) );
            } else if ( callCounter === 2 ) {
                let options = new ResponseOptions( {
                    body : JSON.stringify( submitResponse )
                } );
                expect( connection.request.getBody() ).toEqual( '{}' );
                connection.mockRespond( new Response( options ) );
            }
            expect( callCounter ).toBeLessThan( 3 );
        } );
        _loadingBtnCmp.$submit.subscribe( ( response ) => {
                expect( response ).toEqual( submitResponse );
                tick();
            }
        );
        let ampButtonElem = _element.querySelector( 'amp-loading-button' );
        ampButtonElem.click();
    } ) );
} );

@Component( {
    template : `
        <amp-loading-button #loadingBtnCmp [if-url-has]="ifUrlHas" [submit-on-click]="submitOnClick"></amp-loading-button>
    `
} )
class TestComponent {
    public ifUrlHas;
    public submitOnClick = false;
    @ViewChild( 'loadingBtnCmp' ) loadingBtnCmp;
}
