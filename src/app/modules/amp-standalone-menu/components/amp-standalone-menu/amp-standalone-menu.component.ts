import {
    Component,
    EventEmitter,
    ElementRef,
    ChangeDetectorRef,
    OnDestroy,
    ChangeDetectionStrategy,
    OnInit,
    Input
} from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { FormSectionService } from '../../../../services/form-section/form-section.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

@Component({
    selector: 'amp-standalone-menu',
    template: require('./amp-standalone-menu.component.html').toString(),
    styles: [require('./amp-standalone-menu.scss').toString()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmpStandAloneMenuComponent implements OnInit {
    @Input() form;
    @Input() sectionObservable;

    public control : FormControl = new FormControl(null);
    public errors = {};
    public showNavigation : boolean = true;
    private _selected : string = null;
    private _disabled : boolean = false;
    private _required : boolean = false;
    private isInSummaryState : boolean = false;
    private controlGroup : FormGroup;
    private sections = [];
    private sectionLabels : string = null;
    private previousSectionName : string = null;
    private domUtils : DomUtils = null;
    private isSectionUpdated : boolean = false;
    private itemPrefix : string = 'Item-';
    private isClassOpen : boolean = false;
    private tempScrollTop : number;
    constructor(
        private _dom : BrowserDomAdapter,
        private _cd : ChangeDetectorRef,
        private elem : ElementRef,
        private scrollService : ScrollService,
        private formSectionService : FormSectionService) {

        this.domUtils = new DomUtils();

    }

    ngOnInit() : any {

        this.sectionObservable.subscribe((blockchanges) => {
            setTimeout(() => {
                this.updateSections();
            }, 0);
        });
    }

    private isStateDisabled(state : string) {
        return state.indexOf('visited') === -1;
    }

    private isStateActive(state : string) {
        return state.indexOf('active') > -1;
    }

    /**
     *
     * Update the sections and then put them into the collection along with the custom names for the menu
     *
     */
    private updateSections() {
        let body = this._dom.query('body');
        let sections = this._dom.querySelectorAll(body, 'page-section');
        let mySections = [];

        this.sections = Array.prototype.map.call(sections, (section, index) => {
            let pageSectionId = section.id;
            let menuItemId = this.itemPrefix + section.id;
            let classes = section.className || 'untouched';
            let label = section.getAttribute('label');
            return {
                label: label,
                pageSectionId: pageSectionId,
                id: menuItemId,
                state: classes
            };
        });
        this._cd.markForCheck();
    }

    private onClassOpen() {
        this.isClassOpen = !this.isClassOpen;
        this.tempScrollTop = this.scrollService.scrollTop;
        window.scrollTo(0, 1);
    }

    private onClassClose() {
        this.isClassOpen = !this.isClassOpen;
        window.scrollTo(0, this.tempScrollTop);
    }

    private scrollToSection(section) {
        this.isClassOpen = false;
        this.scrollService.scrollToComponentSelector(section.pageSectionId);
    }

}
