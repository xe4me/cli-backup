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
    public showNavigation: boolean = false;
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
        private formSectionService: FormSectionService) {

        this.domUtils = new DomUtils();

    }

    ngOnInit(): any {

        // this.form
        //     .valueChanges
        //     .debounceTime(700)
        //     .subscribe( ( changes ) => {
        //         this.updateSections();
        //     });

        this.sectionObservable.subscribe((blockchanges) => {

            console.log("blockchanges " + JSON.stringify(blockchanges));

            console.log("section Id: " + this.getSectionIdFromBlock(blockchanges));

            if (blockchanges) {

                if (!this.isSectionUpdated) {

                    console.log(this.form.controls);

                    this.updateSections(this.form.controls);
                    this.isSectionUpdated = true;
                }

                this._currentSectionName = blockchanges.section;
                this.showNavigation = true;

                //setTimeout(() => {

                    // this.setUiStates(this._currentSectionName);
                    // this.setUiStates(this.getSectionIdFromBlock(blockchanges));

                //}, 10);

                this.setUiStates(this.getSectionIdFromBlock(blockchanges));

                this._cd.markForCheck();
            }

        });
    }

    private getSectionIdFromBlock(block: any) {
        let id: string = '';
        let tempArr = [];
        let offSet = 1;
        let foundIndex = -1;
        if (block['section'] && block['section'].length > 0 && block['componentSelector'] && block['componentSelector'].length > 0) {
            tempArr = block['componentSelector'].split('-');
            if (tempArr.length > 0 ) {
                foundIndex = tempArr.indexOf(block['section']);
                if (foundIndex != -1) {
                    id = tempArr.slice(offSet, foundIndex + offSet).join('-');
                }
            }
        }

        return id;

    }

    private setUiStates(_currentSection: string): void {
        let indexFound = -1;
        let mySections = [];
        let newState = null;

        // console.log("this.sections", this.sections);
        // console.log("current section " + _currentSection);

        indexFound = this.sections.findIndex((section) => {
            return section.key === _currentSection;
        });

        // console.log("found index: ", indexFound);

        if (indexFound != -1) {
            mySections = this.sections.map( (section, index)  => {
                if (index === indexFound) {
                    if (section.state === 'active' && index === (this.sections.length - 1)) {
                        newState = 'done';
                    }
                    else {
                        newState = 'active';
                    }
                } 
                else if (index < indexFound) {
                    newState = 'done';
                }
                else {
                    newState = '';
                }
                return {
                    label: section.label,
                    key: section.key,
                    // state: index === indexFound ? 'active' : index < indexFound ? 'done' : ''
                    state: newState
                }
            });

            Object.assign(this.sections, mySections);

        }

        // if (_currentSection) {
        //     // TODO: cache selected values, and access to highlight sections

        //     let parentUlElm = this._dom.query('#' + _currentSection);
        //     parentUlElm.className = parentUlElm ? 'active' : '';

        //     if (this._previousSectionName === null) {
        //         this._previousSectionName = _currentSection;

        //     } else if (this._previousSectionName !== _currentSection) {

        //         let prevUlElm = this._dom.query('#' + this._previousSectionName);
        //         prevUlElm.className = prevUlElm ? 'done' : '';

        //     }
        // }

    }

    /**
     *
     * Update the sections and then put them into the collection along with the custom names for the menu
     *
     */
    private updateSections(controls: any, parentRef: string = ''): void {
        let keyId : string = '';

        if (controls) {
            Object.keys(controls).map((key) => {

                if (/section$/i.test(key)) {//only section can be considered for custom object with label.
                    if (controls[key].custom && controls[key].custom.label) {
                        keyId = parentRef.length > 0 ? `${parentRef}-${key}` : `${key}`;
                        this.sections.push({ 
                            label: controls[key].custom.label, 
                            key: keyId, 
                            state: null
                        });
                    } 
                    if (controls[key].controls) {
                        this.updateSections(controls[key].controls, keyId);
                    }
                }
            });
        }
    }

    private scrollToSection(event) {
        console.log("Navigate to section ", event);
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
