import {FormPage} from "./formPage";
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {RouteParams, Router, RouteRegistry, CanDeactivate, ComponentInstruction} from 'angular2/router';

@Component ({
  selector: 'details-page',
  template: `
    <div class="landing">
      <p>Page details, with the frame and all</p>
      <div #nestedBlock></div>
      <button (click)="next()">OK</button>
    </div>
  `,
  styles: [`
    .landing {
      border: 1px dotted green;
    }
  `]
  // encapsulation: ViewEncapsulation.Emulated
})
export class DetailsPage extends FormPage implements CanDeactivate {
  static CLASS_NAME = "DetailsPage";

  constructor (public _router: Router) {
    super();
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) : any {
    return false;
  }
}
