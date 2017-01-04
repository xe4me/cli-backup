import {
    async,
    TestBed
} from '@angular/core/testing';
// import {tick, fakeAsync} from '@angular/core/esm/testing/fake_async';
import {
    Component,
    ElementRef
} from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
import { AmpGreenIdBlockComponent } from '../../../app/modules/amp-greenid-block/components/amp-greenid-block.component';

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
            imports : [ AmpGreenIdBlockComponent ],
            declarations : [
                TestComponent2
            ],
            providers : [
                { provide : ElementRef, useClass : MockElementRef },
                { provide : Window, useClass : window },
                { provide : ComponentFixtureAutoDetect, useValue : true },
                { provide : AmpGreenIdBlockComponent, useClass : TestComponent2 },
                BrowserDomAdapter
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Green id unit tests ', () => {
        // Simple test added just so this test suite correctly shows up as skipped in the Jasmine output
        expect( true ).toBe( true );
    } );
} );
class MockElementRef implements ElementRef {
    nativeElement = {};
}
// test a public method inside the class
@Component( {
    template : `
    <amp-greenid-block [form]="modelValue" [scriptUrls]="scriptUrls"></amp-greenid-block>
    `
} )
class TestComponent2 {

    constructor () {

    }
}
