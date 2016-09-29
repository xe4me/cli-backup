"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var FormSectionService = (function () {
    function FormSectionService() {
        this.$onRegisterSection = new core_1.EventEmitter();
        this.currentSectionFdn = [];
        // List of sections formDef accord to the sectionScopeFDN
        // P.S. currently the ordering of the sections comes from the FormDef, it is forseeable that the order might not be static
        // in which case, we will need to add an index that dictates the order.
        this._formDefSections = [];
    }
    FormSectionService.prototype.isCurrentSection = function (sectionFullyDistinguishedName) {
        if (sectionFullyDistinguishedName && sectionFullyDistinguishedName.length && this.currentSectionFdn && this.currentSectionFdn.length) {
            return sectionFullyDistinguishedName.join() === this.currentSectionFdn.join();
        }
        return false;
    };
    Object.defineProperty(FormSectionService.prototype, "sections", {
        get: function () {
            return this._formDefSections;
        },
        enumerable: true,
        configurable: true
    });
    FormSectionService.prototype.goToNextSection = function () {
        if (this.currentSectionIndex < (this._formDefSections.length - 1)) {
            this.currentSectionIndex++;
            this.currentSectionFdn = this._formDefSections[this.currentSectionIndex].__fdn;
        }
    };
    FormSectionService.prototype.goToPrevSection = function () {
        if (this.currentSectionIndex > 0) {
            this.currentSectionIndex--;
            this.currentSectionFdn = this._formDefSections[this.currentSectionIndex].__fdn;
        }
    };
    FormSectionService.prototype.registerSection = function (_section) {
        var _this = this;
        setTimeout(function () {
            if (_this.currentSectionFdn.length === 0) {
                // section
                _this.currentSectionFdn = _section.__fdn;
                _this.currentSectionIndex = 0;
            }
            _this._formDefSections.push(_section);
            _this.$onRegisterSection.emit(_section);
        });
    };
    FormSectionService.prototype.setCurrentActiveSection = function (_section, _index) {
        if (this.currentSectionIndex === _index) {
            return;
        }
        this.currentSectionIndex = _index;
        this.currentSectionFdn = _section.__fdn;
    };
    FormSectionService = __decorate([
        core_1.Injectable()
    ], FormSectionService);
    return FormSectionService;
}());
exports.FormSectionService = FormSectionService;
