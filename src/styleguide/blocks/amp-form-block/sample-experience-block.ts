import { Component , ChangeDetectorRef } from '@angular/core';
import { AmpFormBlockComponent } from "../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../services/theme";
import { FormBlock } from "../../../app/form-block";
import {
    Action ,
    UIControlService ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
import { AmpInputComponent } from "../../../app/components/amp-input/amp-input.component";
import { AmpFormRowComponent } from "../../../app/blocks/amp-form-row/amp-form-row.component";
@Component( {
    selector   : 'sample-experience-block' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <div class="1/3">
                <amp-input
                        [attr.theme]="themeService.theme.attr"
                        [id]="'firstname'"
                        [label]="'First name '"
                        [controlGroup]="__controlGroup"
                        [isInSummaryState]="isInSummaryState"
                        [isRequired]="true"
                        [errors]="__custom.firstname.errors"
                        [valMaxLength]="'12'"
                        [valMinLength]="'4'">
                    </amp-input>
                </div>
            </amp-form-row>
            <amp-form-row [attr.theme]="themeService.theme.attr"> 
               <amp-input
                    [attr.theme]="themeService.theme.attr"
                    [id]="'lastname'"
                    [label]="'Last name'"
                    [controlGroup]="__controlGroup"
                    [isInSummaryState]="isInSummaryState"
                    [isRequired]="true"
                    [errors]="__custom.lastname.errors"
                    [valPattern]="__custom.lastname.regex"
                    [valMaxLength]="__custom.lastname.maxLengh"
                    [valMinLength]="'4'">
            </amp-input>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpInputComponent , AmpFormRowComponent ]
} )
export class SampleExperienceBlock extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , progressObserver , scrollService );
    }

    context () {
        return this;
    }
}
