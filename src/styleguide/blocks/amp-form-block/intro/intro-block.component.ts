import { Component , ChangeDetectorRef , ElementRef } from "@angular/core";
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { ThemeService } from "../../../services/theme";
import { FormBlock } from "../../../../app/form-block";
import { AmpPrimaryButton } from "../../../../app/components/amp-primary-button/amp-primary-button.component";
import { AmpCheckboxComponent } from "../../../../app/components/amp-checkbox/amp-checkbox.component";
@Component( {
    selector   : 'intro-block' ,
    directives : [ AmpCheckboxComponent , AmpPrimaryButton ] ,
    template   : `
        <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class='intro-logo mt-60 mb-60 palm-m'></div>
                <div class="utils__align--center mb-60" >
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align--left" >
                    <h1 class="heading heading-intro color-white">
                        The choice is yours. Know the facts.
                    </h1>
                    <p class='mt-50'>
                        Weigh up the pros and cons when considering your personal circumstances and if you decide your employer’s AMP super plan is right for you, simply provide the information below we’ll work with your employer to set up your AMP account.
                    </p>
                    <amp-primary-button
                        class='btn btn-ok'
                        [attr.theme]="themeService.theme.attr"
                        (click)='onNext()'>
                        OK
                    </amp-primary-button>
                </div>
            </div>
        </div>
    ` ,
    styles     : [ require( './intro-block.component.scss' ).toString() ]
} )
export class IntroBlockComponent extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , progressObserver , scrollService );
    }

    context () {
    }
}
