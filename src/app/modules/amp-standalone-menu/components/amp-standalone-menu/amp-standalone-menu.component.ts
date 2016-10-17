import {
    Component ,
    EventEmitter ,
    ElementRef ,
    ChangeDetectorRef ,
    AfterViewInit ,
    OnDestroy ,
    ChangeDetectionStrategy ,
    OnInit,
    AfterViewChecked,
    Input
} from '@angular/core';

import { FormControl , FormGroup } from '@angular/forms';
import { FormSectionService } from '../../../../services/form-section/form-section.service';
import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

@Component({
    selector : 'amp-standalone-menu',
    template : require('./amp-standalone-menu.component.html').toString(),
    styles : [require('./amp-standalone-menu.scss').toString()],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AmpStandAloneMenuComponent implements OnInit {
    @Input() form;
    @Input() sectionObservable;

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
    private _currentSectionName : string = null;
    private _previousSectionName : string = null;
    private domUtils : DomUtils = null;
    constructor(private _dom : BrowserDomAdapter,
                private _cd : ChangeDetectorRef,
                private elem : ElementRef,
                private formSectionService : FormSectionService) {

        this.domUtils = new DomUtils();

    }

    ngOnInit() : any {

        this.form
            .valueChanges
            .debounceTime(700)
            .subscribe( ( changes ) => {
                this.updateSections();
            });

        this.sectionObservable.subscribe( ( blockchanges ) => {

            if (blockchanges) {

                this._currentSectionName = blockchanges.section;
                this.showNavigation = true;

                setTimeout(() => {

                    this.setUiStates(this._currentSectionName);

                }, 10);

            }
            this._cd.markForCheck();

        });
    }

    private setUiStates(_currentSection : string) : void {

        if (_currentSection) {
            // TODO: cache selected values, and access to highlight sections

            let parentUlElm = this._dom.query('#' + _currentSection);
            parentUlElm.className = 'active';

            if (this._previousSectionName === null) {
                this._previousSectionName = _currentSection;

            } else if (this._previousSectionName !== _currentSection) {

                let prevUlElm = this._dom.query('#' + this._previousSectionName);
                prevUlElm.className = 'done';

            }
        }

    }

    /**
     *
     * Update the sections and then put them into the collection along with the custom names for the menu
     *
     */
    private updateSections() : void {
        this.sections = [];
        Object.keys(this.form.controls).map((key) => {
            this.sectionLabels = this.form.controls[key].custom.label;
            if (this.sectionLabels) {
                this.sections.push([this.sectionLabels, key]);
            }
        });
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
