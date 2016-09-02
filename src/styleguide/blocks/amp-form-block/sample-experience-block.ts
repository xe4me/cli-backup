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
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 form-row-label'>Name</label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
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
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr">
                    <label class='1/1 sr-only'>What's your last name?</label>
                    <amp-input
                        [attr.theme]="themeService.theme.attr"
                        [id]="'lastname'"
                        [label]="'Last name '"
                        [controlGroup]="__controlGroup"
                        [isInSummaryState]="isInSummaryState"
                        [isRequired]="true"
                        [errors]="__custom.lastname.errors"
                        [valMaxLength]="'12'"
                        [valMinLength]="'4'">
                    </amp-input>
                </div>
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
