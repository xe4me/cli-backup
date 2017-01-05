import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewContainerRef
} from '@angular/core';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import {
    ScrollService,
    SaveService
} from '../../../../app/services';
@Component( {
    selector        : 'block-with-google-address',
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr" >
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>Here is a label</label>
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-8/12 mr+ mt0">
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-qas-address-multi
                            [attr.theme]="themeService.theme.attr"
                            [id]='__custom.controls[0].id'
                            #ampReduxRef
                            label='A label '
                            [required]='true'
                            [isInSummaryState]='isInSummaryState'
                            [controlGroup]="__controlGroup"
                            maxLength='500'>
                        </amp-qas-address-multi>
                    </amp-redux>
                </div>
            </amp-form-row>
        </amp-form-block>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class BlockWithGoogleAddress extends FormBlock {
    constructor ( private themeService : ThemeService,
                  private _vContainerRef : ViewContainerRef,
                  saveService : SaveService,
                  scrollService : ScrollService,
                  _cd : ChangeDetectorRef, ) {
        super( saveService, _cd, scrollService );
    }
}
