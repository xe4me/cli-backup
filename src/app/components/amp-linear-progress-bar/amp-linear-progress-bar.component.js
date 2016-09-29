"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var progress_bar_1 = require('@angular2-material/progress-bar');
var AmpLinearProgressBarComponent = (function () {
    function AmpLinearProgressBarComponent() {
    }
    AmpLinearProgressBarComponent = __decorate([
        core_1.Component({
            selector: 'amp-linear-progress-bar',
            template: "\n        <md-progress-bar color=\"amp-progressbar-sky-blue\"\n        [mode]=\"determinate\"\n        [value]=\"value\">\n        </md-progress-bar>\n    ",
            inputs: ['value', 'determinate'],
            directives: [progress_bar_1.MdProgressBar],
            styles: [require('./amp-linear-progress-bar.scss').toString()],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], AmpLinearProgressBarComponent);
    return AmpLinearProgressBarComponent;
}());
exports.AmpLinearProgressBarComponent = AmpLinearProgressBarComponent;
