import { FormPage } from '../formPage';
import { Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'landing-page',
  template: `
    <div class='landing'>
      <p>Welcome</p>
      <div #nestedBlock></div>
      <a href='/confirmation'>Testing Confirmation link</a>
      <button (click)='next()'>OK</button>
    </div>
  `,
  styles: [`
    .landing {
      border: 1px solid black;
    }
  `]
  // encapsulation: ViewEncapsulation.Emulated
})
export class LandingPage extends FormPage {
  static CLASS_NAME = 'LandingPage';

  constructor (public _router: Router) {
    super();
  }
}
