import {
    AfterContentInit ,
    ChangeDetectionStrategy ,
    Component ,
    ContentChildren ,
    Input ,
    QueryList
} from '@angular/core';

import { AmpTabComponent } from '../amp-tab/amp-tab.component';

@Component( {
    selector        : 'amp-tabs' ,
    template        : require( './amp-tabs.component.html' ) ,
    styles          : [ require( './amp-tabs.component.scss' ) ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )

export class AmpTabsComponent implements AfterContentInit {

    @ContentChildren(AmpTabComponent) tabsList : QueryList<AmpTabComponent>;
    @Input('tabs') tabsArray = [];

    private tabs;
    private tabsFromList : boolean = true;

    public ngAfterContentInit () {
        if (this.tabsArray.length) {
            this.tabs = this.tabsArray;
            this.tabsFromList = false;
        } else {
            this.tabs = this.tabsList;
        }

        let activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length !== 1) {
            this.resetTabs();
            this.selectTab(this.tabs[0]);
        }
    }

    public resetTabs () {
        let tabs = this.tabsFromList ? this.tabs.toArray() : this.tabs;
        tabs.forEach((_tab) => {
            _tab.active = false;
        });
    }

    public selectTab ( tab ) {
        if ( tab ) {
            this.resetTabs();
            tab.active = true;
        }
    }

    public onClick ( event, tab ) {
        event.preventDefault();
        this.selectTab(tab);
    }

    public onKeyup ( event, tab ) {
        if (event.keyCode === 32) {
            this.selectTab(tab);
        }
    }

}
