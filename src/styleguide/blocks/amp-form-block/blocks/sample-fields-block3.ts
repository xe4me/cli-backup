import { Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy } from '@angular/core';
import { AmpFormBlockComponent } from "../../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../../services/theme";
import { FormBlock } from "../../../../app/form-block";
import {
    Action ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
import { AmpInputComponent } from "../../../../app/components/amp-input/amp-input.component";
import { AmpDropdownComponent } from "../../../../app/components/amp-dropdown/amp-dropdown.component";
import { AmpFormRowComponent } from "../../../../app/blocks/amp-form-row/amp-form-row.component";
@Component( {
    selector   : 'sample-fields-block3' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">

            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>There are
                <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                    <amp-dropdown
                        #ampReduxRef
                        [attr.theme]="themeService.theme.attr"
                        [isInSummaryState]='false'
                        [id]='__custom.controls[0].id'
                        [label]='"Title"'
                        [labelHidden]='"HiddenLabel"'
                        [controlGroup]="__controlGroup"
                        [options]='__custom.controls[0].options'
                        [required]="true">
                     </amp-dropdown>
                 </amp-redux>equity holders.
                     
                </label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                    <label class='1/1 sr-only'>What's your Contact number?</label>
                </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpInputComponent , AmpFormRowComponent, AmpDropdownComponent ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SampleFieldsBlock3 extends FormBlock implements OnInit {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    ngOnInit () : any {
        return undefined;
    }

    context () {
        return this;
    }
}
