"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// export enum LICENSEE {AMPFP, HILLROSS, CHARTER};
var ThemeIDDirective = (function () {
    function ThemeIDDirective(el, renderer, formModelService) {
        this.themeId = formModelService.getModel().context.licensee;
        // renderer.setElementStyle(el.nativeElement, 'background-color', 'yellow');
        renderer.setElementClass(el.nativeElement, this.themeId, true);
        // Do not directly set the style on the nativeElement, use the Renderer for serverside rendering to work (https://github.com/angular/universal).
        //el.nativeElement.style.backgroundColor = 'yellow';
    }
    ThemeIDDirective = __decorate([
        core_1.Directive({
            selector: '[ampLicenseeThemeID]'
        })
    ], ThemeIDDirective);
    return ThemeIDDirective;
}());
exports.ThemeIDDirective = ThemeIDDirective;
