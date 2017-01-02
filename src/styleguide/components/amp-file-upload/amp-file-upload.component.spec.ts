import {
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Http,
    BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormGroup } from '@angular/forms';
import { AmpHttpService } from '../../../app/services/amp-http/amp-http.service';
import { AmpFileUploadModule } from '../../../app/modules/amp-file-upload/amp-file-upload.module';
import { AmpFileUploadComponent } from '../../../app/modules/amp-file-upload/components/amp-file-upload.component';
describe( 'amp-file-upload component', () => {
    let fixture : ComponentFixture<TestComponent>;
    let Element : any;
    let Component : any;
    const mockHttpProvider = {
        deps : [ MockBackend, BaseRequestOptions ]
    };
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ AmpFileUploadModule ],
            declarations : [
                TestComponent
            ],
            providers    : [
                { provide : ElementRef, useClass : MockElementRef },
                { provide : Http },
                { provide : AmpHttpService },
                { provide : mockHttpProvider }
            ]
        } );
        TestBed.compileComponents();
        fixture = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        Element   = fixture.nativeElement;
        Component = fixture.componentInstance;
    } ) );
    describe( '"File Upload" button', () => {
        let button : any;
        beforeEach( async( () => {
            button = Element.querySelector( 'amp-file-upload' );
        } ) );
        it( 'Should contain a button', () => {
            expect( button ).toBeDefined();
        } );
        it( 'Button should contain "File Upload" text', () => {
            expect( button.textContent.trim() ).toBe( 'File Upload' );
        } );
    } );
    describe( 'File input element', () => {
        let input : any;
        beforeEach( async( () => {
            input = Element.querySelector( 'input' );
        } ) );
        it( 'should contain a file input element', () => {
            expect( input ).toBeDefined();
        } );
        it( 'Function "updateToken" should get called on click of "input" element', () => {
            let spy = spyOn( Component.componentReference, 'updateToken' );
            input.click();
            expect( spy ).toHaveBeenCalled();
        } );
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// Create a test component to test directives
@Component( {
    template : `
    <amp-file-upload
        #componentReference
        [controlGroup]="controlGroup"
        [id]="'myid'"
        [formName]="'BUYBACK'"
        [formId] ="'formId'"
        [description]="'description'">
    </amp-file-upload>`
} )
class TestComponent {
    @ViewChild( 'componentReference' ) componentReference : AmpFileUploadComponent;
                                       controlGroup : FormGroup = new FormGroup( {} );
    private urls                                                = {
        // TODO - Urls has to be modified to fetch data from local JSON file
        uploadUrl : 'http://localhost:8081/ddc/secure/api/upload/upload?token=',
        tokenUrl  : 'http://localhost:8081/ddc/secure/api/upload/token'
    };
}
