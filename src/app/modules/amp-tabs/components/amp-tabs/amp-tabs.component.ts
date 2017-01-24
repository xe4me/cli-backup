import {
    AfterContentInit ,
    ChangeDetectionStrategy ,
    Component ,
    ContentChildren ,
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

    @ContentChildren(AmpTabComponent) tabs : QueryList<AmpTabComponent>;

    public ngAfterContentInit () {
        let activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length !== 1) {
            this.resetTabs();
            this.selectTab(this.tabs.first);
        }
    }

    public resetTabs () {
        this.tabs.toArray().forEach((_tab) => {
            _tab.active = false;
        });
    }

    public selectTab ( tab ) {
        this.resetTabs();
        tab.active = true;
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
