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
    selector        : 'sample-fields-block3',
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">

            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label'>There are
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
                 </amp-redux> equity holders.
                </label>
            </amp-form-row>
        </amp-form-block>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SampleFieldsBlock3 extends FormBlock implements OnInit {
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
