import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {FormBlock, NamedControl} from '../../formBlock';
import {StickyProgressHeaderBlockComponent} from '../../../../../src/app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component';
import {FormModelService} from "amp-ddc-ui-core/ui-core";


@Component({
    selector: 'menu-frame',
    template: `
        <div class="menu-frame">
             <sticky-progress-header-block
                    class="sticky-progressbar animate-progress-bar"
                    [class.hidden]='!introHasPassed'
                    determinate="determinate"
                    value="67">

             </sticky-progress-header-block> 
             <div [class.hidden]='introHasPassed' class="animate-hard-rule hr--solid menu-frame__divider"></div>
             <div class="menu grid__item ">
                <div 
                    [class.invisible]='!introHasPassed'  
                    class="animate-transition menu--left">
                    <div class="menu--left--title">You request details</div>
                    <div class="menu--left--hr hr--solid"></div>
                    <div class="menu--left--save"><span class="icon icon--time"></span> Save for later</div>
                    <div class="menu--left--download"><span class="icon icon--time"></span>  Download a copy</div>
                    <div class="menu--left--download">CurrentClass : {{formModelService.getModel().currentBlockClassName}}</div> 
                </div>
                <div class="menu--right utils__position--rel">
                    <!-- Dynamic form blocks driven from the Form Definition -->
                    <div #nestedBlock></div>
                </div>
            </div>
        </div>
    `,
    styles: [require('./menu-frame-block.component.scss').toString()],
    directives: [StickyProgressHeaderBlockComponent]
})


export class MenuFrameBlockComponent extends FormBlock {

    static CLASS_NAME = 'MenuFrameBlockComponent';

    constructor(private formModelService: FormModelService) {
        super();
        
        /*
         * IMPORTANT TODO :
         * Looks like this block cannot have access to formModel unless it has it's own formControls
         * */
        this.formControl = [new NamedControl('menuBlock', new Control())];
    }


    private get introHasPassed() {
        return this.formModel.controls['introIsPassed'].valid;
    }


    preBindControls(_formBlockDef: any): void {

    }

}
