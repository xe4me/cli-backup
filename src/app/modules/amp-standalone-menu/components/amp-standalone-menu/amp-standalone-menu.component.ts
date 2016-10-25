import {
    Component,
    EventEmitter,
    ElementRef,
    ChangeDetectorRef,
    AfterViewInit,
    AfterContentInit,
    OnDestroy,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewChecked,
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

    public control: FormControl = new FormControl(null);
    public errors = {};
    public showNavigation: boolean = true;
    private _selected: string = null;
    private _disabled: boolean = false;
    private _required: boolean = false;
    private isInSummaryState: boolean = false;
    private controlGroup: FormGroup;
    private sections = [];
    private sectionLabels: string = null;
    private _currentSectionName: string = null;
    private _previousSectionName: string = null;
    private domUtils: DomUtils = null;
    private isSectionUpdated: boolean = false;

    constructor(private _dom: BrowserDomAdapter,
        private _cd: ChangeDetectorRef,
        private elem: ElementRef,
        private scrollService: ScrollService,
        private formSectionService: FormSectionService) {

        this.domUtils = new DomUtils();

    }

    ngOnInit(): any {

        this.sectionObservable.subscribe((blockchanges) => {

            setTimeout(()=>{
                this.updateSections();                
                
            },0)

        });
    }

    private getDisabledState(_state){
        console.log('_state.indexOf("visited")',_state.indexOf("visited")===-1);
        return _state.indexOf("visited")===-1;
    }

    /**
     *
     * Update the sections and then put them into the collection along with the custom names for the menu
     *
     */
    private updateSections() {
        let body = this._dom.query('body');
        let sections = this._dom.querySelectorAll(body, 'page-section');
        console.log('sections', sections);

        let mySections = [];

        this.sections = Array.prototype.map.call(sections, (section, index) => {
            let id = section.id;
            let classes = section.className;
            let label = section.getAttribute('label');

            // console.log('id', id);
            // console.log('classes', classes);
            // console.log('label', label);
            return {
                label: label,
                id: id,
                state: classes
            }
        });

        console.log('my menu sections ', this.sections);

        this._cd.markForCheck();

    }

    private scrollToSection(event) {
        console.log("Navigate to section ", event);
        this.scrollService.scrollToComponentSelector(event.id);
    }

    private openCloseMenu(event) {
        let navElement = this._dom.query('nav');
        let clsName = 'open';
        if (this.domUtils.hasClass(navElement, clsName)) {
            this.domUtils.removeClass(navElement, clsName);
        } else {
            this.domUtils.addClass(navElement, clsName);
        }
    }

    // this.browserDomAdapter

    /* private addClass(el : any, className : string) {
         if (el.classList) {
             el.classList.add(className);
         } else if (!this.hasClass(el, className)) {
             el.className += ' ' + className;
         }
     }
 
     private removeClass(el : any, className : string) {
         if (el.classList) {
             el.classList.remove(className);
         } else if (this.hasClass(el, className)) {
             let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
             el.className = el.className.replace(reg, ' ');
         }
     }
 
     private hasClass(el : any, className : string) {
         if (el.classList) {
             return el.classList.contains(className);
         } else {
             return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
         }
     }*/
}
