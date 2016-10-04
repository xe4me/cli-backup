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

@Component({
    selector: 'amp-standalone-menu',
    template: require('./amp-standalone-menu.component.html').toString(),
    styles: [require('./amp-standalone-menu.scss').toString()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmpStandAloneMenuComponent implements OnInit, AfterViewChecked {
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
    private _currentSection:string = null;

    constructor(private _cd:ChangeDetectorRef,
                private elem:ElementRef,
                private formSectionService:FormSectionService) {
    }

    public displaySection(_section:string[], _index:number) {
        console.log("this has been triggered");
        this.formSectionService.setCurrentActiveSection(_section, _index);
    }

    ngOnInit():any {
        //this.formSectionService.$onRegisterSection.subscribe( ( _section ) => {
        //   this.sections = _section.sections;
        //   this._cd.markForCheck();
        //} );

        ///console.log("scrollService", scrollService);

        this.form
            .valueChanges
            .debounceTime(700)
            .subscribe(changes => {
                this.updateSections();
                //console.log("changes ", changes);
            });

        this.sectionObservable.subscribe( blockchanges => {
            this._currentSection = blockchanges.section;
            console.log("blockchanges ", blockchanges.section);
        });

    }

    ngAfterViewChecked():void {
        //console.log("intro done", this.form);

        //console.log( "ngAfterViewChecked ", this.sections );
    }

    private updateSections():void {
        this.sections = [];
        Object.keys(this.form.controls).map((key)=> {

            this.sections.push(key);

        })

        this._cd.markForCheck();
    }
}
