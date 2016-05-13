# AMP Digital dynamic data capture UI components library

This repo contains all build blocks for DDC experience (forms).
To see the actual form experience that makes use of the components in this repo, please go to [DDC experience repo | https://gitlab.ccoe.ampaws.com.au/DDC/experience]

### AMP Dependency
# [ui-core](https://gitlab.ccoe.ampaws.com.au/DDC/ui-core)
# [amp-styleguide-core](https://gitlab.ccoe.ampaws.com.au/DDC/amp-styleguide-core.git)

### TODO
1, Get this repo into Jenkins and obtain a DNS entry to host this library


### Quick start
> Clone/Download the repo

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone git@gitlab.ccoe.ampaws.com.au:DDC/components.git

# change directory to our repo
cd components

# install the repo with npm
npm install

# start the server
npm start

# please refer to [Global installs under Getting Started](#getting-started) if this is your first webpack, karma, protractor, typings, or typescript project.
```
go to [http://0.0.0.0:3001](http://0.0.0.0:3001) or [http://localhost:3001](http://localhost:3001) in your browser


NOTE :
After running "npm start" If you came across "Strict Mode and Const" related npm errors , run bellow code to fix this :

1) Clear NPM's cache:

sudo npm cache clean -f

2) Install a little helper called 'n'

sudo npm install -g n

3) Install latest stable NodeJS version

sudo n stable


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
components/
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.ts                * our entry file for our browser environment, this will bootstrap the
 |   |                           styleguide DEMO app, which demonstrate all of our reusable components.
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 │   ├──app/                   * WebApp: folder (sub-components follows the same structure)
 │   │   ├──readme             * README on design of this component (inc. UX, UI, etc..)
 │   │   ├──app.scss           * SASS specific to this component only
 │   │   └──app.ts             * App.ts: a simple version of our App component components
 │   │
 │   ├──assets/                * static assets are served here
 │   │   ├──icon/              * our list of icons from www.favicon-generator.org
 |   |   ├──images/            * static images that isn't from AEM
 │   │   ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │   │   ├──robots.txt         * for search engines to crawl your website
 │   │   └──human.txt          * for humans to know who the developers are
 │   │
 │   ├──style/                 * SASS files that are global to the entire site, following
 |   |                           the [inuitcss | https://github.com/inuitcss] conventions.
 |   |                           AMP-styleguide-core is the parent styles project, which defines the
 |   |                           foundation of styling aspects like themes, breakpoints, fonts, spacings,
 |   |                           mixins, etc...
 │   │
 │   └──styleguide/            * Styleguide demo site to show case all components
 │       ├──blocks/            * reusable blocks, can contain custom blocks for testing purposes
 │       ├──componentGroups/   * reusable component groups, please refers to DDC team site for design
 |       |                       guidelines and description of what is a block, componentGroup and
 |       |                       components. [DDC confluence](https://teamtools.amp.com.au/confluence/display/DDC/Dynamic+design+guidelines)
 │       └──components/               * reusabled components
 │             ├──basic_usage.html    * standard html that typically used to invoke demo component
 │             ├──basic_usage.scss    * any extra CSS required to demo the component
 │             ├──basic_usage.ts      * provide assistance in demo component, mocking, initializing, etc.
 │             ├──component.test      * Galen test
 │             ├──component.test.spec * Galen test specification
 │             └──component.spec.ts   * Jasmine test
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
* Ensure you're running the latest versions Node `v4.1.x`+ and NPM `2.14.x`+
* Ensure you have [Galen Framework](http://galenframework.com/) installed (version `v2.2.0`+)

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typings` (`npm install --global typings`)
* `typescript` (`npm install --global typescript`)

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
# or
npm start
# production - DO NOT RUN for this repo. Please refer to experience for Production deployables
#npm run build:prod
#npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production - DO NOT RUN for this repo. Please refer to experience for Production deployables
#npm run build:prod
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
