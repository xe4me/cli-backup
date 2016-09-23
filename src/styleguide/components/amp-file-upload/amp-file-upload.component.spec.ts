import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , ElementRef } from '@angular/core';
import { AmpFileUploadComponent } from '../../../app/components/amp-file-upload/amp-file-upload.component';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions } from "@angular/http";
fdescribe ( 'amp-file-upload component' , () => {
    let fixture : ComponentFixture<TestComponent>;
    let Element : any;
    const mockHttpProvider = {
        deps: [ MockBackend, BaseRequestOptions ]
    };

    beforeEach ( async( () => {
        TestBed.configureTestingModule( {
            declarations : [
                AmpFileUploadComponent ,
                TestComponent
            ] ,
            providers    : [
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : Window , useClass : window },
                { provide: Http },
                { provide: mockHttpProvider }
            ]
        } );
        TestBed.compileComponents();
        fixture = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        Element = fixture.nativeElement;
    } ) );

    describe ( '"File upload" button' , () => {
        let button   : any;

        beforeEach( async( () => {
            button = Element.querySelector( 'amp-file-upload' );
        } ) );

        it ( 'Should contain a button' , () => {
            expect( button ).toBeDefined();
        } );

        it ( 'Button should contain "File upload" text' , () => {
            expect( button.textContent.trim() ).toBe( 'File Upload' );
        } );
    });

    describe ( 'File input element' , () => {

        let input   : any;

        beforeEach( async( () => {
            input = Element.querySelector( 'input' );
        } ) );

        it( 'should contain a file input element' , () => {
            expect( input ).toBeDefined();
        } );
    });
} );

class MockElementRef implements ElementRef {
    nativeElement = {};
}

// Create a test component to test directives
@Component( {
    template   : `
                <amp-file-upload
                    [uploadUrl]="urls.uploadUrl"
                    [tokenUrl]="urls.tokenUrl">
                </amp-file-upload>
            ` ,
    directives : [ AmpFileUploadComponent ]
} )

class TestComponent {
    private urls = {
        //TODO - Urls has to be modified to fetch data from local JSON file
        uploadUrl : 'http://localhost:8081/ddc/secure/api/upload/upload?token=',
        tokenUrl : 'http://localhost:8081/ddc/secure/api/upload/token'
    };
}
