var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ProgressObserverService, FormBlock, FormModelService, ScrollService } from 'amp-ddc-components';
export var WelcomeBlockComponent = (function (_super) {
    __extends(WelcomeBlockComponent, _super);
    function WelcomeBlockComponent(formModelService, scrollService, _cd, elementRef, progressObserver) {
        _super.call(this, formModelService, elementRef, _cd, progressObserver, scrollService);
    }
    WelcomeBlockComponent = __decorate([
        Component({
            selector: 'welcome-block',
            templateUrl: './welcome-block.component.html',
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [require('./welcome-block.component.scss')]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof FormModelService !== 'undefined' && FormModelService) === 'function' && _a) || Object, (typeof (_b = typeof ScrollService !== 'undefined' && ScrollService) === 'function' && _b) || Object, ChangeDetectorRef, ElementRef, (typeof (_c = typeof ProgressObserverService !== 'undefined' && ProgressObserverService) === 'function' && _c) || Object])
    ], WelcomeBlockComponent);
    return WelcomeBlockComponent;
    var _a, _b, _c;
}(FormBlock));
//# sourceMappingURL=/Users/xe4me/Desktop/Dev/AMP/amp-angular-cli/packages/angular-cli/blueprints/ng2/files/__path__/app/blocks/welcome/welcome-block.component.js.map