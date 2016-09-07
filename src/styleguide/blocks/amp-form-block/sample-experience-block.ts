import { Component , ChangeDetectorRef , ElementRef , OnInit } from '@angular/core';
import { AmpFormBlockComponent } from "../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../services/theme";
import { FormBlock } from "../../../app/form-block";
import {
    Action ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
import { AmpFormRowComponent } from "../../../app/blocks/amp-form-row/amp-form-row.component";
import { AmpRInputComponent } from "../../../app/r-component/amp-r-input/amp-r-input.component";
@Component( {
    selector   : 'sample-experience-block' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 form-row-label'>Name</label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
                    <amp-r-input [controlGroup]="__controlGroup" [fdn]="__fdn">
                    </amp-r-input>
                    <!--<amp-error [controlGroup]="context?.__controlGroup" [controlId]="'firstname'"></amp-error>-->
                </div>
             </amp-form-row> 
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpRInputComponent , AmpFormRowComponent ]
} )
export class SampleExperienceBlock extends FormBlock implements OnInit {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , progressObserver , scrollService );
    }

    ngOnInit () : any {
        return undefined;
    }

    context () {
        return this;
    }
}
