import {FormBlock} from "../formBlock";
import {Injector, Injectable, Inject, Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {RouteParams, Router, RouteRegistry} from 'angular2/router';

@Injectable()
export class FormPage extends FormBlock {
  pageId: string;
  nextPageId: string;
  prevPageId: string;
  _router: Router;

  constructor () {
    super();
    this.path = "pages/";
  }

  // Noop but can be overriden by child class
  public constructFormControls () {}

  next() {
    this._router.navigate(['BuyBackFormDetails', {id: this.nextPageId}]);
    return false;
  }

  prev() {
    this._router.navigate([this.prevPageId]);
    return false;
  }
}
