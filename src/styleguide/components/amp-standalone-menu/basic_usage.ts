import { Component, AfterViewInit, OnInit, ChangeDetectorRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { AmpStandAloneMenuComponent } from '../../../app/modules/amp-standalone-menu/components/amp-standalone-menu/amp-standalone-menu.component';
@Component({
    selector	: 'amp-standalone-menu-basic-usage',
    providers	: [ScrollService, FormSectionService],
    templateUrl	: 'src/styleguide/components/amp-standalone-menu/basic_usage.html' ,
    encapsulation : ViewEncapsulation.None,
    styles		: [ require('./basic_usage.scss').toString() ]
})

export default class AmpStandaloneMenuComponentBasicUsage implements OnInit {
    private blockChange$ : EventEmitter<any>;
    private mainContentSelector : string = '#sample-static-content';

    constructor(
        private dom : BrowserDomAdapter,
        private scrollService : ScrollService,
        private formSectionSection : FormSectionService) {
        this.blockChange$ = new EventEmitter();
    }

    ngOnInit() {
        setTimeout(() => this.notifyBlockChange(), 10);
    }

    public notifyBlockChange() {
        return this.scrollService.$scrolled.emit({
            section: 'FinalQuestionsSection',
            componentSelector: 'ApplicationSection-FinalQuestionsSection'
        });
    }
}
