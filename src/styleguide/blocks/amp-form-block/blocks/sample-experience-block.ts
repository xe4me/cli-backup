import {
    Component,
    ChangeDetectorRef,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import {
    ScrollService,
    SaveService
} from '../../../../app/services';
@Component( {
    selector        : 'sample-experience-block',
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">

            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>Name</label>
                <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[0].id"
                            [label]="'First name '"
                            [controlGroup]="__controlGroup"
                            [isInSummaryState]="isInSummaryState"
                            [required]="true"
                            [errors]="__custom.controls[0].errors"
                            [maxLength]="'12'"
                            [maxFloat]="'654654'"
                            [minLength]="'4'">
                        </amp-input>
                    </amp-redux>
                    <amp-error [controlGroup]="context?.__controlGroup" [controlId]="__custom.controls[0].id"></amp-error>
                </div>
             </amp-form-row> 
        </amp-form-block>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SampleExperienceBlock extends FormBlock implements OnInit {
    constructor ( private themeService : ThemeService,
                  saveService : SaveService,
                  scrollService : ScrollService,
                  _cd : ChangeDetectorRef, ) {
        super( saveService, _cd, scrollService );
    }

    ngOnInit () : any {
        return undefined;
    }
}
