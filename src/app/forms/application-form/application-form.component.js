var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormModelService } from 'amp-ddc-components';
var formDefinition = require('./form-def.def.json');
export var ApplicationFormComponent = (function () {
    function ApplicationFormComponent(_builder, formModelService) {
        this._builder = _builder;
        this.formModelService = formModelService;
        this.formDef = formDefinition;
        this.form = this.formModelService.hydrateForm();
    }
    ApplicationFormComponent = __decorate([
        Component({
            selector: 'application-form',
            templateUrl: './application-form.component.html',
            styles: [require('./application-form.component.scss')]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof FormBuilder !== 'undefined' && FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof FormModelService !== 'undefined' && FormModelService) === 'function' && _b) || Object])
    ], ApplicationFormComponent);
    return ApplicationFormComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/xe4me/Desktop/Dev/AMP/amp-angular-cli/packages/angular-cli/blueprints/ng2/files/__path__/app/forms/application-form/application-form.component.js.map