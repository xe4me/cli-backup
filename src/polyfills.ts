// Polyfills
// (these modules are what are in '@angular/bundles/angular2-polyfills' so don't use that here)

// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';

// Prefer CoreJS over the polyfills above
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Typescript emit helpers polyfill
import 'ts-helpers';

if ('production' === process.env.ENV) {
  // Production


} else {
  // Development
  // Might require v6.2.1
  // Error.stackTraceLimit = Infinity;

  require('zone.js/dist/long-stack-trace-zone');

}
