"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var NamedControl = (function () {
    function NamedControl(name, control) {
        this.name = name;
        this.control = control;
    }
    return NamedControl;
}());
exports.NamedControl = NamedControl;
exports.provideParent = function (component, parentType) {
    return core_1.provide(parentType || FormBlock, { useExisting: core_1.forwardRef(function () { return component; }) });
};
/**
 * This class is both a Abstract Class (i.e. Java like Abstract, property and method implementation that are common) and
 * a Class-Interface (https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#class-interface)
 */
var FormBlock = (function () {
    function FormBlock() {
        this.path = ''; // Physical path from src/app/blocks to the concrete FormBlock implementation
    }
    Object.defineProperty(FormBlock.prototype, "blocksAnchorId", {
        get: function () {
            return this.blockType + '_blocks';
        },
        enumerable: true,
        configurable: true
    });
    // Used by both nested formModel binding as well as dcl formModel binding
    FormBlock.prototype.bindControls = function (formModel, instance) {
        if (instance.formControlGroupName) {
            // Called by BaseForm straight after each block is dcl generated
            if (formModel && this.formControl && this.formControl.length > 0) {
                var tempControlGroup_1 = new common_1.ControlGroup({});
                this.formControl.map(function (namedControl) {
                    tempControlGroup_1.addControl(namedControl.name, namedControl.control);
                }, formModel);
                formModel.addControl(instance.formControlGroupName, tempControlGroup_1);
            }
        }
        this.formModel = formModel;
    };
    // Hook for processing after the controls and model is available for block to use.
    FormBlock.prototype.postBindControls = function () {
        return;
    };
    // Reference:   http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
    // TODO:        There are limitations and will need to test browser compatibility
    FormBlock.prototype.getName = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this).constructor.toString());
        return (results && results.length > 1) ? results[1] : '';
    };
    ;
    FormBlock.prototype.getMyVisibleFlagString = function () {
        return this.formControlGroupName + 'IsVisible';
    };
    FormBlock.prototype.getMyDoneFlagString = function () {
        return this.formControlGroupName + 'IsDone';
    };
    Object.defineProperty(FormBlock.prototype, "canGoNext", {
        get: function () {
            return this.formModel && this.formModel.controls[this.formControlGroupName].valid;
        },
        enumerable: true,
        configurable: true
    });
    return FormBlock;
}());
exports.FormBlock = FormBlock;
