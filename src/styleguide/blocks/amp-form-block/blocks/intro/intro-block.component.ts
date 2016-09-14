import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../../app/services/progress-observer/progress-observer.service';
import { ThemeService } from '../../../../services/theme';
import { FormBlock } from '../../../../../app/form-block';
import { AmpButton } from '../../../../../app/components/amp-button/amp-button.component';
@Component( {
    selector        : 'intro-block' ,
    directives      : [ AmpButton ] ,
    template        : `
        <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class='intro-logo mb+'></div>
                <div class="utils__align--center mb-60" >
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align--left" >
                    <h1 class="heading heading-intro color-white">
                        The choice is yours. Know the facts.
                    </h1>
                    <p class='mt-50'>
                        Weigh up the pros and cons when considering your personal circumstances and if you decide your employer’s AMP super plan is right for you, simply provide the information below we’ll work with your employer to set up your AMP account.
                    </p>
                    <amp-button
                        [context]="context()"
                        class='btn btn-ok mt+'
                        [attr.theme]="themeService.theme.attr"
                        (click)='onNext()'>
                        OK
                    </amp-button>
                </div>
            </div>
        </div>
    ` ,
    styles          : [ require( './intro-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IntroBlockComponent extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    context () {
        return this;
    }
}
