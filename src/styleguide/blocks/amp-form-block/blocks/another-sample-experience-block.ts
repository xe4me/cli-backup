import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import { ThemeService } from '../../../services/theme';
import { FormBlock } from '../../../../app/form-block';
import {
    ScrollService,
    SaveService
} from '../../../../app/services';
import { AutoFocusOnDirective } from '../../../../app/modules/amp-directives';
@Component( {
    selector        : 'another-sample-experience-block',
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                  <amp-dropdown
                    auto-focus-on='select'
                    [attr.theme]="themeService.theme.attr"
                    [isInSummaryState]='false'
                    [id]='__custom.controls[2].id'
                    [label]='"Title"'
                    [controlGroup]="__controlGroup"
                    [options]='__custom.controls[2].options'
                    [required]="true">
                  </amp-dropdown>
            </amp-form-row>
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
                    </div>
            </amp-form-row>
            <amp-form-row>
                    <button (click)='removeAllAfter()'>Remove all the next blocks</button>
                    <br>
                    <button (click)='removeAt()'>Remove at 1</button>
                    <br>
                    <button (click)='loadAllNext()'>Load all next</button>
            </amp-form-row>
        </amp-form-block>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AnotherSampleExperienceBlock extends FormBlock {
    @ViewChild( AutoFocusOnDirective ) autoFocusOn;
                                       isActive = true;
    private loadedDynamicBlock                  = false;
    private dynamicChild                        = {
        'name'        : 'BlockWithRadios',
        'blockType'   : 'BlockWithRadios',
        'blockLayout' : 'INLINE',
        'commonBlock' : false,
        'path'        : 'amp-form-block/blocks/block-with-radios',
        'custom'      : {
            'blockTitle' : 'Let\'s test the radio buttons',
            'controls'   : [
                {
                    'id'      : 'radios',
                    'buttons' : [
                        {
                            'id'    : 'five_years2',
                            'value' : 'five_years2',
                            'label' : 'At least five years'
                        },
                        {
                            'id'    : 'fewer_than_five_years',
                            'value' : 'fewer_than_five_years',
                            'label' : 'Fewer than five years'
                        },
                        {
                            'id'    : 'more_than_five_years',
                            'value' : 'more_than_five_years',
                            'label' : 'More than five years'
                        },
                        {
                            'id'    : 'amazing_value',
                            'value' : 'amazing_value',
                            'label' : 'How amazing this radio button is'
                        }
                    ]
                }
            ]
        }
    };
    private multipleChilds                      = [ this.dynamicChild, this.dynamicChild ];

    constructor ( private themeService : ThemeService,
                  private _vContainerRef : ViewContainerRef,
                  saveService : SaveService,
                  scrollService : ScrollService,
                  _cd : ChangeDetectorRef, ) {
        super( saveService, _cd, scrollService );
    }

    onButtonClick ( value ) {
        if ( value === this.__custom.controls[ 0 ].buttons[ 0 ].value ) {
            this.loadedDynamicBlock = true;
            this.__loadNext( this.dynamicChild, this._vContainerRef )
                .then( ( createdComponent ) => {
                    console.log( 'createdComponent', createdComponent );
                } );
        } else {
            if ( this.loadedDynamicBlock ) {
                this.loadedDynamicBlock = false;
                this.__removeNext( this._vContainerRef )
                    .then( ( removedAt ) => {
                        console.log( 'removedAt', removedAt );
                    } );
            }
        }
    }

    removeAllAfter () {
        this.__removeAllAfter( this._vContainerRef )
            .then( ( removedAt ) => {
                console.log( 'removedAt', removedAt );
            } );
    }

    removeAt () {
        this.__removeAt( 1 )
            .then( ( removedAt ) => {
                console.log( 'removedAt', removedAt );
            } );
    }

    loadAllNext () {
        this.__loadAllNext( this.multipleChilds, this._vContainerRef )
            .then( ( all ) => {
                console.log( 'all', all );
            } );
    }
}
