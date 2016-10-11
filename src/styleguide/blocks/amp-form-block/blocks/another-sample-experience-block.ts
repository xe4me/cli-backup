import {
    Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy , ViewContainerRef , ViewRef , ComponentRef
} from '@angular/core';
import { AmpFormBlockComponent } from '../../../../app/blocks/amp-form-block/amp-form-block.component';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import { ScrollService } from '../../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../app/services/progress-observer/progress-observer.service';
@Component( {
    selector        : 'another-sample-experience-block' ,
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                 <label class='grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 form-row-label'>Scale</label>
                    <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-6/12 mr mt0">
                        <label class='1/1 sr-only'>What's your scale?</label>
                        <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                             <amp-group-buttons
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                (select)='onButtonClick($event)'
                                [buttons]='__custom.controls[0].buttons'
                                [controlGroup]="__controlGroup"
                                [required]="true"
                                [isInSummaryState]="isInSummaryState"
                                [groupName]='__custom.controls[0].id'>
                            </amp-group-buttons>
                        </amp-redux>
                        <amp-redux [fdn]="__fdn.concat([__custom.controls[1].id])">
                             <amp-group-buttons
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                (select)='onButtonClick($event)'
                                [buttons]='__custom.controls[1].buttons'
                                [controlGroup]="__controlGroup"
                                [required]="true"
                                [isInSummaryState]="isInSummaryState"
                                [groupName]='__custom.controls[1].id'>
                            </amp-group-buttons>
                        </amp-redux>
                    </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives      : [ AmpFormBlockComponent ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AnotherSampleExperienceBlock extends FormBlock {
    isActive                    = true;
    private loadedDynamicBlock  = false;
    private dynamicChild        = {
        'name'        : 'BlockWithRadios' ,
        'blockType'   : 'BlockWithRadios' ,
        'blockLayout' : 'INLINE' ,
        'commonBlock' : false ,
        'path'        : '/amp-form-block/blocks/block-with-radios' ,
        'custom'      : {
            'blockTitle' : 'Let\'s test the radio buttons' ,
            'controls'   : [
                {
                    'id'      : 'radios' ,
                    'buttons' : [
                        {
                            'id'    : 'five_years2' ,
                            'value' : 'five_years2' ,
                            'label' : 'At least five years'
                        } ,
                        {
                            'id'    : 'fewer_than_five_years' ,
                            'value' : 'fewer_than_five_years' ,
                            'label' : 'Fewer than five years'
                        } ,
                        {
                            'id'    : 'more_than_five_years' ,
                            'value' : 'more_than_five_years' ,
                            'label' : 'More than five years'
                        } ,
                        {
                            'id'    : 'amazing_value' ,
                            'value' : 'amazing_value' ,
                            'label' : 'How amazing this radio button is'
                        }
                    ]
                }
            ]
        }
    };
    private anotherDynamicChild = {
        'name'        : 'samplefieldsblock' ,
        'blockType'   : 'SampleFieldsBlock' ,
        'blockLayout' : 'INLINE' ,
        'commonBlock' : false ,
        'path'        : '/amp-form-block/blocks/sample-fields-block' ,
        'custom'      : {
            'blockTitle' : 'Multiple text fields ' ,
            'controls'   : [
                {
                    'id'      : 'Title' ,
                    'options' : [
                        {
                            'value' : 'MR' ,
                            'label' : 'MR'
                        } ,
                        {
                            'value' : 'MRS' ,
                            'label' : 'MRS'
                        }
                    ]
                } ,
                {
                    'id' : 'Title1'
                }
            ]
        }
    };

    constructor ( private themeService : ThemeService ,
                  private _vContainerRef : ViewContainerRef ,
                  formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    onButtonClick ( value ) {
        // if ( value === this.__custom.controls[ 0 ].buttons[ 0 ].value ) {
        //     this.loadedDynamicBlock = true;
        //     this.__loadAt( this.anotherDynamicChild , this._vContainerRef );
        //     this.__loadNext( this.dynamicChild , this._vContainerRef );
        // } else {
        //     if ( this.loadedDynamicBlock ) {
        //         this.loadedDynamicBlock = false;
        //         this.__removeNext( this._vContainerRef );
        //         this.__removeNext( this._vContainerRef );
        //     }
        // }
    }
}
