import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpFormBlockComponent } from "../../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../../services/theme";
import { FormBlock } from "../../../../app/form-block";
import { ScrollService } from "../../../../app/services/scroll/scroll.service";
import { FormModelService } from "../../../../app/services/form-model/form-model.service";
import { ProgressObserverService } from "../../../../app/services/progress-observer/progress-observer.service";
import { AmpGroupButtonsComponent } from "../../../../app/components/amp-group-buttons/amp-group-buttons.component";
import { AmpFormRowComponent } from "../../../../app/blocks/amp-form-row/amp-form-row.component";
@Component( {
    selector        : 'another-sample-experience-block' ,
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                 <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label'>Scale</label>
                    <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-6/12 mr mt0">
                        <label class='1/1 sr-only'>What's your scale?</label>
                        <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                             <amp-group-buttons
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                (select)='onButtonClick($event)'
                                [buttons]='__custom.controls[0].buttons'
                                [controlGroup]="__controlGroup"
                                [required]="true"
                                [isInSummaryState]="isInSummaryState"
                                [groupName]='__custom.controls[0].id'>
                            </amp-group-buttons>
                        </amp-redux>
                        <amp-error [controlGroup]="context?.__controlGroup" [controlId]="__custom.controls[0].id"></amp-error>
                    </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives      : [ AmpFormBlockComponent , AmpGroupButtonsComponent , AmpFormRowComponent ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AnotherSampleExperienceBlock extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    onButtonClick ( value ) {
        console.log( 'onButtonClick: value' , value );
    }

    context () {
        return this;
    }
}
