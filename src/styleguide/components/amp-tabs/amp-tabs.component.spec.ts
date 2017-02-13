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
    let _tabsComp7 : AmpTabsComponent;
    let _tabsComp8 : AmpTabsComponent;
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
        _tabsComp7           = _testCmp.tabs7;
        _tabsComp8           = _testCmp.tabs8;
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

    it( 'tabs component 5 should be defined ', () => {
        expect( _tabsComp5 ).toBeDefined();
    } );

    it( 'tabs component 6 should be defined ', () => {
        expect( _tabsComp6 ).toBeDefined();
    } );

    it( 'tabs component 7 should be defined ', () => {
        expect( _tabsComp7 ).toBeDefined();
    } );

    it( 'tabs component 8 should be defined ', () => {
        expect( _tabsComp8 ).toBeDefined();
    } );

    describe( 'Tabs from markup', () => {
        it( 'should have correct id', () => {
            expect(_tabsComp1.id).toEqual('tabs1');
        } );

        it( 'should get tabs from the mark up (queryList)', () => {
            expect(_tabsComp1.tabs.length).toEqual(2);
        } );

        it( 'should expect tabsFromList to equal true', () => {
            expect(_tabsComp1.tabsFromList()).toEqual(true);
        } );

        it( 'should have the first tab active by default', () => {
            expect(_tabsComp1.tabs[0].active).toEqual(true);
        } );

        it( 'should set selected active tab as default', () => {
            expect(_tabsComp2.tabs[1].active).toEqual(true);
        } );

        it( 'should set selectedItem as active tab', () => {
            expect(_tabsComp2.selectedItem).toEqual(_tabsComp2.tabs[1]);
        } );

        it( 'should set defaultValue tab as default', () => {
            expect(_tabsComp3.tabs[1].active).toEqual(true);
        } );

        it( 'should set selected tab as active', () => {
            let tabs = _debugElement.queryAll( By.css( '.test-tabs1 ' + TAB_SELECTOR ) );
            tabs[1].nativeElement.click();
            expect(_tabsComp1.tabs[1].active).toEqual(true);
        } );

        it( 'should remove active flag on unselected tab', () => {
            let tabs = _debugElement.queryAll( By.css( '.test-tabs1 ' + TAB_SELECTOR ) );
            tabs[1].nativeElement.click();
            expect(_tabsComp1.tabs[0].active).toEqual(false);
        } );

        it( 'should have no active tabs', () => {
            expect(_tabsComp7.tabs[0].active).toEqual(false);
            expect(_tabsComp7.tabs[1].active).toEqual(false);
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

        it( 'should have no active tabs', () => {
            expect(_tabsComp8.tabs[0].active).toEqual(false);
            expect(_tabsComp8.tabs[1].active).toEqual(false);
        } );
    } );

} );
@Component( {
    template : `
        <amp-tabs
            #tabs1
            class="test-tabs1"
            groupName="tabs1"
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
            groupName="tabs2"
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
            groupName="tabs3"
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
            #tabs7
            groupName="tabs7"
            [controlGroup]="controlGroup7"
            [defaultValue]="false">
            <amp-tab tab-title="tab7a" id="tab7a" value="tab7a">
                <p>Tab A</p>
            </amp-tab>
            <amp-tab tab-title="tab7b" id="tab7b" value="tab7b">
                <p>Tab B</p>
            </amp-tab>
        </amp-tabs>

        <amp-tabs
            [tabs]="tabs4Array"
            #tabs4
            groupName="tabs4"
            [controlGroup]="controlGroup4"></amp-tabs>

        <amp-tabs
            [tabs]="tabs5Array"
            #tabs5
            groupName="tabs5"
            [controlGroup]="controlGroup5"></amp-tabs>

        <amp-tabs
            [tabs]="tabs6Array"
            #tabs6
            groupName="tabs6"
            [controlGroup]="controlGroup6"
            [defaultValue]="tabs6Array[1].value"></amp-tabs>

        <amp-tabs
            [tabs]="tabs8Array"
            #tabs8
            groupName="tabs8"
            [controlGroup]="controlGroup8"
            [defaultValue]="false"></amp-tabs>
    `
} )
class TestComponent {
    @ViewChild( 'tabs1' ) tabs1;
    @ViewChild( 'tabs2' ) tabs2;
    @ViewChild( 'tabs3' ) tabs3;
    @ViewChild( 'tabs4' ) tabs4;
    @ViewChild( 'tabs5' ) tabs5;
    @ViewChild( 'tabs6' ) tabs6;
    @ViewChild( 'tabs7' ) tabs7;
    @ViewChild( 'tabs8' ) tabs8;

    controlGroup1 : FormGroup = new FormGroup( {} );
    controlGroup2 : FormGroup = new FormGroup( {} );
    controlGroup3 : FormGroup = new FormGroup( {} );
    controlGroup4 : FormGroup = new FormGroup( {} );
    controlGroup5 : FormGroup = new FormGroup( {} );
    controlGroup6 : FormGroup = new FormGroup( {} );
    controlGroup7 : FormGroup = new FormGroup( {} );
    controlGroup8 : FormGroup = new FormGroup( {} );

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

    private tabs8Array = [
        {
            'id': 'tab8a',
            'value': 'tab8a',
            'title': 'tab8a',
            'content': 'Tab A'
        },
        {
            'id': 'tab8b',
            'value': 'tab8b',
            'title': 'tab8b',
            'content': 'Tab B'
        }
    ];
}
