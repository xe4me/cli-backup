"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var compose_1 = require('@ngrx/core/compose');
var amp_redux_component_1 = require('./components/amp-redux/amp-redux.component');
var model_reducer_1 = require('./reducers/model/model.reducer');
var model_action_1 = require('./actions/model/model.action');
var store_1 = require('@ngrx/store');
var store_service_1 = require('./services/store/store.service');
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
}
var ACTIONS = [
    model_action_1.ModelActions
];
var AmpReduxModule = (function () {
    function AmpReduxModule() {
    }
    AmpReduxModule.provideAmpStore = function (_initialState, _reducers) {
        var composedReducers = _reducers ? compose_1.compose(_reducers, model_reducer_1["default"]) : model_reducer_1["default"];
        return store_1.StoreModule.provideStore(composedReducers, _initialState);
    };
    AmpReduxModule = __decorate([
        core_1.NgModule({
            declarations: [
                amp_redux_component_1.AmpReduxComponent
            ],
            providers: [ACTIONS, store_service_1.StoreService],
            exports: [amp_redux_component_1.AmpReduxComponent]
        })
    ], AmpReduxModule);
    return AmpReduxModule;
}());
exports.AmpReduxModule = AmpReduxModule;
