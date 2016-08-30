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
@Component( {
    selector   : 'another-sample-experience-block' ,
    template   : `
        <amp-form-block [context]="context">
            <h1 class="heading heading-intro">Select your full or partial account</h1>
            <br>
            <!--<amp-group-button-->
                <!--medium-->
                <!--[attr.theme]="themeService.theme.attr"-->
                <!--scrollOutOn='full'-->
                <!--class="3/5"-->
                <!--(select)='onButtonClick($event)'-->
                <!--[buttons]='buttons'-->
                <!--[parentControl]='fullOrPartialControl'-->
                <!--[groupName]='fullOrPartial'-->
                <!--&gt;-->
            <!--</amp-group-button>-->

        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpGroupButtonComponent ] ,
    providers  : [ ThemeService ]
} )
export class AnotherSampleExperienceBlock extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , progressObserver );
    }

    context () {
        return this;
    }
}
