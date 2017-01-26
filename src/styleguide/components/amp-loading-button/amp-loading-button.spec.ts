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
    flushMicrotasks,
    tick,
    fakeAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions
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
    it( 'content text should be Submit if specified Submit', () => {
        let ampButtonElem = _debugElement.query( By.css( 'amp-button' ) );
        expect( ampButtonElem.nativeElement.textContent.trim() ).toEqual( 'Submit' );
    } );
    it( 'should listen to all http calls if the if-url-has is not specified', fakeAsync( () => {
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
} );

@Component( {
    template : `
        <amp-loading-button #loadingBtnCmp>
            Submit
        </amp-loading-button>
    `
} )
class TestComponent {
    @ViewChild( 'loadingBtnCmp' ) loadingBtnCmp;
}
