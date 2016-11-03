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
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'amp-standalone-menu',
    template: require('./amp-standalone-menu.component.html').toString(),
    styles: [require('./amp-standalone-menu.scss').toString()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmpStandAloneMenuComponent implements OnInit {
    public control : FormControl = new FormControl(null);
    public errors = {};
    public showNavigation : boolean = false;
    private _selected : string = null;
    private _disabled : boolean = false;
    private _required : boolean = false;
    private isInSummaryState : boolean = false;
    private controlGroup : FormGroup;
    private sections = [];
    private sectionLabels : string = null;
    private previousSectionName : string = null;
    private currentSectionId : string = null;
    private domUtils : DomUtils = null;
    private isSectionUpdated : boolean = false;
    private itemPrefix : string = 'Item-';
    private isClassOpen : boolean = false;
    private tempScrollTop : number;
    private sectionObservable : Observable<any>;

    constructor(
        private _dom : BrowserDomAdapter,
        private _cd : ChangeDetectorRef,
        private elem : ElementRef,
        private scrollService : ScrollService,
        private formSectionService : FormSectionService) {
        this.domUtils = new DomUtils();
        this.sectionObservable = scrollService.$scrolled;
    }

    ngOnInit() : any {
        this.sectionObservable.subscribe((blockchanges) => {
            let sectionName = blockchanges ? blockchanges.section : null;
            setTimeout(() => {
                this.updateSections(sectionName);
            }, 0);
        });
    }

    private isStateDisabled(state : string) {
        return state.indexOf('visited') === -1 && state.indexOf('active') === -1;
    }

    private isStateActive(state : string) {
        return state.indexOf('active') > -1;
    }

    /**
     *
     * Update the sections and then put them into the collection along with the custom names for the menu
     *
     */
    private updateSections(sectionName : string) {
        let body = this._dom.query('body');
        let sections = this._dom.querySelectorAll(body, 'page-section');
        let mySections = [];
        let hasActiveClass = false;
        let currentSectionName = sectionName ? sectionName : this.currentSectionId;
        this.sections = Array.prototype.map.call(sections, (section, index) => {
            let pageSectionId = section.id;
            let menuItemId = this.itemPrefix + section.id;
            let classes = section.className;
            let label = section.getAttribute('label');

            if (!hasActiveClass && currentSectionName && pageSectionId.indexOf(currentSectionName) > -1) {
                classes = classes ? classes + ' active' : 'active';
                this.currentSectionId = pageSectionId;
                hasActiveClass = true;
            }
            return {
                label: label,
                pageSectionId: pageSectionId,
                id: menuItemId,
                state: classes
            };
        });
        if (this.sections.length && hasActiveClass) {
            this.showNavigation = true;
        }
        this._cd.markForCheck();
    }

    private onClassOpen() {
        let body = this._dom.query('body');
        let main = this._dom.querySelectorAll(body, 'main');
        if (main) {
            main[0].setAttribute('hidden', true);
        }
        this.isClassOpen = !this.isClassOpen;
        this.tempScrollTop = this.scrollService.scrollTop;
        window.scrollTo(0, 1);
    }

    private onClassClose() {
        let body = this._dom.query('body');
        let main = this._dom.querySelectorAll(body, 'main');
        if (main) {
            main[0].removeAttribute('hidden');
        }
        this.isClassOpen = !this.isClassOpen;
        window.scrollTo(0, this.tempScrollTop);
    }

    private scrollToSection(section) {
        this.isClassOpen = false;
        this.currentSectionId = section.pageSectionId;
        this.scrollService.scrollToComponentSelector(section.pageSectionId);
    }
}
