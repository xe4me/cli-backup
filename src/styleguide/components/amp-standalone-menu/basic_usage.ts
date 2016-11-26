import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Component( {
    selector : 'amp-standalone-menu-basic-usage',
    templateUrl : './basic_usage.html',
    encapsulation : ViewEncapsulation.None,
    styles : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpStandaloneMenuComponentBasicUsage implements OnInit {
    private blockChange$ : EventEmitter<any>;
    private mainContentSelector : string = '#sample-static-content';

    constructor( private dom : BrowserDomAdapter,
                 private scrollService : ScrollService,
                 private formSectionSection : FormSectionService ) {
        this.blockChange$ = new EventEmitter();
    }

    ngOnInit() {
        setTimeout( () => this.notifyBlockChange(), 10 );
    }

    public notifyBlockChange() {
        return this.scrollService.$scrolled.emit( {
            section : 'FinalQuestionsSection',
            componentSelector : 'ApplicationSection-FinalQuestionsSection'
        } );
    }
}
