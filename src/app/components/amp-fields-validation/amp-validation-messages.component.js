"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ui_core_1 = require('amp-ddc-ui-core/ui-core');
var AmpValidationMessagesComponent = (function () {
    function AmpValidationMessagesComponent() {
        this.errors = [];
    }
    Object.defineProperty(AmpValidationMessagesComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.controlArray) {
                if (this.controlArray[propertyName].touched) {
                    for (var error in this.controlArray[propertyName].errors) {
                        this.errors.push(ui_core_1.ValidationService.getValidatorErrorMessage(error));
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AmpValidationMessagesComponent = __decorate([
        core_1.Component({
            selector: 'validation-messages',
            inputs: ['controlArray'],
            template: "\n                <div class='errors mt'>\n                    <pre>{{ errors | json }}</pre>\n                    <div *ngFor='#error of errors'>\n                        <span class='icon icon--close icon-errors'></span>{{ error }}\n                    </div>\n                </div>\n    <div *ngIf='errorMessage !== null'>{{errorMessage}}</div>\n"
        })
    ], AmpValidationMessagesComponent);
    return AmpValidationMessagesComponent;
}());
exports.AmpValidationMessagesComponent = AmpValidationMessagesComponent;
