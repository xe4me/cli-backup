import {Component} from 'angular2/core';
import {FormBlock} from '../../formBlock';
import {StickyProgressHeaderBlockComponent} from "../../../../../src/app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component";


@Component({

    selector: 'menu-frame',
    template: `
         <sticky-progress-header-block 
                determinate="determinate"
                value="67">
         </sticky-progress-header-block> 
         <div class="menu grid__item ">
            <div class="menu--left">
                <div class="menu--left--title">You request details</div>
                <div class="menu--left--hr hr--solid"></div>
                <div class="menu--left--save"><span class="icon icon--time"></span> Save for later</div>
                <div class="menu--left--download"><span class="icon icon--time"></span>  Download a copy</div>
            </div>
            <div class="menu--right">
                <!-- Dynamic form blocks driven from the Form Definition -->
                <div #nestedBlock></div>
                <div class="content"></div>
            </div>
        </div>

    `,
    styles: [require('./menu-frame-block.component.scss').toString()],
    directives: [StickyProgressHeaderBlockComponent],

})


export class MenuFrameBlockComponent extends FormBlock {
    preBindControls(_formBlockDef:any):void {
    }

    static CLASS_NAME = 'MenuFrameBlock';

    constructor() {
        super();
    }
}