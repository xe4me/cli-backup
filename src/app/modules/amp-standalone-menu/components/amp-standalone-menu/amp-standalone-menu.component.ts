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

    public control:FormControl = new FormControl(null);
    public errors = {};
    private _selected:string = null;
    private _disabled:boolean = false;
    private _required:boolean = false;
    private isInSummaryState:boolean = false;
    private controlGroup:FormGroup;
    private  sections = [];
    private _currentSectionName:string = null;
    private showNavigation:boolean = false;



    constructor(
                private _dom : BrowserDomAdapter,
                private _cd:ChangeDetectorRef,
                private elem:ElementRef,
                private formSectionService:FormSectionService) {
    }

    public displaySection(_section:string[], _index:number) {
        console.log("this has been triggered");
        this.formSectionService.setCurrentActiveSection(_section, _index);
    }

    ngOnInit():any {

        this.form
            .valueChanges
            .debounceTime(700)
            .subscribe(changes => {
                this.updateSections();
            });

        this.sectionObservable.subscribe( blockchanges => {

            if (blockchanges) {
                this._currentSectionName = blockchanges.section;
                this.showNavigation = true;

                setTimeout(() => {
                   let parentUlElm = this._dom.query( '.'+this._currentSectionName );
                   let className = 'active';
                   parentUlElm.setAttribute('class', className);

                    //this.parentUlElm.addClass('test');
                    //this._dom.querySelectorAll( parentUlElm ,'.'+this._currentSectionName).addClass(this, '.node .active');

                    //console.log();
                }, 1);


                //console.log(this._dom.querySelectorAll( parentElm ,'nav.steps-nav'));
                //console.log(this._currentSection);
                //console.log(  this._dom.query("amp-standalone-menu"));

            }
            this._cd.markForCheck();

        });
    }

    private updateSections():void {
        this.sections = [];
        Object.keys(this.form.controls).map((key)=> {

            this.sections.push(key);

        })

        this._cd.markForCheck();
    }
}
