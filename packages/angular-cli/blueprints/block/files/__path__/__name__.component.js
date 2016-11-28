"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_ddc_components_1 = require('amp-ddc-components');
var default_1 = (function () {
    function default_1() {
    }
    default_1 = __decorate([
        core_1.Component({
            selector: '<%= selector %>-block',
            templateUrl: './<%= dasherizedModuleName %>.component.html',
            styles: [require('./<%= dasherizedModuleName %>.component.scss')],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], default_1);
    return default_1;
}());
exports. = default_1;
 %  > Block;
amp_ddc_components_1.FormBlock;
{
    constructor(formModelService, amp_ddc_components_1.FormModelService, elementRef, core_1.ElementRef, _cd, core_1.ChangeDetectorRef, scrollService, amp_ddc_components_1.ScrollService, progressObserver, amp_ddc_components_1.ProgressObserverService);
    {
        _super.call(this, formModelService, elementRef, _cd, progressObserver, scrollService);
    }
}
