"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ModelActions = (function () {
    function ModelActions() {
    }
    ModelActions.prototype.update = function (payload) {
        return {
            type: ModelActions.UPDATE,
            payload: payload
        };
    };
    ModelActions.prototype.push = function (payload) {
        return {
            type: ModelActions.PUSH,
            payload: payload
        };
    };
    ModelActions.prototype.removeAt = function (payload) {
        return {
            type: ModelActions.REMOVE_AT,
            payload: payload
        };
    };
    ModelActions.prototype.removeAll = function (payload) {
        return {
            type: ModelActions.REMOVE_ALL,
            payload: payload
        };
    };
    ModelActions.UPDATE = '[MODEL] Update model';
    ModelActions.PUSH = '[MODEL] Push an item to array';
    ModelActions.REMOVE_AT = '[MODEL] Remove and item from array';
    ModelActions.REMOVE_ALL = '[MODEL] Remove all items of an array';
    ModelActions = __decorate([
        core_1.Injectable()
    ], ModelActions);
    return ModelActions;
}());
exports.ModelActions = ModelActions;
