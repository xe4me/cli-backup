import { Component , ChangeDetectorRef } from "@angular/core";
import { BaseBlockComponent } from "../block-files";
import {
    FormModelService ,
    AmpButton ,
    AmpCheckboxComponent ,
} from '../../app-files';
import { ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
@Component( {
    selector   : 'intro-block' ,
    directives : [ AmpCheckboxComponent , AmpButton ] ,
    template   : `
        <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive' >
                <div class='intro-logo mt-60 mb-60 palm-m'></div>
                <div class="utils__align--center mb-60" >
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align--left" >
                    <h1 class="heading heading-intro color-white">
                        The choice is yours. Know the facts.
                    </h1>
                    <p class='mt-50'>
                        Weigh up the pros and cons when considering your personal circumstances and if you decide your employer’s AMP super plan is right for you, simply provide the information below we’ll work with your employer to set up your AMP account.  
                    </p>
                    <amp-button
                        [disabled]='!canGoNext'
                        class='btn btn-ok btn-ok-white mt-60 ' 
                        (click)='onNext()' 
                        data-automation-id='btn_intro-block'>
                        OK
                    </amp-button>
                </div>
            </div>
        </div>
    ` ,
    inputs     : [
        'form' ,
        'isActive' ,
        'scrollToNextUndone' ,
        'isInSummaryState' ,
        'extraCheck' ,
        'scrollOnDone' ,
        'customs'
    ] ,
    outputs    : [ 'next' , 'changes' ] ,
    styles     : [ require( './intro-block.component.scss' ).toString() ]
} )
export class IntroBlockComponent extends BaseBlockComponent {
    customs = {
        controls  : {} ,
        groupName : 'intro'
    };

    constructor ( progressObserver : ProgressObserverService ,
                  formModelService : FormModelService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ) {
        super( scrollService , _cd , formModelService , progressObserver );
        this.init();
    }
}
