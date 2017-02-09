import {
    async ,
    TestBed
} from '@angular/core/testing';

import {
    Component ,
    ViewChild
} from '@angular/core';

import {
    FormsModule ,
    ReactiveFormsModule ,
    FormGroup
} from '@angular/forms';

import { MockScrollService } from '../../services/mock-scroll.service';
import { ScrollService } from '../../../app/services';

import { By } from '@angular/platform-browser';

import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';

import {
    AmpTabsModule,
    AmpTabsComponent
} from '../../../app/modules/amp-tabs';

describe( 'amp-tabs component', () => {
    let _fixture;
    let _testCmp;
    let _element;
    let _debugElement;
    let _tabsComp1 : AmpTabsComponent;
    let _tabsComp2 : AmpTabsComponent;
    let _tabsComp3 : AmpTabsComponent;
    let _tabsComp4 : AmpTabsComponent;
    let _tabsComp5 : AmpTabsComponent;
    let _tabsComp6 : AmpTabsComponent;
    const TAB_SELECTOR = '.amp-tabs__nav-item';

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ TestComponent ],
            providers    : [
                {
                    provide  : ScrollService,
                    useClass : MockScrollService
                },
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ],
            imports      : [
                AmpTabsModule
            ]
        } );
        _fixture             = TestBed.createComponent( TestComponent );
        _testCmp             = _fixture.componentInstance;
        _tabsComp1           = _testCmp.tabs1;
        _tabsComp2           = _testCmp.tabs2;
        _tabsComp3           = _testCmp.tabs3;
        _tabsComp4           = _testCmp.tabs4;
        _tabsComp5           = _testCmp.tabs5;
        _tabsComp6           = _testCmp.tabs6;
        _debugElement        = _fixture.debugElement;
        _element             = _fixture.nativeElement;
        _fixture.detectChanges();
    } ) );

    it( 'tabs component 1 should be defined ', () => {
        expect( _tabsComp1 ).toBeDefined();
    } );

    it( 'tabs component 2 should be defined ', () => {
        expect( _tabsComp2 ).toBeDefined();
    } );

    it( 'tabs component 3 should be defined ', () => {
        expect( _tabsComp3 ).toBeDefined();
    } );

    it( 'tabs component 4 should be defined ', () => {
        expect( _tabsComp4 ).toBeDefined();
    } );

    describe( 'Tabs from markup', () => {
        it( 'should get tabs from the mark up (queryList)', () => {
            expect(_tabsComp1.tabs.length).toEqual(2);
        } );

        it( 'should expect tabsFromList to equal true', () => {
            expect(_tabsComp1.tabsFromList()).toEqual(true);
        } );

        it( 'should have the first tab active by default', () => {
            expect(_tabsComp1.tabs.first.active).toEqual(true);
        } );

        it( 'should set selected active tab as default', () => {
            expect(_tabsComp2.tabs.last.active).toEqual(true);
        } );

        it( 'should set defaultValue tab as default', () => {
            expect(_tabsComp3.tabs.last.active).toEqual(true);
        } );

        it( 'should set selected tab as active', () => {
            let tabs = _debugElement.queryAll( By.css( '#tabs1 ' + TAB_SELECTOR ) );
            tabs[1].nativeElement.click();
            expect(_tabsComp1.tabs.last.active).toEqual(true);
        } );

        it( 'should remove active flag on unselected tab', () => {
            let tabs = _debugElement.queryAll( By.css( '#tabs1 ' + TAB_SELECTOR ) );
            tabs[1].nativeElement.click();
            expect(_tabsComp1.tabs.first.active).toEqual(false);
        } );
    } );

    describe( 'Tabs from array', () => {
        it( 'should get tabs from array', () => {
            expect(_tabsComp4.tabs.length).toEqual(2);
        } );

        it( 'should expect tabsFromList to equal false', () => {
            expect(_tabsComp4.tabsFromList()).toEqual(false);
        } );

        it( 'should have the first tab active by default', () => {
            expect(_tabsComp4.tabs[0].active).toEqual(true);
        } );

        it( 'should set selected active tab as default', () => {
            expect(_tabsComp5.tabs[1].active).toEqual(true);
        } );

        it( 'should set defaultValue tab as default', () => {
            expect(_tabsComp6.tabs[1].active).toEqual(true);
        } );
    } );

} );
@Component( {
    template : `
        <amp-tabs
            #tabs1
            id="tabs1"
            [controlGroup]="controlGroup1">
            <amp-tab tab-title="tab1a" id="tab1a" value="tab1a">
                <p>Tab A</p>
            </amp-tab>
            <amp-tab tab-title="tab1b" id="tab1b" value="tab1b">
                <p>Tab B</p>
            </amp-tab>
        </amp-tabs>

        <amp-tabs
            #tabs2
            id="tabs2"
            [controlGroup]="controlGroup2">
            <amp-tab tab-title="tab2a" id="tab2a" value="tab2a">
                <p>Tab A</p>
            </amp-tab>
            <amp-tab tab-title="tab2b" id="tab2b" value="tab2b" [active]="true">
                <p>Tab B</p>
            </amp-tab>
        </amp-tabs>

        <amp-tabs
            #tabs3
            id="tabs3"
            [controlGroup]="controlGroup3"
            [defaultValue]="'tab3b'">
            <amp-tab tab-title="tab3a" id="tab3a" value="tab3a">
                <p>Tab A</p>
            </amp-tab>
            <amp-tab tab-title="tab3b" id="tab3b" value="tab3b">
                <p>Tab B</p>
            </amp-tab>
        </amp-tabs>

        <amp-tabs
            [tabs]="tabs4Array"
            #tabs4
            id="tabs4"
            [controlGroup]="controlGroup4"></amp-tabs>

        <amp-tabs
            [tabs]="tabs5Array"
            #tabs5
            id="tabs5"
            [controlGroup]="controlGroup5"></amp-tabs>

        <amp-tabs
            [tabs]="tabs6Array"
            #tabs6
            id="tabs6"
            [controlGroup]="controlGroup6"
            [defaultValue]="tabs6Array[1].value"></amp-tabs>
    `
} )
class TestComponent {
    @ViewChild( 'tabs1' ) tabs1;
    @ViewChild( 'tabs2' ) tabs2;
    @ViewChild( 'tabs3' ) tabs3;
    @ViewChild( 'tabs4' ) tabs4;
    @ViewChild( 'tabs5' ) tabs5;
    @ViewChild( 'tabs6' ) tabs6;

