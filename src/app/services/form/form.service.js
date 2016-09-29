"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var FormService = (function () {
    function FormService() {
    }
    FormService.prototype.getControlFromGroup = function (_fdn, _form) {
        var _control = _form;
        for (var i = 0; i < _fdn.length; i++) {
            if (_control.contains(_fdn[i])) {
                _control = _control.controls[_fdn[i]];
            }
        }
        return _control;
    };
    ;
    FormService = __decorate([
        core_1.Injectable()
    ], FormService);
    return FormService;
}());
exports.FormService = FormService;
