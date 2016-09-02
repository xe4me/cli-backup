import { Component , ChangeDetectorRef } from '@angular/core';
import { AmpFormBlockComponent } from "../../../app/blocks/amp-form-block/amp-form-block.component";
import { AmpGroupButtonComponent } from "../../../app/components/amp-group-button/amp-group-button.component";
import { ThemeService } from "../../services/theme";
import { FormBlock } from "../../../app/form-block";
import {
    Action ,
    UIControlService ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
import { AmpGroupButtonsComponent } from "../../../app/components/amp-group-buttons/amp-group-buttons.component";
import { AmpFormRowComponent } from "../../../app/blocks/amp-form-row/amp-form-row.component";
@Component( {
    selector   : 'another-sample-experience-block' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <amp-group-buttons
                    [attr.theme]="themeService.theme.attr"
                    class="3/5"
                    (select)='onButtonClick($event)'
                    [buttons]='__custom.buttons'
                    [controlGroup]="__controlGroup"
                    [required]="true"
                    [isInSummaryState]="isInSummaryState"
                    [groupName]='__custom.fullOrPartial'>
                </amp-group-buttons>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpGroupButtonsComponent , AmpFormRowComponent ]
} )
export class AnotherSampleExperienceBlock extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , progressObserver , scrollService );
    }

    onButtonClick ( value ) {
        console.log( 'onButtonClick: value' , value );
    }

    context () {
        return this;
    }
}
