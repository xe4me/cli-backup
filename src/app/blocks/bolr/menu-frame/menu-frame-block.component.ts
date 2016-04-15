import {Component} from 'angular2/core';
import {FormBlock} from '../../formBlock';
import {StickyProgressHeaderBlockComponent} from '../../../../../src/app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component';
import {FormModelService} from '../../../../../node_modules/amp-ddc-ui-core/src/app/services/formModel.service';

@Component({

    selector: 'menu-frame',
    template: `
        <div class="menu-frame">
             <sticky-progress-header-block
                    class="sticky-progressbar animate-progress-bar"
                    [class.hidden]='isIntroActive()'
                    [class.show]='!isIntroActive()'
                    determinate="determinate"
                    value="67">
             </sticky-progress-header-block>
             <div
                  [class.hidden]='!isIntroActive()'
                  [class.show]='isIntroActive()'
             class="animate-hard-rule hr--solid menu-frame__divider"></div>
             <div class="menu grid__item ">
                <div
                [class.invisible]='isIntroActive()'
                [class.show]='!isIntroActive()'
                class="animate-transition menu--left">
                    <div class="menu--left--title">You request details</div>
                    <div class="menu--left--hr hr--solid"></div>
                    <div class="menu--left--save"><span class="icon icon--time"></span> Save for later</div>
                    <div class="menu--left--download"><span class="icon icon--time"></span>  Download a copy</div>
                </div>
                <div class="menu--right utils__position--rel">
                    <amp-overlay active="true"></amp-overlay>
                    <!-- Dynamic form blocks driven from the Form Definition -->
                    <div #nestedBlock></div>
                </div>
            </div>
        </div>
    `,
    styles: [require('./menu-frame-block.component.scss').toString()],
    directives: [StickyProgressHeaderBlockComponent],

})


export class MenuFrameBlockComponent extends FormBlock {
    static CLASS_NAME = 'MenuFrameBlockComponent';

    constructor(private formModelService: FormModelService) {
        super();
    }

    public isIntroActive() {
        if (this._id) {
            return this.formModelService.getModel().currentBlockID.index === this._id.index ||
                this.formModelService.getModel().currentBlockID.index < this._id.index;
        }

        return true;
    }

    preBindControls(_formBlockDef: any): void {
    }
}
