# AMP Digital dynamic data capture Experience - <%= jsComponentName %>

This experience project repo was generated using amp-angular-cli command.

Developers are free to use the cli in whichever way that delivers the maximum value to achieve their goal, whether it is only for 
scaffolding, quick poc, generated specific test bed, forms, components, routes, etc.

However, it is advisable to make use of the cli throughout the lifecycle of this project (i.e. from creation, generation, 
initialization, installation, serving, building, testing, etc), please refer to the README.md of the amp-angular-cli for more details.

The rest of this document assumes you will stay on the cli path (i.e. it will not talk about npm install and dependency management as that is managed as part of the cli).

This repo contains the specific Angular components for this <Experience> only.
It is expected that each Experience (i.e. Form) will have their own clone of this Experience repo.
The core content will be the Form specific items
1, FormDefinition
2, FormComponent

thus, this repo should be very light in size.

> Various aspects and toolings of this project with links to obtain further resources.
> * Best practices in file and application organization for [Angular 2](https://angular.io/).
> * Ready to go build system using [Webpack](https://webpack.github.io/docs/) for working with [TypeScript](http://www.typescriptlang.org/).
> * Testing Angular 2 code with [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/).
> * Coverage with [Istanbul](https://github.com/gotwarlost/istanbul)
> * End-to-end Angular 2 code using [Protractor](https://angular.github.io/protractor/).
> * UI layout plus look and feel testing with [Galen](http://galenframework.com/)
> * Stylesheets with [SASS](http://sass-lang.com/) (not required, it supports regular css too).
> * Error reported with [TSLint](http://palantir.github.io/tslint/).
> * Documentation with [TypeDoc](http://typedoc.io/).

### Dependency
* Depends on [amp-styleguide-core](https://gitlab.ccoe.ampaws.com.au/DDC/amp-styleguide-core), this project currently is mainly used by MyAMP but it needs to be refactored out as the core parent styleguide project and all other project should either just use it or depend on it. Currently running off a branch [amp-styleguide-core | http://github.com/ampdigital/amp-styleguide-core#feature/agile/DDC-38].
* Depends on [components](https://gitlab.ccoe.ampaws.com.au/DDC/components.git) which contains all of the DDC build blocks.


### Quick start
Before you can proceed you will need to configure your proxy settings properly and complete the steps in Getting Started.
Recommended way is to setup a [local proxy](http://stackoverflow.com/questions/18569054/npm-behind-ntlm-proxy) on your laptop.


Change to develop branch:
```bash
# Switch over to the develop branch, if it's not the default
git checkout develop

# Init npm dependency
amp-ng init -nio

# start the server
amp-ng serve

# to run tests once off
amp-ng test --watch false

# to have test watching code changes
amp-ng test

```

go to [http://localhost:3000/ddc/secure/ui/nio/](http://localhost:3000/ddc/secure/ui/nio/) in your browser



# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
* [Contributing](#contributing)
* [TypeScript](#typescript)
* [Typings](#typings)
* [Frequently asked questions](#frequently-asked-questions)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [License](#license)


## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
digital-ddc-ui/
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.ts                * our entry file for our browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.spec.ts        * a simple test of components in app.ts
 │   │   ├──app.e2e.ts        * a simple end-to-end test for /
 │   │   └──app.ts             * App.ts: a simple version of our App component components
 │   │
 │   ├──assets/                * static assets are served here
 │   │   ├──icon/              * our list of icons from www.favicon-generator.org
 │   │   ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │   │   ├──robots.txt         * for search engines to crawl your website
 │   │   └──human.txt          * for humans to know who the developers are
 │   │
 │   ├──style/                 * SASS files that are global to the entire site
 │   │
 │   └──styleguide/            * Styleguide demo site to show case all components
 │
 ├──spec-bundle.js             * ignore this magic that sets up our angular 2 testing environment
 ├──karma.config.js            * karma config for our unit tests
 ├──protractor.config.js       * protractor config for our end-to-end tests
 │
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──typings.json               * our typings manager
 ├──package.json               * what npm uses to manage it's dependencies
 │
 ├──webpack.config.js          * our development webpack config
 ├──webpack.test.config.js     * our testing webpack config
 └──webpack.prod.config.js     * our production webpack config
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running at least these versions Node `v5.1.x`+ and NPM `3.x.x`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typings` (`npm install --global typings`)
* `typescript` (`npm install --global typescript`)

Once you have installed the above, you need to install amp-angular-cli with `npm install -g amp-angular-cli`.

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `typings install` to install necessary typings
* `npm run server` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
# development
npm run server

# production
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### watch and build files
```bash
npm run watch
```

### run tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

### run Galen (for UI layout testing)
```bash
npm run test:ui
```

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

```
npm install --global typescript
```

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

# Typings
> When you include a module that doesn't include Type Definitions inside of the module you need to include external Type Definitions with Typings

## Use latest Typings module
```
npm install --global typings
```

## Custom Type Definitions
When including 3rd party modules you also need to include the type definition for the module
if they don't provide one within the module. You can try to install it with typings

```
typings install node --save
```

If you can't find the type definition in the registry we can make an ambient definition in
this file for now. For example

```typescript
declare module "my-module" {
  export function doesSomething(value: string): string;
}
```


If you're prototyping and you will fix the types later you can also declare it as type any

```typescript
declare var assert: any;
```

If you're importing a module that uses Node.js modules which are CommonJS you need to import as

```typescript
import * as _ from 'lodash';
```

You can include your type definitions in this file until you create one for the typings registry
see [typings/registry](https://github.com/typings/registry)

# General Frequently asked questions
* What's the current browser support for Angular 2 Beta?
  * Please view the updated list of [browser support for Angular 2](https://github.com/angularclass/awesome-angular2#current-browser-support-for-angular-2)
* Why is my service, aka provider, is not injecting parameter correctly?
  * Please use `@Injectable()` for your service for typescript to correctly attach the metadata (this is a TypeScript problem)
* How do I run protractor with node 0.12.x?
  * please check out this repo to use the old version of protractor [#146](https://github.com/AngularClass/angular2-webpack-starter/pull/146/files)
* Where do I write my tests?
  * You can write your tests next to your component files. See [`/src/app/home/home.spec.ts`](/src/app/home/home.spec.ts)
* How do I start the app when I get `EACCES` and `EADDRINUSE` errors?
  * The `EADDRINUSE` error means the port `3000` is currently being used and `EACCES` is lack of permission for webpack to build files to `./dist/`
* How to use `sass` for css?
 * `loaders: ['raw-loader','sass-loader']` and `@Component({ styles: [ require('./filename.scss') ] })` see issue [#136](https://github.com/AngularClass/angular2-webpack-starter/issues/136)
* How do I test a Service?
 * See issue [#130](https://github.com/AngularClass/angular2-webpack-starter/issues/130#issuecomment-158872648)
* How do I add `vscode-chrome-debug` support?
 * The VS Code chrome debug extension support can be done via `launch.json` see issue [#144](https://github.com/AngularClass/angular2-webpack-starter/issues/144#issuecomment-164063790)
* How do I make the repo work in a virtual machine?
 * You need to use `0.0.0.0` so revert these changes [#205](https://github.com/AngularClass/angular2-webpack-starter/pull/205/files)
* What are the naming conventions for Angular 2?
 * please see issue [#185](https://github.com/AngularClass/angular2-webpack-starter/issues/185) and PR [196](https://github.com/AngularClass/angular2-webpack-starter/pull/196)
* How do I include bootstrap or jQuery?
 * please see issue [#215](https://github.com/AngularClass/angular2-webpack-starter/issues/215) and [#214](https://github.com/AngularClass/angular2-webpack-starter/issues/214#event-511768416)
* I'm getting an error about not finding my module that I installed?
 * please see [How to include or create custom type definitions](https://github.com/AngularClass/angular2-webpack-starter/wiki/How-to-include-or-create-custom-type-definitions) and [custom_typings.d.ts](https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/custom_typings.d.ts)
* How do I async load a component?
 * see wiki [How-do-I-async-load-a-component-with-AsyncRoute](https://github.com/AngularClass/angular2-webpack-starter/wiki/How-do-I-async-load-a-component-with-AsyncRoute)

#AMP Frequently asked questions
* How do I get started?
  * Ask Docker Dan. The idea is that you get a docker image that already has the NPM packages and required software installed so you can code straight away.

testing
# License
 [PROPRIETARY]


# <%= jsComponentName %>

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version <%= version %>.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
