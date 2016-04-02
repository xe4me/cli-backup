/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {BuyBackFormComponent} from './forms/derby/buybackform.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  styles: [`
    nav ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    nav li {
      display: inline;
    }
    nav li.active {
      background-color: lightgray;
    }
  `],
  template: `
    <header>
      <nav>
        <h1>Hello {{ name }}</h1>
        <ul>
          <li router-active>
            <a [routerLink]=" ['LandingPage'] ">Landing</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['BuyBackFormDetails', {id: 'details'}] ">Details</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['BuyBackFormDetails', {id: 'confirmation'}] ">Confirmation</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      DDC forms applicaton loader
    </footer>
  `
})
@RouteConfig([
  { path: '/',    component: BuyBackFormComponent, name: 'LandingPage', useAsDefault: true },
  { path: '/:id', component: BuyBackFormComponent, name: 'BuyBackFormDetails'},
  // { path: '/home', component: Home, name: 'Home' },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // { path: '/about', loader: () => require('es6-promise!./about/about')('About'), name: 'About' },
  // { path: '/index',  loader: () => require('es6-promise!./forms/derby/buyback-form.component')('BuyBackFormComponent'), name: 'Form' },
  { path: '/**', redirectTo: ['LandingPage'] }
])
export class App {
  constructor() {

  }
}
