import { Component, AfterViewInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { AmpStandAloneMenuComponent } from '../../../app/modules/amp-standalone-menu/components/amp-standalone-menu/amp-standalone-menu.component';
@Component({
    selector	: 'amp-standalone-menu-basic-usage',
    providers	: [ScrollService, FormSectionService],
    templateUrl	: 'src/styleguide/components/amp-standalone-menu/basic_usage.html' ,
    styles		: [ require('./basic_usage.scss').toString() ]
})

export default class AmpStandaloneMenuComponentBasicUsage implements AfterViewInit {
    private blockChange$ : EventEmitter<any>;
    constructor(private scrollService : ScrollService, private formSectionSection : FormSectionService) {
        this.blockChange$ = new EventEmitter();
    }

    ngAfterViewInit() {
        setTimeout(() => this.notifyBlockChange(), 10);
    }

    public notifyBlockChange() {
        return this.blockChange$.emit({ section: 'someName', componentSelector: 'someFdnCompomentName' });
    }
}
