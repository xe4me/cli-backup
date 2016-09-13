import { Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy } from '@angular/core';
import { AmpFormBlockComponent } from '../../../../app/blocks/amp-form-block/amp-form-block.component';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import { AmpInputComponent } from '../../../../app/components/amp-input/amp-input.component';
import { AmpDropdownComponent } from '../../../../app/components/amp-dropdown/amp-dropdown.component';
import { ScrollService } from '../../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../app/services/progress-observer/progress-observer.service';
import { AmpFormRowComponent } from '../../../../app/blocks/amp-form-row/amp-form-row.component';
@Component( {
    selector        : 'sample-fields-block3' ,
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
    ` ,
    directives      : [ AmpFormBlockComponent , AmpInputComponent , AmpFormRowComponent , AmpDropdownComponent ] ,
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