    controlGroup1 : FormGroup = new FormGroup( {} );
    controlGroup2 : FormGroup = new FormGroup( {} );
    controlGroup3 : FormGroup = new FormGroup( {} );
    controlGroup4 : FormGroup = new FormGroup( {} );
    controlGroup5 : FormGroup = new FormGroup( {} );
    controlGroup6 : FormGroup = new FormGroup( {} );

    private tabs4Array = [
        {
            'id': 'tab4a',
            'value': 'tab4a',
            'title': 'tab4a',
            'content': 'Tab A'
        },
        {
            'id': 'tab4b',
            'value': 'tab4b',
            'title': 'tab4b',
            'content': 'Tab B'
        }
    ];

    private tabs5Array = [
        {
            'id': 'tab5a',
            'value': 'tab5a',
            'title': 'tab5a',
            'content': 'Tab A'
        },
        {
            'id': 'tab5b',
            'value': 'tab5b',
            'title': 'tab5b',
            'content': 'Tab B',
            'active': true
        }
    ];

    private tabs6Array = [
        {
            'id': 'tab6a',
            'value': 'tab6a',
            'title': 'tab6a',
            'content': 'Tab A'
        },
        {
            'id': 'tab6b',
            'value': 'tab6b',
            'title': 'tab6b',
            'content': 'Tab B'
        }
    ];
}
