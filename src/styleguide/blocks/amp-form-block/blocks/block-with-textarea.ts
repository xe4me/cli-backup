import { Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy } from '@angular/core';
import { AmpFormBlockComponent } from "../../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../../services/theme";
import { FormBlock } from "../../../../app/form-block";
import { ScrollService } from "../../../../app/services/scroll/scroll.service";
import { FormModelService } from "../../../../app/services/form-model/form-model.service";
import { ProgressObserverService } from "../../../../app/services/progress-observer/progress-observer.service";
import { AmpInputComponent } from "../../../../app/components/amp-input/amp-input.component";
import { AmpFormRowComponent } from "../../../../app/blocks/amp-form-row/amp-form-row.component";
import { AmpCheckboxComponent } from "../../../../app/components/amp-checkbox/amp-checkbox.component";
import { AmpTextareaComponent } from "../../../../app/components/amp-textarea/amp-textarea.component";
@Component( {
    selector        : 'block-with-textarea' ,
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>Do you like redux ?</label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-textarea
                            [attr.theme]="themeService.theme.attr"
                            [id]='__custom.controls[0].id'
                            #ampReduxRef
                            label='A label '
                            [required]='true'
                            [isInSummaryState]='isInSummaryState'
                            [controlGroup]="__controlGroup"
                            maxLength='500'>
                        </amp-textarea>
                    </amp-redux>
                </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives      : [ AmpFormBlockComponent , AmpTextareaComponent , AmpFormRowComponent ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class BlockWithTextarea extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    context () {
        return this;
    }
}
