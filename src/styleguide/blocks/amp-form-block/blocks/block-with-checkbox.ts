import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    OnInit ,
    ChangeDetectionStrategy ,
    ViewEncapsulation
} from '@angular/core';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import { ScrollService } from '../../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../app/services/progress-observer/progress-observer.service';
@Component( {
    selector   : 'block-with-checkbox' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 mr+ mt0">
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                         <amp-checkbox
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                [isInSummaryState]='isInSummaryState'
                                [controlGroup]="__controlGroup"
                                [required]='true'
                                [id]='__custom.controls[0].id'>
                                <label class='palm-1/1 tablet-1/1 lap-and-up-1/1 label'>This a label for a checkbox that is really long </label>
                        </amp-checkbox>
                    </amp-redux>
                </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )
export class BlockWithCheckbox extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
