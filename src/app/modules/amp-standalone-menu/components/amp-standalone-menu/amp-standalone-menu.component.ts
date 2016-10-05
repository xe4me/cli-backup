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
    private _selected : string = null;
    private _disabled : boolean = false;
    private _required : boolean = false;
    private isInSummaryState : boolean = false;
    private controlGroup : FormGroup;
    private sections = [];
    private sectionLabels : string = null;
    private _currentSectionName : string = null;
    private _previousSectionName : string = null;
    private showNavigation : boolean = false;

    constructor(
                private _dom : BrowserDomAdapter,
                private _cd : ChangeDetectorRef,
                private elem : ElementRef,
                private formSectionService : FormSectionService) {
    }

    /**
     *
     * Update the sections, watch for changes on the block
     *
     */
    ngOnInit() : any {

        this.form
            .valueChanges
            .debounceTime(700)
            .subscribe( ( changes ) => {
                this.updateSections();
            });

        this.sectionObservable.subscribe( ( blockchanges ) => {

            if (blockchanges) {
                /*Store the current and show the navigation*/
                this._currentSectionName = blockchanges.section;
                this.showNavigation = true;

                setTimeout(() => {

                    this.setUiStates(this._currentSectionName);

                }, 10);

            }
            this._cd.markForCheck();

        });
    }
    /**
     * Add and substract classes on elements based on current active section, add classes to elements once the sections have been done.
     *
     * @params: _currentSection = the current active section
     *
     */
    private setUiStates( _currentSection : string ) : void {

        if (_currentSection) {

            let parentUlElm = this._dom.query( '#' + _currentSection );
            let className = 'active';
            parentUlElm.setAttribute('class', className);

            if (this._previousSectionName === null) {
                this._previousSectionName = _currentSection;

            } else if (this._previousSectionName !== _currentSection) {

                let prevUlElm = this._dom.query( '#' + this._previousSectionName );
                let className = 'done';
                prevUlElm.setAttribute('class', className);

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
        Object.keys(this.form.controls).map( ( key ) => {
            this.sectionLabels = this.form.controls[key].custom.label;
            if (this.sectionLabels) {
                this.sections.push([this.sectionLabels, key]);
            }
        } );
    }
}
