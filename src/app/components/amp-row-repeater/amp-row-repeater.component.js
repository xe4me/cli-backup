"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var amp_form_row_component_1 = require('../../blocks/amp-form-row/amp-form-row.component');
var AmpRowRepeaterComponent = (function () {
    function AmpRowRepeaterComponent() {
        this.controlArray = new forms_1.FormArray([]);
    }
    AmpRowRepeaterComponent.prototype.ngOnInit = function () {
        if (this.controlGroup && this.id) {
            this.controlGroup.addControl(this.id, this.controlArray);
        }
        this.init();
    };
    AmpRowRepeaterComponent.prototype.ngOnDestroy = function () {
        if (this.controlGroup && this.id && this.controlGroup.contains(this.id)) {
            this.controlGroup.removeControl(this.id);
        }
    };
    AmpRowRepeaterComponent.prototype.init = function () {
        if (this.controlArray.controls.length === 0) {
            this.add();
        }
    };
    AmpRowRepeaterComponent.prototype.add = function () {
        this.controlArray.push(new forms_1.FormGroup({}));
    };
    AmpRowRepeaterComponent.prototype.remove = function (_index) {
        this.controlArray.removeAt(_index);
    };
    AmpRowRepeaterComponent.prototype.reset = function () {
        while (this.controlArray.length) {
            this.controlArray.removeAt(0);
        }
    };
    __decorate([
        core_1.Input('controlGroup')
    ], AmpRowRepeaterComponent.prototype, "controlGroup");
    __decorate([
        core_1.Input('context')
    ], AmpRowRepeaterComponent.prototype, "context");
    __decorate([
        core_1.Input('id')
    ], AmpRowRepeaterComponent.prototype, "id");
    __decorate([
        core_1.Input('removeBtn')
    ], AmpRowRepeaterComponent.prototype, "removeBtn");
    __decorate([
        core_1.Input('addBtn')
    ], AmpRowRepeaterComponent.prototype, "addBtn");
    AmpRowRepeaterComponent = __decorate([
        core_1.Component({
            selector: 'amp-row-repeater',
            queries: {
                itemTemplate: new core_1.ContentChild(core_1.TemplateRef)
            },
            template: "\n        <amp-form-row *ngFor=\"let controlGroup of controlArray.controls ; let i = index;\">\n            <div class=\"utils__push--left\">\n            <template\n                [ngTemplateOutlet]=\"itemTemplate\"\n                [ngOutletContext]=\"{ controlGroup: controlGroup, index: i }\">\n            </template>\n            </div>\n            <amp-button *ngIf=\"i>0\" [context]=\"context\" (click)=\"remove(i)\"\n                        class=\"btn btn-anchor utils__push--left\">\n                <span class=\"icon icon--close\" aria-hidden=\"true\"></span> {{ removeBtn }}\n            </amp-button>\n        </amp-form-row>\n        <amp-button *ngIf=\"controlArray.controls.length>0\" [context]=\"context\" (click)=\"add()\"\n                    class=\"btn btn-anchor btn-inline\">\n            <span class=\"icon icon--plus-filled\" aria-hidden=\"true\"></span> {{ addBtn }}\n        </amp-button>\n    ",
            styles: [require('./amp-row-repeater.scss').toString()],
            directives: [amp_form_row_component_1.AmpFormRowComponent],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AmpRowRepeaterComponent);
    return AmpRowRepeaterComponent;
}());
exports.AmpRowRepeaterComponent = AmpRowRepeaterComponent;
