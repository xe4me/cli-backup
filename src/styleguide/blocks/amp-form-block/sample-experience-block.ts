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
@Component( {
    selector   : 'sample-experience-block' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr">
            <h1 class="heading heading-intro">What's your first name?</h1>
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
            <h1 class="heading heading-intro mt+">What's your age?</h1>
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
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpInputComponent ]
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
