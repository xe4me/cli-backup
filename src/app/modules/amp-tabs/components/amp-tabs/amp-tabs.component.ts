import {
    AfterContentInit ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy ,
    Component ,
    ContentChildren ,
    EventEmitter ,
    Input ,
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
        'errors',
        'groupName',
        'controlGroup',
        'customValidator',
        'defaultValue',
        'isInSummaryState',
        'keepControlOnDestroy',
        'required',
        'keepControl'
    ],
    outputs         : [ 'select' ]
} )
export class AmpTabsComponent extends BaseControl implements AfterContentInit {
    @ContentChildren(AmpTabComponent) tabsList : QueryList<AmpTabComponent>;
    @Input('tabs') tabsArray = [];
    @Input('disabled') disabled : boolean = false;
    public tabs;
    public keepControl : boolean      = false;
    public selectedItem;
    private keepControlOnDestroy      = false;
    private defaultValue : string;
    private hasBooleanValue : boolean = false;
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

        this.tabs = this.tabsArray.length ? this.tabsArray : this.tabsList;

        let activeTabs = this.tabs.filter((tab) => tab.active);

        if ( this.defaultValue ) {
            activeTabs = this.tabs.filter((tab) => {
                return tab.value === this.defaultValue;
            });
        }

        let tabs = activeTabs.length ? activeTabs : this.tabs;
        let firstTab = this.tabsFromList(tabs) ? tabs.first : tabs[0];

        this.resetTabs();
        this.selectTab(firstTab);
    }

    private set groupName ( _id ) {
        this._id = _id;
    }

    private get groupName () {
        return this._id;
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
        let tabs = this.tabsFromList() ? this.tabs.toArray() : this.tabs;
        tabs.forEach((_tab) => {
            _tab.active = false;
        });
    }

    public selectTab ( tab ) {
        if ( !this.disabled && tab ) {
            this.resetTabs();
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

    public onKeydown ( event, tab ) {
        if (event.keyCode === KeyCodes.ENTER ||
            event.keyCode === KeyCodes.SPACE) {
            event.preventDefault();
            this.selectTab(tab);
        }
    }

    public tabsFromList (tabs = this.tabs) : boolean {
        return tabs.constructor !== Array;
    }
}
