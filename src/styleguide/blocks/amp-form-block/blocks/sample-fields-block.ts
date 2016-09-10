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
import { AmpFormRowComponent } from "../../../../app/blocks/amp-form-row/amp-form-row.component";
@Component( {
    selector        : 'sample-fields-block' ,
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>Contact number</label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                    <label class='1/1 sr-only'>What's your Contact number?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[0].id"
                            [label]="'Contact number '"
                            [controlGroup]="__controlGroup"
                            [isInSummaryState]="isInSummaryState"
                            [required]="true"
                            [maxLength]="'12'"
                            [maxFloat]="'654654'"
                            [minLength]="'4'">
                        </amp-input>
                    </amp-redux>
                </div>
            </amp-form-row>
             <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>Email address</label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                    <label class='1/1 sr-only'>What's your Email address?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[1].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[1].id"
                            [label]="'Email address '"
                            [controlGroup]="__controlGroup"
                            [isInSummaryState]="isInSummaryState"
                            [required]="true"
                            [maxLength]="'12'"
                            [maxFloat]="'654654'"
                            [minLength]="'4'">
                        </amp-input>
                    </amp-redux>
                </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives      : [ AmpFormBlockComponent , AmpInputComponent , AmpFormRowComponent ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SampleFieldsBlock extends FormBlock implements OnInit {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
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
