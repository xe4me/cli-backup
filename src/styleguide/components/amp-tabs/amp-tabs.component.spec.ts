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
    const TAB_SELECTOR = '.amp-tabs__nav-item';

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations : [ TestComponent ],
            providers    : [
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

        it( 'should set tabsFromList property to true', () => {
            expect(_tabsComp1.tabsFromList).toEqual(true);
        } );

        it( 'should have the first tab active by default', () => {
            expect(_tabsComp1.tabs.first.active).toEqual(true);
        } );

        it( 'should set selected active tab as default', () => {
            expect(_tabsComp2.tabs.last.active).toEqual(true);
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
            expect(_tabsComp3.tabs.length).toEqual(2);
        } );

        it( 'should NOT set tabsFromList property to true', () => {
            expect(_tabsComp3.tabsFromList).toEqual(false);
        } );

        it( 'should have the first tab active by default', () => {
            expect(_tabsComp3.tabs[0].active).toEqual(true);
        } );

        it( 'should set selected active tab as default', () => {
            expect(_tabsComp4.tabs[1].active).toEqual(true);
        } );
    } );

} );
@Component( {
    template : `
        <amp-tabs
            #tabs1
            id="tabs1"
            [controlGroup]="controlGroup1">
            <amp-tab tab-title="tab1a">
                <p>Tab A</p>
            </amp-tab>
            <amp-tab tab-title="tab1b">
                <p>Tab B</p>
            </amp-tab>
        </amp-tabs>

        <amp-tabs
            #tabs2
            id="tabs2"
            [controlGroup]="controlGroup2">
            <amp-tab tab-title="tab2a">
                <p>Tab A</p>
            </amp-tab>
            <amp-tab tab-title="tab2b" [active]="true">
                <p>Tab B</p>
            </amp-tab>
        </amp-tabs>

        <amp-tabs
            [tabs]="tabs3Array"
            #tabs3
            id="tabs3"
            [controlGroup]="controlGroup3"></amp-tabs>

        <amp-tabs
            [tabs]="tabs4Array"
            #tabs4
            id="tabs4"
            [controlGroup]="controlGroup4"></amp-tabs>
    `
} )
class TestComponent {
    @ViewChild( 'tabs1' ) tabs1;
    @ViewChild( 'tabs2' ) tabs2;
    @ViewChild( 'tabs3' ) tabs3;
    @ViewChild( 'tabs4' ) tabs4;

    controlGroup1 : FormGroup = new FormGroup( {} );
    controlGroup2 : FormGroup = new FormGroup( {} );
    controlGroup3 : FormGroup = new FormGroup( {} );
    controlGroup4 : FormGroup = new FormGroup( {} );

    private tabs3Array = [
        {
            'id': 'tab3a',
            'title': 'tab3a',
            'content': 'Tab A'
        },
        {
            'idtitle': 'tab3b',
            'title': 'tab3b',
            'content': 'Tab B'
        }
    ];

    private tabs4Array = [
        {
            'id': 'tab4a',
            'title': 'tab4a',
            'content': 'Tab A'
        },
        {
            'id': 'tab4b',
            'title': 'tab4b',
            'content': 'Tab B',
            'active': true
        }
    ];
}
