import {
    AfterContentInit ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy ,
    Component ,
    ContentChildren ,
    EventEmitter ,
    Input ,
    ViewChild ,
    QueryList
} from '@angular/core';

import { RequiredValidator, KeyCodes } from '../../../amp-utils';
import { Validators } from '@angular/forms';
import { BaseControl } from '../../../../base-control';
import { AmpTabComponent } from '../amp-tab/amp-tab.component';

@Component( {
    selector        : 'amp-tabs' ,
    template        : require( './amp-tabs.component.html' ) ,
    styles          : [ require( './amp-tabs.component.scss' ) ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    inputs          : [
        'groupName',
        'controlGroup',
        'defaultValue',
        'isInSummaryState',
        'required',
        'keepControl'
    ],
    outputs         : [ 'select' ],
    host : {
        '[attr.id]' : '_id'
    }
} )
export class AmpTabsComponent extends BaseControl implements AfterContentInit {

    @ViewChild( 'tabEl' ) tabEl;
    @ContentChildren(AmpTabComponent) tabsList : QueryList<AmpTabComponent>;

    @Input('tabs') tabsArray = [];
    @Input('disabled') disabled : boolean = false;
    @Input('collapsed') collapsed : boolean = false;

    public _view : string;
    public _isMobileView : boolean;
    public _isDesktopView : boolean;
    public tabs = [];
    public keepControl : boolean      = false;
    public selectedItem = {};
    private defaultValue : string | boolean;
    private select                    = new EventEmitter<any>();

    constructor ( private _cd : ChangeDetectorRef ) {
        super();
    }

    public ngAfterViewInit () : any {
        this.control
            .valueChanges
            .distinctUntilChanged()
            .subscribe( ( changes ) => {
                if ( changes !== undefined && changes !== null ) {
                    this.select.emit( changes );
                }
            } );

        this.updateValidators();
        this._cd.detectChanges();
        return undefined;
    }

    public ngAfterContentInit () {

        this.setView();
        this.getTabs();
        this.setRandomizedIds();

        let activeTabs = this.defaultValue ? this.setDefaultValueTab() : this.getActiveTabs();

        let tabs = activeTabs.length ? activeTabs : this.tabs;

        this.resetTabs();

        if ( this.defaultValue !== false && this.isDesktopView ) {
            this.selectTab(tabs[0]);
        }
    }

    private set groupName ( _id ) {
        this._id = _id;
    }

    private get groupName () {
        return this._id;
    }

    public getTabs () {
        return this.tabs = this.tabsArray.length ? this.tabsArray : this.tabsList.toArray();
    }

    public setRandomizedIds () {
        this.tabs.forEach( (tab) => {
            tab.randomizedId = this.randomizedId;
        });
    }

    public getActiveTabs () {
        return this.tabs.filter((tab) => tab.active);
    }

    public setDefaultValueTab () {
        return this.tabs.filter((tab) => {
            return tab.value === this.defaultValue;
        });
    }

    public updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required ),
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { emitEvent : true } );
            this._cd.markForCheck();
        }
    }

    public resetTabs () {
        this.selectedItem = {};

        this.tabs.forEach((_tab) => {
            _tab.active = false;
        });
    }

    public selectTab ( tab ) {
        if ( this.collapsed ) {
            this.collapsed = false;
        }

        if ( !this.disabled && tab ) {
            let isTabActive = tab.active;
            this.resetTabs();

            if ( this.isMobileView && isTabActive ) {
                return false;
            }

            tab.active = true;
            this.selectedItem = tab;
            this.control.setValue( tab.value, { emitEvent : true } );
            this._cd.markForCheck();
        }
    }

    public onClick ( event, tab ) {
        event.preventDefault();
        this.selectTab(tab);
    }

    public onResize ( event ) {
        this.setView();
    }

    public onKeydown ( event, tab ) {
        if (event.keyCode === KeyCodes.ENTER ||
            event.keyCode === KeyCodes.SPACE) {
            event.preventDefault();
            this.selectTab(tab);
        }
    }

    public tabsFromList () : boolean {
        return this.tabsArray.length === 0;
    }

    public get view () : string {
        return this._view;
    }

    public setView () {
        this._view = window.getComputedStyle(this.tabEl.nativeElement, '::before')
                        .getPropertyValue('content')
                        .replace(/\"/g, '');

        this._isMobileView = this.isMobileViewCurrent();
        this._isDesktopView = this.isDesktopViewCurrent();
    }

    public isMobileViewCurrent () : boolean {
        return this.view === 'mobile';
    }

    public get isMobileView () : boolean {
        return this._isMobileView;
    }

    public isDesktopViewCurrent () : boolean {
        return this.view === 'desktop';
    }

    public get isDesktopView () : boolean {
        return this._isDesktopView;
    }

    public get hasMadeSelection () {
        return Object.keys(this.selectedItem).length > 0;
    }
}
