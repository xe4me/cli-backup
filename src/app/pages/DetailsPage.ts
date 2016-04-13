import {FormPage} from './formPage';
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {RouteParams, Router, RouteRegistry, CanDeactivate, ComponentInstruction} from 'angular2/router';
import {StickyProgressHeaderBlockComponent} from "../../../src/app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component";


@Component({
    selector: 'details-page',
    template: `
    <div class="landing">
           <sticky-progress-header-block 
                determinate="determinate"
                value="67">
            
            </sticky-progress-header-block> 
          <!-- Dynamic form blocks driven from the Form Definition -->
          <div class="menu grid__item ">
            <div class="menu--left">
                <div class="menu--left--title">You request details</div>
                <div class="menu--left--hr hr--solid"></div>
                <div class="menu--left--save"><span class="icon icon--time"></span> Save for later</div>
                <div class="menu--left--download"><span class="icon icon--time"></span>  Download a copy</div>
            </div>
            <div class="menu--right">
                <div #nestedBlock></div>
                <div class="content"></div>
            </div>
        </div>
      <button (click)="next()">OK</button>

    </div>
  `,
    directives: [StickyProgressHeaderBlockComponent],
    styles: [require('./details-page.scss').toString()],
    // encapsulation: ViewEncapsulation.Emulated
})
export class DetailsPage extends FormPage implements CanDeactivate {

    static CLASS_NAME = 'DetailsPage';


    constructor(public _router:Router) {
        super();
    }

    routerCanDeactivate(next:ComponentInstruction, prev:ComponentInstruction):any {
        return false;
    }
}
