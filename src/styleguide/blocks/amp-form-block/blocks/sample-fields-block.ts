import {
    Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy , Input ,
    AfterViewInit
} from '@angular/core';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import { ScrollService } from '../../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../app/services/progress-observer/progress-observer.service';
import { FDN } from '../Application.fdn';
import { StoreService } from '../../../../app/redux/services/store/store.service';
@Component( {
    selector        : 'sample-fields-block' ,
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
         <amp-form-row [attr.theme]="themeService.theme.attr">
         <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label-inline sr-only'>Whats your full name?</label>
                <div class="grid__item_floated palm-1/1 tablet-3/12 lap-and-down-6/12 desk-2/12 desk-mr- mr  mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
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
                    </amp-redux>
                </div>

                <div class="grid__item_floated palm-1/1 tablet-3/12 lap-and-down-6/12 desk-3/12 desk-mr- mr mt0">
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
                            [maxLength]="'12'"
                            [maxFloat]="'654654'"
                            [minLength]="'4'">
                        </amp-input>
                    </amp-redux>
                </div>
                <div class="grid__item_floated palm-1/1 tablet-3/12 lap-and-down-6/12 desk-3/12 desk-mr- mr mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[0].id"
                            [label]="'Middle name '"
                            [controlGroup]="__controlGroup"
                            [isInSummaryState]="isInSummaryState"
                            [required]="true"
                            [maxLength]="'12'"
                            [maxFloat]="'654654'"
                            [minLength]="'4'">
                        </amp-input>
                    </amp-redux>
                </div>
                <div class="grid__item_floated palm-1/1 tablet-3/12 lap-and-down-6/12 desk-3/12 desk-mr- mr mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[0].id"
                            [label]="'Last name '"
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
            <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label-inline'>Whats your full name?</label>
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-3/12 mr mt0">
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
                            [maxLength]="'12'"
                            [maxFloat]="'654654'"
                            [minLength]="'4'">
                        </amp-input>
                    </amp-redux>
                </div>
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-3/12 mr mt0">
                    <label class='1/1 sr-only'>What's your first name?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[0].id"
                            [label]="'Last name '"
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
                <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label'>Contact number</label>
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-3/12 mr+ mt0">
                    <label class='1/1 sr-only'>What's your Contact number?</label>
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                        <amp-input
                            #ampReduxRef
                            [attr.theme]="themeService.theme.attr"
                            [id]="__custom.controls[0].id"
                            [label]="'First name '"
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
                <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label'>Email address</label>
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-3/12 mr+ mt0">
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
    changeDetection : ChangeDetectionStrategy.OnPush ,
    styles          : [ require( '../basic_usage.scss' ).toString() ] ,
} )
export class SampleFieldsBlock extends FormBlock {
    private $checkBoxValue = this.storeService.distinctSelect( FDN.BlockWithCheckbox.concat( [ 'checkboxId' ] ) );
    private something      = this.storeService.distinctSelect( FDN.anotherSampleExperienceBlock.concat( [ 'FullOrPartial' ] ) );

    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private storeService : StoreService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
