import { Component , ChangeDetectorRef , ElementRef } from '@angular/core';
import { AmpButton , AmpErrorComponent , AmpOverlayComponent } from '../../../../';
import { FormBlock } from '../../../app/form-block';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ScrollService } from '../../services/scroll/scroll.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
@Component( {
    selector   : 'intro-block' ,
    directives : [ AmpButton ] ,
    template   : `
    <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class="grid__container 1/1 palm-1/1">
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align&#45;&#45;left" >
                        this is the block
                    </div>
                </div>
    </div>

       <!-- <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class='intro-logo mt-60 mb-60 palm-m'></div>
                <div class="utils__align&#45;&#45;center mb-60" >
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align&#45;&#45;left" >
                    <h1 class="heading heading-intro color-white">
                        The choice is yours. Know the facts.
                    </h1>
                    <p class='mt-50'>
                        Weigh up the pros and cons when considering your personal circumstances and if you decide your employer’s AMP super plan is right for you, simply provide the information below we’ll work with your employer to set up your AMP account.
                    </p>
                    <amp-button
                        class='btn btn-ok'
                        [attr.theme]="themeService.theme.attr"
                        (click)='onNext()'>
                        OK
                    </amp-button>
                </div>
            </div>
        </div>-->
    ` ,
    styles     : [ require( './intro-block.component.scss' ).toString() ]
} )
export class IntroBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    context () {
    }
}
