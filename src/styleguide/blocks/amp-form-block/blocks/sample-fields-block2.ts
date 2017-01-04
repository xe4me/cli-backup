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
    selector        : 'sample-fields-block2',
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
           <amp-form-row [attr.theme]="themeService.theme.attr">
                    <div class="grid__item_floated palm-1/1 tablet-and-up-1/1 lap-and-up-6/12  mr mt0">
                        <label class='1/1 sr-only'>What's your scale?</label>
                        <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                             <amp-group-buttons
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                [buttons]='__custom.controls[0].buttons'
                                [controlGroup]="__controlGroup"
                                [required]="true"
                                [isInSummaryState]="isInSummaryState"
                                [groupName]='__custom.controls[0].id'>
                            </amp-group-buttons>
                        </amp-redux>
                        <amp-error [controlGroup]="context?.__controlGroup" [controlId]="__custom.controls[0].id"></amp-error>
                    </div>
            </amp-form-row>
        </amp-form-block>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( '../basic_usage.scss' ).toString() ],
} )
export class SampleFieldsBlock2 extends FormBlock implements OnInit {
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
